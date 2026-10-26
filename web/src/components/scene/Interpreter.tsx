import { useSession } from "../../session";
import { SceneHead, useSelected } from "./Hotspot";

export function Interpreter() {
  const sel = useSelected("interp");
  const { view } = useSession();
  return (
    <div className={"sc-box sc-interp" + sel} data-box="interp">
      <SceneHead id="interp" label="INTERPRETER"></SceneHead>
      <div className="snake" aria-hidden="true">
        🐍
      </div>
      <p className="say" aria-live="polite">
        <span>{view.say[0]}</span> {!view.err && <span>{view.say[1]}</span>}
      </p>
      {view.err && (
        <p className="errbadge" id="errBadge">
          <span>{view.err.type + (view.err.line ? " · line " + view.err.line : "")}</span>
        </p>
      )}
    </div>
  );
}
