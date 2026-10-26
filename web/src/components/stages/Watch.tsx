import { useEffect, useState } from "react";
import { useSession } from "../../session";
import { completeStage, useLesson } from "../../lessonState";
import { scorePrediction } from "../../checker";
import { Predict } from "../panel/Predict";
import { Runner } from "../panel/Runner";
import { StageNext } from "./Hook";

export function Watch() {
  const { lesson, bindCode, run, setMsg, setCode } = useSession();
  const lp = useLesson();
  const [stdin, setStdin] = useState(lesson.watchStdin);
  useEffect(() => bindCode("watch", lesson.watchCode), [bindCode, lesson.watchCode]);
  const go = async () => {
    const r = await run({ stdin });
    if (!r || r.err) return;
    const pred = scorePrediction(lp.pred ?? "", r.outs);
    const pm = pred
      ? ` 🔮 Your prediction got <b>${pred.ok}/${pred.total}</b> lines right${pred.ok === pred.total ? ". Sharp thinking!" : ", and now you know why."}`
      : " Next time, type a prediction first: guessing before you look is how experts learn.";
    setMsg({ kind: "ok", html: "▶ Watched! Drag the time-travel slider to replay each step." + pm });
    completeStage(lesson.id, 2, pred ? 10 : 5, "ct", pred ? 2 : 1, "You watched Python think");
  };
  return (
    <div className="stage" id="stage-watch">
      <p>
        Watch the interpreter read this example line by line. <b>Predict first</b>, then press Run and follow the
        highlight on the scroll.
      </p>
      <Predict />
      <Runner
        onRun={() => void go()}
        stdin={
          lesson.watchStdin ? (
            <StdinBox value={stdin} onChange={setStdin} />
          ) : undefined
        }
      >
        <button className="btn" id="reset" aria-label="Reset code" onClick={() => setCode(lesson.watchCode, { reset: true })}>
          ↺ Reset
        </button>
      </Runner>
      <StageNext stage={2} onNext={() => undefined} disabled={!lp.done.includes(2)} label="Your turn: try it" />
    </div>
  );
}

export function StdinBox({ value, onChange, id = "stdin" }: { value: string; onChange: (v: string) => void; id?: string }) {
  return (
    <div className="stdin">
      <label htmlFor={id}>⌨️ Input box: what the user types, one answer per line</label>
      <textarea id={id} rows={2} spellCheck={false} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
