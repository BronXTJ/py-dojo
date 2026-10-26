import type { ReactNode } from "react";
import { useSession } from "../../session";
import { Editor } from "./Editor";
import { Scrubber } from "./Scrubber";

/** Editor + Run + console + time-travel scrubber + feedback. Stages add their own buttons and checks. */
export function Runner({ onRun, children, stdin }: { onRun: () => void; children?: ReactNode; stdin?: ReactNode }) {
  const { engine, runState, view, msg } = useSession();
  return (
    <div className="runner">
      <Editor />
      {stdin}
      <div className="row" style={{ marginTop: 10 }}>
        <button className="btn primary" id="run" disabled={engine.phase !== "ready"} onClick={onRun}>
          ▶ Run
        </button>
        {children}
      </div>
      <p className="tip">Ctrl+Enter runs from anywhere · Space runs when you're not typing</p>
      <div className="console">
        <div className="ch">
          <span>CONSOLE OUTPUT</span>
          <span id="runState">{runState}</span>
        </div>
        <pre id="out" aria-live="polite">
          {view.outs.map((l, i) => (
            <span key={i} className="out-line">
              {l}
            </span>
          ))}
          {view.err && <span className="tb">{view.err.tb}</span>}
        </pre>
      </div>
      <Scrubber />
      <div
        className={"msg" + (msg ? " " + msg.kind : "")}
        id="msg"
        tabIndex={-1}
        aria-live="polite"
        dangerouslySetInnerHTML={{ __html: msg?.html ?? "" }}
      />
    </div>
  );
}

export function EngineStatusBar() {
  const { engine } = useSession();
  return (
    <div className="load" id="load" aria-live="polite">
      <div className="bar" style={{ width: 70 }}>
        <i id="loadFill" style={{ transform: `scaleX(${engine.progress})` }} />
      </div>
      <span id="loadTxt">Python engine: {engine.text}</span>
    </div>
  );
}
