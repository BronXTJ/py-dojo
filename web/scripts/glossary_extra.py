"""Additional glossary rows merged by glossary_build.py. Terms already in the original 204 are skipped."""
from __future__ import annotations

ROWS: list[dict] = []


def add(cat: str, belt: int, items: list, lesson: str = "") -> None:
    n = len(items)
    if n < 2:
        raise SystemExit(f"{cat} needs at least 2 terms")
    for i, it in enumerate(items):
        term, meaning = it[0], it[1]
        code = it[2] if len(it) > 2 else ""
        out = it[3] if len(it) > 3 else None
        extra = it[4] if len(it) > 4 else ""
        gis = it[5] if len(it) > 5 else ""
        why = it[6] if len(it) > 6 else ""
        les = it[7] if len(it) > 7 else lesson
        parts: list[str] = []
        seen: set[str] = set()
        for p in [items[(i + 1) % n][0], items[(i - 1) % n][0], *[x.strip() for x in str(extra).split(",") if x.strip()]]:
            if p and p.casefold() not in seen and p.casefold() != term.casefold():
                seen.add(p.casefold())
                parts.append(p)
        ROWS.append(
            {
                "term": term,
                "meaning": meaning,
                "why": why,
                "code": code or "",
                "out": "" if out is None else out,
                "gis": gis,
                "related": ", ".join(parts),
                "belt": belt,
                "category": cat,
                "run": out is not None and bool(code),
                "lesson": les or "",
            }
        )


# Targets that the original glossary already links to, plus neighbours.
add("Core syntax", 0, [
    ("SyntaxError", "An exception raised when Python cannot parse your source.", "print('ok')", "ok", "syntax", "", "The message names the line that broke the grammar.", "white-1"),
    ("token", "A single word or symbol the parser cuts out of your source.", "print('print is a token')", "print is a token", "", "", "", "white-1"),
    ("line continuation", "An open bracket lets a statement cross lines without a backslash.", "print(1 +\n 2)", "3"),
    ("pass", "A statement that does nothing, used as a placeholder.", "if True:\n    pass\nprint('went on')", "went on"),
    ("ellipsis literal", "The token ... is the Ellipsis object, used as a placeholder or a slice shortcut.", "print(... is Ellipsis)", "True"),
    ("semicolon", "A semicolon can separate two small statements on one line.", "print(1); print(2)", "1\n2", "", "", "Prefer a new line. The semicolon is legal but easy to miss."),
    ("suite", "The indented block that belongs to if, for, while, def, class, or try.", "if True:\n    print('suite')", "suite", "block"),
    ("clause", "A header such as if or except, together with the suite under it.", "if 1:\n    print('clause')", "clause"),
    ("implicit concatenation", "Adjacent string literals are joined at compile time.", "print('Col' 'ombo')", "Colombo", "string"),
    ("raw string", "A string prefixed with r where backslashes are ordinary characters.", "print(r'\\n')", "\\n", "escape character"),
    ("bytes literal", "A bytes value written as b'...' holding raw octets.", "print(b'AB'[0])", "65"),
    ("delimiter", "A character that separates pieces, such as a comma, colon, or quote.", "print(','.join(['a', 'b']))", "a,b"),
    ("unary operator", "An operator with one operand, such as - or not.", "print(-3, not False)", "-3 True", "operator"),
    ("binary operator", "An operator with two operands, such as + or ==.", "print(2 + 3)", "5", "operator"),
    ("augmented assignment", "An operator such as += that updates a name in place.", "n = 1\nn += 4\nprint(n)", "5", "assignment"),
    ("chained comparison", "Comparisons can be chained, and each middle value is evaluated once.", "print(1 < 3 < 5)", "True", "comparison"),
    ("walrus in a list", "The := operator can name a value while building a list.", "print([n for x in ['Galle'] if (n := len(x)) > 3])", "[5]", "walrus operator"),
    ("conditional expression", "The form a if cond else b picks one value.", "print('yes' if 2 > 1 else 'no')", "yes", "if statement"),
    ("starred assignment", "A * name in an unpacking collects the leftover items.", "a, *b = [1, 2, 3]\nprint(a, b)", "1 [2, 3]", "unpacking"),
    ("annotation", "A note after a name or argument that tools may read as a type.", "x: int = 3\nprint(x)", "3", "type hint"),
])

