import { useMemo, useState } from "react";
import { questionById } from "../content";
import { dueItems, gain, getProgress, schedule, update, useProgress } from "../store";
import { QuestionCard } from "../components/QuestionCard";
import { href } from "../router";
import { toast } from "../session";

/** Spaced repetition: cards come back after 1, 3, 7, 14 and 30 days; a miss sends a card back to box 1. */
export function Review() {
  const p = useProgress();
  const [early, setEarly] = useState(false);
  const [queue, setQueue] = useState<string[] | null>(null);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | undefined>(undefined);
  const [score, setScore] = useState(0);
  const due = dueItems(p);
  const all = Object.keys(p.srs).sort((a, b) => (p.srs[a]?.due ?? 0) - (p.srs[b]?.due ?? 0));
  const start = (ids: string[], e: boolean) => {
    setEarly(e);
    setQueue(ids.slice(0, 10));
    setI(0);
    setChosen(undefined);
    setScore(0);
  };
  const id = queue?.[i];
  const q = useMemo(() => (id ? questionById(id, Date.now() % 1e9) : null), [id]);
  const answer = (o: number) => {
    if (!q || !id) return;
    setChosen(o);
    const ok = o === q.answer;
    schedule(id, ok);
    update({ reviewed: getProgress().reviewed + 1 });
    if (ok) {
      setScore((s) => s + 1);
      gain(5, "ct", 1);
      toast("⭐ +5 XP · Memory strengthened");
    }
  };
  const nextBox = id ? p.srs[id]?.box : undefined;
  return (
    <div className="page" id="review">
      <section className="card section">
        <h2>🔁 Review</h2>
        <p>
          Quick questions from lessons you've done, with fresh numbers each time. Get one right and it waits longer
          before coming back; miss it and it returns tomorrow.
        </p>
        {!queue && (
          <>
            <p id="dueTxt">
              <b>{due.length}</b> due now · <b>{all.length}</b> cards in your deck
            </p>
            <div className="row">
              <button className="btn primary" id="startReview" disabled={!due.length} onClick={() => start(due, false)}>
                Start review ({due.length})
              </button>
              <button className="btn" id="reviewEarly" disabled={!all.length} onClick={() => start(all, true)}>
                Review early ({Math.min(10, all.length)})
              </button>
            </div>
            {!all.length && (
              <p className="tip">
                Your deck fills up as you answer lesson quizzes. <a href={href("lesson/white-1")}>Start lesson 1</a>.
              </p>
            )}
          </>
        )}
        {queue && q && (
          <div id="reviewCard">
            <p className="tip">
              Card {i + 1} of {queue.length}
              {early ? " · early review" : ""}
            </p>
            <QuestionCard key={id + "-" + i} q={q} n={i} chosen={chosen} onAnswer={answer} />
            {chosen !== undefined && (
              <div className="row">
                <span className="tip">Next review: box {nextBox ?? 1}</span>
                <button
                  className="btn primary"
                  id="nextCard"
                  onClick={() => {
                    if (i + 1 >= queue.length) setQueue([]);
                    else {
                      setI(i + 1);
                      setChosen(undefined);
                    }
                  }}
                >
                  {i + 1 >= queue.length ? "Finish" : "Next card →"}
                </button>
              </div>
            )}
          </div>
        )}
        {queue && !q && (
          <div id="reviewDone">
            <p className="msg ok">
              🎉 Review done: {score}/{queue.length} right. See you tomorrow!
            </p>
            <button className="btn" onClick={() => setQueue(null)}>
              Back
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
