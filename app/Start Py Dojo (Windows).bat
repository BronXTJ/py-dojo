@echo off
REM Py Dojo launcher: starts the tiny bundled server (saves progress into the data folder) and opens your browser.
cd /d "%~dp0"
echo Starting Py Dojo... keep this window open while you learn. Close it to stop.
"%~dp0bin\pydojo-windows-x64.exe"
if errorlevel 1 (
  echo Bundled server could not start. Trying installed Python...
  start "" http://localhost:8473/
  python -m http.server 8473 --bind 127.0.0.1 || py -m http.server 8473 --bind 127.0.0.1 || start "" "%~dp0index.html"
)
