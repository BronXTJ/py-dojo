import { useSyncExternalStore } from "react";
import type { SkillKey, Theme } from "./types";

export const STORAGE_KEY = "pydojo-v2";
const OLD_KEY = "pydojo-proto-l1";
const DAY = 864e5;

export interface LessonProgress {
  stage: number;
  done: number[];
  complete: boolean;
  code: Record<string, string>;
  quiz: Record<string, number>;
  seed: number;
  variant: number;
  hints: number;
  think: number[];
  pred?: string;
  plan?: string;
  thought?: string;
  founder: boolean;
  stdin?: string;
}
export interface SrsItem {
  box: number;
  due: number;
}
/** Everything that is saved. Flat, JSON-safe and versioned so Export/Import can validate it. */
export interface Progress {
  v: 2;
  xp: number;
  theme: Theme;
  ps: number;
  ct: number;
  cr: number;
  lessons: Record<string, LessonProgress>;
  srs: Record<string, SrsItem>;
  practiced: number;
  reviewed: number;
  errSeen: boolean;
  last: string | null;
}

export const DEFAULTS: Progress = {
  v: 2,
  xp: 0,
  theme: "dark",
  ps: 0,
  ct: 0,
  cr: 0,
  lessons: {},
  srs: {},
  practiced: 0,
  reviewed: 0,
  errSeen: false,
  last: null,
};
export const newLesson = (): LessonProgress => ({
  stage: 0,
  done: [],
  complete: false,
  code: {},
  quiz: {},
  seed: 1,
  variant: 0,
  hints: 0,
  think: [],
  founder: false,
});

/** Accept a saved or imported object only if it looks like progress; fill any missing fields with defaults. */
export function sanitize(raw: unknown): Progress | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Partial<Progress>;
  if (o.v !== 2 || typeof o.xp !== "number" || typeof o.lessons !== "object" || o.lessons === null) return null;
  const lessons: Record<string, LessonProgress> = {};
  for (const [k, v] of Object.entries(o.lessons)) lessons[k] = { ...newLesson(), ...v };
  return {
    ...DEFAULTS,
    ...o,
    theme: o.theme === "light" ? "light" : "dark",
    lessons,
    srs: typeof o.srs === "object" && o.srs ? o.srs : {},
  };
}

function load(): Progress {
  try {
    const p = sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"));
    if (p) return p;
    const old = JSON.parse(localStorage.getItem(OLD_KEY) ?? "null") as { xp?: number; theme?: Theme } | null;
    if (old) return { ...DEFAULTS, xp: old.xp ?? 0, theme: old.theme === "light" ? "light" : "dark" };
  } catch {
    /* corrupt storage: start fresh */
  }
  return { ...DEFAULTS };
}

let state: Progress = load();
const subs = new Set<() => void>();
let saveTimer: ReturnType<typeof setTimeout> | undefined;
let savedAt = 0;

export function save(): void {
  clearTimeout(saveTimer);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    savedAt = Date.now();
  } catch {
    /* storage full or blocked: progress stays in memory; Export still works */
  }
}
export const lastSaved = () => savedAt;

function emit() {
  subs.forEach((f) => f());
}

/** Replace part of the progress; autosaves (debounced for typing, immediate otherwise). */
export function update(
  patch: Partial<Progress> | ((s: Progress) => Partial<Progress>),
  opts: { debounce?: boolean } = {},
): void {
  state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
  emit();
  if (opts.debounce) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 400);
  } else save();
}

export const lessonProgress = (s: Progress, id: string): LessonProgress => s.lessons[id] ?? newLesson();
export function updateLesson(
  id: string,
  patch: Partial<LessonProgress> | ((l: LessonProgress) => Partial<LessonProgress>),
  opts: { debounce?: boolean } = {},
): void {
  update((s) => {
    const cur = lessonProgress(s, id);
    return { lessons: { ...s.lessons, [id]: { ...cur, ...(typeof patch === "function" ? patch(cur) : patch) } } };
  }, opts);
}

export function getProgress(): Progress {
  return state;
}
export function useProgress(): Progress {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => state,
  );
}

/** Award XP and optionally raise a thinking skill (0-10). */
export function gain(xp: number, skill?: SkillKey, n = 0): void {
  update((s) => ({ xp: s.xp + xp, ...(skill ? { [skill]: Math.min(10, s[skill] + n) } : {}) }));
}

/* ---------- spaced repetition (Leitner boxes) ---------- */
export const BOX_DAYS = [0, 1, 3, 7, 14, 30];
export function schedule(id: string, correct: boolean, now = Date.now()): void {
  update((s) => {
    const cur = s.srs[id];
    const box = correct ? Math.min(5, (cur?.box ?? 0) + 1) : 1;
    return { srs: { ...s.srs, [id]: { box, due: now + (correct ? (BOX_DAYS[box] ?? 1) : 1) * DAY } } };
  });
}
export const dueItems = (s: Progress, now = Date.now()) =>
  Object.entries(s.srs)
    .filter(([, v]) => v.due <= now)
    .map(([k]) => k);

/* ---------- export / import ---------- */
export const exportProgress = () => JSON.stringify({ app: "py-dojo", exported: new Date().toISOString(), progress: state }, null, 1);
export function importProgress(text: string): boolean {
  try {
    const o = JSON.parse(text) as { progress?: unknown };
    const p = sanitize(o.progress ?? o);
    if (!p) return false;
    state = p;
    save();
    emit();
    return true;
  } catch {
    return false;
  }
}

/** Test hook used by tests/qa.cjs to start each case from a clean slate (optionally with progress seeded). */
export function resetProgress(theme: Theme, seed?: Partial<Progress>): void {
  state = { ...DEFAULTS, theme, ...seed };
  save();
  emit();
}

if (typeof window !== "undefined") window.addEventListener("pagehide", save);
