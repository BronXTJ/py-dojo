import { useLayoutEffect, useRef } from "react";
import { useSession } from "../../session";
import { SceneHead, useSelected } from "./Hotspot";

const MIN_PX = 12;

/** The main.py scroll. One row per code line: the font shrinks to fit (never below 12px), then wraps. */
export function Script() {
  const sel = useSelected("script");
  const { code, view, bug } = useSession();
  const box = useRef<HTMLDivElement>(null);
  const lines = code.replace(/\n$/, "").split("\n");

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "";
      let fs = parseFloat(getComputedStyle(el).fontSize);
      const rows = [...el.children] as HTMLElement[];
      const wraps = () => rows.some((r) => r.offsetHeight > fs * 1.45 * 1.5);
      while (fs > MIN_PX && wraps()) {
        fs -= 0.5;
        el.style.fontSize = fs + "px";
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [code]);

  useLayoutEffect(() => {
    const el = box.current;
    const cur = el?.querySelector<HTMLElement>(".sline.cur, .sline.err");
    if (
      el &&
      cur &&
      (cur.offsetTop < el.scrollTop || cur.offsetTop + cur.offsetHeight > el.scrollTop + el.clientHeight)
    )
      el.scrollTop = cur.offsetTop - 8;
  }, [view.line, view.errLine]);

  return (
    <div className={"sc-box sc-script" + sel} data-box="script">
      <SceneHead id="script" label="YOUR SCRIPT · main.py">
        {bug && (
          <button
            className="bug"
            id="bug"
            aria-label="Bug caught! Jump to the clue"
            onClick={() => {
              const m = document.getElementById("msg");
              m?.scrollIntoView({ block: "center" });
              m?.focus({ preventScroll: true });
            }}
          >
            🐛 Bug caught!
          </button>
        )}
      </SceneHead>
      <div className="paperbox">
        <div className="script" id="script" ref={box} aria-label="Your script as the interpreter sees it">
          {lines.map((l, i) => {
            const n = i + 1;
            const cls = "sline" + (view.errLine === n ? " err" : view.line === n ? " cur" : "");
            return (
              <span key={i} className={cls} data-l={n}>
                <span className="n">{String(n).padStart(2, " ")} </span>
                {l || " "}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
