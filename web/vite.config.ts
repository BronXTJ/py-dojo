import { createReadStream, existsSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

const webRoot = dirname(fileURLToPath(import.meta.url));

/** Dev server only: serve the vendored runtime at /pyodide without copying it into web/. */
function pyodideDev(): Plugin {
  const dir = resolve(process.env.PYDOJO_PYODIDE || join(webRoot, "../app/pyodide"));
  return {
    name: "pyodide-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0] ?? "";
        if (!url.startsWith("/pyodide/")) return next();
        const file = resolve(dir, url.slice("/pyodide/".length));
        if (!file.startsWith(dir + sep) || !existsSync(file) || !statSync(file).isFile()) return next();
        if (file.endsWith(".js")) res.setHeader("Content-Type", "text/javascript; charset=utf-8");
        else if (file.endsWith(".txt")) res.setHeader("Content-Type", "text/plain; charset=utf-8");
        createReadStream(file).pipe(res);
      });
    },
  };
}

// Single self-contained index.html (JS, CSS and the inline worker) so it opens from file://.
// The 18 MB Python engine stays in ./pyodide next to it (copied by scripts/copy-pyodide.mjs).
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile(), pyodideDev()],
  worker: { format: "iife" },
  build: { target: "es2020", assetsInlineLimit: 100_000_000 },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
