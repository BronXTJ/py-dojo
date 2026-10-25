#!/bin/sh
# Py Dojo launcher: starts the tiny bundled server (saves progress into the data folder) and opens your browser.
cd "$(dirname "$0")"
xattr -dr com.apple.quarantine . 2>/dev/null
if [ "$(uname -m)" = "arm64" ]; then BIN=bin/pydojo-mac-arm64; else BIN=bin/pydojo-mac-x64; fi
chmod +x "$BIN" 2>/dev/null
echo "Starting Py Dojo... keep this window open while you learn. Close it to stop."
"./$BIN" && exit 0
echo "Bundled server could not start. Trying installed Python (progress saves in the browser only)..."
PY=$(command -v python3 || command -v python)
if [ -n "$PY" ]; then (sleep 1; open http://localhost:8473/) & exec "$PY" -m http.server 8473 --bind 127.0.0.1; fi
open index.html
