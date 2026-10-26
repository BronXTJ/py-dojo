import { useRef, useState } from "react";
import { BELTS, GLOSSARY, LESSONS, STAGES } from "../content";
import { dueItems, exportProgress, importProgress, lessonProgress, useProgress } from "../store";
import { href } from "../router";
import { lessonUnlocked } from "./LessonScreen";
import { toast } from "../session";

export const wordOfDay = (d = new Date()) =>
  GLOSSARY[Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5) % GLOSSARY.length] ?? GLOSSARY[0];

export function Home() {
  const p = useProgress();
  const file = useRef<HTMLInputElement>(null);
  const [imp, setImp] = useState("");
  const next = LESSONS.find((l) => !lessonProgress(p, l.id).complete);
  const cur = (p.last && LESSONS.find((l) => l.id === p.last && !lessonProgress(p, l.id).complete)) || next;
  const lp = cur ? lessonProgress(p, cur.id) : null;
  const due = dueItems(p).length;
  const w = wordOfDay();
  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([exportProgress()], { type: "application/json" }));
    a.download = `py-dojo-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("💾 Progress exported");
  };
  const load = async (f: File | undefined) => {
    if (!f) return;
    const ok = importProgress(await f.text());
    setImp(ok ? "✅ Progress imported." : "⚠️ That file isn't a Py Dojo progress file. Nothing changed.");
  };
  return (
    <div className="page home" id="home">
      <section className="card section here">
        <h2>📍 Where you are</h2>
        {cur && lp ? (
          <>
            <p id="hereTxt">
              <b>
                Lesson {cur.n} of {LESSONS.length}: {cur.title}
              </b>{" "}
              · stage {lp.stage + 1} of 7 ({STAGES[lp.stage]}).{" "}
              {STAGES[lp.stage + 1] ? <>Next step: <b>{STAGES[lp.stage + 1]}</b>.</> : null}
            </p>
            <a className="btn primary" id="continue" href={href(`lesson/${cur.id}`)}>
              {lp.done.length ? "Continue" : "Start"} lesson {cur.n} →
            </a>
          </>
        ) : (
          <p id="hereTxt">🥋 White Belt complete! Yellow Belt is coming soon. Keep your skills sharp in Review and Practice.</p>
        )}
        <div className="homegrid">
          <a className="mini card2" href={href("review")} id="homeReview">
            <b>🔁 Review</b>
            <span>{due ? `${due} card${due > 1 ? "s" : ""} due today` : "Nothing due: you're on top of it"}</span>
          </a>
          <a className="mini card2" href={href("glossary?q=" + encodeURIComponent(w?.term ?? ""))} id="wod">
            <b>📖 Word of the Day: {w?.term}</b>
            <span>{w?.meaning}</span>
          </a>
        </div>
      </section>

      <section className="card section" aria-labelledby="mapH">
        <h2 id="mapH">🗺️ The dojo path: White to Master</h2>
        <ol className="beltmap">
          {BELTS.map((b, bi) => (
            <li key={b.name} className={"belt" + (bi === 0 ? " open" : " locked")} data-belt={b.name}>
              <div className="belthead">
                <span
                  className={"swatch" + (b.name === "Black" ? " black" : "") + (b.name === "Master" ? " master" : "")}
                  style={{ background: b.color }}
                  aria-hidden="true"
                />
                <div>
                  <h3>
                    {b.name} Belt <small>· {b.theme}</small>
                  </h3>
                  <p className="gis">🌍 {b.gis}</p>
                </div>
                {bi > 0 && <span className="soon">🔒 Coming soon</span>}
              </div>
              {bi === 0 ? (
                <div className="lessongrid" id="whiteLessons">
                  {LESSONS.map((l) => {
                    const lpp = lessonProgress(p, l.id);
                    const open = lessonUnlocked(p, l.n);
                    return (
                      <a
                        key={l.id}
                        className={"lnode" + (lpp.complete ? " done" : "") + (open ? "" : " lockedl") + (cur?.id === l.id ? " cur" : "")}
                        href={open ? href(`lesson/${l.id}`) : undefined}
                        aria-disabled={!open || undefined}
                        role="link"
                        tabIndex={open ? 0 : -1}
                        data-lesson={l.id}
                        onClick={open ? undefined : () => toast(`🔒 Finish lesson ${l.n - 1} first. One step at a time!`)}
                      >
                        <span className="lic" aria-hidden="true">
                          {l.icon}
                        </span>
                        <span>
                          <b>
                            {l.n}. {l.title}
                          </b>
                          <small>
                            {lpp.complete ? "✅ Done" : open ? (lpp.done.length ? `Stage ${lpp.stage + 1}/7` : "Ready") : "🔒 Locked"}
                          </small>
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <details className="topics">
                  <summary>{b.topics.length} topics · {b.boss}</summary>
                  <ul>
                    {b.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </details>
              )}
              {bi === 0 && <p className="boss">👊 {b.boss}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className="card section" aria-labelledby="saveH">
        <h2 id="saveH">💾 Your progress</h2>
        <p>Progress saves automatically in this browser. Export it to move to another device or keep a backup.</p>
        <div className="row">
          <button className="btn" id="export" onClick={download}>
            ⬇️ Export progress
          </button>
          <button className="btn" id="importBtn" onClick={() => file.current?.click()}>
            ⬆️ Import progress
          </button>
          <input
            ref={file}
            id="importFile"
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => void load(e.target.files?.[0])}
          />
        </div>
        <p className="msgline" id="importMsg" aria-live="polite">
          {imp}
        </p>
      </section>
    </div>
  );
}
