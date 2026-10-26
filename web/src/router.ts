import { useSyncExternalStore } from "react";

export type Route =
  | { name: "home" }
  | { name: "lesson"; id: string; stage: number | null }
  | { name: "errors"; q: string }
  | { name: "glossary"; q: string }
  | { name: "review" }
  | { name: "practice"; id: string | null };

/** Hash routes work from file://, any static host and a GitHub Pages sub-path like /py-dojo/ without server config. */
export function parse(hash: string): Route {
  const [path = "", query = ""] = hash.replace(/^#\/?/, "").split("?");
  const q = new URLSearchParams(query).get("q") ?? "";
  const [a, b, c] = path.split("/").map(decodeURIComponent);
  if (a === "lesson" && b) return { name: "lesson", id: b, stage: c !== undefined && /^\d$/.test(c) ? +c : null };
  if (a === "errors") return { name: "errors", q };
  if (a === "glossary") return { name: "glossary", q };
  if (a === "review") return { name: "review" };
  if (a === "practice") return { name: "practice", id: b ?? null };
  return { name: "home" };
}
export const href = (path: string) => "#/" + path;
export function go(path: string): void {
  if (location.hash !== href(path)) location.hash = href(path);
}
export function useRoute(): Route {
  const h = useSyncExternalStore(
    (f) => {
      window.addEventListener("hashchange", f);
      return () => window.removeEventListener("hashchange", f);
    },
    () => location.hash,
  );
  return parse(h);
}
