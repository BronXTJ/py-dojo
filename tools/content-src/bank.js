
const CITIES = ["Colombo", "Kandy", "Galle", "Jaffna", "Matara", "Kurunegala", "Anuradhapura", "Batticaloa", "Negombo", "Ratnapura"];
const THINGS = ["parks", "bus stops", "schools", "clinics", "wetlands", "markets"];

const BANK = {
  "How computers run code": {
    hook: "A computer is a super-fast but super-literal tuk-tuk driver: no instructions, no ride.",
    bullets: ["A program is a list of instructions written as text.", "Python is an interpreter: it reads and runs your code line by line.", "Lines run from top to bottom, so order matters.", "If a line has an error, Python stops there and tells you why."],
    code: "print(\"Step 1: wake up\")\nprint(\"Step 2: GIS class\")",
    out: "Step 1: wake up\nStep 2: GIS class",
    mistakes: ["Expecting Python to guess what you meant.", "Putting lines in the wrong order and getting surprised by the output."],
    ex: [
      { id: "order", make: (r) => { const a = r.pick(CITIES); let b = r.pick(CITIES); while (b === a) b = r.pick(CITIES); return { q: "What does this show?", code: "print(\"" + b + "\")\nprint(\"" + a + "\")", correct: b + "\n" + a, wrong: [a + "\n" + b, b + " " + a], why: "Python runs top to bottom, so the first line prints first.", run: true }; } },
      { id: "stop", make: (r) => ({ q: "Line 2 of a 5-line program has an error. What happens?", correct: "Line 1 runs, then Python stops at line 2", wrong: ["Python skips line 2 and runs the rest", "Nothing runs and no message appears"], why: "Python runs lines in order and stops at the first error with a message." }) },
    ],
  },
  "Installing Python": {
    hook: "Installing Python is like getting your tuk-tuk licence: one time, then you ride forever.",
    bullets: ["Download Python from python.org, the official site.", "On Windows, tick 'Add python.exe to PATH' during install.", "Check it worked with `python --version` (or `python3 --version` on Mac/Linux).", "Python files end in `.py`."],
    code: "python --version",
    out: "Python 3.x.y (your exact version number)",
    mistakes: ["Forgetting to tick 'Add to PATH' on Windows.", "Typing the version command inside Python instead of the terminal."],
    ex: [
      { id: "ver", make: (r) => ({ q: "Which terminal command checks your Python version?", correct: "python --version", wrong: ["print(version)", "python run version"], why: "`python --version` (or `python3 --version`) prints the installed version." }) },
      { id: "ext", make: (r) => { const n = r.pick(["parks", "roads", "zoning", "census"]); return { q: "Which is a valid Python file name for your " + n + " script?", correct: n + ".py", wrong: [n + ".python", n + ".txt"], why: "Python files use the `.py` extension." }; } },
    ],
  },
  "The REPL": {
    hook: "The REPL is Python's chat window: you type, it answers instantly.",
    bullets: ["REPL means Read, Evaluate, Print, Loop.", "Start it by typing `python` (or `python3`) in a terminal.", "The `>>>` prompt means Python is waiting for you.", "In the REPL, typing an expression shows its value without print().", "Leave with `exit()`."],
    code: ">>> 25 * 4\n100",
    out: "100",
    mistakes: ["Typing `>>>` yourself; it is the prompt, not code.", "Expecting REPL code to be saved; it disappears when you exit."],
    ex: [
      { id: "prompt", make: (r) => ({ q: "What does the `>>>` prompt mean?", correct: "Python is waiting for your input", wrong: ["Your code has an error", "The file was saved"], why: "`>>>` is the REPL saying: your turn." }) },
      { id: "expr", make: (r) => { const a = r.int(2, 12), b = r.int(2, 12); return { q: "In the REPL you type `" + a + " * " + b + "` and press Enter. What appears?", correct: String(a * b), wrong: [a + " * " + b, "Nothing, you need print()"], why: "The REPL shows an expression's value automatically." }; } },
      { id: "quit", make: (r) => ({ q: "How do you leave the REPL?", correct: "exit()", wrong: ["stop", "close REPL"], why: "`exit()` ends the REPL session." }) },
    ],
  },
  "VS Code setup": {
    hook: "VS Code is your dojo mat: a comfy place to write and run code.",
    bullets: ["VS Code is a free code editor from Microsoft.", "Install the 'Python' extension by Microsoft for colours and running code.", "Save your file with a `.py` name before running it.", "Use the Run button or the terminal to run your file.", "Open a folder per project to keep files tidy."],
    code: "# hello.py\nprint(\"Ayubowan!\")",
    out: "Ayubowan!",
    mistakes: ["Running a file you have not saved yet.", "Forgetting the Python extension, so nothing highlights or runs."],
    ex: [
      { id: "ext", make: (r) => ({ q: "Which VS Code extension helps you run Python?", correct: "Python (by Microsoft)", wrong: ["Prettier", "Live Share"], why: "The official Python extension adds running, linting and highlighting." }) },
      { id: "save", make: (r) => ({ q: "You edited a file but the old output still shows. Most likely reason?", correct: "The file was not saved", wrong: ["Python is broken", "VS Code needs reinstalling"], why: "Python runs the saved file, so save first." }) },
    ],
  },
  "print()": {
    hook: "print() is your program's megaphone: whatever goes in, comes out loud.",
    bullets: ["`print()` shows values on the screen.", "Text needs quotes; numbers do not.", "Commas between items add a space.", "Text + text glues together with no space.", "Each print() starts a new line."],
    code: "print(\"Ayubowan, Colombo!\")\nprint(\"Districts:\", 25)\nprint(25 * 4)",
    out: "Ayubowan, Colombo!\nDistricts: 25\n100",
    mistakes: ["`print(Hello)` without quotes gives a NameError.", "`Print` with a capital P fails; Python is case-sensitive."],
    ex: [
      { id: "glue", make: (r) => { const a = r.pick(CITIES), b = r.pick(THINGS); return { q: "What does this show?", code: "print(\"" + a + "\" + \"" + b + "\")", correct: a + b, wrong: [a + " " + b, "An error"], why: "+ glues text with no space added.", run: true }; } },
      { id: "comma", make: (r) => { const a = r.pick(CITIES), n = r.int(3, 90); return { q: "What does this show?", code: "print(\"" + a + "\", " + n + ")", correct: a + " " + n, wrong: [a + n, a + ", " + n], why: "Commas in print() add one space.", run: true }; } },
      { id: "math", make: (r) => { const a = r.int(2, 30), b = r.int(2, 9); return { q: "What does this show?", code: "print(" + a + " * " + b + ")", correct: String(a * b), wrong: [a + " * " + b, String(a) + String(b)], why: "Numbers without quotes are calculated.", run: true }; } },
      { id: "strnum", make: (r) => { const a = r.int(1, 9), b = r.int(1, 9); return { q: "What does this show?", code: "print(\"" + a + "\" + \"" + b + "\")", correct: "" + a + b, wrong: [String(a + b), "An error"], why: "Quoted digits are text, so they glue together.", run: true }; } },
    ],
  },
  "Comments": {
    hook: "Comments are sticky notes for humans; Python politely ignores them.",
    bullets: ["A comment starts with `#`.", "Python ignores everything after `#` on that line.", "Use comments to explain why, not what.", "You can comment out a line to switch it off for testing."],
    code: "# population of the city\nprint(\"Kandy\")  # prints the city",
    out: "Kandy",
    mistakes: ["Using `//` like other languages; Python uses `#`.", "Writing comments that just repeat the code."],
    ex: [
      { id: "skip", make: (r) => { const a = r.pick(CITIES), b = r.pick(CITIES); return { q: "What does this show?", code: "# print(\"" + a + "\")\nprint(\"" + b + "\")", correct: b, wrong: [a + "\n" + b, "Nothing"], why: "The first line is a comment, so it never runs.", run: true }; } },
      { id: "sym", make: (r) => ({ q: "Which symbol starts a comment in Python?", correct: "#", wrong: ["//", "<!--"], why: "Python comments begin with #." }) },
      { id: "inline", make: (r) => { const n = r.int(10, 99); return { q: "What does this show?", code: "print(" + n + ")  # " + n + " wells mapped", correct: String(n), wrong: [n + " # " + n + " wells mapped", n + " wells mapped"], why: "Everything after # is ignored.", run: true }; } },
    ],
  },
  "Variables": {
    hook: "A variable is a labelled box: put a value in, read it by its name later.",
    bullets: ["`=` stores a value in a name.", "Use the name later to get the value back.", "Assigning again replaces the old value.", "The right side is worked out first, then stored."],
    code: "city = \"Galle\"\nparks = 12\nparks = parks + 3\nprint(city, parks)",
    out: "Galle 15",
    mistakes: ["Reading a variable before creating it gives a NameError.", "Mixing up `=` (store) with `==` (compare)."],
    ex: [
      { id: "update", make: (r) => { const a = r.int(5, 50), b = r.int(1, 9), t = r.pick(["parks", "stops", "clinics"]); return { q: "What does this show?", code: t + " = " + a + "\n" + t + " = " + t + " + " + b + "\nprint(" + t + ")", correct: String(a + b), wrong: [String(a), t + " + " + b], why: "The right side is calculated, then stored back.", run: true }; } },
      { id: "swap", make: (r) => { const a = r.pick(CITIES); let b = r.pick(CITIES); while (b === a) b = r.pick(CITIES); return { q: "What does this show?", code: "home = \"" + a + "\"\nhome = \"" + b + "\"\nprint(home)", correct: b, wrong: [a, a + "\n" + b], why: "A new assignment replaces the old value.", run: true }; } },
      { id: "name", make: (r) => { const a = r.pick(CITIES); return { q: "What does this show?", code: "city = \"" + a + "\"\nprint(\"city\")", correct: "city", wrong: [a, "An error"], why: "Quotes make it text, not the variable.", run: true }; } },
    ],
  },
  "Naming rules": {
    hook: "Good names are like good street signs: nobody gets lost.",
    bullets: ["Names use letters, digits and underscores only.", "A name cannot start with a digit.", "Names are case-sensitive: `City` and `city` differ.", "Python style uses snake_case, like `bus_stops`.", "Do not use keywords like `if` or `for` as names."],
    code: "bus_stops = 42\nBus_stops = 7\nprint(bus_stops, Bus_stops)",
    out: "42 7",
    mistakes: ["Using a hyphen: `bus-stops` means subtraction.", "Starting with a number like `2nd_road`."],
    ex: [
      { id: "valid", make: (r) => { const w = r.pick(["road_length", "flood_zone", "land_use", "plot_area"]); const p = w.split("_"); return { q: "Which is a valid variable name?", correct: w, wrong: [p.join("-"), "2" + w], why: "Letters, digits and underscores only, and no leading digit." }; } },
      { id: "case", make: (r) => { const a = r.int(1, 9), b = r.int(10, 20); return { q: "What does this show?", code: "zone = " + a + "\nZone = " + b + "\nprint(zone)", correct: String(a), wrong: [String(b), "An error"], why: "Names are case-sensitive, so they are two different boxes.", run: true }; } },
      { id: "kw", make: (r) => ({ q: "Which name is not allowed?", correct: r.pick(["for", "if", "class", "while"]), wrong: ["district", "total_area"], why: "Keywords are reserved by Python." }) },
    ],
  },
  "Numbers: int, float, Decimal": {
    hook: "Numbers come in two main flavours: whole (int) and decimal (float), like full and half kottu portions.",
    bullets: ["`int` is a whole number like 25.", "`float` has a decimal point like 2.5.", "`/` always gives a float.", "`//` divides and drops the remainder; `%` gives the remainder.", "Floats can be slightly imprecise, so money often uses `Decimal`."],
    code: "print(10 / 2)\nprint(7 // 2)\nprint(7 % 2)",
    out: "5.0\n3\n1",
    mistakes: ["Expecting `10 / 2` to give 5 instead of 5.0.", "Expecting `0.1 + 0.2` to print exactly 0.3."],
    ex: [
      { id: "div", make: (r) => { const b = r.int(2, 9), k = r.int(2, 12); return { q: "What does this show?", code: "print(" + b * k + " / " + b + ")", correct: k + ".0", wrong: [String(k), k + ".00"], why: "/ always returns a float.", run: true }; } },
      { id: "floor", make: (r) => { const a = r.int(11, 60), b = r.int(3, 9); return { q: "What does this show?", code: "print(" + a + " // " + b + ")", correct: String(Math.floor(a / b)), wrong: [String(a % b), (a / b).toFixed(1)], why: "// divides and drops the remainder.", run: true }; } },
      { id: "mod", make: (r) => { const a = r.int(11, 60), b = r.int(3, 9); return { q: "What does this show?", code: "print(" + a + " % " + b + ")", correct: String(a % b), wrong: [String(Math.floor(a / b)), "An error"], why: "% gives the remainder.", run: true }; } },
      { id: "type", make: (r) => { const n = r.int(2, 99); return { q: "What does this show?", code: "print(type(" + n + ".0))", correct: "<class 'float'>", wrong: ["<class 'int'>", "<class 'str'>"], why: "A decimal point makes it a float.", run: true }; } },
    ],
  },
  "Strings & f-strings": {
    hook: "Strings are text beads; f-strings let you thread variables right into them.",
    bullets: ["A string is text in quotes.", "`len()` counts characters.", "`.upper()` and `.lower()` change case.", "An f-string like `f\"{city} rocks\"` puts values inside text.", "Strings can be repeated with `*`."],
    code: "city = \"Jaffna\"\nprint(f\"{city} has {len(city)} letters\")",
    out: "Jaffna has 6 letters",
    mistakes: ["Forgetting the `f` before the quotes, so `{city}` prints literally.", "Mismatched quotes like `\"hello'`."],
    ex: [
      { id: "fstr", make: (r) => { const c = r.pick(CITIES), n = r.int(2, 40), t = r.pick(THINGS); return { q: "What does this show?", code: "city = \"" + c + "\"\nn = " + n + "\nprint(f\"{city} has {n} " + t + "\")", correct: c + " has " + n + " " + t, wrong: ["{city} has {n} " + t, "city has n " + t], why: "f-strings replace {name} with its value.", run: true }; } },
      { id: "nof", make: (r) => { const c = r.pick(CITIES); return { q: "What does this show?", code: "city = \"" + c + "\"\nprint(\"{city}\")", correct: "{city}", wrong: [c, "An error"], why: "Without the f, braces are just text.", run: true }; } },
      { id: "len", make: (r) => { const c = r.pick(CITIES); return { q: "What does this show?", code: "print(len(\"" + c + "\"))", correct: String(c.length), wrong: [String(c.length + 1), String(c.length - 1)], why: "len() counts every character.", run: true }; } },
      { id: "upper", make: (r) => { const c = r.pick(CITIES); return { q: "What does this show?", code: "print(\"" + c + "\".upper())", correct: c.toUpperCase(), wrong: [c, c.toLowerCase()], why: ".upper() makes every letter capital.", run: true }; } },
    ],
  },
  "Booleans": {
    hook: "Booleans are light switches: only True or False.",
    bullets: ["A boolean is `True` or `False`, with capitals.", "Comparisons like `>` and `==` give booleans.", "`and` needs both sides True; `or` needs at least one.", "`not` flips True and False."],
    code: "pop = 800\nprint(pop > 500)\nprint(pop > 500 and pop < 600)",
    out: "True\nFalse",
    mistakes: ["Writing `true` in lowercase gives a NameError.", "Using `=` instead of `==` to compare."],
    ex: [
      { id: "cmp", make: (r) => { const a = r.int(1, 99), b = r.int(1, 99); const res = a > b ? "True" : "False"; return { q: "What does this show?", code: "print(" + a + " > " + b + ")", correct: res, wrong: [res === "True" ? "False" : "True", "An error"], why: a + (a > b ? " is" : " is not") + " greater than " + b + ".", run: true }; } },
      { id: "and", make: (r) => { const p = r.int(100, 900); const res = p > 300 && p < 700 ? "True" : "False"; return { q: "What does this show?", code: "pop = " + p + "\nprint(pop > 300 and pop < 700)", correct: res, wrong: [res === "True" ? "False" : "True", "pop"], why: "and is True only when both sides are True.", run: true }; } },
      { id: "not", make: (r) => { const v = r.pick(["True", "False"]); return { q: "What does this show?", code: "flooded = " + v + "\nprint(not flooded)", correct: v === "True" ? "False" : "True", wrong: [v, "An error"], why: "not flips the value.", run: true }; } },
    ],
  },
  "None": {
    hook: "None is an empty plot of land: it exists, but nothing is built on it yet.",
    bullets: ["`None` means no value yet.", "It has a capital N.", "Check it with `is None`.", "A function with no return gives back None."],
    code: "result = print(\"hi\")\nprint(result)",
    out: "hi\nNone",
    mistakes: ["Writing `none` in lowercase.", "Confusing None with 0 or an empty string; they are different."],
    ex: [
      { id: "is", make: (r) => { const v = r.pick(["None", "0", "\"\""]); return { q: "What does this show?", code: "zone = " + v + "\nprint(zone is None)", correct: v === "None" ? "True" : "False", wrong: [v === "None" ? "False" : "True", "An error"], why: "Only None is None; 0 and empty text are real values.", run: true }; } },
      { id: "ret", make: (r) => { const c = r.pick(CITIES); return { q: "What does this show?", code: "x = print(\"" + c + "\")\nprint(x)", correct: c + "\nNone", wrong: [c + "\n" + c, c], why: "print() shows text but returns None.", run: true }; } },
    ],
  },
  "input()": {
    hook: "input() is your program asking a question and waiting for the answer.",
    bullets: ["`input(\"Question: \")` shows a prompt and waits.", "Whatever the user types comes back as a string.", "Convert it with `int()` or `float()` to do maths.", "Store the answer in a variable to use it."],
    code: "name = input(\"Your city? \")\nprint(\"Ayubowan,\", name)",
    out: "Your city? Kandy\nAyubowan, Kandy",
    mistakes: ["Doing maths on input without int(), like `input() + 1`, gives a TypeError.", "Forgetting to store the result in a variable."],
    ex: [
      { id: "type", make: (r) => ({ q: "The user types " + r.int(10, 99) + ". What type does input() return?", correct: "str", wrong: ["int", "float"], why: "input() always returns text." }) },
      { id: "add", make: (r) => ({ q: "`age = input()` then `print(age + 1)`. What happens?", correct: "TypeError: you cannot add str and int", wrong: ["It adds 1", "It prints age1"], why: "input gives a string; convert with int() first." }) },
      { id: "fix", make: (r) => ({ q: "Which line correctly reads a number of districts?", correct: "n = int(input(\"Districts? \"))", wrong: ["n = input(int(\"Districts? \"))", "n = int(\"input\")"], why: "Wrap input() in int() to convert the text." }) },
    ],
  },
  "Type conversion": {
    hook: "Type conversion is changing currency: same value, different form.",
    bullets: ["`int(\"12\")` turns text into a whole number.", "`float(\"2.5\")` turns text into a decimal.", "`str(25)` turns a number into text.", "`int(7.9)` cuts off the decimal part, it does not round.", "`int(\"abc\")` fails with a ValueError."],
    code: "n = int(\"25\")\nprint(n + 5)\nprint(str(n) + \" districts\")",
    out: "30\n25 districts",
    mistakes: ["Adding a number to text without `str()`.", "Expecting `int(7.9)` to give 8."],
    ex: [
      { id: "int", make: (r) => { const a = r.int(10, 90), b = r.int(1, 9); return { q: "What does this show?", code: "print(int(\"" + a + "\") + " + b + ")", correct: String(a + b), wrong: ["" + a + b, "An error"], why: "int() turns the text into a number first.", run: true }; } },
      { id: "str", make: (r) => { const a = r.int(2, 30); return { q: "What does this show?", code: "print(str(" + a + ") + \"km\")", correct: a + "km", wrong: [a + " km", "An error"], why: "str() turns the number into text, then + glues.", run: true }; } },
      { id: "trunc", make: (r) => { const a = r.int(1, 20), d = r.int(5, 9); return { q: "What does this show?", code: "print(int(" + a + "." + d + "))", correct: String(a), wrong: [String(a + 1), a + "." + d], why: "int() chops off the decimal part.", run: true }; } },
      { id: "float", make: (r) => { const a = r.int(1, 9); return { q: "What does this show?", code: "print(float(\"" + a + ".5\") * 2)", correct: (a * 2 + 1) + ".0", wrong: [String(a * 2 + 1), a + ".52"], why: "float() makes a decimal, and the result stays a float.", run: true }; } },
    ],
  },
  "Operators & precedence": {
    hook: "Operator precedence is the queue at the bus stand: some operators always board first.",
    bullets: ["`**` (power) goes first.", "Then `*`, `/`, `//`, `%`.", "Then `+` and `-`.", "Brackets beat everything.", "Same level runs left to right."],
    code: "print(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(2 ** 3)",
    out: "14\n20\n8",
    mistakes: ["Assuming Python works strictly left to right.", "Using `^` for power; Python uses `**`."],
    ex: [
      { id: "prec", make: (r) => { const a = r.int(1, 9), b = r.int(2, 9), c = r.int(2, 9); return { q: "What does this show?", code: "print(" + a + " + " + b + " * " + c + ")", correct: String(a + b * c), wrong: [String((a + b) * c), "" + a + b * c], why: "* goes before +.", run: true }; } },
      { id: "brk", make: (r) => { const a = r.int(1, 9), b = r.int(2, 9), c = r.int(2, 9); return { q: "What does this show?", code: "print((" + a + " + " + b + ") * " + c + ")", correct: String((a + b) * c), wrong: [String(a + b * c), String(a * b + c)], why: "Brackets go first.", run: true }; } },
      { id: "pow", make: (r) => { const a = r.int(2, 6), b = r.int(2, 3); return { q: "What does this show?", code: "print(" + a + " ** " + b + ")", correct: String(Math.pow(a, b)), wrong: [String(a * b), String(a + b)], why: "** means power.", run: true }; } },
    ],
  },
};

