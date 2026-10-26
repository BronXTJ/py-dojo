# Curriculum

Ten belts, 119 topics. GIS shows up inside each belt instead of as a course at the end. A new save starts at White Belt with 0 XP. The belt table below is the map in `web/src/content/curriculum.ts`. Yellow through Master stay locked on the home screen and are labelled coming soon. XP amounts for lessons, review, and practice are listed in [architecture.md](architecture.md#progress).

> [!NOTE]
> White Belt is the path that is built: 15 lessons, each with seven stages (Hook, Learn, Watch, Try, Fix the bug, Quiz, Reward), plus the error encyclopedia and the glossary. Yellow through Master are on the map. Each of those belts has its topics, a GIS line, a boss-fight title, glossary entries, and a note about errors you will meet. Their lessons are not in the app yet.

## Belts

| Belt | XP | Theme | Topics | Glossary terms | Built today |
|---|---:|---|---:|---:|---|
| White | 0 | Foundations | 15 | 115 | 15 lessons, seven stages each, captured errors |
| Yellow | 300 | Control flow | 9 | 44 | Map, glossary, planned error note |
| Orange | 700 | Data structures | 11 | 101 | Map, glossary, planned error note |
| Green | 1200 | Functions and modules | 12 | 102 | Map, glossary, planned error note |
| Blue | 1800 | Robust code | 12 | 155 | Map, glossary, planned error note |
| Purple | 2500 | OOP | 13 | 72 | Map, glossary, planned error note |
| Brown | 3300 | Pythonic and advanced | 11 | 85 | Map, glossary, planned error note |
| Red | 4200 | Testing and quality | 12 | 116 | Map, glossary, planned error note |
| Black | 5200 | Under the hood | 9 | 76 | Map, glossary, planned error note |
| Master | 6500 | Real-world mastery | 15 | 381 | Map, glossary, planned error note |
| **Total** |  |  | **119** | **1,247** |  |

Glossary counts are the `belt` field on the 1,247 entries in the page. Entries also carry a category. Counts for the larger categories: Data structures 66, Foundations 65, Exceptions 53, Functions 52, GIS 52, Stdlib 50, Control flow 44, OOP 44, APIs and web 40, SQL and databases 37, Algorithms 35, Data engineering 35, Machine learning 35, Packaging 31, Data types 30, Typing 30, Testing 30, Git and CI 30, pandas 30, Unicode 30, Dunder methods 28, Concurrency 28, Files 27, NumPy 27, System design 25, Style and tooling 24, Security 24, Iterators and generators 23, Core syntax 20, Decorators and metaclasses 20, CLI 20, Memory 20, Performance 20, matplotlib 17, Docker 16, Design patterns 16, Real-world 15, Robust code 14, Advanced Python 12, Testing and tools 12, Scraping 12, Internals 8.

## White Belt

**GIS.** Coordinates as floats (Colombo 6.9271, 79.8612), f-strings for coordinate labels, and what a CRS means in plain words.

**Boss fight.** Tip-splitter calculator and a mixed review.

**Errors you meet.** SyntaxError, IndentationError, NameError, TypeError, ValueError, ZeroDivisionError, AttributeError, IndexError, OverflowError, EOFError, KeyboardInterrupt, and float surprises that are not errors.

Each of these 15 topics is one lesson, `white-1` through `white-15`, in `web/src/content/lessons.ts`. The stage order is fixed in `STAGES` in `web/src/content/index.ts`.

| # | Topic |
|---:|---|
| 1 | How computers run code |
| 2 | Installing Python |
| 3 | The REPL |
| 4 | VS Code setup |
| 5 | print() |
| 6 | Comments |
| 7 | Variables |
| 8 | Naming rules |
| 9 | Numbers: int, float, Decimal |
| 10 | Strings & f-strings |
| 11 | Booleans |
| 12 | None |
| 13 | input() |
| 14 | Type conversion |
| 15 | Operators & precedence |

Practice builds up to five exercises for a lesson from the coding templates, the lesson's exercise bank, and spot-the-error templates (`makeSet` in `web/src/screens/Practice.tsx`). Cities, counts, and coordinates are filled in from a seed, so a new set is not the same worksheet. The lesson quiz is three questions from that lesson's bank (`quizFor`).

## Yellow Belt — 300 XP — Control flow

**GIS.** Loop over points, use if-checks for "inside a bounding box", and count points per zone.

**Boss fight.** Number-guessing game and a mixed review.

**Errors noted for later.** IndentationError in loops and if-blocks, infinite loops, off-by-one logic bugs, unreachable elif branches.

Topics: if / elif / else; truthiness; while and for loops; range(); break / continue / else; match-case; nested loops; pseudocode; debugging basics.

## Orange Belt — 700 XP — Data structures

**GIS.** Points as tuples, a feature as a dict (GeoJSON shape), and sets of unique land-use classes.

**Boss fight.** City bus-route organiser and a mixed review.

**Errors noted for later.** IndexError, KeyError, TypeError for an unhashable type, RuntimeError when changing a dict while looping, aliasing surprises.

Topics: lists, tuples, dicts, sets, slicing, mutability, shallow vs deep copy, unpacking, sorting with key, common patterns, Big-O intuition.

## Green Belt — 1200 XP — Functions and modules

**GIS.** A haversine distance function, the math module, json for reading GeoJSON, and csv for bus stops.

**Boss fight.** Your own utility module and a mixed review.

**Errors noted for later.** RecursionError, UnboundLocalError, ImportError / ModuleNotFoundError, circular imports, the mutable-default trap (silent).

Topics: def; *args / **kwargs; defaults and the mutable-default trap; LEGB scope; closures; lambda; recursion; docstrings; modules and packages; imports; `__name__ == '__main__'`; a stdlib tour (os, pathlib, collections, itertools, functools, datetime, json, csv, re, math, random).

## Blue Belt — 1800 XP — Robust code

**GIS.** Read and write GeoJSON and CSV safely, catch bad coordinates with exceptions, and log a data pipeline.

**Boss fight.** CSV cleaner with logging and a mixed review.

**Errors noted for later.** FileNotFoundError, PermissionError, UnicodeDecodeError, custom exceptions, the BaseException / Exception hierarchy.

Topics: exceptions; try / except / else / finally; custom exceptions; files and context managers; logging; pip; virtual environments; uv / poetry; PEP 8; ruff / black; reading tracebacks; pdb.

## Purple Belt — 2500 XP — OOP

**GIS.** Point, Polygon, and BoundingBox classes, dataclasses for features, and `__eq__` for comparing points.

**Boss fight.** Land-parcel class system and a mixed review.

**Errors noted for later.** AttributeError on objects, TypeError from wrong `__init__` arguments, NotImplementedError in abstract methods.

Topics: classes; `__init__`; instance vs class attributes; instance, class, and static methods; inheritance; super(); composition; ABCs; dunder methods; properties; dataclasses; enums; SOLID.

## Brown Belt — 3300 XP — Pythonic and advanced

**GIS.** Generators to stream big point files, decorators to time spatial functions, and type hints for geometry.

**Boss fight.** Streaming log analyser and a mixed review.

**Errors noted for later.** StopIteration, generator exhaustion (silent), decorator mistakes that hide errors.

Topics: comprehensions; the iterator protocol; generators; decorators; custom context managers; descriptors; metaclasses; type hints; mypy; functional tools; the walrus operator.

## Red Belt — 4200 XP — Testing and quality

**GIS.** pytest for geo functions, a CLI that turns CSV into GeoJSON, and a packaged mini geo-utils library.

**Boss fight.** A tested CLI tool on GitHub and a mixed review.

**Errors noted for later.** AssertionError, failing tests, flaky tests.

Topics: pytest; fixtures; mocking; TDD; coverage; Git and GitHub; code review; docs; project structure; PyPI packaging; CLIs with argparse or typer; config and environment variables.

## Black Belt — 5200 XP — Under the hood

**GIS.** NumPy-vectorised distances, profiling spatial loops, and multiprocessing over map tiles.

**Boss fight.** Speed up a slow pipeline and a mixed review.

**Errors noted for later.** MemoryError, deadlocks, race conditions (silent).

Topics: memory model; references and garbage collection; the GIL; threading vs multiprocessing vs asyncio; concurrency patterns; cProfile; optimisation; C extensions and NumPy vectorisation; security.

## Master Belt — 6500 XP — Real-world mastery

**GIS.** Shapely, GeoPandas, rasterio, PostGIS via SQL, folium maps, spatial ML with scikit-learn, and the Sri Lankan city pipeline capstone.

**Capstones.** Sri Lankan city geospatial pipeline, REST API, published package, ML model.

**Errors noted for later.** CRS mismatches, invalid geometries, and library-specific errors from Shapely, GeoPandas, and rasterio. The page says those real messages will be captured when the belt is built.

Topics: NumPy; pandas; matplotlib; SQL / SQLAlchemy; requests; FastAPI; web scraping; DuckDB / Parquet / Airflow; GeoPandas; Shapely; rasterio; scikit-learn; Docker; design patterns; system design.

## Reference desks that already cover every belt

**Error encyclopedia.** 34 entries whose messages were captured with CPython 3.13.5: 31 exceptions and 3 surprises marked "NOT an error" (float addition, right-to-left `**`, and left-to-right `/` and `*`). The All filter also shows one card per later belt, 9 cards, so the full list is **43 cards**. Family-tree view shows 11 chains under BaseException, checked against that same Python.

**Glossary and Word of the Day.** 1,247 terms. 1,000 examples are marked runnable: the build script checks them with CPython, and `node tests/verify.cjs glossary` runs that same set in Pyodide 0.26.4. 216 further snippets are display-only: asyncio event-loop edges, sqlite3, starting a thread (this Pyodide build rejects it), and third-party libraries that are not in the vendored runtime. The word of the day is one term per local calendar day: the index is that day number modulo 1,247. A term can link back to a White Belt lesson when that lesson teaches it.

## Roadmap

The next curriculum work is to give Yellow through Master the same treatment White already has: a full lesson, generated questions, a diagram where it helps, playground tasks, and tracebacks captured from a real interpreter. The map above is the table of contents for that work, not a claim that it is done.

A separate content fix, already visible to the lesson verifier, is that a few generated multiple-choice draws repeat an option. See Testing in the [README](../README.md).
