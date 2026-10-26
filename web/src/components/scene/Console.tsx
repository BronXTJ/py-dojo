import { useLayoutEffect, useRef } from "react";
import { useSession } from "../../session";
import { SceneHead, useSelected } from "./Hotspot";

export function Console() {
  const sel = useSelected("console");
  const { view } = useSession();
  const box = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [view.outs]);
  return (
    <div className={"sc-box sc-console" + sel} data-box="console">
      <SceneHead id="console" label="CONSOLE SCREEN"></SceneHead>
      <div className="scr" id="scr" ref={box} aria-label="Console screen output">
        {view.outs.map((l, i) => (
          <span key={i} className="ol pop">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