add("Data types", 0, [
    ("int", "The type of a whole number, with unlimited precision.", "print(type(25).__name__, 2 ** 10)", "int 1024", "integer", "", "", "white-9"),
    ("str", "The type of a text value.", "print(type('Kandy').__name__)", "str", "string", "", "", "white-10"),
    ("type", "The kind of a value, which you can read with type().", "print(type(True).__name__)", "bool", "data type"),
    ("bool", "The type of True and False, a subclass of int.", "print(isinstance(True, int), True + True)", "True 2", "boolean"),
    ("NoneType", "The type of the single None object.", "print(type(None).__name__)", "NoneType", "None", "", "", "white-12"),
    ("complex", "A number with a real part and an imaginary part.", "print(complex(1, 2).imag)", "2.0"),
    ("bytes", "An immutable sequence of integers in the range 0 to 255.", "print(bytes([65, 66]))", "b'AB'"),
    ("bytearray", "A mutable sequence of integers in the range 0 to 255.", "b = bytearray(b'ab')\nb[0] = 65\nprint(bytes(b))", "b'Ab'"),
    ("memoryview", "A view of the underlying buffer of a bytes-like object, without copying it.", "print(bytes(memoryview(b'abcd')[1:3]))", "b'bc'"),
    ("frozenset", "An immutable set, so it can be a dict key.", "print(len(frozenset({1, 1, 2})))", "2", "set"),
    ("range object", "The lazy sequence returned by range(), which stores start, stop, and step.", "r = range(0, 10, 2)\nprint(r[3])", "6", "range"),
    ("slice object", "The object slice(start, stop, step) that a[i:j] builds.", "print(slice(1, 4).stop)", "4", "slicing"),
    ("sequence", "An ordered collection that supports indexing and len(), such as list, str, or tuple.", "print('Galle'[0], len((1, 2)))", "G 2"),
    ("mapping", "A collection looked up by key, such as dict.", "print({'a': 1}['a'])", "1", "dictionary"),
    ("numeric tower", "The idea that bool, int, float, and complex can mix in arithmetic, widening as needed.", "print(True + 2 + 0.5)", "3.5", "integer"),
    ("truth value testing", "Conditions treat None, 0, 0.0, and empty containers as false.", "print(bool(0), bool(''), bool([0]))", "False False True", "truthiness"),
    ("identity", "The is operator tests whether two names point at the same object.", "a = None\nprint(a is None)", "True", "None"),
    ("equality", "The == operator tests whether two values compare equal.", "print([1, 2] == [1, 2])", "True", "comparison"),
    ("hash value", "An integer hash() derives for a hashable object, used by dict and set.", "print(hash('Galle') == hash('Galle'))", "True", "hashable"),
    ("immutability of str", "String methods return a new string and leave the original unchanged.", "s = 'galle'\nprint(s.upper(), s)", "GALLE galle", "immutable"),
    ("ord", "ord() returns the Unicode code point of a one-character string.", "print(ord('A'))", "65", "code point"),
    ("chr", "chr() returns the character for a Unicode code point.", "print(chr(65))", "A", "ord"),
    ("repr", "repr() returns a string that usually looks like a Python literal.", "print(repr('A\\nB'))", "'A\\nB'"),
    ("ascii builtin", "ascii() is like repr() but escapes non-ASCII characters.", "print(ascii('A'))", "'A'"),
    ("format spec", "The mini-language after a colon inside a format field controls width and precision.", "print(f'{6.9271:.2f}')", "6.93", "f-string"),
    ("thousands separator", "A format spec comma inserts grouping separators.", "print(f'{752000:,}')", "752,000"),
    ("percent formatting", "The older % operator can format strings.", "print('%s has %d parks' % ('Kandy', 3))", "Kandy has 3 parks", "f-string"),
    ("str.format", "The format() method fills {} fields in a string.", "print('{} km'.format(94))", "94 km", "f-string"),
    ("precision", "How many meaningful digits a number keeps.", "print(round(1/3, 2))", "0.33", "floating-point precision"),
    ("name", "A binding from an identifier to an object in a namespace.", "city = 'Matara'\nprint(city)", "Matara", "variable", "", "", "white-7"),
])

