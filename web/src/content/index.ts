import type { Callout, CodeTask, Ex, FounderTask, Lesson, QuizQuestion, R } from "../types";
import { LESSON_META } from "./lessons";
import { BANK } from "./bank";
import { DEPTH } from "./depth";
import { ERRORS } from "./errors";
import { GLOSSARY } from "./glossary";
import { CODE_TPL } from "./code";
import { SPOT_POOL, SPOT_TPL } from "./spot";

export { BELTS, BELT_ERR } from "./curriculum";
export { ERRORS, ERR_HIER, ERR_PY } from "./errors";
export { GLOSSARY } from "./glossary";

/** Small seeded random generator so a lesson's quiz and tasks are stable until the learner asks for fresh ones. */
export function rng(seed: number): R & { next: () => number } {
  let a = seed >>> 0 || 1;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    pick: <T,>(arr: T[]): T => arr[Math.floor(next() * arr.length)] as T,
    int: (lo: number, hi: number) => lo + Math.floor(next() * (hi - lo + 1)),
  };
}
function shuffle<T>(arr: T[], r: { next: () => number }): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r.next() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

const CALLOUTS: Callout[] = [
  { id: "script", title: "📜 Your script", body: "The file of instructions you write. Python reads it top to bottom, one line at a time." },
  { id: "interp", title: "🐍 The interpreter", body: "The program that reads each line and does it right away. The highlight shows where it's looking." },
  { id: "console", title: "🖥️ The console", body: "Where print() sends its output. Nothing appears here unless your code prints it." },
  { id: "map", title: "🗺️ Living Lanka map", body: "Your output changes the island: a city name goes on the welcome sign and lights its pin." },
];

const words = (s: string) => s.toLowerCase();
function lessonGlossary(text: string, n: number) {
  const t = words(text);
  const hit = GLOSSARY.filter((g) => g.belt === 0 && new RegExp("(^|[^a-z_])" + g.term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z_]|$)").test(t));
  const white = GLOSSARY.filter((g) => g.belt === 0);
  const extra = white.slice((n - 1) * 3, (n - 1) * 3 + 3).filter((g) => !hit.includes(g));
  return [...hit.slice(0, 8), ...extra].slice(0, 10);
}

function build(): Lesson[] {
  return LESSON_META.map((m) => {
    const bank = BANK[m.topic];
    const depth = DEPTH[m.topic];
    const error = ERRORS[m.bug.idx];
    if (!bank || !depth || !error || error.topic !== m.topic) throw new Error("content missing for " + m.topic);
    const text = [bank.hook, ...bank.bullets, ...depth.concepts, ...bank.mistakes].join(" ");
    return {
      ...m,
      bank,
      depth,
      watchCode: (m.watch?.code ?? depth.walk.map(([c]) => c).join("\n")).replace(/\n?$/, "\n"),
      watchStdin: m.watch?.stdin ?? "",
      bugTask: { error, task: m.bug.task, fixed: m.bug.fixed },
      glossary: lessonGlossary(text, m.n),
      callouts: CALLOUTS,
    };
  });
}

export const LESSONS: Lesson[] = build();
export const lessonById = (id: string): Lesson | undefined => LESSONS.find((l) => l.id === id);
export const STAGES = ["Hook", "Learn", "Watch", "Try", "Fix the bug", "Quiz", "Reward"] as const;
export type StageName = (typeof STAGES)[number];

/** The Try task for a lesson. Template-based tasks change with `variant` (fresh numbers and cities). */
export function tryTaskFor(l: Lesson, variant: number): CodeTask {
  const tpl = l.tryTpl ? CODE_TPL.find((t) => t.id === l.tryTpl) : undefined;
  if (tpl) {
    const t = tpl.make(rng(l.n * 1000 + variant));
    return t.starter.trim() ? t : { ...t, starter: "# Write your code below\n" };
  }
  if (l.tryTask) return l.tryTask;
  throw new Error("no try task for " + l.id);
}

const norm = (s: string) =>
  s
    .split("\n")
    .map((x) => x.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");

export function checkCode(t: CodeTask, src: string, outs: string[]): { ok: boolean; why: string } {
  if (t.mustContain && !src.includes(t.mustContain))
    return { ok: false, why: `Your code needs to use <code>${esc(t.mustContain)}</code>.` };
  if (norm(outs.join("\n")) !== norm(t.expected)) return { ok: false, why: "The output doesn't match yet. Compare it line by line with the target." };
  return { ok: true, why: "" };
}

export function checkFounder(f: FounderTask, src: string, outs: string[]): string[] {
  const miss: string[] = [];
  const prints = (src.match(/print\s*\(/g) ?? []).length;
  if (prints < f.minPrints) miss.push(`at least ${f.minPrints} print() line${f.minPrints > 1 ? "s" : ""}`);
  if (f.needNumber && !/\d/.test(outs.join("\n"))) miss.push("a number in the output");
  if (f.mustUse && !new RegExp(f.mustUse.re).test(src)) miss.push(f.mustUse.label);
  return miss;
}

export const bugFixed = (l: Lesson, src: string, errored: boolean) =>
  !errored && src.trim() !== l.bugTask.error.code.trim() && src.trim().length > 0;

function toQuestion(id: string, ex: Ex, r: { next: () => number }): QuizQuestion {
  const opts = shuffle([...new Set([ex.correct, ...ex.wrong])], r);
  return { id, q: ex.q, code: ex.code, options: opts, answer: opts.indexOf(ex.correct), why: ex.why };
}
/** Three questions from the lesson's exercise bank, stable for a given seed. */
export function quizFor(l: Lesson, seed: number): QuizQuestion[] {
  const r = rng(seed * 7919 + l.n);
  return shuffle(l.bank.ex, r)
    .slice(0, 3)
    .map((t) => toQuestion(l.id + "|" + t.id, t.make(r), r));
}
/** A fresh version of one bank question (new numbers and cities), used by Review and Practice. */
export function questionById(id: string, seed: number): QuizQuestion | null {
  const [lid, tid] = id.split("|");
  const l = LESSONS.find((x) => x.id === lid);
  const t = l?.bank.ex.find((x) => x.id === tid);
  if (!l || !t) return null;
  const r = rng(seed);
  return toQuestion(id, t.make(r), r);
}
export function spotFor(topic: string, seed: number): QuizQuestion | null {
  const tpls = SPOT_TPL.filter((t) => t.topic === topic);
  if (!tpls.length) return null;
  const r = rng(seed);
  const t = r.pick(tpls);
  const s = t.make(r);
  const wrong = shuffle(SPOT_POOL.filter((x) => x !== s.answer), r).slice(0, 2);
  return toQuestion("spot|" + t.id, { q: "Which error does this raise?", code: s.code, correct: s.answer, wrong, why: "Run it in your head line by line: " + (s.answer === "No error" ? "it runs fine." : "Python raises " + s.answer + ".") }, r);
}
export const codeTplsFor = (topic: string) => CODE_TPL.filter((t) => t.topic === topic);

const CITY = /\b(Colombo|Kandy|Galle|Jaffna|Matara|Kurunegala|Anuradhapura|Batticaloa|Negombo|Ratnapura|Trincomalee|Nuwara Eliya|Badulla|Hambantota)\b/i;
export const hasCity = (s: string) => CITY.test(s);
export const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
