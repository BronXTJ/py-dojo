# Start here

Py Dojo is one web page. You do not install Python to use the lessons. You do need a current Chrome, Edge, Firefox, or Safari.

There are three ways in. They differ in where progress is stored.

## 1. Use the public site

<https://bronxtj.github.io/py-dojo/>

> [!IMPORTANT]
> This address works after the repository owner sets **Settings → Pages → Build and deployment → Source** to **GitHub Actions** and the Pages workflow has run on `main`. The workflow cannot change that setting.

On the public site the save line says the progress is in **this browser**. There is no account. Export a JSON file from the bottom of the page if you want a copy you can move.

The first visit shows a short welcome. Python in the playground usually takes about ten seconds the first time, then the status line says it is using the offline copy.

## 2. Download an offline copy

<https://github.com/BronXTJ/py-dojo/releases/latest>

> [!IMPORTANT]
> The zip is attached to a GitHub Release when someone pushes a version tag such as `v0.1.0`. It is not stored in the git repository. Until that tag exists, the releases page has nothing to download. Cloning the repository is the other way to get the files; see below.

1. Download `py-dojo-<version>-offline.zip` and unzip it.
2. Start the helper for your system. Leave its window open while you learn.
3. The browser opens at <http://localhost:8473/>. Wait for "Python is ready" in the playground.
4. Progress is written to the `data` folder inside the unzipped folder. The save line says when the file was written.

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

The launchers try `python3 -m http.server` on port 8473 next. That serves the page, but it does not provide the save API, so progress stays in the browser. You can also double-click `index.html`. Keep the `pyodide` folder next to `index.html` or Python in the playground will not start offline.

If the helper says port 8473 was busy, it tries the next port up to 8482. Close the other window, or keep going: the progress file for that folder still loads.

## 3. Run a clone

The git repository does not contain the helper binaries. Build one, or serve the folder with Python.

```bash
git clone https://github.com/BronXTJ/py-dojo.git
cd py-dojo
mkdir -p app/bin
cd server
CGO_ENABLED=0 go build -o ../app/bin/pydojo-linux-x64 .
cd ..
./app/start-linux.sh
```

`PYDOJO_NO_BROWSER=1` stops the helper from opening a browser. `PYDOJO_DIR` points the helper at the app folder when the binary is not sitting in `app/bin/`:

```bash
cd server
CGO_ENABLED=0 go build -o /tmp/pydojo .
PYDOJO_DIR="$PWD/../app" PYDOJO_NO_BROWSER=1 /tmp/pydojo
```

Cross-compile targets are `linux/amd64`, `darwin/arm64`, `darwin/amd64`, and `windows/amd64`. Names and the release workflow are in [development.md](development.md).

## While you learn

- Pick a name under **Who's training?** if more than one person uses the same browser or the same folder. Names are letters, numbers, spaces, hyphens, or underscores, up to 32 characters.
- **Export progress** writes a JSON file. **Import progress** reads one back. That is how a Pages profile moves onto an offline copy, and the other way around.
- Day and night is the button at the top. Dark is the default.
- Code in the playground is stopped after 5 seconds, so a loop that never ends does not freeze the page.

More on what is stored: [architecture.md](architecture.md). The map of belts: [curriculum.md](curriculum.md).
