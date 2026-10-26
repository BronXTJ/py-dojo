## Summary

What changed, and why a learner or a maintainer would care.

## How it was checked

- [ ] `npm run typecheck`, `npm run lint`, and `npm test` in `web/`
- [ ] `npm run build`, and `npm run qa -- chromium` if the UI or the build changed
- [ ] `gofmt` and `go build` for `server/`, if the helper changed
- [ ] No progress JSON, no helper binaries, and no `web/dist/` added

## Notes

Browser, and whether you opened GitHub Pages, a release zip, `web/dist/index.html`, or the dev server.
