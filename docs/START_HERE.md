# Start here

Py Dojo is a web app. You do not install Python to use the lessons. You do need a current Chrome, Edge, Firefox, or Safari.

Progress is stored in the browser. Export on the home screen writes a JSON file. Import reads one back.

## 1. Use the public site

<https://bronxtj.github.io/py-dojo/>

> [!IMPORTANT]
> This address works after the repository owner sets **Settings → Pages → Build and deployment → Source** to **GitHub Actions** and the Pages workflow has run on `main`. The workflow cannot change that setting.

Wait until the status line says Python is ready. The first start reads `pyodide/bundle.js` from the site. There is no account.

## 2. Download an offline copy

<https://github.com/BronXTJ/py-dojo/releases/latest>

> [!IMPORTANT]
> The zip is attached to a GitHub Release when someone pushes a version tag such as `v0.2.0`. It is not stored in the git repository. Until that tag exists, the releases page has nothing to download. Cloning the repository is the other way to get the files; see below.

1. Download `py-dojo-<version>-offline.zip` and unzip it. Leave `index.html` and the `pyodide` folder side by side.
2. Start the helper for your system. Leave its window open while you learn.
3. The browser opens at <http://localhost:8473/>. Wait until Python is ready.

| System | What to open |
|---|---|
| Windows | `Start Py Dojo (Windows).bat` |
| macOS | `Start Py Dojo (Mac).command` (right-click, then Open, the first time) |
| Linux | `./start-linux.sh` in a terminal |

### Windows SmartScreen

The helper is unsigned, so Windows may say "Windows protected your PC".

Choose **More info**, then **Run anyway**.

Windows Firewall may ask about network access. The helper listens only on `127.0.0.1`. Choosing **Cancel** is fine; the page can still open if you go to <http://localhost:8473/> yourself.

### macOS Gatekeeper

The first time, macOS may say the file cannot be opened because the developer is not identified.

Right-click `Start Py Dojo (Mac).command`, choose **Open**, then **Open** again.

If it still refuses, in Terminal:

```bash
xattr -dr com.apple.quarantine "/path/to/the/unzipped/folder"
```

Then try the command file again. On Apple silicon the helper is `bin/pydojo-mac-arm64`. On an Intel Mac it is `bin/pydojo-mac-x64`.

### Linux

```bash
chmod +x start-linux.sh
./start-linux.sh
```

### If the Start file cannot launch the helper

The launchers try `python3 -m http.server` on port 8473 next, then open `index.html` directly. Python in the page still needs the `pyodide` folder next to `index.html`.

If the helper says port 8473 was busy, it tries the next port up to 8482.

The short guide packed inside the zip is `README.txt` from [`packaging/README.txt`](../packaging/README.txt).

## 3. Run a clone

The git repository does not contain the helper binaries, and it does not contain the Vite build. Install Node.js 22, then:

```bash
git clone https://github.com/BronXTJ/py-dojo.git
cd py-dojo/web
npm ci
npm run dev
```

The dev server serves the Pyodide runtime from `app/pyodide/`.

To open the production build:

```bash
npm run build
```

`web/dist/index.html` opens directly in a browser if `web/dist/pyodide/` is beside it. To serve that folder with the helper:

```bash
cd ../server
CGO_ENABLED=0 go build -o /tmp/pydojo .
PYDOJO_DIR="$PWD/../web/dist" PYDOJO_NO_BROWSER=1 /tmp/pydojo
```

`PYDOJO_NO_BROWSER=1` does not open a browser. Visit <http://localhost:8473/>.

Cross-compile targets are `linux/amd64`, `darwin/arm64`, `darwin/amd64`, and `windows/amd64`. Names and the release workflow are in [development.md](development.md).

## While you learn

- **Export** on the home screen writes `py-dojo-progress-<date>.json`. **Import** reads a file back. A file that is not Py Dojo progress is refused, and the current save stays.
- Day and night follows the saved theme. Dark is the default.
- Code is stopped after 4 seconds, so a loop that never ends does not freeze the page.

More on what is stored: [architecture.md](architecture.md). The map of belts: [curriculum.md](curriculum.md).
