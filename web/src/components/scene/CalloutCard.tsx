import { useSession } from "../../session";

export function CalloutCard() {
  const { callout } = useSession();
  return (
    <div className="callout" id="callout" aria-live="polite">
      <span aria-hidden="true" style={{ fontSize: 22 }}>
        {callout ? "💡" : "👆"}
      </span>
      <div className={callout ? "pop" : undefined} key={callout?.id ?? "none"}>
        <b>{callout ? callout.title : "Tap a glowing dot to explore"}</b>
        <span>
          {callout ? callout.body : "Each part of the scene is a real part of how Python runs your code."}
        </span>
      </div>
    </div>
  );
}
