import { useEffect, useMemo } from "react";
import { useSession, toast } from "../../session";
import { completeStage, useLesson } from "../../lessonState";
import { quizFor } from "../../content";
import { gain, schedule, updateLesson } from "../../store";
import { StageNext } from "./Hook";
import { QuestionCard } from "../QuestionCard";

export function Quiz() {
  const { lesson, bindCode } = useSession();
  const lp = useLesson();
  const qs = useMemo(() => quizFor(lesson, lp.seed), [lesson, lp.seed]);
  useEffect(() => bindCode(null, lesson.watchCode), [bindCode, lesson.watchCode]);
  const answered = qs.filter((_, i) => lp.quiz[i] !== undefined).length;
  const right = qs.filter((q, i) => lp.quiz[i] === q.answer).length;
  const answer = (i: number, o: number) => {
    const q = qs[i];
    if (!q || lp.quiz[i] !== undefined) return;
    const ok = o === q.answer;
    updateLesson(lesson.id, (l) => ({ quiz: { ...l.quiz, [i]: o } }));
    schedule(q.id, ok);
    if (ok) {
      gain(10, "ct", 1);
      toast("⭐ +10 XP · Critical thinking up");
    }
    if (answered + 1 === qs.length) completeStage(lesson.id, 5, 0);
  };
  return (
    <div className="stage" id="stage-quiz">
      <p>
        Three quick questions · 10 XP each. Every answer goes into your <b>Review</b> queue so it comes back right
        before you'd forget it.
      </p>
      <div id="quiz">
        {qs.map((q, i) => (
          <QuestionCard key={q.id + lp.seed} q={q} n={i} chosen={lp.quiz[i]} onAnswer={(o) => answer(i, o)} />
        ))}
      </div>
      {answered === qs.length && (
        <p className="msg ok" id="quizScore">
          You got {right}/{qs.length}. {right === qs.length ? "Flawless! 🥋" : "The ones you missed will come back in Review."}
        </p>
      )}
      <div className="row">
        <button
          className="btn"
          id="newQuiz"
          disabled={answered < qs.length}
          onClick={() => updateLesson(lesson.id, (l) => ({ seed: l.seed + 1, quiz: {} }))}
        >
          🎲 New questions
        </button>
      </div>
      <StageNext stage={5} onNext={() => undefined} disabled={!lp.done.includes(5)} label="Claim your reward" />
    </div>
  );
}
