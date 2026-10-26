#!/usr/bin/env python3
"""Merge the original 204-term glossary with glossary_extra.py and write src/content/glossary.ts.

Runnable examples are executed with the local Python and must match `out`.
Examples that cannot run in Pyodide 0.26.4 are stored with run: false (display only).
"""
from __future__ import annotations

import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_JSON = ROOT.parent / "tools" / "content-src" / "glossary.json"
OUT = ROOT / "src" / "content" / "glossary.ts"

# Code that imports or calls something the vendored Pyodide 0.26.4 core does not provide.
SKIP = re.compile(
    r"sqlite3|asyncio\.run|multiprocessing|subprocess|tkinter|curses|"
    r"\bpip\b|urllib\.request|http\.client|socket\.|ssl\.|venv|"
    r"\bnumpy\b|\bnp\.|pandas|geopandas|shapely|rasterio|pyproj|folium|"
    r"sklearn|matplotlib|sqlalchemy|fastapi|flask|django|requests|"
    r"bs4|duckdb|pyarrow|airflow|kafka|docker|pytest",
    re.I,
)

BELT_CAT = {
    0: "Foundations",
    1: "Control flow",
    2: "Data structures",
    3: "Functions",
    4: "Robust code",
    5: "OOP",
    6: "Advanced Python",
    7: "Testing and tools",
    8: "Internals",
    9: "Real-world",
}

# Look back only where a White Belt lesson actually teaches the idea.
LESSON = {
    "program": "white-1",
    "code": "white-1",
    "source code": "white-1",
    "interpreter": "white-1",
    "script": "white-1",
    "statement": "white-1",
    "Python": "white-2",
    "PATH": "white-2",
    "terminal": "white-2",
    "command line": "white-2",
    "REPL": "white-3",
    "prompt": "white-3",
    "expression": "white-3",
    "IDE": "white-4",
    "VS Code": "white-4",
    "extension": "white-4",
    "print": "white-5",
    "output": "white-5",
    "comment": "white-6",
    "variable": "white-7",
    "assignment": "white-7",
    "value": "white-7",
    "literal": "white-7",
    "identifier": "white-8",
    "snake_case": "white-8",
    "keyword": "white-8",
    "case-sensitive": "white-8",
    "integer": "white-9",
    "int": "white-9",
    "float": "white-9",
    "floating-point precision": "white-9",
    "Decimal": "white-9",
    "string": "white-10",
    "str": "white-10",
    "f-string": "white-10",
    "concatenation": "white-10",
    "escape character": "white-10",
    "boolean": "white-11",
    "comparison": "white-11",
    "logical operator": "white-11",
    "None": "white-12",
    "NoneType": "white-12",
    "input": "white-13",
    "type conversion": "white-14",
    "casting": "white-14",
    "operator": "white-15",
    "operand": "white-15",
    "precedence": "white-15",
    "floor division": "white-15",
    "modulo": "white-15",
}


def run_code(code: str) -> str:
    r = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True, timeout=5)
    if r.returncode != 0:
        raise SystemExit(f"example failed:\n{code}\n{r.stderr}")
    out = r.stdout
    if out.endswith("\n"):
        out = out[:-1]
    return out


def norm_old(raw: dict) -> dict:
    code = raw.get("code") or ""
    out = raw.get("out") or ""
    runnable = bool(code) and bool(out) and not SKIP.search(code) and "input(" not in code
    if runnable:
        got = run_code(code)
        if got != out:
            raise SystemExit(f"old example drift for {raw['term']!r}\n expected {out!r}\n got {got!r}")
    return {
        "term": raw["term"],
        "pron": raw.get("pron") or "",
        "meaning": raw["meaning"],
        "why": raw.get("why") or "",
        "code": code,
        "out": out if runnable else ("" if SKIP.search(code) else out),
        "gis": raw.get("gis") or "",
        "related": raw.get("related") or "",
        "belt": int(raw["belt"]),
        "category": BELT_CAT[int(raw["belt"])],
        "run": runnable,
        "lesson": LESSON.get(raw["term"], ""),
    }


def main() -> None:
    sys.path.insert(0, str(ROOT / "scripts"))
    from glossary_extra import ROWS  # type: ignore

    old = [norm_old(x) for x in json.loads(SRC_JSON.read_text())]
    seen = {x["term"].casefold() for x in old}
    extra = []
    for row in ROWS:
        key = row["term"].casefold()
        if key in seen:
            continue
        seen.add(key)
        code = row.get("code") or ""
        want = row.get("run", False)
        if want:
            if SKIP.search(code) or "input(" in code:
                raise SystemExit(f"{row['term']} is marked runnable but cannot run in Pyodide:\n{code}")
            got = run_code(code)
            if got != row.get("out", ""):
                raise SystemExit(f"example drift for {row['term']!r}\n expected {row.get('out')!r}\n got {got!r}")
        extra.append(
            {
                "term": row["term"],
                "pron": row.get("pron") or "",
                "meaning": row["meaning"],
                "why": row.get("why") or "",
                "code": code,
                "out": row.get("out") or "" if want else "",
                "gis": row.get("gis") or "",
                "related": row.get("related") or "",
                "belt": int(row["belt"]),
                "category": row["category"],
                "run": bool(want),
                "lesson": row.get("lesson") or LESSON.get(row["term"], ""),
            }
        )
    all_rows = old + extra
    terms = {r["term"].casefold() for r in all_rows}
    if len(terms) != len(all_rows):
        raise SystemExit("duplicate terms")
    if len(all_rows) < 1000:
        raise SystemExit(f"only {len(all_rows)} terms")
    for r in all_rows:
        if not r["term"] or not r["meaning"] or not r["category"]:
            raise SystemExit(f"missing fields on {r['term']!r}")
        if not (0 <= r["belt"] <= 9):
            raise SystemExit(f"bad belt {r['term']}")
        if r["lesson"] and not re.fullmatch(r"white-\d+", r["lesson"]):
            raise SystemExit(f"bad lesson {r['term']} {r['lesson']}")
        for part in [p.strip() for p in r["related"].split(",") if p.strip()]:
            if part.casefold() not in terms:
                raise SystemExit(f"{r['term']!r} related {part!r} does not resolve")
            if part.casefold() == r["term"].casefold():
                raise SystemExit(f"{r['term']!r} related to itself")
    body = json.dumps(all_rows, ensure_ascii=False, indent=1)
    OUT.write_text(
        "/* Generated by scripts/glossary_build.py. Do not edit by hand. */\n"
        'import type { GlossEntry } from "../types";\n'
        "export const GLOSSARY: GlossEntry[] = "
        + body
        + ";\n"
    )
    from collections import Counter

    cats = Counter(r["category"] for r in all_rows)
    belts = Counter(r["belt"] for r in all_rows)
    runnable = sum(1 for r in all_rows if r["run"])
    shown = sum(1 for r in all_rows if r["code"] and not r["run"])
    print(f"terms {len(all_rows)} runnable {runnable} display-only examples {shown}")
    print("belts", dict(sorted(belts.items())))
    for c, n in cats.most_common():
        print(f"{n:4}  {c}")


if __name__ == "__main__":
    main()
