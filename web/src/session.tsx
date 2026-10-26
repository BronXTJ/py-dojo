import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Callout, Lesson, PyError, Step } from "./types";
import { buildSteps } from "./checker";
import { gain, getProgress, lessonProgress, update, updateLesson } from "./store";
import { engineReady, loadEngine, onEngine, runPython, type EngineStatus } from "./py/engine";
import { esc } from "./content";

export type RunState = "IDLE" | "RUNNING" | "DONE" | "STOPPED";
export interface Msg {
  kind: "ok" | "bad" | "info";
  html: string;
}
/** What the scene and console currently show (live playback or a scrubbed step). */
export interface View {
  line: number | null;
  outs: string[];
  errLine: number | null;
  err: PyError | null;
  say: [string, string];
}
export interface RunResult {
  outs: string[];
  err: PyError | null;
  src: string;
}

interface Session {
  lesson: Lesson;
  engine: EngineStatus;
  code: string;
  setCode: (c: string, opts?: { reset?: boolean }) => void;
  bindCode: (key: string | null, initial: string) => void;
  run: (opts?: { stdin?: string }) => Promise<RunResult | null>;
  runState: RunState;
  view: View;
  steps: Step[];
  scrubTo: (k: number) => void;
  scrubAt: number;
  msg: Msg | null;
  setMsg: (m: Msg | null) => void;
  callout: Callout | null;
  setCallout: (c: Callout) => void;
  toast: string;
  showToast: (t: string) => void;
  bug: boolean;
}

const Ctx = createContext<Session | null>(null);
export const useSession = (): Session => {
  const s = useContext(Ctx);
  if (!s) throw new Error("useSession outside provider");
  return s;
};

/** Toasts work on every screen, so they live outside the lesson session. */
const toastSubs = new Set<(t: string) => void>();
export function toast(t: string): void {
  toastSubs.forEach((f) => f(t));
}
export function useToast(): string {
  const [t, setT] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    const on = (s: string) => {
      setT(s);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setT(""), 2400);
    };
    toastSubs.add(on);
    return () => void toastSubs.delete(on);
  }, []);
  return t;
}

export const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const STEP_MS = 240;
const IDLE_VIEW: View = { line: null, outs: [], errLine: null, err: null, say: ["Ready to read", "your code!"] };

const WHY: Record<string, string> = {
  SyntaxError: "Python couldn't understand the grammar, so <b>no line ran at all</b>. Check brackets, quotes and symbols.",
  NameError: "Python met a name it doesn't know. Text needs quotes, names are case-sensitive, and a variable must exist before you use it.",
  IndentationError: "There are spaces at the start of a line where none belong.",
  TypeError: "Two values of different types were mixed, like text + number.",
  ValueError: "The type was right but the value wasn't, like int(\"abc\").",
  ZeroDivisionError: "Dividing by zero has no answer.",
  AttributeError: "That value has no method or attribute with this name.",
  IndexError: "The position is past the end. Indexes start at 0.",
  EOFError: "input() had nothing to read. Type answers in the input box.",
  Timeout: "Maybe an endless loop?",
};

export function errMsg(e: PyError): Msg {
  return {
    kind: "bad",
    html: `<b>🧩 ${esc(e.type)}${e.line ? " on line " + e.line : ""}</b>: ${esc(e.msg)}<br>${WHY[e.type] ?? "Read the last line of the traceback first."}<ul class="tbmap"><li><b>①</b><span>"line ${e.line ?? "?"}" = where it stopped</span></li><li><b>②</b><span>the code it was reading</span></li><li><b>④</b><span>last line = error type + message</span></li></ul>🌱 Every coder sees errors daily. Fix it and run again!`,
  };
}

