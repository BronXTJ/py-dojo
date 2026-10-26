import { useSession } from "../../session";
import { lessonProgress, updateLesson, useProgress } from "../../store";

export function Predict() {
  const { lesson } = useSession();
  const lp = lessonProgress(useProgress(), lesson.id);
  return (
    <div className="predict">
      <label htmlFor="pred">
        <b>🔮 Predict first:</b> what will the console show? One line per output.
      </label>
      <textarea
        id="pred"
        rows={3}
        spellCheck={false}
        placeholder="Type your guess, then press Run"
        value={lp.pred ?? ""}
        onChange={(e) => updateLesson(lesson.id, { pred: e.target.value }, { debounce: true })}
      />
    </div>
  );
}
