import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getProgress, resetProgress } from "./store";
import { checkFounder, LESSONS, quizFor, tryTaskFor, ERRORS, GLOSSARY, rng, codeTplsFor, questionById, spotFor } from "./content";
import { runPython } from "./py/engine";
import "./styles.css";

/** Test hooks for tests/qa.cjs and tests/verify.cjs (answers are read from content, never shown in the UI). */
const pydojoTest = {
  reset: resetProgress,
  progress: getProgress,
  runPy: runPython,
  lessons: () => LESSONS.map((l) => l.id),
  tryTask: (id: string) => {
    const l = LESSONS.find((x) => x.id === id);
    return l ? tryTaskFor(l, getProgress().lessons[id]?.variant ?? 0) : null;
  },
  bugFix: (id: string) => LESSONS.find((x) => x.id === id)?.bugTask.fixed ?? null,
  quizAnswers: (id: string) => {
    const l = LESSONS.find((x) => x.id === id);
    return l ? quizFor(l, getProgress().lessons[id]?.seed ?? 1).map((q) => q.answer) : [];
  },
  /** Everything checkable, for verifying in Pyodide: [label, code, stdin, expected | null, mustError]. */
  checks: (samples = 25) => {
    const out: [string, string, string, string | null, boolean][] = [];
    for (const l of LESSONS) {
      out.push([l.id + " watch", l.watchCode, l.watchStdin, null, false]);
      if (l.tryTpl) {
        for (let v = 0; v < samples; v++) {
          const t = tryTaskFor(l, v);
          out.push([l.id + " try v" + v, t.solution, t.stdin, t.expected, false]);
        }
      } else if (l.tryTask) out.push([l.id + " try", l.tryTask.solution, l.tryTask.stdin, l.tryTask.expected, false]);
      for (const t of codeTplsFor(l.topic))
        for (let v = 0; v < samples; v++) {
          const x = t.make(rng(9000 + v));
          out.push([l.id + " practice " + t.id + " v" + v, x.solution, x.stdin, x.expected, false]);
        }
      out.push([l.id + " bug broken", l.bugTask.error.code, "", null, true]);
      out.push([l.id + " bug fixed", l.bugTask.fixed, "", null, false]);
      for (const ex of l.bank.ex)
        for (let v = 0; v < samples; v++) {
          const q = questionById(l.id + "|" + ex.id, 100 + v);
          if (q?.code && ex.make(rng(1)).run) out.push([l.id + " quiz " + ex.id + " v" + v, q.code, "", q.options[q.answer] ?? "", false]);
        }
      for (let v = 0; v < samples; v++) {
        const s = spotFor(l.topic, 500 + v);
        if (s?.code) out.push([l.id + " spot v" + v + " " + (s.options[s.answer] ?? ""), s.code, "", "SPOT:" + (s.options[s.answer] ?? ""), false]);
      }
    }
    ERRORS.forEach((e, i) => {
      if (e.code && e.error !== "NOT an error" && e.error !== "KeyboardInterrupt" && e.error !== "EOFError")
        out.push(["error " + i + " " + e.error, e.code, "", "ERR:" + e.message, true]);
    });
    GLOSSARY.forEach((g) => {
      if (g.code && g.out && !/input\(/.test(g.code)) out.push(["glossary " + g.term, g.code, "", g.out, false]);
    });
    return out;
  },
  founderCheck: (id: string, src: string, outs: string[]) => {
    const l = LESSONS.find((x) => x.id === id);
    return l ? checkFounder(l.founder, src, outs) : ["no lesson"];
  },
};
declare global {
  interface Window {
    pydojoTest?: typeof pydojoTest;
  }
}
window.pydojoTest = pydojoTest;

const root = document.getElementById("root");
if (root)
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
