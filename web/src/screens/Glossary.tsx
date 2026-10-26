import { useEffect, useMemo, useRef, useState } from "react";
import { BELTS, GLOSSARY } from "../content";
import { href, go } from "../router";
import { wordOfDay } from "./Home";

const EST = 240;
const letters = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

function initial(term: string): string {
  const c = term[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(c) ? c : "#";
}

export function Glossary({ q }: { q: string }) {
  const [belt, setBelt] = useState(-1);
  const [cat, setCat] = useState("all");
  const [letter, setLetter] = useState("");
  const w = wordOfDay();
  const s = q.toLowerCase().trim();
  const cats = useMemo(() => [...new Set(GLOSSARY.map((g) => g.category))].sort((a, b) => a.localeCompare(b)), []);
  const list = useMemo(
    () =>
      GLOSSARY.filter((g) => {
        if (belt >= 0 && g.belt !== belt) return false;
        if (cat !== "all" && g.category !== cat) return false;
        if (letter && initial(g.term) !== letter) return false;
        if (!s) return true;
        const blob = (g.term + " " + g.meaning + " " + g.related + " " + g.category).toLowerCase();
        return blob.includes(s);
      }),
    [belt, cat, letter, s],
  );

  const scroller = useRef<HTMLDivElement>(null);
  const heights = useRef(new Map<string, number>());
  const [scrollTop, setScrollTop] = useState(0);
  const [viewH, setViewH] = useState(640);
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => setViewH(el.clientHeight || 640));
    ro.observe(el);
    setViewH(el.clientHeight || 640);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
    setScrollTop(0);
  }, [belt, cat, letter, s]);

  const windowed = list.length > 40;
  let start = 0;
  let end = list.length;
  let padTop = 0;
  let padBot = 0;
  if (windowed) {
    const hOf = (i: number) => {
      const term = list[i]?.term;
      return term ? (heights.current.get(term) ?? EST) : EST;
    };
    let y = 0;
    while (start < list.length && y + hOf(start) < scrollTop) {
      y += hOf(start);
      start += 1;
    }
    start = Math.max(0, start - 2);
    padTop = 0;
    for (let i = 0; i < start; i++) padTop += hOf(i);
    end = start;
    let y2 = padTop;
    const limit = scrollTop + viewH + EST * 2;
    while (end < list.length && y2 < limit) {
      y2 += hOf(end);
      end += 1;
    }
    end = Math.min(list.length, end + 2);
    padBot = 0;
    for (let i = end; i < list.length; i++) padBot += hOf(i);
  }
  const slice = list.slice(start, end);

  const measure = (term: string) => (el: HTMLElement | null) => {
    if (!el) return;
    const h = el.offsetHeight;
    const prev = heights.current.get(term);
    if (prev === undefined || Math.abs(prev - h) > 1) {
      heights.current.set(term, h);
      setMeasured((n) => n + 1);
    }
  };

  return (
    <div className="page" id="glossary">
      <section className="card section">
        <h2>📖 Glossary</h2>
        {w && (
          <div className="wod" id="wodCard">
            <b>🌟 Word of the Day: {w.term}</b>
            {w.pron && <span className="pron"> /{w.pron}/</span>}
            <div>{w.meaning}</div>
            {w.why && <div className="muted">{w.why}</div>}
          </div>
        )}
        <div className="gl-filters">
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
          <label htmlFor="glCat">Category</label>
          <select id="glCat" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">All categories</option>
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="gl-alpha" role="navigation" aria-label="Jump to a letter">
          <button type="button" data-letter="" aria-pressed={letter === ""} onClick={() => setLetter("")}>
            All
          </button>
          {letters.map((ch) => (
            <button key={ch} type="button" data-letter={ch} aria-pressed={letter === ch} onClick={() => setLetter(letter === ch ? "" : ch)}>
              {ch}
            </button>
          ))}
        </div>
        <p className="tip" id="glCount" aria-live="polite">
          Showing {list.length} of {GLOSSARY.length} terms
        </p>
      </section>
      <div className="gl-list" ref={scroller} data-measured={measured}>
        {windowed && padTop > 0 && <div style={{ height: padTop }} aria-hidden="true" />}
        <div className="cards">
          {slice.map((g) => (
            <article
              className="card gterm"
              key={g.term}
              id={"term-" + g.term.replace(/\W+/g, "-")}
              ref={windowed ? measure(g.term) : undefined}
            >
              <div className="row" style={{ justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                <h3>
                  {g.term}
                  {g.pron && <span className="pron"> /{g.pron}/</span>}
                </h3>
                <span className="tag">
                  {BELTS[g.belt]?.name ?? ""} Belt · {g.category}
                </span>
              </div>
              <p>{g.meaning}</p>
              {g.why && <p className="muted">💡 {g.why}</p>}
              {g.code && (
                <pre>
                  {g.code}
                  {g.out ? "\n# → " + g.out.split("\n").join("\n# → ") : ""}
                </pre>
              )}
              {g.code && !g.run && <p className="muted">Display only. This snippet is not run in the browser.</p>}
              {g.gis && <p className="muted">🌍 {g.gis}</p>}
              {g.lesson && (
                <p>
                  <a className="linkbtn" href={href("lesson/" + g.lesson + "/0")}>
                    Look back
                  </a>
                </p>
              )}
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
        {windowed && padBot > 0 && <div style={{ height: padBot }} aria-hidden="true" />}
        {list.length === 0 && <p className="tip">No terms match.</p>}
      </div>
    </div>
  );
}
