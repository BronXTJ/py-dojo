import { describe, expect, it } from "vitest";
import { buildSteps, scorePrediction, sceneFromOutputs } from "./checker";
import { bugFixed, checkCode, checkFounder, LESSONS, quizFor, rng, tryTaskFor, ERRORS, GLOSSARY, BELTS } from "./content";
import { parse } from "./router";
import { sanitize, DEFAULTS } from "./store";

describe("content", () => {
  it("has 15 White Belt lessons with every stage's material", () => {
    expect(LESSONS).toHaveLength(15);
    for (const l of LESSONS) {
      expect(l.bank.bullets.length).toBeGreaterThan(0);
      expect(l.depth.concepts.length).toBeGreaterThan(0);
      expect(tryTaskFor(l, 0).expected.length).toBeGreaterThan(0);
      expect(l.bugTask.error.topic).toBe(l.topic);
      expect(quizFor(l, 1).length).toBeGreaterThanOrEqual(2);
      expect(l.glossary.length).toBeGreaterThan(0);
      for (const id of l.lookBack) expect(LESSONS.find((x) => x.id === id)!.n).toBeLessThan(l.n);
    }
  });
  it("has 43 errors, 204 glossary terms and 10 belts", () => {
    expect(ERRORS).toHaveLength(43);
    expect(GLOSSARY).toHaveLength(204);
    expect(BELTS.map((b) => b.name)).toEqual(["White", "Yellow", "Orange", "Green", "Blue", "Purple", "Brown", "Red", "Black", "Master"]);
  });
  it("quiz is stable per seed and has the answer among the options", () => {
    const l = LESSONS[4]!;
    expect(quizFor(l, 3)).toEqual(quizFor(l, 3));
    for (const q of quizFor(l, 3)) expect(q.answer).toBeGreaterThanOrEqual(0);
  });
  it("seeded rng is deterministic", () => {
    const a = rng(5), b = rng(5);
    expect([a.int(1, 100), a.int(1, 100)]).toEqual([b.int(1, 100), b.int(1, 100)]);
  });
});

describe("checks", () => {
  const t = { task: "", starter: "", solution: "", stdin: "", expected: "A\nB", hints: [], mustContain: "*" };
  it("checkCode matches output and required code", () => {
    expect(checkCode(t, "print(2*3)", ["A", "B  "]).ok).toBe(true);
    expect(checkCode(t, "print(6)", ["A", "B"]).ok).toBe(false);
    expect(checkCode(t, "x*1", ["A"]).ok).toBe(false);
  });
  it("founder rules", () => {
    const f = LESSONS[4]!.founder;
    expect(checkFounder(f, 'print("a")\nprint("b")\nprint(1)', ["a", "b", "1"])).toEqual([]);
    expect(checkFounder(f, 'print("a")', ["a"]).length).toBe(2);
  });
  it("bug must change and run clean", () => {
    const l = LESSONS[0]!;
    expect(bugFixed(l, l.bugTask.error.code, false)).toBe(false);
    expect(bugFixed(l, l.bugTask.fixed, false)).toBe(true);
    expect(bugFixed(l, l.bugTask.fixed, true)).toBe(false);
  });
  it("scorePrediction", () => {
    expect(scorePrediction("a\nb", ["a", "c"])).toEqual({ ok: 1, total: 2 });
    expect(scorePrediction("  ", ["a"])).toBeNull();
  });
});

describe("engine helpers", () => {
  it("buildSteps splits output into lines per step", () => {
    const { steps, outs } = buildSteps([["line", 1], ["out", "a\n"], ["line", 2], ["out", "b"]]);
    expect(outs).toEqual(["a", "b"]);
    expect(steps.map((s) => s.outs)).toEqual([["a"], ["a", "b"]]);
  });
  it("scene lights pins for cities mentioned", () => {
    const s = sceneFromOutputs(["Ayubowan, Kandy!", "25", "100"]);
    expect(s.sign).toBe("Ayubowan, Kandy!");
    expect(s.pins).toEqual(["kandy"]);
    expect(s.facts).toEqual(["25", "100"]);
  });
});

describe("router and storage", () => {
  it("parses hash routes", () => {
    expect(parse("#/lesson/white-3/2")).toEqual({ name: "lesson", id: "white-3", stage: 2 });
    expect(parse("#/errors?q=Name")).toEqual({ name: "errors", q: "Name" });
    expect(parse("")).toEqual({ name: "home" });
  });
  it("rejects files that are not progress", () => {
    expect(sanitize({ hello: 1 })).toBeNull();
    expect(sanitize({ ...DEFAULTS, xp: 12 })?.xp).toBe(12);
  });
});