add("Control flow", 1, [
    ("else", "The branch that runs when every earlier condition was false.", "x = 0\nif x:\n    print('yes')\nelse:\n    print('no')", "no", "if statement"),
    ("nested if", "An if statement placed inside another if.", "x, y = 2, 3\nif x:\n    if y:\n        print('both')", "both", "if statement"),
    ("for-else", "The else on a for loop runs when the loop did not break.", "for i in range(2):\n    pass\nelse:\n    print('done')", "done", "for loop"),
    ("while-else", "The else on a while loop runs when the condition becomes false, not when you break.", "n = 0\nwhile n < 1:\n    n += 1\nelse:\n    print('clean')", "clean", "while loop"),
    ("loop variable", "The name a for loop assigns on each iteration.", "for city in ['Galle']:\n    print(city)", "Galle", "for loop"),
    ("enumerate", "enumerate() pairs each item with its index.", "print(list(enumerate(['a', 'b'])))", "[(0, 'a'), (1, 'b')]", "for loop"),
    ("zip", "zip() walks several sequences in step.", "print(list(zip([1, 2], ['a', 'b'])))", "[(1, 'a'), (2, 'b')]"),
    ("reversed", "reversed() walks a sequence from the end.", "print(list(reversed([1, 2, 3])))", "[3, 2, 1]"),
    ("sorted builtin", "sorted() returns a new list in order and leaves the original alone.", "a = [3, 1]\nprint(sorted(a), a)", "[1, 3] [3, 1]", "sorting"),
    ("any", "any() is True if at least one item is true.", "print(any([0, 0, 1]))", "True"),
    ("all", "all() is True if every item is true.", "print(all([1, 2, 3]))", "True"),
    ("short-circuit", "and and or stop as soon as the result is known, and return the last value they evaluated.", "print(0 or 'Galle')", "Galle", "logical operator"),
    ("ternary", "Another name for the conditional expression a if c else b.", "print(1 if True else 2)", "1", "conditional expression"),
    ("guard clause", "An early return or continue that handles a special case before the main logic.", "def f(n):\n    if n < 0:\n        return 'neg'\n    return 'ok'\nprint(f(-1))", "neg"),
    ("sentinel loop", "A loop that stops when it sees a special value.", "data = [1, 2, 0]\nout = []\nfor n in data:\n    if n == 0:\n        break\n    out.append(n)\nprint(out)", "[1, 2]", "break"),
    ("nested loop", "A loop inside another loop.", "s = []\nfor i in range(2):\n    for j in range(2):\n        s.append((i, j))\nprint(len(s))", "4"),
    ("loop and a half", "A loop whose exit sits in the middle, often written with while True and break.", "n = 0\nwhile True:\n    n += 1\n    if n == 2:\n        break\nprint(n)", "2", "break"),
    ("pattern", "The shape after case that match compares against a value.", "n = 1\nmatch n:\n    case 1:\n        print('one')", "one", "match-case"),
    ("capture pattern", "A bare name in a case stores the matched value.", "match [1, 2]:\n    case [a, b]:\n        print(a + b)", "3", "match-case"),
    ("or pattern", "A case can list alternatives with |.", "match 'R':\n    case 'R' | 'C':\n        print('zone')", "zone", "match-case"),
    ("wildcard pattern", "A case _ matches anything and does not bind a name.", "match 9:\n    case _:\n        print('other')", "other", "match-case"),
    ("structural match", "match compares the shape of lists, dicts, and objects, not only equal values.", "match {'type': 'Point'}:\n    case {'type': t}:\n        print(t)", "Point", "match-case"),
    ("assertion statement", "assert checks a condition and raises AssertionError when it is false.", "assert 2 + 2 == 4\nprint('held')", "held", "assertion"),
    ("early exit", "Returning or breaking as soon as the answer is known.", "def first(xs):\n    for x in xs:\n        if x:\n            return x\nprint(first([0, 5]))", "5", "return value"),
    ("fall through", "Python cases do not fall through: the first matching case runs and the match ends.", "match 1:\n    case 1:\n        print('a')\n    case 1:\n        print('b')", "a", "match-case"),
])

from glossary_ds import load as _load_ds
from glossary_blocks import load as _load_blocks

_load_ds(add)
_load_blocks(add)
