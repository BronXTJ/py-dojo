# Third-party notices

Original Py Dojo code and content are released under the MIT License.
Copyright (c) 2026 Thanuja Lakshan. See [LICENSE](LICENSE).

The files below are not covered by that MIT grant. Their notices travel with the files.

## Pyodide 0.26.4

`app/pyodide/bundle.js` contains the core files of Pyodide 0.26.4, base64-encoded and unmodified:

- `pyodide.js`
- `pyodide.asm.js`
- `pyodide.asm.wasm`
- `python_stdlib.zip`
- `pyodide-lock.json`

The same statement is in [`app/pyodide/NOTICE.txt`](app/pyodide/NOTICE.txt).

- Project: <https://github.com/pyodide/pyodide>
- Tag: <https://github.com/pyodide/pyodide/releases/tag/0.26.4>
- License: Mozilla Public License 2.0 — <https://github.com/pyodide/pyodide/blob/0.26.4/LICENSE>

Pyodide 0.26.4's published lock file records CPython **3.12.1** and Emscripten **3.1.58**. That is the interpreter the playground starts.

### CPython

Pyodide includes CPython. CPython is licensed under the Python Software Foundation License Version 2.

- <https://docs.python.org/3/license.html>
- <https://github.com/python/cpython>

### Emscripten

The WebAssembly build inside Pyodide is produced with Emscripten. Emscripten is licensed under the MIT license and the University of Illinois/NCSA Open Source License.

- <https://github.com/emscripten-core/emscripten>
- <https://emscripten.org/docs/introducing_emscripten/emscripten_license.html>

## Go

`server/` is compiled with the Go toolchain and links the Go standard library. Release binaries produced by CI include that runtime. Those binaries are not committed to this repository.

- Project: <https://go.dev/>
- License: BSD 3-Clause — <https://go.dev/LICENSE>

## What is not bundled

The web app uses the operating system's UI fonts. No font files are shipped.

The playground loads the Python standard library from the embedded Pyodide core. It does not include GeoPandas, Shapely, rasterio, NumPy, or other third-party Python packages named in the later belts. Those names are curriculum targets.

If `pyodide/bundle.js` fails to load, the page asks `cdn.jsdelivr.net` for Pyodide 0.26.4. That request is a fallback for a missing file, not a telemetry call. With the bundle in place, the playground does not make it.
