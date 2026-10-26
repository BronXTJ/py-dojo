/// <reference lib="webworker" />
// Runs Python (Pyodide) off the main thread. Engine files arrive as base64 strings and are served from memory,
// with no blob: or file: URLs, so Safari/WebKit's file:// rules can't block them.
import RUNNER from "./runner.py?raw";

interface PyodideLike {
  globals: { set(k: string, v: unknown): void };
  runPython(code: string): string;
}
declare function loadPyodide(o: { indexURL: string }): Promise<PyodideLike>;

const ctx = self as unknown as DedicatedWorkerGlobalScope & { importScripts: (...u: string[]) => void };
const MIME: Record<string, string> = {
  js: "text/javascript",
  wasm: "application/wasm",
  zip: "application/zip",
  json: "application/json",
};
let py: PyodideLike | null = null;

ctx.onmessage = async (ev: MessageEvent) => {
  const m = ev.data as { type: "init"; files: Record<string, string> } | { type: "run"; code: string; stdin?: string };
  if (m.type === "init") {
    try {
      const bytes: Record<string, Uint8Array> = {};
      const names = Object.keys(m.files);
      names.forEach((n, i) => {
        const b = atob(m.files[n] ?? "");
        const u = new Uint8Array(b.length);
        for (let j = 0; j < b.length; j++) u[j] = b.charCodeAt(j);
        bytes[n] = u;
        ctx.postMessage({ type: "prog", p: 0.35 + (0.35 * (i + 1)) / names.length, t: "Unpacking engine" });
      });
      const name = (u: unknown) => (String(u).split("?")[0] ?? "").split("/").pop() ?? "";
      const realFetch = ctx.fetch.bind(ctx);
      ctx.fetch = ((u: RequestInfo | URL, o?: RequestInit) => {
        const k = name(typeof u === "object" && "url" in u ? u.url : u);
        const b = bytes[k];
        return b
          ? Promise.resolve(
              new Response(b.buffer as ArrayBuffer, {
                status: 200,
                headers: { "Content-Type": MIME[k.split(".").pop() ?? ""] ?? "" },
              }),
            )
          : realFetch(u, o);
      }) as typeof fetch;
      const td = new TextDecoder();
      ctx.importScripts = (...urls: string[]) =>
        urls.forEach((u) => {
          const b = bytes[name(u)];
          if (!b) throw new Error("missing " + u);
          (0, eval)(td.decode(b));
        });
      ctx.importScripts("pyodide.js");
      ctx.postMessage({ type: "prog", p: 0.8, t: "Starting Python" });
      py = await loadPyodide({ indexURL: "file:///pyodide-embedded/" });
      ctx.postMessage({ type: "ready" });
    } catch (e) {
      ctx.postMessage({ type: "fail", msg: String((e as Error)?.stack ?? e) });
    }
    return;
  }
  if (m.type === "run" && py) {
    try {
      py.globals.set("SRC", m.code);
      py.globals.set("STDIN", m.stdin ?? "");
      ctx.postMessage({ type: "done", res: JSON.parse(py.runPython(RUNNER)) });
    } catch (e) {
      ctx.postMessage({
        type: "done",
        res: { ev: [], err: { type: "InternalError", msg: String(e), line: null, tb: String(e) } },
      });
    }
  }
};
