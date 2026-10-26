# Contributing to Py Dojo

Thank you for helping. Py Dojo is a learning app, so a change that is kind to a beginner is as useful as a change that is clever.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## What to know first

- The app learners open is the Vite build of [`web/`](web/). React and TypeScript live in `web/src`. The production page is one `index.html` plus `pyodide/` beside it.
- The Pyodide runtime is [`app/pyodide/bundle.js`](app/pyodide/bundle.js). Leave it unmodified. Its notice is [`app/pyodide/NOTICE.txt`](app/pyodide/NOTICE.txt).
- The local helper is [`server/main.go`](server/main.go). It only listens on `127.0.0.1`. The React UI stores progress in the browser and does not call the helper's save API.
- Launchers and the zip README live in [`packaging/`](packaging/).
- Do not commit `web/dist/`, `web/node_modules/`, `web/qa-results/`, progress JSON, or helper binaries.

## Local run

Node.js 22:

```bash
cd web
npm ci
npm run dev
```

The dev server reads Pyodide from `app/pyodide/`.

Go 1.21 or newer, after `npm run build`, if you want the helper:

```bash
cd server
CGO_ENABLED=0 go build -o /tmp/pydojo .
PYDOJO_DIR="$PWD/../web/dist" PYDOJO_NO_BROWSER=1 /tmp/pydojo
```

## Checks before a pull request

From `web/`:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run qa -- chromium
```

Chromium must be installed. `CHROME_PATH` overrides `/usr/bin/google-chrome`. CI runs the same commands.

If you change `server/`:

```bash
cd server
gofmt -w .
CGO_ENABLED=0 go build -o /tmp/pydojo .
```

Please describe how you ran the app. Screenshots help when the change is visible.

## Content changes

Lesson choices for the 15 White Belt lessons are hand-written in `web/src/content/lessons.ts`.

The generated modules (`curriculum.ts`, `depth.ts`, `glossary.ts`, `errors.ts`, `bank.ts`, `code.ts`, `spot.ts`) come from `npm run gen`, which reads [`tools/content-src/`](tools/content-src/) and `/tmp/olddata.json`. See [docs/development.md](docs/development.md). A JSON file under `tools/content-src/` is not what the page reads until that script has written the TypeScript module.

Error messages in the encyclopedia were captured with CPython 3.13.5 (`ERR_PY`). Regenerating them with another version can change the text. Say which interpreter you used.

## Pull requests

- One concern per pull request, with a short summary of why.
- Keep the MIT license intact: original work stays MIT, Pyodide stays under the notices in `THIRD_PARTY_NOTICES.md` and `app/pyodide/NOTICE.txt`, and the Sri Lanka outline keeps the geoBoundaries CC BY 4.0 credit.
- Do not add analytics, accounts, or a dependency that the page must download before it can teach.

## Reporting problems

Use the bug report template. Include the browser, and whether you used GitHub Pages, a downloaded zip, or a local server.