/* GIS thread: gentle geo-flavoured White Belt exercises */
const COORDS = { Colombo: [6.9271, 79.8612], Kandy: [7.2906, 80.6337], Galle: [6.0535, 80.221], Jaffna: [9.6615, 80.0255] };
const GEO_CITIES = Object.keys(COORDS);
BANK["print()"].ex.push({ id: "geo-print", make: (r) => { const c = r.pick(GEO_CITIES), p = COORDS[c]; return { q: "What does this show?", code: "print(\"" + c + "\", " + p[0] + ", " + p[1] + ")", correct: c + " " + p[0] + " " + p[1], wrong: [c + p[0] + p[1], c + ", " + p[0] + ", " + p[1]], why: "Commas add one space between each item.", run: true }; } });
BANK["Strings & f-strings"].ex.push(
  { id: "geo-fstr", make: (r) => { const c = r.pick(GEO_CITIES), p = COORDS[c]; return { q: "What does this show?", code: "lat = " + p[0] + "\nlon = " + p[1] + "\nprint(f\"" + c + ": ({lat}, {lon})\")", correct: c + ": (" + p[0] + ", " + p[1] + ")", wrong: [c + ": ({lat}, {lon})", c + ": lat, lon"], why: "f-strings drop the coordinate values straight into the text.", run: true }; } },
  { id: "geo-round", make: (r) => { const c = r.pick(GEO_CITIES), p = COORDS[c]; return { q: "What does this show?", code: "lat = " + p[0] + "\nprint(f\"{lat:.2f}\")", correct: p[0].toFixed(2), wrong: [String(p[0]), p[0].toFixed(1)], why: ":.2f shows the number with 2 decimal places, great for tidy map labels.", run: true }; } },
);
BANK["Numbers: int, float, Decimal"].ex.push(
  { id: "geo-type", make: (r) => { const c = r.pick(GEO_CITIES); return { q: "What does this show?", code: "lat = " + COORDS[c][0] + "  # " + c + "\nprint(type(lat))", correct: "<class 'float'>", wrong: ["<class 'int'>", "<class 'str'>"], why: "Coordinates have decimals, so they are floats.", run: true }; } },
  { id: "geo-crs", make: (r) => ({ q: "A CRS (coordinate reference system) like WGS 84 (EPSG:4326) tells you...", correct: "How the numbers map to real places on Earth", wrong: ["Which colour the map uses", "How fast Python runs"], why: "A CRS gives coordinates their meaning; WGS 84 uses latitude and longitude in degrees." }) },
);
BANK["Variables"].ex.push({ id: "geo-move", make: (r) => { const k = r.int(1, 4); return { q: "What does this show?", code: "lat = 6\nlat = lat + " + k + "\nprint(lat)", correct: String(6 + k), wrong: ["6", "lat + " + k], why: "The new value replaces the old one, like moving a map pin.", run: true }; } });
BANK["Type conversion"].ex.push({ id: "geo-float", make: (r) => { const c = r.pick(GEO_CITIES), v = COORDS[c][1]; return { q: "Coordinates from a CSV arrive as text. What does this show?", code: "lon = float(\"" + v + "\")\nprint(type(lon), lon)", correct: "<class 'float'> " + v, wrong: ["<class 'str'> " + v, "An error"], why: "float() turns CSV text into a number you can calculate with.", run: true }; } });
