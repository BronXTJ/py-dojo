# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-10-26

### Added

- Glossary expanded from 204 terms to 1,247, across the whole curriculum: core Python, the standard library, testing, Git and CI, concurrency, data and GIS libraries, machine learning, Docker, design, and Sinhala and Tamil Unicode.
- Category filter, A–Z jump, and a windowed list. Search and the belt filter stay. Word of the Day still picks one term per local calendar day.
- A Look back link when a White Belt lesson teaches the term. Snippets that cannot run in the vendored Pyodide are marked display-only.
- `web/scripts/glossary_build.py` checks runnable examples and writes `web/src/content/glossary.ts`.

## [0.2.0] - 2026-10-26

The app learners open is now the React + TypeScript build in `web/`.

### Added

- Vite app in `web/`: 15 White Belt lessons with seven stages, review, practice, a 43-entry error encyclopedia, a 204-term glossary, and a Living Lanka scene.
- Hash router and `base: "./"`, so the same build opens from a file, from the helper, and from GitHub Pages at `/py-dojo/`.
- CI workflow that typechecks, lints, runs Vitest, builds, and runs the Chromium acceptance suite.
- geoBoundaries CC BY 4.0 credit for the Sri Lanka outline.

### Changed

- GitHub Pages builds `web/` with Vite and publishes `dist/` (the page and `pyodide/`) instead of a hand-written `app/index.html`.
- The release zip is that build, plus `packaging/` launchers, `data/README.txt`, and the four helper binaries.
- Progress for the UI is `localStorage` key `pydojo-v2`, with Export and Import on the home screen. The helper still serves files and still implements `/api/*`. The React app does not call those routes.
- Python in the page loads only `pyodide/bundle.js`. A run is stopped after 4 seconds.

### Removed

- The single-file `app/index.html` from 0.1.0.

## [0.1.0] - 2026-10-25

Initial public source tree.

### Added

- Single-page app in `app/`: belts from White to Master, XP, streaks, profiles, a dark theme, the White Belt lesson path, the error encyclopedia, a 204-term glossary, and an in-browser Python playground.
- Embedded Pyodide 0.26.4 runtime (`app/pyodide/bundle.js`) so the playground can run without a network.
- Go source for the localhost helper (`server/`), which serves the app and writes `app/data/<profile>.json`.
- Content generators and verifiers in `tools/content-src/`.
- GitHub Actions workflow that deploys `app/` to GitHub Pages.
- GitHub Actions workflow that cross-compiles the helper and attaches an offline zip to a GitHub Release. Prebuilt binaries are not stored in git.

[0.3.0]: https://github.com/BronXTJ/py-dojo/compare/v0.2.0...main
[0.2.0]: https://github.com/BronXTJ/py-dojo/releases/tag/v0.2.0
[0.1.0]: https://github.com/BronXTJ/py-dojo/releases/tag/v0.1.0
