# Curriculum

Ten belts, 119 topics. GIS shows up inside each belt instead of as a course at the end. A new profile starts at White Belt with 0 XP. The next belt opens when XP reaches the number in the table. XP on this page comes from the practice quiz (+10 the first time), glossary words (+5), Spot the error (+5 the first time for that item), and a playground task passed for the first time (+15).

> [!NOTE]
> White Belt is the path that is built: 15 lessons, worked examples, generated questions, 9 diagrams, playground tasks, and captured tracebacks. Yellow through Master are on the map. Each of those belts has its topics, a GIS line, a boss-fight title, glossary entries, and a one-line note about errors you will meet. Their lessons are not in the app yet. The belt map says so when you open a locked belt.

## Belts

| Belt | XP | Theme | Topics | Glossary terms | Built today |
|---|---:|---|---:|---:|---|
| White | 0 | Foundations | 15 | 65 | Lessons, exercises, diagrams, playground, captured errors |
| Yellow | 300 | Control flow | 9 | 19 | Map, glossary, planned error note |
| Orange | 700 | Data structures | 11 | 21 | Map, glossary, planned error note |
| Green | 1200 | Functions and modules | 12 | 22 | Map, glossary, planned error note |
| Blue | 1800 | Robust code | 12 | 14 | Map, glossary, planned error note |
| Purple | 2500 | OOP | 13 | 16 | Map, glossary, planned error note |
| Brown | 3300 | Pythonic and advanced | 11 | 12 | Map, glossary, planned error note |
| Red | 4200 | Testing and quality | 12 | 12 | Map, glossary, planned error note |
| Black | 5200 | Under the hood | 9 | 8 | Map, glossary, planned error note |
| Master | 6500 | Real-world mastery | 15 | 15 | Map, glossary, planned error note |
| **Total** |  |  | **119** | **204** |  |

Glossary counts are the `belt` field on the 204 entries in the page.

## White Belt

**GIS.** Coordinates as floats (Colombo 6.9271, 79.8612), f-strings for coordinate labels, and what a CRS means in plain words.

**Boss fight.** Tip-splitter calculator and a mixed review.

**Errors you meet.** SyntaxError, IndentationError, NameError, TypeError, ValueError, ZeroDivisionError, AttributeError, IndexError, OverflowError, EOFError, KeyboardInterrupt, and float surprises that are not errors.

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

Each of these 15 topics has a lesson in the page (idea, walk-through, a try-it whose output was produced by running the code, common mistakes, and a deeper note) and generated predict-the-output questions. Nine topics also have a diagram drawn in HTML: How computers run code, The REPL, print(), Variables, Strings & f-strings, Type conversion, Operators & precedence, input(), and Booleans.

The lesson bank holds **45 exercise templates**. The playground holds **9 coding templates**. Spot the error holds **14 templates**. The practice quiz on the home tab is **5 fixed questions**. Templates fill in cities, counts, and coordinates, so a second visit is not the same worksheet.

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

**Glossary and Word of the Day.** 204 terms. 173 include a code example whose output was captured by running it. 108 include a GIS note. The word of the day walks the list one term per UTC day from the day the profile started, then wraps. "Got it" marks a term learned.

## Roadmap

The next curriculum work is to give Yellow through Master the same treatment White already has: a full lesson, generated questions, a diagram where it helps, playground tasks, and tracebacks captured from a real interpreter. The map above is the table of contents for that work, not a claim that it is done.

A separate content fix, already visible to the lesson verifier, is that a few generated multiple-choice draws repeat an option. See Testing in the [README](../README.md).
