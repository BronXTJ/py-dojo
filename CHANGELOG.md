# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-25

Initial public source tree.

### Added

- Single-page app in `app/`: belts from White to Master, XP, streaks, profiles, a dark theme, the White Belt lesson path, the error encyclopedia, a 204-term glossary, and an in-browser Python playground.
- Embedded Pyodide 0.26.4 runtime (`app/pyodide/bundle.js`) so the playground can run without a network.
- Go source for the localhost helper (`server/`), which serves the app and writes `app/data/<profile>.json`.
- Content generators and verifiers in `tools/content-src/`.
- GitHub Actions workflow that deploys `app/` to GitHub Pages.
- GitHub Actions workflow that cross-compiles the helper and attaches an offline zip to a GitHub Release. Prebuilt binaries are not stored in git.

[0.1.0]: https://github.com/BronXTJ/py-dojo/releases/tag/v0.1.0
