# Contributing to Py Dojo

Thank you for helping. Py Dojo is a learning app, so a change that is kind to a beginner is as useful as a change that is clever.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## What to know first

- The app learners open is [`app/index.html`](app/index.html). It is one page: HTML, CSS, and JavaScript, plus the Pyodide file beside it.
- The local helper is [`server/main.go`](server/main.go). It only listens on `127.0.0.1` and only writes under `app/data/`.
- Lesson generators live in [`tools/content-src/`](tools/content-src/). They do not rewrite `app/index.html` by themselves. See [docs/development.md](docs/development.md).
- Do not commit progress files (`app/data/*.json`) or helper binaries (`app/bin/`). Progress is personal. Binaries are built when a version tag is pushed.

## Local run

Go 1.21 or newer:

```bash
mkdir -p app/bin
cd server
CGO_ENABLED=0 go build -o ../app/bin/pydojo-linux-x64 .
cd ..
PYDOJO_NO_BROWSER=1 ./app/start-linux.sh
```

On macOS, build `pydojo-mac-arm64` or `pydojo-mac-x64` into `app/bin/` and open `Start Py Dojo (Mac).command`. On Windows, build `pydojo-windows-x64.exe` and run `Start Py Dojo (Windows).bat`.

Without Go, serve the folder yourself. Progress then stays in the browser, which is also what GitHub Pages does:

```bash
cd app
python3 -m http.server 8473 --bind 127.0.0.1
```

## Checks before a pull request

From `tools/content-src/`, with Python 3 and Node.js:

```bash
node verify.js
node verify_code.js
node verify_spot.js
```

`verify_code.js` and `verify_spot.js` should print `problems: 0`. `verify.js` checks lesson output and also flags multiple-choice sets that repeat an option. On the current White Belt bank that second check reports findings. Do not treat a non-zero line there as a new regression unless the count goes up or a line says the Python output disagreed. Details are in the README under Testing.

If you change `server/`:

```bash
cd server
gofmt -w .
CGO_ENABLED=0 go build -o /tmp/pydojo .
```

Please describe how you ran the app. Screenshots help when the change is visible.

## Content changes

Edit the generator, run it, and then update the matching constant inside `app/index.html` (`BANK`, `CODE_TPL`, `SPOT_TPL`, `GLOSS`, `ERRS`, or `DEPTH`). A JSON file under `tools/content-src/` is not what the page reads.

Error messages in the encyclopedia were captured with CPython 3.13.5. Regenerating `errors.json` with another version can change the text. Say which interpreter you used.

## Pull requests

- One concern per pull request, with a short summary of why.
- Keep the MIT license header situation intact: original work stays MIT, and Pyodide stays under the notices in `THIRD_PARTY_NOTICES.md` and `app/pyodide/NOTICE.txt`.
- Do not add analytics, accounts, or a dependency that the page must download before it can teach.

## Reporting problems

Use the bug report template. Include the browser, whether you used GitHub Pages, a downloaded zip, or a local server, and whether the save line said the browser or the progress file.
