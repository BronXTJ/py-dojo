import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { useSession } from "../../session";

const LINE = 22;

/** Wrapping code editor: a hidden mirror measures each logical line so numbers and the run highlight stay aligned. */
export function Editor() {
  const { code, setCode, view } = useSession();
  const ta = useRef<HTMLTextAreaElement>(null);
  const mirror = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<{ top: number; h: number }[]>([]);
  const [scroll, setScroll] = useState(0);
  const lines = code.split("\n");

  useLayoutEffect(() => {
    const measure = () => {
      if (!mirror.current || !ta.current) return;
      mirror.current.style.width = ta.current.clientWidth + "px";
      setRows(
        [...mirror.current.children].map((c) => ({
          top: (c as HTMLElement).offsetTop,
          h: (c as HTMLElement).offsetHeight,
        })),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ta.current) ro.observe(ta.current);
    return () => ro.disconnect();
  }, [code]);

  const active = view.errLine ?? view.line;
  const row = active ? rows[active - 1] : undefined;
  useLayoutEffect(() => {
    const t = ta.current;
    if (t && row && (row.top < t.scrollTop || row.top + row.h > t.scrollTop + t.clientHeight))
      t.scrollTop = Math.max(0, row.top - 40);
  }, [row]);

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const t = e.currentTarget;
      t.setRangeText("    ", t.selectionStart, t.selectionEnd, "end");
      setCode(t.value);
    }
  };

  return (
    <div className="editor">
      <div className="gut" id="gut" aria-hidden="true">
        <div style={{ transform: `translateY(${-scroll}px)` }}>
          {lines.map((_, i) => (
            <div key={i} style={{ height: rows[i]?.h ?? LINE }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="edbox">
        <div className="mirror" id="mirror" ref={mirror} aria-hidden="true">
          {lines.map((l, i) => (
            <div key={i}>{l || " "}</div>
          ))}
        </div>
        <div
          className={"hl" + (view.errLine ? " err" : "")}
          id="hl"
          style={
            row
              ? { opacity: 1, transform: `translateY(${row.top - scroll}px) scaleY(${row.h / LINE})` }
              : { opacity: 0 }
          }
        />
        <textarea
          ref={ta}
          className="code"
          id="code"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Python code editor. Press Control Enter to run."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
          onKeyDown={onKey}
        />
      </div>
    </div>
  );
}
