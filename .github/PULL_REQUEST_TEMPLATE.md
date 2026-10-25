## Summary

What changed, and why a learner or a maintainer would care.

## How it was checked

- [ ] App still opens from `app/index.html` (local server or the Pages path `/py-dojo/`)
- [ ] `node verify_code.js` and `node verify_spot.js` print `problems: 0`, if content changed
- [ ] `gofmt` and `go build` for `server/`, if the helper changed
- [ ] No progress JSON and no binaries added

## Notes

Screenshots, browser, and whether progress was saved in the browser or in `app/data/`.
