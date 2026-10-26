import { useMemo, useState } from "react";
import type { CodeTask, Lesson, QuizQuestion } from "../types";
import { checkCode, codeTplsFor, esc, LESSONS, questionById, rng, spotFor, tryTaskFor } from "../content";
import { gain, getProgress, update, useProgress } from "../store";
import { runPython, useEngine } from "../py/engine";
import { buildSteps } from "../checker";
import { QuestionCard } from "../components/QuestionCard";
import { lessonUnlocked } from "./LessonScreen";
import { go } from "../router";
import { toast } from "../session";

type Item = { kind: "code"; task: CodeTask } | { kind: "mcq"; q: QuizQuestion };

/** Five fresh exercises for a lesson: coding tasks from the template bank plus quiz and spot-the-error cards. */
export function makeSet(l: Lesson, seed: number): Item[] {
  const r = rng(seed);
  const tpls = codeTplsFor(l.topic);
  const code: Item[] = [];
  const order = tpls.slice().sort(() => r.next() - 0.5);
  for (const t of order.length === 1 ? [order[0], order[0]] : order.slice(0, 2)) {
    if (!t) continue;
    let task = t.make(r);
    for (let k = 0; k < 5 && code.some((c) => c.kind === "code" && c.task.solution === task.solution); k++) task = t.make(r);
    if (!code.some((c) => c.kind === "code" && c.task.solution === task.solution)) code.push({ kind: "code", task });
  }
  if (!code.length) code.push({ kind: "code", task: tryTaskFor(l, 0) });
  const mcq: Item[] = [];
  const ids = l.bank.ex.map((t) => l.id + "|" + t.id);
  for (const qid of ids.slice().sort(() => r.next() - 0.5).slice(0, 3)) {
    const q = questionById(qid, r.int(1, 1e9));
    if (q) mcq.push({ kind: "mcq", q });
  }
  const spot = spotFor(l.topic, r.int(1, 1e9));
  if (spot) mcq[mcq.length - 1] = { kind: "mcq", q: spot };
  return [...code, ...mcq].slice(0, 5);
}

export function Practice({ id }: { id: string | null }) {
  const p = useProgress();
  const open = LESSONS.filter((l) => lessonUnlocked(p, l.n));
  const lesson = LESSONS.find((l) => l.id === id) ?? open[open.length - 1] ?? LESSONS[0];
  const [seed, setSeed] = useState(() => Date.now() % 1e9);
  const items = useMemo(() => (lesson ? makeSet(lesson, seed) : []), [lesson, seed]);
  if (!lesson) return null;
  return (
    <div className="page" id="practice">
      <section className="card section">
        <h2>🎲 Practice</h2>
        <p>Fresh exercises every time: new cities, new numbers, same skills. Pick any lesson you've unlocked.</p>
        <div className="filters">
          <label htmlFor="pLesson">Lesson</label>
          <select id="pLesson" value={lesson.id} onChange={(e) => go("practice/" + e.target.value)}>
            {open.map((l) => (
              <option key={l.id} value={l.id}>
                {l.n}. {l.title}
              </option>
            ))}
          </select>
          <button className="btn primary" id="freshSet" onClick={() => setSeed((s) => s + 1)}>
            🎲 New set
          </button>
        </div>
        <p className="tip">Exercises completed so far: {p.practiced}</p>
      </section>
      <div className="cards" id="practiceItems" key={lesson.id + seed}>
        {items.map((it, i) =>
          it.kind === "code" ? <CodeCard key={i} n={i} task={it.task} /> : <McqCard key={i} n={i} q={it.q} />,
        )}
      </div>
    </div>
  );
}

const credit = () => update({ practiced: getProgress().practiced + 1 });

function McqCard({ q, n }: { q: QuizQuestion; n: number }) {
  const [c, setC] = useState<number | undefined>(undefined);
  return (
    <article className="card section pcard" data-kind="mcq">
      <QuestionCard
        q={q}
        n={n}
        chosen={c}
        onAnswer={(o) => {
          setC(o);
          credit();
          if (o === q.answer) gain(3, "ct", 0);
        }}
      />
    </article>
  );
}

function CodeCard({ task, n }: { task: CodeTask; n: number }) {
  const engine = useEngine();
  const [src, setSrc] = useState(task.starter);
  const [stdin, setStdin] = useState(task.stdin);
  const [res, setRes] = useState<{ kind: "ok" | "bad" | "info"; out: string; html: string } | null>(null);
  const [hint, setHint] = useState(0);
  const run = async () => {
    const r = await runPython(src, stdin);
    const { outs } = buildSteps(r.ev);
    const out = outs.join("\n") + (r.err ? (outs.length ? "\n" : "") + r.err.tb : "");
    if (r.err) return setRes({ kind: "bad", out, html: `🧩 <b>${esc(r.err.type)}</b>: ${esc(r.err.msg)}` });
    const c = checkCode(task, src, outs);
    if (c.ok) {
      if (res?.kind !== "ok") {
        credit();
        gain(10, "ps", 1);
        toast("⭐ +10 XP · Practice pays");
      }
      setRes({ kind: "ok", out, html: "🎉 Correct!" });
    } else setRes({ kind: "info", out, html: c.why });
  };
  return (
    <article className="card section pcard" data-kind="code">
      <p>
        <b>{n + 1}. ✍️ </b>
        {task.task}
      </p>
      <div className="target">
        <b>Target console output</b>
        <pre>{task.expected}</pre>
      </div>
      <label className="sr-only" htmlFor={"pc" + n}>
        Code for exercise {n + 1}
      </label>
      <textarea
        id={"pc" + n}
        className="pcode"
        rows={4}
        spellCheck={false}
        autoCapitalize="off"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
      {task.stdin && (
        <>
          <label htmlFor={"pin" + n}>⌨️ Input box (one answer per line)</label>
          <textarea id={"pin" + n} rows={2} value={stdin} onChange={(e) => setStdin(e.target.value)} />
        </>
      )}
      <div className="row">
        <button className="btn primary prun" disabled={engine.phase !== "ready"} onClick={() => void run()}>
          ▶ Run & check
        </button>
        <button className="btn" onClick={() => setHint((h) => Math.min(task.hints.length, h + 1))}>
          💡 Hint
        </button>
        <button className="btn" disabled={hint < 2} onClick={() => setSrc(task.solution)}>
          🔓 Answer
        </button>
      </div>
      {hint > 0 && <p className="tip">💡 {task.hints[hint - 1]}</p>}
      {res && (
        <>
          <pre className="realout">{res.out || "(no output)"}</pre>
          <div className={"msg " + res.kind} dangerouslySetInnerHTML={{ __html: res.html }} />
        </>
      )}
    </article>
  );
}
