PY DOJO - learn Python, one tiny win at a time
================================================
Works with NO internet and NO Python installed. You only need a browser
(Chrome, Edge, Firefox or Safari).

START
1. Unzip this folder and leave it together. index.html and the pyodide
   folder must stay side by side.
2. Double-click the Start file for your system:
   - Windows: "Start Py Dojo (Windows).bat"
   - Mac:     right-click "Start Py Dojo (Mac).command" > Open
   - Linux:   ./start-linux.sh
   A small window stays open: that is the Py Dojo helper. Keep it open
   while you learn, and close it when you are done.
3. Your browser opens at http://localhost:8473. Wait until the status
   line says Python is ready.
4. Progress is saved in that browser. On the home screen, Export writes
   a JSON file you can move, and Import reads one back.

NO START FILE? You can also open index.html directly. Python still runs,
as long as the pyodide folder is next to index.html. Progress still
saves in the browser.

SECURITY PROMPTS (normal for a program you downloaded)
- Windows SmartScreen "Windows protected your PC": click "More info" >
  "Run anyway". Windows Firewall may ask about network access. Py Dojo
  only listens on this computer (localhost), so "Cancel" is fine.
- macOS Gatekeeper "cannot be opened / unidentified developer":
  right-click the file > Open > Open. If it still refuses, open Terminal
  and run:
    xattr -dr com.apple.quarantine "/path/to/Py Dojo"
  then try again.

WHAT'S INSIDE
- index.html          the app (one built page)
- pyodide/bundle.js   real Python 3.12 (Pyodide 0.26.4, MPL-2.0)
- pyodide/NOTICE.txt  the Pyodide notice
- bin/                the tiny helper for Windows, Mac and Linux
                      (serves this folder on 127.0.0.1)
- data/               unused by the app; the helper can write here only
                      if something calls its save API
- Start files         launchers
- LICENSE             MIT, for the Py Dojo app
- THIRD_PARTY_NOTICES.md
- SHA256SUMS.txt      hashes of the four helper binaries

TROUBLESHOOTING
- "port 8473 was busy": another Py Dojo is open. Close it, or carry on;
  the helper tries the next port through 8482.
- Python couldn't start: keep the pyodide folder next to index.html.
- Code that runs forever is stopped after 4 seconds.
