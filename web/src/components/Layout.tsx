import { useEffect, type ReactNode } from "react";
import { dueItems, update, useProgress, lessonProgress } from "../store";
import { useToast } from "../session";
import { LESSONS } from "../content";
import { href, type Route } from "../router";

function Meter({ id, label, v }: { id: string; label: string; v: number }) {
  return (
    <>
      <span>{label}</span>
      <div className="bar" title={v + "/10"}>
        <i id={id} style={{ transform: `scaleX(${Math.min(v, 10) / 10})` }} />
      </div>
    </>
  );
}

export function Layout({ route, children }: { route: Route; children: ReactNode }) {
  const p = useProgress();
  const toast = useToast();
  const total = LESSONS.length;
  const done = LESSONS.filter((l) => lessonProgress(p, l.id).complete).length;
  const due = dueItems(p).length;
  const cont = p.last ?? LESSONS.find((l) => !lessonProgress(p, l.id).complete)?.id ?? "white-1";

  useEffect(() => {
    document.documentElement.dataset.theme = p.theme;
  }, [p.theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const run = document.getElementById("run") as HTMLButtonElement | null;
      if (!run || run.disabled) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        run.click();
      } else if (e.key === " " && document.activeElement === document.body) {
        e.preventDefault();
        run.click();
      }
    };
    const onVis = () => document.documentElement.classList.toggle("paused", document.hidden);
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const dark = p.theme === "dark";
  const nav: { id: Route["name"]; label: string; to: string; badge?: number }[] = [
    { id: "home", label: "🥋 Dojo", to: "" },
    { id: "lesson", label: "📍 Lesson", to: "lesson/" + cont },
    { id: "review", label: "🔁 Review", to: "review", badge: due },
    { id: "practice", label: "🎲 Practice", to: "practice" },
    { id: "errors", label: "🐛 Errors", to: "errors" },
    { id: "glossary", label: "📖 Glossary", to: "glossary" },
  ];
  return (
    <div className="wrap">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header>
        <a className="logo" href={href("")} aria-label="Py Dojo home">
          <div className="mark" aria-hidden="true">
            🥋
          </div>
          <div>
            <h1>PY DOJO</h1>
            <p>READ · RUN · UNDERSTAND</p>
          </div>
        </a>
        <nav className="topnav" aria-label="Main">
          {nav.map((n) => (
            <a
              key={n.id}
              className="navbtn"
              id={"nav-" + n.id}
              href={href(n.to)}
              aria-current={route.name === n.id ? "page" : undefined}
            >
              {n.label}
              {n.badge ? (
                <span className="nbadge" aria-label={n.badge + " due"}>
                  {n.badge}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="pill" title="White Belt progress">
          <span className="beltdot" style={{ background: "#ffffff" }} aria-hidden="true" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>WHITE BELT</div>
            <div className="row" style={{ gap: 8 }}>
              <div
                className="bar"
                role="progressbar"
                aria-label="White Belt progress"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={done}
                id="beltBar"
              >
                <i id="beltFill" style={{ transform: `scaleX(${done / total})` }} />
              </div>
              <span style={{ fontSize: 13 }} id="beltTxt">
                {done}/{total}
              </span>
            </div>
          </div>
        </div>
        <div className="pill">
          <span aria-hidden="true">⭐</span>
          <b id="xp">{p.xp} XP</b>
        </div>
        <div className="pill" aria-label="Thinking skills">
          <div className="meter">
            <Meter id="mPS" label="Problem solving" v={p.ps} />
            <Meter id="mCT" label="Critical thinking" v={p.ct} />
            <Meter id="mCR" label="Creativity" v={p.cr} />
          </div>
        </div>
        <button
          className="iconbtn"
          id="theme"
          aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
          onClick={() => update({ theme: dark ? "light" : "dark" })}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </header>
      <div id="content">{children}</div>
      <div className={"toast" + (toast ? " show" : "")} id="toast" role="status">
        {toast}
      </div>
    </div>
  );
}
