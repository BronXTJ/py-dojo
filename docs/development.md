# Development

## Layout

```text
web/                    React + TypeScript source, tests, and the Vite config
app/pyodide/            vendored Pyodide 0.26.4 core, unmodified
packaging/              launchers, zip README, .nojekyll, data/README.txt
server/                 Go helper
tools/content-src/      inputs for scripts/gen-content.py
docs/                   these notes, the banner, and screenshots
```

The page reads `web/src/content`. It does not fetch the JSON files in `tools/content-src/`.

## App scripts

From `web/`, with Node.js 22 (the version CI installs):

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server. `/pyodide/*` is served from `app/pyodide` (or `PYDOJO_PYODIDE`). |
| `npm run typecheck` | `tsc -p tsconfig.json` |
| `npm run lint` | ESLint |
| `npm test` | Vitest, `src/**/*.test.ts` |
| `npm run build` | Typecheck, single-file Vite build, copy Pyodide into `dist/pyodide` |
| `npm run qa -- chromium` | Acceptance suite. Also `firefox` or `webkit` if those browsers exist. |
| `npm run verify` | Run curriculum snippets in Pyodide. Not part of CI. |
| `npm run gen` | Regenerate content. Not part of CI. Needs the files below. |

`web/dist/` is gitignored. GitHub Pages and the release workflow produce it with `npm ci` and `npm run build`.

### Acceptance suite

`web/tests/qa.cjs` defaults to `file://` plus `web/dist/index.html`, and writes shots under `web/qa-results/shots/` (gitignored).

| Variable | Role |
|---|---|
| `PYDOJO_URL` | Page to open |
| `PYDOJO_SHOTS` | Screenshot directory |
| `PYDOJO_SIZES` | Comma-separated subset of `laptop,phone,ipad,desktop` |
| `PYDOJO_ONLY` | `layout`, `journey`, `base`, or `a11y` |
| `CHROME_PATH` | Chromium executable. Default `/usr/bin/google-chrome`. |
| `CHROME_NO_SANDBOX` | Set to `1` to pass `--no-sandbox` and `--disable-dev-shm-usage`. |

`playwright-core` does not download a browser. CI installs Google Chrome so `/usr/bin/google-chrome` exists.

## Regenerate content

`web/scripts/gen-content.py` writes `web/src/content/{curriculum,depth,errors,bank,code,spot}.ts`. It does not write `glossary.ts`.

`web/scripts/glossary_build.py` writes `web/src/content/glossary.ts`. It keeps every entry in `tools/content-src/glossary.json` (204 entries) and appends the terms in `glossary_extra.py` and the modules it loads. Runnable examples are executed with the local Python and must match `out`. Examples that cannot run in Pyodide 0.26.4 are stored with `run: false`.

`gen-content.py` reads:

- `tools/content-src/depth.json`
- `tools/content-src/bank.ts`
- `tools/content-src/code.js`
- `tools/content-src/spot.js`
- `/tmp/olddata.json`, a JSON object with `BELTS`, `BELT_ERR`, `ERRS`, `ERR_PY`, and `ERR_HIER` from the original app

`glossary_build.py` also reads `tools/content-src/glossary.json`.

The nine later-belt error snippets are executed with `python3` on the machine that runs the script. The committed encyclopedia was captured with CPython 3.13.5 (`ERR_PY` in `web/src/content/errors.ts`). Another interpreter can change the message text. Do not regenerate on a different version unless you mean to update `ERR_PY` and review the diff.

`lessons.ts` is hand-written and is not overwritten.

`tools/content-src/verify.js`, `verify_code.js`, and `verify_spot.js` check the older content sources. They are not the React test suite. CI runs Vitest and `tests/qa.cjs`.

The map outline in `web/src/geo.ts` can be regenerated with `web/tests/project-map.py` when a geoBoundaries GeoJSON is available locally. That file is not in the repository. The committed path is the simplified trace (equirectangular, Douglas–Peucker).

## Build the helper

From `server/`, with `CGO_ENABLED=0` so the binary does not depend on a local C library:

| GOOS | GOARCH | File name |
|---|---|---|
| linux | amd64 | `pydojo-linux-x64` |
| darwin | arm64 | `pydojo-mac-arm64` |
| darwin | amd64 | `pydojo-mac-x64` |
| windows | amd64 | `pydojo-windows-x64.exe` |

```bash
cd server
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o /tmp/pydojo-linux-x64 .
```

`go.mod` says `go 1.21` and the program uses only the standard library. The same four targets are what [`.github/workflows/release.yml`](../.github/workflows/release.yml) builds.

Put a binary in a `bin/` directory only on your machine or inside the release zip. `app/bin/` is gitignored.

The release zip root looks like this:

```text
py-dojo-<version>/
├── index.html              Vite build
├── pyodide/                bundle.js and NOTICE.txt
├── data/README.txt
├── bin/                    the four binaries
├── Start Py Dojo (Windows).bat
├── Start Py Dojo (Mac).command
├── start-linux.sh
├── README.txt
├── .nojekyll
├── LICENSE
├── THIRD_PARTY_NOTICES.md
└── SHA256SUMS.txt          hashes of the four binaries
```

The zip and a hash of the zip are attached to the GitHub Release for a `v*.*.*` tag. A manual run of the workflow uploads the zip as an artifact and does not publish a release.

Point the helper at a built tree with `PYDOJO_DIR` when the binary is not sitting in `bin/` next to `index.html`:

```bash
PYDOJO_DIR=/path/to/web/dist PYDOJO_NO_BROWSER=1 /tmp/pydojo
```

## Pages

[`.github/workflows/pages.yml`](../.github/workflows/pages.yml) runs `npm ci` and `npm run build` in `web/`, then uploads a site directory that contains `dist` (the HTML and `pyodide/`) and `packaging/.nojekyll`. It does not upload `server/`, `tools/`, or `docs/`.

The site URL is <https://bronxtj.github.io/py-dojo/>. `base` is `./`, so asset URLs stay relative. Hash routes mean the host does not need a fallback to `index.html`.

To try that path locally, the acceptance suite already does: it symlinks `dist` to `<tmpdir>/py-dojo` and opens `http://localhost:<port>/py-dojo/`.

## Do not commit

- `web/node_modules/`, `web/dist/`, `web/qa-results/`
- `app/data/*.json` — someone's progress, if a client used the helper API
- `app/bin/` — built helpers
- virtualenvs, editor folders

The Pyodide bundle is about 18 MB, under GitHub's 100 MB file limit, and it stays in git so a clone and the Pages site can both run offline.
