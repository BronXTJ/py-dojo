// Py Dojo local server: serves the app folder on 127.0.0.1 and saves progress
// to data/<profile>.json. It never writes anywhere else.
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"runtime"
	"sort"
	"strings"
)

const basePort = 8473

var profileRe = regexp.MustCompile(`^[A-Za-z0-9 _-]{1,32}$`)

func appDir() string {
	if d := os.Getenv("PYDOJO_DIR"); d != "" {
		return d
	}
	exe, err := os.Executable()
	if err != nil {
		return "."
	}
	return filepath.Dir(filepath.Dir(exe)) // binaries live in <app>/bin/
}

func localOnly(w http.ResponseWriter, r *http.Request, port int) bool {
	host, _, _ := net.SplitHostPort(r.RemoteAddr)
	ok := host == "127.0.0.1" || host == "::1"
	want := map[string]bool{fmt.Sprintf("127.0.0.1:%d", port): true, fmt.Sprintf("localhost:%d", port): true}
	if !want[r.Host] {
		ok = false
	}
	if o := r.Header.Get("Origin"); o != "" && !want[strings.TrimPrefix(o, "http://")] {
		ok = false
	}
	if !ok {
		http.Error(w, "forbidden", http.StatusForbidden)
	}
	return ok
}

func profileFile(data string, r *http.Request) (string, bool) {
	p := r.URL.Query().Get("profile")
	if p == "" {
		p = "default"
	}
	if !profileRe.MatchString(p) {
		return "", false
	}
	return filepath.Join(data, strings.ReplaceAll(p, " ", "_")+".json"), true
}

func main() {
	dir := appDir()
	data := filepath.Join(dir, "data")
	var ln net.Listener
	var port int
	for port = basePort; port < basePort+10; port++ {
		l, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", port))
		if err == nil {
			ln = l
			break
		}
	}
	if ln == nil {
		fmt.Println("No free port between 8473 and 8482. Close other Py Dojo windows and try again.")
		os.Exit(1)
	}
	if port != basePort {
		fmt.Printf("WARNING: port %d was busy, using %d. Browser-only saves from other runs won't show here, but your progress file still will.\n", basePort, port)
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/api/load", func(w http.ResponseWriter, r *http.Request) {
		if !localOnly(w, r, port) {
			return
		}
		f, ok := profileFile(data, r)
		if !ok {
			http.Error(w, "bad profile", 400)
			return
		}
		b, err := os.ReadFile(f)
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Cache-Control", "no-store")
		if err != nil {
			w.Write([]byte("null"))
			return
		}
		w.Write(b)
	})
	mux.HandleFunc("/api/save", func(w http.ResponseWriter, r *http.Request) {
		if !localOnly(w, r, port) {
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "POST only", 405)
			return
		}
		f, ok := profileFile(data, r)
		if !ok {
			http.Error(w, "bad profile", 400)
			return
		}
		body, err := io.ReadAll(io.LimitReader(r.Body, 1<<20+1))
		if err != nil || len(body) > 1<<20 || !json.Valid(body) {
			http.Error(w, "invalid JSON or too large", 400)
			return
		}
		os.MkdirAll(data, 0o755)
		tmp := f + ".tmp"
		if err := os.WriteFile(tmp, body, 0o644); err != nil {
			http.Error(w, "write failed", 500)
			return
		}
		if err := os.Rename(tmp, f); err != nil {
			http.Error(w, "write failed", 500)
			return
		}
		w.Write([]byte(`{"ok":true}`))
	})
	mux.HandleFunc("/api/profiles", func(w http.ResponseWriter, r *http.Request) {
		if !localOnly(w, r, port) {
			return
		}
		names := []string{}
		files, _ := filepath.Glob(filepath.Join(data, "*.json"))
		for _, f := range files {
			names = append(names, strings.ReplaceAll(strings.TrimSuffix(filepath.Base(f), ".json"), "_", " "))
		}
		sort.Strings(names)
		b, _ := json.Marshal(names)
		w.Header().Set("Content-Type", "application/json")
		w.Write(bytes.TrimSpace(b))
	})
	static := http.FileServer(http.Dir(dir))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if !localOnly(w, r, port) {
			return
		}
		if strings.HasPrefix(r.URL.Path, "/data/") || strings.HasPrefix(r.URL.Path, "/bin/") {
			http.NotFound(w, r)
			return
		}
		static.ServeHTTP(w, r)
	})
	url := fmt.Sprintf("http://localhost:%d/", port)
	fmt.Println("Py Dojo is running at " + url + "  (close this window to stop)")
	if os.Getenv("PYDOJO_NO_BROWSER") == "" {
		go openBrowser(url)
	}
	http.Serve(ln, mux)
}

func openBrowser(u string) {
	switch runtime.GOOS {
	case "windows":
		exec.Command("rundll32", "url.dll,FileProtocolHandler", u).Start()
	case "darwin":
		exec.Command("open", u).Start()
	default:
		exec.Command("xdg-open", u).Start()
	}
}
