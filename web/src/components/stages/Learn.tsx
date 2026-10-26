import { useEffect } from "react";
import { useSession } from "../../session";
import { completeStage } from "../../lessonState";
import { StageNext } from "./Hook";
import { href } from "../../router";

export function Learn() {
  const { lesson, bindCode } = useSession();
  useEffect(() => bindCode(null, lesson.watchCode), [bindCode, lesson.watchCode]);
  const d = lesson.depth;
  return (
    <div className="stage" id="stage-learn">
      <h3>Key ideas</h3>
      <ul className="ideas">
        {lesson.bank.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <details className="deep" open>
        <summary>Go deeper: the full picture</summary>
        <ul>
          {d.concepts.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </details>
      <h3>Read it like Python does</h3>
      <div className="walk">
        {d.walk.map(([c, e], i) => (
          <div className="walkrow" key={i}>
            <pre>{c}</pre>
            <p>{e}</p>
          </div>
        ))}
      </div>
      <h3>Common mistakes</h3>
      <ul className="mist">
        {d.mistakes.map(([m, e], i) => (
          <li key={i}>
            <b>{m}</b> {e}
          </li>
        ))}
      </ul>
      {lesson.glossary.length > 0 && (
        <>
          <h3>Words to know</h3>
          <dl className="minigloss">
            {lesson.glossary.slice(0, 6).flatMap((g) => [
              <dt key={g.term}>
                <a href={href("glossary?q=" + encodeURIComponent(g.term))}>{g.term}</a>
              </dt>,
              <dd key={g.term + "d"}>{g.meaning}</dd>,
            ])}
          </dl>
        </>
      )}
      <p className="tip">Tap the glowing dots on the scene to see each part of how Python runs your code.</p>
      <StageNext stage={1} onNext={() => completeStage(lesson.id, 1, 5, "ps", 1, "Ideas unlocked")} label="Got it: show me" />
    </div>
  );
}
