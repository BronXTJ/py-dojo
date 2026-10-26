import type { QuizQuestion } from "../types";

/** One multiple-choice question. `chosen` is the picked option index once answered. */
export function QuestionCard({
  q,
  n,
  chosen,
  onAnswer,
}: {
  q: QuizQuestion;
  n: number;
  chosen: number | undefined;
  onAnswer: (o: number) => void;
}) {
  return (
    <div className="q" role="group" aria-label={"Question " + (n + 1)}>
      <p>
        {n + 1}. {q.q}
      </p>
      {q.code && <pre className="qcode">{q.code}</pre>}
      <div className="opts">
        {q.options.map((o, j) => {
          const cls = chosen === undefined ? "" : j === q.answer ? "right" : j === chosen ? "wrong" : "";
          return (
            <button
              key={j}
              className={"btn opt " + cls}
              data-q={n}
              data-o={j}
              disabled={chosen !== undefined}
              onClick={() => onAnswer(j)}
            >
              <span className="optx">{o}</span>
            </button>
          );
        })}
      </div>
      {chosen !== undefined && (
        <div className="why">
          {chosen === q.answer ? "✅ Yes! " : "🌱 Close, and now you know: "}
          {q.why}
        </div>
      )}
    </div>
  );
}
