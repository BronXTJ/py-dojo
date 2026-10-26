import { useEffect, useRef } from "react";
import { SessionProvider, useSession } from "../session";
import { lessonById, LESSONS, STAGES } from "../content";
import { lessonProgress, update, updateLesson, useProgress } from "../store";
import { stageOpen } from "../lessonState";
import { href } from "../router";
import { Scene } from "../components/scene/Scene";
import { EngineStatusBar } from "../components/panel/Runner";
import { Hook } from "../components/stages/Hook";
import { Learn } from "../components/stages/Learn";
import { Watch } from "../components/stages/Watch";
import { Try } from "../components/stages/Try";
import { Fix } from "../components/stages/Fix";
import { Quiz } from "../components/stages/Quiz";
import { Reward } from "../components/stages/Reward";

const ICONS = ["🪝", "📖", "👀", "✍️", "🐛", "❓", "🏅"];
const BODY = [Hook, Learn, Watch, Try, Fix, Quiz, Reward];

export const lessonUnlocked = (p: ReturnType<typeof useProgress>, n: number) =>
  n === 1 || LESSONS.some((l) => l.n === n - 1 && lessonProgress(p, l.id).complete);

export function LessonScreen({ id, stage }: { id: string; stage: number | null }) {
  const lesson = lessonById(id);
  const p = useProgress();
  if (!lesson)
    return (
      <div className="page card section">
        <h2>Lesson not found</h2>
        <a href={href("")}>Back to the dojo</a>
      </div>
    );
  if (!lessonUnlocked(p, lesson.n))
    return (
      <div className="page card section" id="locked">
        <h2>🔒 Lesson {lesson.n} is locked</h2>
        <p>Finish lesson {lesson.n - 1} first. One step at a time builds a black belt.</p>
        <a className="btn primary" href={href("")}>
          Back to the dojo
        </a>
      </div>
    );
  return (
    <SessionProvider lesson={lesson} key={lesson.id}>
      <LessonBody stage={stage} />
    </SessionProvider>
  );
}

function LessonBody({ stage }: { stage: number | null }) {
  const { lesson, setCallout } = useSession();
  const p = useProgress();
  const lp = lessonProgress(p, lesson.id);
  const want = stage ?? lp.stage;
  const cur = stageOpen(lp, want) ? want : Math.max(0, ...lp.done.map((d) => Math.min(6, d + 1)), 0);
  const head = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (lp.stage !== cur) updateLesson(lesson.id, { stage: cur });
    if (p.last !== lesson.id) update({ last: lesson.id });
  }, [cur, lesson.id, lp.stage, p.last]);
  useEffect(() => {
    if (stage !== null) head.current?.focus({ preventScroll: true });
    setCallout(lesson.callouts[0] ?? { id: "script", title: "", body: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);
  const Body = BODY[cur] ?? Hook;
  const nextName = STAGES[cur + 1];
  return (
    <main>
      <Scene />
      <div className="side">
        <section className="card section" aria-labelledby="stageH">
          <div className="crumbs">
            <a href={href("")}>🥋 Dojo</a>
            <span aria-hidden="true">›</span>
            <span>White Belt</span>
            <span aria-hidden="true">›</span>
            <span id="lessonNo">
              Lesson {lesson.n} of {LESSONS.length}
            </span>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h2 id="stageH" ref={head} tabIndex={-1}>
              {lesson.icon} {lesson.title}
            </h2>
            <EngineStatusBar />
          </div>
          <nav className="stepper" aria-label="Lesson stages">
            {STAGES.map((s, i) => {
              const open = stageOpen(lp, i);
              const done = lp.done.includes(i);
              return (
                <a
                  key={s}
                  className={"step" + (i === cur ? " cur" : "") + (done ? " done" : "")}
                  data-stage={i}
                  href={open ? href(`lesson/${lesson.id}/${i}`) : undefined}
                  aria-current={i === cur ? "step" : undefined}
                  aria-disabled={!open || undefined}
                  role="link"
                  tabIndex={open ? 0 : -1}
                  title={open ? s : "Finish the previous stage first"}
                >
                  <span aria-hidden="true">{done ? "✅" : open ? ICONS[i] : "🔒"}</span>
                  <span className="stepname">
                    {i + 1}. {s}
                  </span>
                </a>
              );
            })}
          </nav>
          <p className="where" id="where">
            📍 You are on <b>stage {cur + 1} of 7: {STAGES[cur]}</b>
            {nextName ? (
              <>
                {" "}
                · Next: <b>{nextName}</b>
              </>
            ) : (
              " · Last stage!"
            )}
          </p>
          <Body key={cur} />
        </section>
      </div>
    </main>
  );
}
