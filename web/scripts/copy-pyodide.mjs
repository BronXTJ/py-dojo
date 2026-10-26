import { cpSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const candidates = [
  process.env.PYDOJO_PYODIDE,
  resolve(here, "../public-pyodide"),
  resolve(here, "../../app/pyodide"),
  resolve(here, "../prototype/pyodide"),
].filter((p) => typeof p === "string" && p.length > 0);

const src = candidates.find((p) => existsSync(p));
if (!src) {
  console.error("pyodide folder not found. Set PYDOJO_PYODIDE, or keep the runtime at app/pyodide.");
  process.exit(1);
}
const dest = resolve(here, "../dist/pyodide");
cpSync(src, dest, { recursive: true });
console.log("copied pyodide ->", dest, "from", src);
