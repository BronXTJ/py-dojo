import { useSession } from "../../session";
import type { ReactNode } from "react";
import type { Callout } from "../../types";

const NAMES: Record<Callout["id"], string> = {
  script: "your script",
  console: "the console",
  interp: "the interpreter",
  map: "the Living Lanka map",
};

/** One pulse dot per scene element, sitting right after that element's label. */
export function Hotspot({ id }: { id: Callout["id"] }) {
  const { lesson, callout, setCallout } = useSession();
  const c = lesson.callouts.find((x) => x.id === id);
  const label = "Explain " + NAMES[id];
  return (
    <button
      className="hot"
      data-c={id}
      aria-expanded={callout?.id === id}
      aria-label={label}
      title={label}
      onClick={() => c && setCallout(c)}
    />
  );
}

/** Header row for a scene element: label + its own dot, inside the element. */
export function SceneHead({
  id,
  label,
  children,
}: {
  id: Callout["id"];
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="sc-head">
      <span className="sc-lbl" id={"lbl-" + id}>
        {label}
      </span>
      <Hotspot id={id} />
      {children}
    </div>
  );
}

export function useSelected(id: Callout["id"]): string {
  const { callout } = useSession();
  return callout?.id === id ? " sel" : "";
}
