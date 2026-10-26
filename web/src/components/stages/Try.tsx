import { useEffect, useMemo, useState } from "react";
import { useSession } from "../../session";
import { completeStage, useLesson } from "../../lessonState";
import { updateLesson, gain } from "../../store";
import { checkCode, esc, tryTaskFor } from "../../content";
import { Runner } from "../panel/Runner";
import { StageNext } from "./Hook";
import { StdinBox } from "./Watch";
import { toast } from "../../session";

const THINK = [
  { label: "Understand", text: "What must the console show when you're done? Read the target output, line by line." },
  { label: "Plan", text: "Plan in plain words, one line per step:" },
  { label: "Build", text: "Turn each plan line into one line of code, then press Run." },
  { label: "Reflect", text: "Is there another way? What could break: a missing quote, a bracket, a typo?" },
];

export function Try() {
  const { lesson, bindCode, run, setMsg, setCode, code } = useSession();
  const lp = useLesson();
  const task = useMemo(() => tryTaskFor(lesson, lp.variant), [lesson, lp.variant]);
  const [stdin, setStdin] = useState(task.stdin);
  const [open, setOpen] = useState<number | null>(null);
  const [res, setRes] = useState<{ ok: boolean } | null>(null);
  const key = "try" + lp.variant;
  useEffect(() => bindCode(key, task.starter), [bindCode, key, task.starter]);
  useEffect(() => setStdin(task.stdin), [task.stdin]);

  const go = async () => {
    const r = await run({ stdin });
    if (!r) return;
    if (r.err) return setRes({ ok: false });
    const c = checkCode(task, r.src, r.outs);
    setRes({ ok: c.ok });
    if (c.ok) {
      setMsg({ kind: "ok", html: "🎉 <b>Task complete!</b> Your output matches. Ready to squash a bug?" });
      completeStage(lesson.id, 3, 20, "ps", 3, "Task complete");
    } else setMsg({ kind: "info", html: "👍 It ran! " + c.why + " You've got this." });
  };
  const hint = () => {
    const i = Math.min(lp.hints, task.hints.length - 1);
    setMsg({ kind: "info", html: "💡 " + esc(task.hints[i] ?? "") });
    updateLesson(lesson.id, { hints: Math.min(task.hints.length, lp.hints + 1) });
  };
  const pick = (i: number) => {
    setOpen(i);
    if (!lp.think.includes(i)) {
      updateLesson(lesson.id, (l) => ({ think: [...l.think, i] }));
      gain(3, i === 3 ? "ct" : "ps", 1);
      toast("⭐ +3 XP · Thinking first");
    }
  };
  const step = open === null ? null : THINK[open];
  const n = task.hints.length;
  return (
    <div className="stage" id="stage-try">
      <div className="mission">
        <p>
          <b>🎯 Living Lanka task:</b> <span id="taskTxt">{task.task}</span>
        </p>
        <div className="target">
          <b>Target console output</b>
          <pre id="target">{task.expected}</pre>
        </div>
        <b style={{ fontSize: 14 }}>🧠 Think first</b>
        <div className="think" role="group" aria-label="Thinking steps">
          {THINK.map((t, i) => (
            <button key={t.label} aria-pressed={open === i} data-t={i} onClick={() => pick(i)}>
              {i + 1} {t.label}
            </button>
          ))}
        </div>
        <div className="think-body" id="thinkBody" aria-live="polite">
          {step ? (
            <>
              <span>{step.text}</span>
              {open === 1 && (
                <textarea
                  id="plan"
                  aria-label="Your plan"
                  rows={3}
                  value={lp.plan ?? ""}
                  placeholder={"1. ...\n2. ..."}
                  onChange={(e) => updateLesson(lesson.id, { plan: e.target.value }, { debounce: true })}
                />
              )}
            </>
          ) : (
            "Tap step 1. Good coders think before they type."
          )}
        </div>
        <ul className="checks" aria-label="Task checklist">
          <li id="c-out" className={res?.ok || lp.done.includes(3) ? "ok" : undefined}>
            Output matches the target
          </li>
          {task.mustContain && (
            <li id="c-use" className={code.includes(task.mustContain) ? "ok" : undefined}>
              Code uses <code>{task.mustContain}</code>
            </li>
          )}
        </ul>
      </div>
      <Runner onRun={() => void go()} stdin={task.stdin ? <StdinBox value={stdin} onChange={setStdin} /> : undefined}>
        <button className="btn" id="hint" onClick={hint}>
          💡 {lp.hints >= n ? `Hints ${n}/${n}` : `Hint ${lp.hints + 1}/${n}`}
        </button>
        <button
          className="btn"
          id="answer"
          disabled={lp.hints < 2}
          title={lp.hints < 2 ? "Use 2 hints first" : undefined}
          onClick={() => {
            setCode(task.solution, { reset: true });
            setMsg({ kind: "info", html: "🔓 Here's one answer. Read it line by line, then press Run to see why it works." });
          }}
        >
          🔓 Show answer
        </button>
        <button className="btn" id="reset" aria-label="Reset code" onClick={() => setCode(task.starter, { reset: true })}>
          ↺
        </button>
        {lesson.tryTpl && (
          <button
            className="btn"
            id="fresh"
            onClick={() => {
              updateLesson(lesson.id, (l) => ({ variant: l.variant + 1, hints: 0 }));
              setRes(null);
              toast("🎲 Fresh version: new cities, new numbers");
            }}
          >
            🎲 New version
          </button>
        )}
      </Runner>
      <StageNext stage={3} onNext={() => undefined} disabled={!lp.done.includes(3)} label="Next: fix the bug" />
    </div>
  );
}
