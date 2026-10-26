import { useEffect } from "react";
import { useSession } from "../../session";
import { completeStage, useLesson } from "../../lessonState";
import { lessonProgress, updateLesson, useProgress } from "../../store";
import { lessonById } from "../../content";
import { href } from "../../router";

export function Hook() {
  const { lesson, bindCode } = useSession();
  const lp = useLesson();
  const p = useProgress();
  useEffect(() => bindCode(null, lesson.watchCode), [bindCode, lesson.watchCode]);
  const shown = lp.think.includes(-1);
  return (
    <div className="stage" id="stage-hook">
      <p className="hook">{lesson.bank.hook}</p>
      <div className="thinkcard">
        <b>🧠 Think first</b>
        <p>{lesson.thinkFirst.q}</p>
        <label htmlFor="thought" className="sr-only">
          Your answer
        </label>
        <textarea
          id="thought"
          rows={2}
          placeholder="Your guess (any answer is fine: thinking is the point)"
          value={lp.thought ?? ""}
          onChange={(e) => updateLesson(lesson.id, { thought: e.target.value }, { debounce: true })}
        />
        <button
          className="btn"
          id="reveal"
          onClick={() => updateLesson(lesson.id, (l) => ({ think: l.think.includes(-1) ? l.think : [...l.think, -1] }))}
        >
          👀 Reveal
        </button>
        {shown && (
          <p className="reveal" id="revealTxt">
            {lesson.thinkFirst.a}
          </p>
        )}
      </div>
      {lesson.lookBack.length > 0 && (
        <div className="lookback">
          <b>↩️ Look back</b>
          <ul>
            {lesson.lookBack.map((id) => {
              const l = lessonById(id);
              if (!l) return null;
              const done = lessonProgress(p, id).complete;
              return (
                <li key={id}>
                  <a href={href(`lesson/${id}/1`)}>
                    {l.icon} Lesson {l.n}: {l.title}
                  </a>
                  <span>{done ? " ✅ " : " "}{l.bank.bullets[0]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <StageNext stage={0} onNext={() => completeStage(lesson.id, 0, 5, "ct", 1, "Curious mind")} label="I'm ready: let's learn" />
    </div>
  );
}

export function StageNext({ stage, onNext, label, disabled }: { stage: number; onNext: () => void; label: string; disabled?: boolean }) {
  const { lesson } = useSession();
  return (
    <div className="row stagenext">
      <button
        className="btn primary"
        id="stageDone"
        disabled={disabled}
        onClick={() => {
          onNext();
          updateLesson(lesson.id, { stage: stage + 1 });
          location.hash = href(`lesson/${lesson.id}/${stage + 1}`);
        }}
      >
        {label} →
      </button>
    </div>
  );
}
