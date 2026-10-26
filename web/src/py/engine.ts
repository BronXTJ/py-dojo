import { useEffect, useState } from "react";
import PyWorker from "./worker.ts?worker&inline";
import type { PyResult } from "../types";

export type EngineStatus = { phase: "idle" | "loading" | "ready" | "failed"; progress: number; text: string };
type Listener = (s: EngineStatus) => void;

const TIMEOUT_MS = 4000;
let files: Record<string, string> | null = null;
let worker: Worker | null = null;
let pending: ((r: PyResult) => void) | null = null;
let status: EngineStatus = { phase: "idle", progress: 0, text: "waiting" };
const listeners = new Set<Listener>();

function set(s: EngineStatus) {
  status = s;
  listeners.forEach((l) => l(s));
}
export const onEngine = (l: Listener) => (listeners.add(l), l(status), () => void listeners.delete(l));
export const engineReady = () => status.phase === "ready";

function start() {
  worker = new PyWorker();
  worker.onmessage = (e: MessageEvent) => {
    const m = e.data as { type: string; p?: number; t?: string; res?: PyResult; msg?: string };
    if (m.type === "prog") set({ phase: "loading", progress: m.p ?? 0, text: (m.t ?? "") + "…" });
    else if (m.type === "ready") set({ phase: "ready", progress: 1, text: "ready ✓" });
    else if (m.type === "fail") {
      console.warn(m.msg);
      set({ phase: "failed", progress: 0, text: "couldn't start" });
    } else if (m.type === "done" && pending && m.res) {
      const p = pending;
      pending = null;
      p(m.res);
    }
  };
  worker.postMessage({ type: "init", files });
}

/** Load ./pyodide/bundle.js (base64 engine files) with a plain script tag, which works from file:// everywhere. */
export function loadEngine(): void {
  if (status.phase !== "idle") return;
  set({ phase: "loading", progress: 0.1, text: "loading files…" });
  const s = document.createElement("script");
  s.src = "pyodide/bundle.js";
  s.async = true;
  s.onload = () => {
    const w = window as unknown as { PYODIDE_FILES?: Record<string, string> | null };
    files = w.PYODIDE_FILES ?? null;
    w.PYODIDE_FILES = null;
    set({ phase: "loading", progress: 0.35, text: "unpacking…" });
    start();
  };
  s.onerror = () => set({ phase: "failed", progress: 0, text: "files missing" });
  document.head.appendChild(s);
}

export function runPython(code: string, stdin = ""): Promise<PyResult> {
  return new Promise((resolve) => {
    if (!worker || status.phase !== "ready")
      return resolve({
        ev: [],
        err: { type: "NotReady", msg: "Python is still waking up.", line: null, tb: "" },
      });
    const t = setTimeout(() => {
      if (!pending) return;
      pending = null;
      worker?.terminate();
      resolve({
        ev: [],
        err: {
          type: "Timeout",
          msg: "Your code ran for more than 4 seconds, so I stopped it.",
          line: null,
          tb: "",
        },
      });
      start();
    }, TIMEOUT_MS);
    pending = (r) => {
      clearTimeout(t);
      resolve(r);
    };
    worker.postMessage({ type: "run", code, stdin });
  });
}

/** Engine status for screens outside a lesson. */
export function useEngine(): EngineStatus {
  const [s, setS] = useState(status);
  useEffect(() => onEngine(setS), []);
  return s;
}
