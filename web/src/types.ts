export type Theme = "dark" | "light";
export type SkillKey = "ps" | "ct" | "cr";

/* ---------- content shapes (generated from the original sources) ---------- */
export interface Belt {
  name: string;
  gis: string;
  color: string;
  theme: string;
  xp: number;
  boss: string;
  topics: string[];
}
export interface Depth {
  concepts: string[];
  walk: [string, string][];
  tr: { change: string; code: string; note: string; out: string; stdin?: string };
  mistakes: [string, string][];
  deeper: [string, string, string | null, string | null][];
}
export interface GlossEntry {
  term: string;
  pron: string;
  meaning: string;
  why: string;
  code: string;
  out: string;
  gis: string;
  related: string;
  belt: number;
}
export interface ErrEntry {
  topic: string;
  error: string;
  code: string;
  why: string;
  fix: string;
  message: string;
  traceback: string;
  belt: string;
}
export interface R {
  pick: <T>(a: T[]) => T;
  int: (lo: number, hi: number) => number;
}
export interface Ex {
  q: string;
  code?: string;
  correct: string;
  wrong: string[];
  why: string;
  run?: boolean;
}
export interface Tpl {
  id: string;
  make: (r: R) => Ex;
}
export interface BankLesson {
  hook: string;
  bullets: string[];
  code: string;
  out: string;
  mistakes: string[];
  ex: Tpl[];
}
export interface CodeTask {
  task: string;
  starter: string;
  solution: string;
  stdin: string;
  expected: string;
  hints: string[];
  mustContain?: string;
}
export interface CodeTpl {
  id: string;
  topic: string;
  make: (r: R) => CodeTask;
}
export interface SpotTpl {
  id: string;
  topic: string;
  make: (r: R) => { code: string; answer: string };
}

/* ---------- lessons ---------- */
export interface Callout {
  id: "script" | "console" | "interp" | "map";
  title: string;
  body: string;
}
export interface BugTask {
  error: ErrEntry;
  task: string;
  fixed: string;
}
export interface FounderTask {
  brief: string;
  rules: string[];
  minPrints: number;
  needNumber: boolean;
  mustUse?: { re: string; label: string };
}
/** Hand-written per-lesson decisions; the rest of a lesson comes from the content bank. */
export interface LessonMeta {
  id: string;
  n: number;
  topic: string;
  title: string;
  icon: string;
  lookBack: string[];
  thinkFirst: { q: string; a: string };
  tryTpl?: string;
  tryTask?: CodeTask;
  watch?: { code: string; stdin?: string };
  bug: { idx: number; task: string; fixed: string };
  founder: FounderTask;
}
export interface Lesson extends LessonMeta {
  bank: BankLesson;
  depth: Depth;
  watchCode: string;
  watchStdin: string;
  bugTask: BugTask;
  glossary: GlossEntry[];
  callouts: Callout[];
}
export interface QuizQuestion {
  id: string;
  q: string;
  code?: string;
  options: string[];
  answer: number;
  why: string;
}

/* ---------- Python engine ---------- */
export type PyEvent = ["line", number] | ["out", string];
export interface PyError {
  type: string;
  msg: string;
  line: number | null;
  tb: string;
}
export interface PyResult {
  ev: PyEvent[];
  err: PyError | null;
}
export interface Step {
  line: number;
  outs: string[];
}
