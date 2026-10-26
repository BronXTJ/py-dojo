import { useEffect, useState } from "react";
import { useSession, toast } from "../../session";
import { useLesson } from "../../lessonState";
import { checkFounder, LESSONS } from "../../content";
import { gain, getProgress, lessonProgress, newLesson, update, updateLesson, useProgress } from "../../store";
import { Runner } from "../panel/Runner";
import { StdinBox } from "./Watch";
import { href } from "../../router";

export function Reward() {
  const { lesson, bindCode, run, setMsg } = useSession();
  const lp = useLesson();
  const p = useProgress();
  const f = lesson.founder;
  const [stdin, setStdin] = useState(lp.stdin ?? "Kandy\n3");
  useEffect(() => bindCode("founder", "# Founder's Challenge: your idea, your rules\n"), [bindCode]);
  useEffect(() => {
    const cur = lessonProgress(getProgress(), lesson.id);
    if (cur.complete || ![0, 1, 2, 3, 4, 5].every((i) => cur.done.includes(i))) return;
    updateLesson(lesson.id, (l) => ({ complete: true, done: [...new Set([...l.done, 6])] }));
    gain(25, "ps", 1);
    toast(`🥋 Lesson ${lesson.n} complete · +25 XP`);
  }, [lesson.id, lesson.n]);

  const check = async () => {
    const r = await run({ stdin });
    if (!r) return;
    if (r.err) return;
    const miss = checkFounder(f, r.src, r.outs);
    if (!miss.length) {
      setMsg({
        kind: "ok",
        html: `🏆 <b>Founder approved!</b> ${r.outs.filter((l) => l.trim()).length} lines of output. There's no single right answer, so ask yourself: would a visitor understand it in 3 seconds?`,
      });
      if (!lp.founder) {
        updateLesson(lesson.id, { founder: true });
        gain(20, "cr", 3);
        toast("⭐ +20 XP · Creativity up");
      }
    } else setMsg({ kind: "info", html: "Nice start! Still needed: " + miss.join(", ") + "." });
  };
  const next = LESSONS.find((l) => l.n === lesson.n + 1);
  const redo = () => {
    if (!window.confirm("Redo this lesson from the Hook? Your XP stays.")) return;
    update((s) => ({ lessons: { ...s.lessons, [lesson.id]: { ...newLesson(), complete: true, seed: lp.seed + 1, variant: lp.variant + 1 } } }));
    location.hash = href(`lesson/${lesson.id}/0`);
  };
  return (
    <div className="stage" id="stage-reward">
      <div className="reward" id="rewardCard">
        <span className="medal" aria-hidden="true">
          🏅
        </span>
        <div>
          <b>Lesson {lesson.n} complete: {lesson.title}</b>
          <p>
            {p.xp} XP total · Quiz {Object.keys(lp.quiz).length ? "done" : "skipped"} · Founder's Challenge{" "}
            {lp.founder ? "approved 🏆" : "waiting for you"}
          </p>
        </div>
      </div>
      <div className="founder">
        <h3 style={{ margin: 0 }}>🏆 Founder's Challenge (no single answer)</h3>
        <p style={{ margin: "6px 0" }}>{f.brief}</p>
        <ul style={{ margin: "4px 0 8px" }}>
          {f.rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <Runner
          onRun={() => void check()}
          stdin={
            f.mustUse?.label === "input()" ? (
              <StdinBox
                value={stdin}
                onChange={(v) => {
                  setStdin(v);
                  updateLesson(lesson.id, { stdin: v }, { debounce: true });
                }}
              />
            ) : undefined
          }
        >
          <span className="tip" style={{ margin: 0 }}>
            Run checks your idea against the rules.
          </span>
        </Runner>
      </div>
      {lesson.depth.deeper.length > 0 && (
        <details className="deep">
          <summary>🔭 Bonus: deeper dive</summary>
          {lesson.depth.deeper.map(([t, x, c, o], i) => (
            <div key={i} className="walkrow">
              <b>{t}</b>
              <p>{x}</p>
              {c && <pre>{c + (o ? "\n# → " + o.split("\n").join("\n# → ") : "")}</pre>}
            </div>
          ))}
        </details>
      )}
      <div className="row stagenext">
        {next ? (
          <a className="btn primary" id="nextLesson" href={href(`lesson/${next.id}/0`)}>
            Next: Lesson {next.n} · {next.title} →
          </a>
        ) : (
          <a className="btn primary" id="nextLesson" href={href("")}>
            🥋 White Belt complete! Back to the dojo →
          </a>
        )}
        <button className="btn" id="redo" onClick={redo}>
          ↺ Redo lesson
        </button>
        <a className="btn" href={href("practice/" + lesson.id)}>
          🎲 Practise this
        </a>
      </div>
    </div>
  );
}
