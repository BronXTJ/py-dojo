import { useEffect, useState } from "react";
import { useSession } from "../../session";
import { completeStage, useLesson } from "../../lessonState";
import { bugFixed, esc } from "../../content";
import { Runner } from "../panel/Runner";
import { StageNext } from "./Hook";
import { href } from "../../router";

export function Fix() {
  const { lesson, bindCode, run, setMsg, setCode } = useSession();
  const lp = useLesson();
  const b = lesson.bugTask;
  const [tries, setTries] = useState(0);
  const fixed = lp.done.includes(4);
  useEffect(() => bindCode("fix", b.error.code + "\n"), [bindCode, b.error.code]);
  const go = async () => {
    const r = await run();
    if (!r) return;
    setTries((t) => t + 1);
    if (r.err) {
      setMsg({
        kind: "bad",
        html: `<b>🐛 ${esc(r.err.type)}${r.err.line ? " on line " + r.err.line : ""}</b>: ${esc(r.err.msg)}<br><b>Why:</b> ${esc(b.error.why)}<br>Read the clue, change the code, and run again.`,
      });
      return;
    }
    if (bugFixed(lesson, r.src, false)) {
      setMsg({ kind: "ok", html: `🎉 <b>Bug squashed!</b> ${esc(b.error.fix)}` });
      completeStage(lesson.id, 4, 15, "ct", 2, "Bug squashed");
    } else setMsg({ kind: "info", html: "That's the original code. Change something to fix it." });
  };
  return (
    <div className="stage" id="stage-fix">
      <div className={"bugcard" + (fixed ? " squashed" : "")}>
        <span className="creature" aria-hidden="true">
          {fixed ? "✨" : "🐛"}
        </span>
        <div>
          <b>{fixed ? "Bug squashed!" : `A ${b.error.error} bug is hiding in this code`}</b>
          <p id="bugTask">{b.task}</p>
        </div>
      </div>
      <Runner onRun={() => void go()}>
        <button
          className="btn"
          id="answer"
          disabled={tries < 1}
          title={tries < 1 ? "Run it once first" : undefined}
          onClick={() => {
            setCode(b.fixed + "\n", { reset: true });
            setMsg({ kind: "info", html: "🔓 Here's one fix. Compare it with the broken line, then press Run." });
          }}
        >
          🔓 Show a fix
        </button>
        <button className="btn" id="reset" aria-label="Reset code" onClick={() => setCode(b.error.code + "\n", { reset: true })}>
          ↺
        </button>
      </Runner>
      <p className="tip">
        This bug is in the <a href={href("errors?q=" + encodeURIComponent(b.error.error))}>Error Encyclopedia</a>{" "}
        with its friends.
      </p>
      <StageNext stage={4} onNext={() => undefined} disabled={!fixed} label="Next: quick quiz" />
    </div>
  );
}
