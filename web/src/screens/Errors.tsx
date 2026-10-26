import { useMemo, useState } from "react";
import { ERRORS, ERR_HIER, ERR_PY, esc, BELT_ERR } from "../content";
import { runPython, useEngine } from "../py/engine";
import { go } from "../router";

export function Errors({ q }: { q: string }) {
  const [type, setType] = useState("All");
  const types = useMemo(() => ["All", ...new Set(ERRORS.map((e) => e.error))], []);
  const s = q.toLowerCase();
  const list = ERRORS.filter(
    (e) =>
      (type === "All" || e.error === type) &&
      (!s || [e.error, e.topic, e.code, e.why, e.fix, e.message].join(" ").toLowerCase().includes(s)),
  );
  return (
    <div className="page" id="errors">
      <section className="card section">
        <h2>🐛 Error Encyclopedia</h2>
        <p>
          {ERRORS.length} errors you will meet, each with real Python {ERR_PY} messages, why it happens and how to fix it.
          Errors are clues, not failures.
        </p>
        <div className="filters">
          <label htmlFor="errQ">Search</label>
          <input
            id="errQ"
            type="search"
            value={q}
            placeholder="e.g. NameError, quotes, int"
            onChange={(e) => go("errors?q=" + encodeURIComponent(e.target.value))}
          />
          <label htmlFor="errType">Type</label>
          <select id="errType" value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <p className="tip" id="errCount" aria-live="polite">
          Showing {list.length} of {ERRORS.length}
        </p>
      </section>
      <div className="cards">
        {list.map((e) => (
          <ErrCard key={e.topic + e.code} e={e} />
        ))}
      </div>
      <section className="card section">
        <h3>Which errors belong to which belt?</h3>
        <dl className="minigloss">
          {Object.entries(BELT_ERR).flatMap(([b, t]) => [<dt key={b}>{b}</dt>, <dd key={b + "d"}>{t}</dd>])}
        </dl>
      </section>
    </div>
  );
}

function ErrCard({ e }: { e: (typeof ERRORS)[number] }) {
  const engine = useEngine();
  const [out, setOut] = useState<string | null>(null);
  const hier = ERR_HIER.find((h) => h[h.length - 1] === e.error);
  const tryIt = async () => {
    const r = await runPython(e.code);
    const printed = r.ev.filter((x) => x[0] === "out").map((x) => x[1]).join("");
    setOut((printed ? printed : "") + (r.err ? r.err.tb : printed ? "" : "(ran with no output)"));
  };
  return (
    <article className="card errcard" data-err={e.error}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3>{e.error}</h3>
        <span className="tag">
          {e.belt} · {e.topic}
        </span>
      </div>
      <pre>{e.code || "(press Ctrl+C while a program runs)"}</pre>
      <pre className="errmsg">→ {e.message}</pre>
      <p>
        <b>Why:</b> {e.why}
      </p>
      <p>
        <b>Fix:</b> {e.fix}
      </p>
      {hier && <p className="hier">Family: {hier.join(" › ")}</p>}
      {e.code && (
        <button className="btn tryerr" disabled={engine.phase !== "ready"} onClick={() => void tryIt()}>
          🧪 Run it for real
        </button>
      )}
      {out !== null && <pre className="realout" dangerouslySetInnerHTML={{ __html: esc(out) }} />}
    </article>
  );
}
