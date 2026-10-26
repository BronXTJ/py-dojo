import { useState } from "react";
import { BELTS, GLOSSARY } from "../content";
import { go } from "../router";
import { wordOfDay } from "./Home";

export function Glossary({ q }: { q: string }) {
  const [belt, setBelt] = useState(-1);
  const w = wordOfDay();
  const s = q.toLowerCase().trim();
  const list = GLOSSARY.filter(
    (g) =>
      (belt < 0 || g.belt === belt) &&
      (!s || g.term.toLowerCase().includes(s) || g.meaning.toLowerCase().includes(s) || g.related.toLowerCase().includes(s)),
  );
  return (
    <div className="page" id="glossary">
      <section className="card section">
        <h2>📖 Glossary</h2>
        {w && (
          <div className="wod" id="wodCard">
            <b>🌟 Word of the Day: {w.term}</b>
            {w.pron && <span className="pron"> /{w.pron}/</span>}
            <div>{w.meaning}</div>
            <div className="muted">{w.why}</div>
          </div>
        )}
        <div className="filters">
          <label htmlFor="glQ">Search</label>
          <input
            id="glQ"
            type="search"
            value={q}
            placeholder="e.g. string, loop, CRS"
            onChange={(e) => go("glossary?q=" + encodeURIComponent(e.target.value))}
          />
          <label htmlFor="glBelt">Belt</label>
          <select id="glBelt" value={belt} onChange={(e) => setBelt(+e.target.value)}>
            <option value={-1}>All belts</option>
            {BELTS.map((b, i) => (
              <option key={b.name} value={i}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <p className="tip" id="glCount" aria-live="polite">
          Showing {list.length} of {GLOSSARY.length} terms
        </p>
      </section>
      <div className="cards">
        {list.map((g) => (
          <article className="card gterm" key={g.term} id={"term-" + g.term.replace(/\W+/g, "-")}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3>
                {g.term}
                {g.pron && <span className="pron"> /{g.pron}/</span>}
              </h3>
              <span className="tag">{BELTS[g.belt]?.name ?? ""} Belt</span>
            </div>
            <p>{g.meaning}</p>
            {g.why && <p className="muted">💡 {g.why}</p>}
            {g.code && <pre>{g.code + (g.out ? "\n# → " + g.out.split("\n").join("\n# → ") : "")}</pre>}
            {g.gis && <p className="muted">🌍 {g.gis}</p>}
            {g.related && (
              <p className="related">
                Related:{" "}
                {g.related.split(/,\s*/).map((r) => (
                  <button key={r} className="linkbtn" onClick={() => go("glossary?q=" + encodeURIComponent(r))}>
                    {r}
                  </button>
                ))}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
