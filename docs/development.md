# Development

## Layout

```text
app/index.html          the page learners use; content constants live in this file
app/pyodide/bundle.js   vendored Pyodide 0.26.4 core, unmodified
server/                 Go helper
tools/content-src/      generators and verifiers
docs/                   these notes, the banner, and screenshots
```

The page does not fetch the JSON files in `tools/content-src/`. Those files are the last generated snapshot. Shipping a change means updating the constant in `app/index.html` as well.

## Regenerate content

Work in `tools/content-src/`. You need Python 3 and Node.js. The scripts call `python3`.

| Source | Writes | What it checks |
|---|---|---|
| `glossary_src.py` | `glossary.json` | Each code sample runs, and the captured stdout is stored |
| `errors_src.py` | `errors.json` | Each snippet raises the named error, or exits 0 when the entry is "NOT an error". The message and traceback are stored. |
| `depth_src.py` | `depth.json` | Try-it and deeper snippets are run and their output is stored |
| `bank.js` (and `bank.ts`) | nothing | Lesson text and exercise templates. `verify.js` reads `bank.js`. |
| `code.js` | nothing | Playground templates. `verify_code.js` reads it. |
| `spot.js` | nothing | Spot-the-error templates. `verify_spot.js` reads it. |

```bash
cd tools/content-src
python3 glossary_src.py
python3 errors_src.py
python3 depth_src.py
node verify.js
node verify_code.js
node verify_spot.js
```

`errors_src.py` records `sys.version`. The encyclopedia in the app was captured with **CPython 3.13.5** (`ERR_PY` in `app/index.html`). Running the script on another version can change punctuation and caret lines. Keep the committed messages and the version string in step.

`bank.ts` is the typed copy of the lesson bank. `bank.js` is what `verify.js` and the page use. If you change one, change the other.

After a generator run, copy the new data into the matching `const` in `app/index.html`:

| Constant | Comes from |
|---|---|
| `GLOSS` | `glossary.json` |
| `ERRS` | the `errors` array in `errors.json`, and set `ERR_PY` to the `python` field |
| `DEPTH` | `depth.json` |
| `BANK` | `bank.js` |
| `CODE_TPL` | `code.js` |
| `SPOT_TPL` | `spot.js` |

There is no splice script. A review should be able to see the constant change in the diff.

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

Put a binary in `app/bin/` only on your machine. That directory is gitignored. The release workflow builds a zip whose root looks like this:

```text
py-dojo-<version>/
├── index.html
├── pyodide/
├── data/README.txt
├── bin/                 the four binaries
├── Start Py Dojo (Windows).bat
├── Start Py Dojo (Mac).command
├── start-linux.sh
├── README.txt
├── LICENSE
├── THIRD_PARTY_NOTICES.md
└── SHA256SUMS.txt       hashes of the four binaries
```

The zip and a hash of the zip are attached to the GitHub Release for a `v*.*.*` tag. A manual run of the workflow uploads the zip as an artifact and does not publish a release.

## Pages

[`.github/workflows/pages.yml`](../.github/workflows/pages.yml) publishes the `app/` directory, including the Pyodide bundle and the `.nojekyll` file. It does not publish `server/`, `tools/`, or `docs/`.

The site URL is <https://bronxtj.github.io/py-dojo/>. To try that path locally, serve a parent directory so the app is mounted at `/py-dojo/` and open it with a hostname that is not `localhost` if you want the browser-storage path. On `localhost` the page will look for the helper.

## Do not commit

- `app/data/*.json` — someone's progress
- `app/bin/` — built helpers
- `node_modules/`, virtualenvs, editor folders

The Pyodide bundle is about 18 MB, under GitHub's 100 MB file limit, and it stays in git so a clone and the Pages site can both run offline.
