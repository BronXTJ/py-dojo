#!/bin/sh
# Py Dojo launcher: starts the tiny bundled server (saves progress into the data folder) and opens your browser.
# PYDOJO_NO_BROWSER=1 skips opening a browser.
cd "$(dirname "$0")"
chmod +x bin/pydojo-linux-x64 2>/dev/null
echo "Starting Py Dojo... keep this terminal open while you learn. Press Ctrl+C to stop."
./bin/pydojo-linux-x64 && exit 0
echo "Bundled server could not start. Trying installed Python (progress saves in the browser only)..."
PY=$(command -v python3 || command -v python)
if [ -n "$PY" ]; then [ -z "$PYDOJO_NO_BROWSER" ] && (sleep 1; xdg-open http://localhost:8473/ >/dev/null 2>&1) & exec "$PY" -m http.server 8473 --bind 127.0.0.1; fi
xdg-open "file://$(pwd)/index.html"