export function SessionProvider({ lesson, children }: { lesson: Lesson; children: ReactNode }) {
  const [engine, setEngine] = useState<EngineStatus>({ phase: "idle", progress: 0, text: "waiting" });
  const [code, setCodeState] = useState(lesson.watchCode);
  const [runState, setRunState] = useState<RunState>("IDLE");
  const [view, setView] = useState<View>(IDLE_VIEW);
  const [steps, setSteps] = useState<Step[]>([]);
  const [scrubAt, setScrubAt] = useState(0);
  const [msg, setMsg] = useState<Msg | null>(null);
  const [callout, setCallout] = useState<Callout | null>(null);
  const [bug, setBug] = useState(false);
  const runId = useRef(0);
  const codeKey = useRef<string | null>(null);
  const last = useRef<{ err: PyError | null }>({ err: null });

  useEffect(() => onEngine(setEngine), []);
  useEffect(() => {
    const t = setTimeout(loadEngine, 150);
    return () => clearTimeout(t);
  }, []);

  const clearRun = useCallback(() => {
    runId.current++;
    setView(IDLE_VIEW);
    setSteps([]);
    setBug(false);
    setRunState("IDLE");
  }, []);

  const setCode = useCallback(
    (c: string, opts: { reset?: boolean } = {}) => {
      setCodeState(c);
      const k = codeKey.current;
      if (k) updateLesson(lesson.id, (l) => ({ code: { ...l.code, [k]: c } }), { debounce: !opts.reset });
      if (opts.reset) clearRun();
    },
    [lesson.id, clearRun],
  );

  /** A stage says which code it owns: saved code for that stage comes back, or the stage's starting code. */
  const bindCode = useCallback(
    (key: string | null, initial: string) => {
      codeKey.current = key;
      const saved = key ? lessonProgress(getProgress(), lesson.id).code[key] : undefined;
      setCodeState(saved ?? initial);
      setMsg(null);
      clearRun();
    },
    [lesson.id, clearRun],
  );

  const run = useCallback(
    async (opts: { stdin?: string } = {}) => {
      if (!engineReady()) {
        toast("Python is still waking up…");
        return null;
      }
      const id = ++runId.current;
      const src = code;
      setMsg(null);
      setBug(false);
      setSteps([]);
      setRunState("RUNNING");
      setView({ ...IDLE_VIEW, say: ["Reading…", ""] });
      const r = await runPython(src, opts.stdin ?? "");
      if (id !== runId.current) return null;
      const { steps: st, outs } = buildSteps(r.ev);
      const delay = reduced() ? 0 : STEP_MS;
      if (delay) {
        for (const s of st) {
          if (id !== runId.current) return null;
          setView({ line: s.line, outs: s.outs, errLine: null, err: null, say: ["Reading line " + s.line, ""] });
          await wait(delay);
        }
      }
      if (id !== runId.current) return null;
      last.current = { err: r.err };
      setSteps(st);
      setScrubAt(st.length);
      if (r.err) {
        setRunState("STOPPED");
        setBug(true);
        setView({ line: r.err.line, outs, errLine: r.err.line, err: r.err, say: ["Oops! Python stopped.", "Read the clue ↓"] });
        setMsg(errMsg(r.err));
        if (!getProgress().errSeen) {
          update({ errSeen: true });
          gain(5, "ct", 1);
          toast("⭐ +5 XP · You read an error!");
        }
      } else {
        setRunState("DONE");
        setView({ line: null, outs, errLine: null, err: null, say: ["All lines done!", "Nice run 🎉"] });
      }
      return { outs, err: r.err, src };
    },
    [code],
  );

  const scrubTo = useCallback(
    (k: number) => {
      setScrubAt(k);
      const s = k ? steps[k - 1] : undefined;
      const err = last.current.err;
      if (k === steps.length && err) {
        setView({ line: err.line, outs: s?.outs ?? [], errLine: err.line, err, say: ["Oops! Python stopped.", "Read the clue ↓"] });
        return;
      }
      setView(
        s
          ? { line: s.line, outs: s.outs, errLine: null, err: null, say: ["Step " + k + ": line " + s.line, ""] }
          : { ...IDLE_VIEW, say: ["Before line 1", "nothing printed yet"] },
      );
    },
    [steps],
  );

  const value = useMemo<Session>(
    () => ({
      lesson,
      engine,
      code,
      setCode,
      bindCode,
      run,
      runState,
      view,
      steps,
      scrubTo,
      scrubAt,
      msg,
      setMsg,
      callout,
      setCallout,
      toast: "",
      showToast: toast,
      bug,
    }),
    [lesson, engine, code, setCode, bindCode, run, runState, view, steps, scrubTo, scrubAt, msg, callout, bug],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
