PY DOJO - learn Python, one tiny win at a time
================================================
Works with NO internet and NO Python installed. You only need a browser
(Chrome, Edge, Firefox or Safari).

START
1. Copy the whole "Py Dojo" folder to the computer (unzip it first if zipped).
2. Double-click the Start file for your system:
   - Windows: "Start Py Dojo (Windows).bat"
   - Mac:     right-click "Start Py Dojo (Mac).command" > Open
   - Linux:   ./start-linux.sh
   A small window stays open: that's the Py Dojo helper. Keep it open while
   you learn, and close it when you're done.
3. Your browser opens at http://localhost:8473. Wait about 10 seconds for
   "Python is ready" in the Code playground.
4. Progress saves automatically into the "data" folder inside Py Dojo.
   Look for "Saved ✓" at the top of the page.
5. Several friends? Use "Who's training?" to pick or add your name.

NO START FILE? You can also just double-click index.html. Everything works,
including Python, but progress then saves only inside that browser.
Use Export / Import progress (bottom of the page) to move it.

SECURITY PROMPTS (normal for a program you downloaded)
- Windows SmartScreen "Windows protected your PC": click "More info" >
  "Run anyway". Windows Firewall may ask about network access; Py Dojo only
  listens on this computer (localhost), so "Cancel" is fine.
- macOS Gatekeeper "cannot be opened / unidentified developer": right-click
  the file > Open > Open. If it still refuses, open Terminal and run:
    xattr -dr com.apple.quarantine "/path/to/Py Dojo"
  then try again.

WHAT'S INSIDE
- index.html          the whole app
- pyodide/bundle.js   real Python 3.12 (Pyodide 0.26.4, open source)
- bin/                the tiny Py Dojo helper for Windows, Mac and Linux
                      (serves this folder and saves data/<name>.json only)
- data/               your saved progress
- Start files         launchers

TROUBLESHOOTING
- "port 8473 was busy": another Py Dojo is open. Close it, or carry on; your
  progress file still loads.
- Python couldn't start: keep the pyodide folder next to index.html.
- Code that runs forever is stopped after 5 seconds.
