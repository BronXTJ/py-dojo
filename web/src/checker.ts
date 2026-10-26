import type { PyEvent, Step } from "./types";
import { CITIES } from "./geo";

/** How many predicted lines match the real output, position by position. */
export function scorePrediction(prediction: string, outs: string[]): { ok: number; total: number } | null {
  const p = prediction
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
  if (!p.length) return null;
  const ok = outs.filter((l, i) => p[i] !== undefined && p[i] === l.trim()).length;
  return { ok, total: Math.max(outs.length, p.length) };
}

/** Turn the worker's event list into the playback timeline: one step per executed line, with the output so far. */
export function buildSteps(ev: PyEvent[]): { steps: Step[]; outs: string[] } {
  const steps: Step[] = [];
  const outs: string[] = [];
  let buf = "";
  for (const e of ev) {
    if (e[0] === "line") {
      steps.push({ line: e[1], outs: [] });
    } else {
      buf += e[1];
      const parts = buf.split("\n");
      buf = parts.pop() ?? "";
      outs.push(...parts);
    }
    const last = steps[steps.length - 1];
    if (last) last.outs = buf ? [...outs, buf] : outs.slice();
  }
  if (buf) {
    outs.push(buf);
    const last = steps[steps.length - 1];
    if (last) last.outs = outs.slice();
  }
  return { steps, outs };
}

export interface SceneFacts {
  sign: string | null;
  pins: string[];
  facts: string[];
}

/** What the Living Lanka map shows for a set of output lines: the first line naming a city (or any text) goes on
 * the welcome sign, every city mentioned lights its pin, and up to two short number lines become fact cards. */
export function sceneFromOutputs(outs: string[]): SceneFacts {
  const pins: string[] = [];
  const lines = outs.map((o) => o.trim()).filter(Boolean);
  for (const t of lines) {
    const low = t.toLowerCase();
    for (const c of Object.keys(CITIES)) if (new RegExp("\\b" + c + "\\b").test(low) && !pins.includes(c)) pins.push(c);
  }
  const named = lines.find((t) => Object.keys(CITIES).some((c) => t.toLowerCase().includes(c)));
  const sign = named ?? lines.find((t) => /[a-z]/i.test(t) && !/^hello/i.test(t)) ?? null;
  const facts = lines.filter((t) => t !== sign && /\d/.test(t) && t.length <= 28).slice(0, 2);
  return { sign, pins, facts };
}
