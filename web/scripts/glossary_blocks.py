"""Parse compact glossary blocks and register them with glossary_extra.add."""
from __future__ import annotations


def parse(add, text: str) -> None:
    for block in text.split("\n---\n"):
        lines = [ln.rstrip() for ln in block.strip().splitlines() if ln.strip() and not ln.startswith("#")]
        if not lines:
            continue
        cat, belt_s = lines[0].split("|", 1)
        items = []
        for ln in lines[1:]:
            parts = ln.split("|")
            term, meaning = parts[0].strip(), parts[1].strip()
            code = parts[2].replace("\\n", "\n") if len(parts) > 2 else ""
            if len(parts) < 4 or parts[3] == "-":
                out = None
            else:
                out = parts[3].replace("\\n", "\n")
            extra = parts[4] if len(parts) > 4 else ""
            items.append((term, meaning, code, out, extra))
        add(cat.strip(), int(belt_s), items)


def load(add) -> None:
    from glossary_text1 import TEXT as t1
    from glossary_text2 import TEXT as t2
    from glossary_text3 import TEXT as t3
    from glossary_text4 import TEXT as t4

    parse(add, "\n---\n".join([t1, t2, t3, t4]))
