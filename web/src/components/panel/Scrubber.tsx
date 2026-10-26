import { useEffect, useRef } from "react";
import { useSession } from "../../session";

/** Time travel: replay any step of the last run. Uses a native input listener so scripted input events work too. */
export function Scrubber() {
  const { steps, scrubAt, scrubTo } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => scrubTo(+el.value);
    el.addEventListener("input", on);
    return () => el.removeEventListener("input", on);
  }, [scrubTo]);
  useEffect(() => {
    if (ref.current) ref.current.value = String(scrubAt);
  }, [scrubAt, steps]);
  return (
    <div className="scrub" id="scrubWrap" hidden={!steps.length}>
      <label htmlFor="scrub">
        ⏪ Time travel: step <b id="scrubN">{scrubAt}</b> of <b id="scrubT">{steps.length}</b>. Drag to replay
        what Python did.
      </label>
      <input ref={ref} type="range" id="scrub" min={0} max={steps.length} step={1} defaultValue={scrubAt} />
    </div>
  );
}
