import { gain, getProgress, lessonProgress, updateLesson, useProgress, type LessonProgress } from "./store";
import { useSession } from "./session";
import { toast } from "./session";
import type { SkillKey } from "./types";

export function useLesson(): LessonProgress {
  const { lesson } = useSession();
  return lessonProgress(useProgress(), lesson.id);
}

/** Mark a stage done once (XP and a skill bump the first time only). Returns true the first time. */
export function completeStage(id: string, stage: number, xp = 0, skill?: SkillKey, n = 0, note = ""): boolean {
  const lp = lessonProgress(getProgress(), id);
  if (lp.done.includes(stage)) return false;
  updateLesson(id, (l) => ({ done: [...l.done, stage].sort((a, b) => a - b) }));
  if (xp || skill) gain(xp, skill, n);
  if (xp) toast(`⭐ +${xp} XP${note ? " · " + note : ""}`);
  return true;
}

export const stageOpen = (lp: LessonProgress, i: number) => i === 0 || lp.complete || lp.done.includes(i - 1);
