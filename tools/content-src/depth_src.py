# Lesson depth content. Every try/deeper code is run with python3 to get its real output.
import json, subprocess, sys
D = {}
def L(name, concepts, walk, tr, mistakes, deeper):
    D[name] = dict(concepts=concepts, walk=walk, tr=tr, mistakes=mistakes, deeper=deeper)

L("How computers run code", [
 "A computer does exactly what it is told and nothing more: it cannot guess what you meant, just like a tuk-tuk driver who only follows the turns you actually say.",
 "A program is simply a list of written instructions, saved as plain text, that a computer can follow step by step.",
 "Computers really only understand machine code (patterns of 0s and 1s), so we write in a human-friendly language like Python and let a translator do the hard work.",
 "Python's translator is called the interpreter: it reads your text, checks the grammar of the whole file, and then carries out the instructions one line at a time.",
 "Order matters because lines run from top to bottom, so swapping two lines can change what the program does.",
 "If a line contains a mistake, Python stops at that line and prints an error message called a traceback that tells you the line number and what went wrong.",
 "Errors are not failures: they are Python's way of pointing at exactly where it got confused, so reading them is a core skill you will practise in every lesson."],
 [["print(\"Step 1: wake up\")", "Python finds the built-in function print, gives it the text \"Step 1: wake up\", and print writes that text to the screen followed by a new line."],
  ["print(\"Step 2: GIS class\")", "Only after line 1 has finished does Python move to line 2 and print the second message, which is why it appears underneath."]],
 dict(change="Swap the two lines so step 2 comes first.", code='print("Step 2: GIS class")\nprint("Step 1: wake up")', note="Same instructions, different order, different result: the computer never re-sorts your steps for you."),
 [["Expecting Python to guess what you meant.", "Python has no idea what you intended; it only sees the characters you typed, so a tiny typo is a real problem to it."],
  ["Putting lines in the wrong order.", "Because execution is top to bottom, using something before the line that creates it will fail or give the wrong result."]],
 [["Interpreter vs compiler", "A compiler translates a whole program into machine code before you run it; CPython (the standard Python) first compiles your file into bytecode, a simpler set of steps, and then its virtual machine runs that bytecode line by line.", None],
  ["Syntax is checked first", "Before running anything, Python checks the grammar of the entire file, so a SyntaxError on line 10 stops even line 1 from running. Other errors (like NameError) only happen when Python reaches that line.", 'print("this prints first")\nprint(undefined_name)\nprint("never reached")']])

L("Installing Python", [
 "Installing Python puts the interpreter program on your computer so it can run your .py files.",
 "On Windows, ticking the 'Add python.exe to PATH' box during installation lets the terminal find Python from any folder.",
 "PATH is a list of folders your computer searches when you type a program's name, like a phone contact list for programs.",
 "You type `python --version` (or `python3 --version` on Mac and Linux) in the terminal, not inside Python, to check what is installed.",
 "Python 3 is the current language; Python 2 is retired, so always learn and install Python 3.",
 "Your version number has three parts, like 3.12.4: the major version (3), the minor version (12) and the bug-fix release (4)."],
 [["python --version", "The terminal searches the folders on PATH for a program called python, runs it with the --version option, and Python prints its version and exits without starting the REPL."]],
 dict(change="Ask Python itself for its version from inside a program.", code='import sys\nprint(sys.version_info.major)', note="sys is a built-in module; version_info.major is the first number of your version. This prints 3 on any Python 3."),
 [["Forgetting to tick 'Add to PATH' on Windows.", "Then the terminal cannot find python and says it is not recognised; re-run the installer and choose Modify, or reinstall with the box ticked."],
  ["Typing `python --version` inside the >>> prompt.", "Inside Python, that line is treated as Python code, so it raises NameError: name 'python' is not defined. Type exit() first, then run it in the terminal."]],
 [["python vs python3", "On Mac and Linux, `python` may be missing or point to something old, so `python3` is the safe command there. On Windows the installer provides `python` and the `py` launcher.", None]])

L("The REPL", [
 "REPL stands for Read, Evaluate, Print, Loop: Python reads what you type, works it out, prints the result and waits for more.",
 "You start it by typing `python` (or `python3`) in a terminal, and the `>>>` prompt means Python is ready and listening.",
 "It is like a calculator that speaks Python: perfect for quick experiments and checking how something behaves.",
 "In the REPL, the value of an expression is shown automatically, so you do not need print() to see `25 * 4`.",
 "Nothing you type in the REPL is saved, so anything you want to keep belongs in a .py file.",
 "Type `exit()` or press Ctrl+D (Mac/Linux) or Ctrl+Z then Enter (Windows) to leave."],
 [[">>> 25 * 4", "Read: Python reads the text 25 * 4. Evaluate: it multiplies the two integers. Print: because you are in the REPL, it displays the result."],
  ["100", "This line is the output Python printed, not something you type; then the >>> prompt appears again (Loop)."]],
 dict(change="In a .py file, an expression on its own shows nothing; you need print().", code='25 * 4\nprint(25 * 4)', note="Only the print() line produces output when you run a file. Auto-showing values is a REPL-only feature."),
 [["Typing `>>>` yourself.", "The >>> is Python's prompt; if you type it as code, Python sees >> > which is not valid and raises a SyntaxError."],
  ["Expecting REPL work to be saved.", "Everything is lost when you exit, so write anything important in a file."]],
 [["The underscore trick", "In the interactive REPL, `_` holds the last result shown, so after 25 * 4 you can type `_ + 1` to get 101. This only works in the REPL, not in files.", None]])

L("VS Code setup", [
 "VS Code is a free code editor: a notebook designed for writing code, with colours, hints and a Run button.",
 "The Python extension from Microsoft teaches VS Code about Python, adding highlighting, error squiggles and running.",
 "You save your code in a file ending in .py, such as hello.py, so the editor and Python know it is Python.",
 "The Run button (▶) or the terminal command `python hello.py` asks the interpreter to run the saved file.",
 "VS Code runs the version saved on disk, so always save (Ctrl+S, or Cmd+S on Mac) before running.",
 "Choose the interpreter with 'Python: Select Interpreter' if you have more than one Python installed."],
 [["# hello.py", "A comment showing the file name; Python ignores everything after #."],
  ["print(\"Ayubowan!\")", "Python calls print with the text Ayubowan! and shows it in VS Code's terminal panel."]],
 dict(change="Add a second print line, save, and run again.", code='print("Ayubowan!")\nprint("Running from VS Code")', note="Each saved change shows up on the next run; unsaved changes do not."),
 [["Running a file you have not saved.", "Python reads the file from disk, so it runs the old version; a dot on the file tab means unsaved changes."],
  ["No Python extension installed.", "Without it VS Code treats the file as plain text, so there is no highlighting and no proper Run button."]],
 [["Where the output goes", "When you run a file, VS Code opens a terminal at the bottom and runs a command like `python hello.py` there. Reading that command teaches you what is happening behind the button.", None]])

L("print()", [
 "print() is a built-in function that shows values on the screen, like a megaphone for your program.",
 "Text must be inside quotes, so Python knows it is a string and not the name of a variable.",
 "You can give print several values separated by commas, and it puts one space between each.",
 "print can show numbers and the results of maths directly, such as print(25 * 4).",
 "Each print call ends with a new line by default, which is why the next output starts on a fresh line.",
 "Python is case-sensitive, so print works but Print raises a NameError."],
 [["print(\"Ayubowan, Colombo!\")", "The quotes make a string; print writes it and then a newline."],
  ["print(\"Districts:\", 25)", "Two values: a string and an integer. print converts each to text and joins them with a single space."],
  ["print(25 * 4)", "Python first evaluates 25 * 4 to get 100, then passes 100 to print. The maths happens before print sees anything."]],
 dict(change="Change the separator and the line ending.", code='print("Kandy", "Galle", sep=" | ")\nprint("no newline", end="")\nprint(" ... joined!")', note="sep controls what goes between values; end controls what goes after (normally a newline)."),
 [["`print(Hello)` without quotes.", "Without quotes Python looks for a variable called Hello, finds none, and raises NameError: name 'Hello' is not defined."],
  ["`Print` with a capital P.", "Names are case-sensitive, so Print is a different, undefined name; Python 3.10+ even suggests: Did you mean: 'print'?"],
  ["Joining text and a number with +.", "\"Districts: \" + 25 raises TypeError because + cannot add a str and an int; use a comma or an f-string instead."]],
 [["print returns None", "print's job is a side effect (showing text). The value it gives back is None, which you will meet in the None lesson.", 'x = print("hi")\nprint(x)']])

L("Comments", [
 "A comment is a note for humans that starts with # and runs to the end of the line; Python skips it completely.",
 "Good comments explain why you did something, because the code itself already shows what it does.",
 "You can put a comment on its own line or at the end of a line of code.",
 "Commenting out a line (putting # in front) is a handy way to switch it off while testing.",
 "Python has no special multi-line comment, so you put # at the start of each line (VS Code does this with Ctrl+/)."],
 [["# population of the city", "The whole line is a comment, so Python does nothing for it."],
  ["print(\"Kandy\")  # prints the city", "Python runs print(\"Kandy\") and ignores everything from # onward."]],
 dict(change="Comment out the print line.", code='# print("Kandy")\nprint("Only this runs")', note="The first line is now just a note, so only the second line produces output."),
 [["Using `//` for comments.", "In Python, // is floor division, so `// note` at the start of a line is a SyntaxError."],
  ["Comments that repeat the code.", "x = 5  # set x to 5 adds nothing; explain the reason instead, like # 5 km buffer zone."]],
 [["A # inside a string is not a comment", "Python only treats # as a comment when it is outside quotes.", 'print("Route #7")  # this part is a comment']])

L("Variables", [
 "A variable is a name that points to a value, like a label stuck on a box so you can find it later.",
 "You create one with `=`, the assignment operator: the name goes on the left and the value on the right.",
 "Python works out the right-hand side first, then attaches the name on the left to the result.",
 "You can reassign a variable at any time, and the old value is simply replaced.",
 "A variable must be created before it is used; reading it earlier raises a NameError.",
 "Variables let you write a value once and reuse it everywhere, so changing it later only takes one edit."],
 [["city = \"Galle\"", "Python creates the string \"Galle\" and binds the name city to it."],
  ["parks = 12", "The name parks now refers to the integer 12."],
  ["parks = parks + 3", "Right side first: Python looks up parks (12), adds 3 to get 15, then rebinds parks to 15."],
  ["print(city, parks)", "Python looks up both names and prints their current values with a space between."]],
 dict(change="Swap two variables in one line.", code='a = "Kandy"\nb = "Galle"\na, b = b, a\nprint(a, b)', note="Python builds the right side (b, a) first, then assigns both names at once."),
 [["Reading a variable before creating it.", "Lines run top to bottom, so print(parks) above parks = 5 raises NameError."],
  ["Mixing up `=` and `==`.", "= stores a value; == asks a True/False question. if x = 5: is a SyntaxError."]],
 [["Names point to values", "Two names can point to the same value. Reassigning one name does not change the other.", 'a = 10\nb = a\na = 20\nprint(a, b)']])

L("Naming rules", [
 "Variable names may contain letters, digits and underscores, but must not start with a digit.",
 "Names are case-sensitive, so bus_stops and Bus_stops are two different variables.",
 "Python style (PEP 8) uses snake_case for variables: lowercase words joined by underscores.",
 "Keywords like if, for, class and True are reserved, so they cannot be used as names.",
 "Good names describe the value, like flood_zone_area, so your future self understands the code.",
 "Avoid reusing built-in names like print, list or str, because you would hide the original."],
 [["bus_stops = 42", "A valid snake_case name bound to 42."],
  ["Bus_stops = 7", "A different name because of the capital B, bound to 7."],
  ["print(bus_stops, Bus_stops)", "Both names are looked up separately, showing that case matters."]],
 dict(change="Check whether words are reserved keywords.", code='import keyword\nprint(keyword.iskeyword("class"))\nprint(keyword.iskeyword("city"))', note="The keyword module knows Python's reserved words."),
 [["Using a hyphen, like `bus-stops = 5`.", "Python reads the hyphen as minus, so it thinks you are assigning to a subtraction and raises a SyntaxError."],
  ["Starting with a digit, like `2nd_road`.", "Names cannot begin with a number; Python raises SyntaxError: invalid decimal literal."],
  ["Naming a variable `print`.", "It works, but afterwards print(...) tries to call your value and fails with a TypeError."]],
 [["Shadowing a built-in", "After print = 5, the real print function is hidden for the rest of the file.", 'print = 5\ntry:\n    print("hi")\nexcept TypeError as e:\n    import sys\n    sys.stdout.write(str(e) + "\\n")']])

L("Numbers: int, float, Decimal", [
 "An int is a whole number like 25, and a float is a number with a decimal point like 6.9.",
 "The / operator always gives a float, even when the division is exact, so 10 / 2 is 5.0.",
 "// is floor division: it divides and rounds down to a whole number.",
 "% is the remainder (modulo) operator, useful for checking even or odd numbers.",
 "Floats are stored in binary, so some decimals like 0.1 cannot be stored exactly, giving tiny rounding surprises.",
 "The decimal module's Decimal type stores decimal numbers exactly, which matters for money.",
 "Python ints have no size limit, so you can compute very large whole numbers safely."],
 [["print(10 / 2)", "True division always produces a float, so Python prints 5.0."],
  ["print(7 // 2)", "7 divided by 2 is 3.5; floor division rounds down to 3."],
  ["print(7 % 2)", "7 = 2 × 3 + 1, so the remainder is 1."]],
 dict(change="Compare float maths with Decimal.", code='from decimal import Decimal\nprint(0.1 + 0.2)\nprint(Decimal("0.1") + Decimal("0.2"))', note="Create a Decimal from a string, not a float, to keep it exact."),
 [["Expecting `10 / 2` to give 5.", "/ always returns a float, so it is 5.0; use // if you want a whole number."],
  ["Expecting `0.1 + 0.2` to equal 0.3 exactly.", "Binary floats cannot store 0.1 exactly, so the result is 0.30000000000000004; use round() or Decimal."],
  ["Dividing by zero.", "10 / 0 raises ZeroDivisionError: division by zero."]],
 [["Floor division with negatives", "// rounds down towards negative infinity, not towards zero.", 'print(-7 // 2)\nprint(-7 % 2)'],
  ["round() uses banker's rounding", "Halves round to the nearest even number.", 'print(round(2.5), round(3.5))']])

L("Strings & f-strings", [
 "A string (str) is text inside quotes; single and double quotes both work, as long as they match.",
 "len() tells you how many characters a string has, counting spaces too.",
 "Each character has a position number called an index, starting at 0, so \"Galle\"[0] is \"G\".",
 "Strings are immutable: you cannot change one in place, but you can build a new one.",
 "An f-string starts with f before the quote and lets you put variables and expressions inside {}.",
 "Methods like .upper(), .lower() and .strip() return new, changed copies of a string."],
 [["city = \"Jaffna\"", "Python creates a 6-character string and binds city to it."],
  ["print(f\"{city} has {len(city)} letters\")", "Python evaluates each {}: city becomes Jaffna and len(city) becomes 6, builds the finished string, and print shows it."]],
 dict(change="Use methods, indexing and slicing.", code='city = "Jaffna"\nprint(city.upper())\nprint(city[0], city[-1])\nprint(city[0:3])', note="-1 means the last character; [0:3] takes positions 0, 1 and 2 (the end is excluded)."),
 [["Forgetting the f.", "Without f, {city} is printed literally as {city}."],
  ["Mismatched quotes like `\"hello'`.", "Python never finds the closing quote and raises SyntaxError: unterminated string literal."],
  ["Changing a character, like `s[0] = \"g\"`.", "Strings are immutable, so this raises TypeError: 'str' object does not support item assignment."]],
 [["Formatting numbers in f-strings", "After a colon you can say how to format: .2f means 2 decimal places, and , adds thousands separators.", 'area = 1234.5678\nprint(f"{area:.2f} km2")\nprint(f"{5000000:,} people")']])

L("Booleans", [
 "A Boolean (bool) has only two values, True and False, always with a capital first letter.",
 "Comparisons like >, <, ==, != , >= and <= produce Booleans by asking a yes/no question.",
 "and is True only when both sides are True; or is True when at least one side is True; not flips the value.",
 "Booleans are the decision-makers behind if statements, which you will meet at Yellow Belt.",
 "== compares values, while = assigns, so mixing them up is a classic bug."],
 [["pop = 800", "pop is bound to 800."],
  ["print(pop > 500)", "Python asks 'is 800 greater than 500?', gets True and prints it."],
  ["print(pop > 500 and pop < 600)", "Left side is True, right side (800 < 600) is False; and needs both, so the result is False."]],
 dict(change="Use a chained comparison and not.", code='pop = 800\nprint(500 < pop < 1000)\nprint(not pop > 500)', note="500 < pop < 1000 means both comparisons together; not turns True into False."),
 [["Writing `true` in lowercase.", "Python sees an undefined name and raises NameError: name 'true' is not defined. Did you mean: 'True'?"],
  ["Using `=` instead of `==`.", "if 5 = 5: is a SyntaxError; Python even suggests you meant ==."]],
 [["Truthiness", "Every value can act as True or False. Zero, empty strings and None count as False; most other values count as True.", 'print(bool(0), bool(""), bool(None))\nprint(bool(7), bool("Kandy"))']])

L("None", [
 "None is Python's way of saying 'no value here', like an empty seat that is reserved but nobody is sitting in it.",
 "It is its own type, NoneType, and it is different from 0, False and the empty string \"\".",
 "Functions that do not return anything, such as print(), give back None.",
 "You check for None with `is None` rather than == None, which is the recommended style.",
 "Calling a method on None, like None.upper(), raises an AttributeError, a very common beginner bug."],
 [["result = print(\"hi\")", "print shows hi as its side effect, then returns None, which is stored in result."],
  ["print(result)", "Python prints the value of result, which is None."]],
 dict(change="Test for None the right way.", code='zone = None\nprint(zone is None)\nprint(type(zone))', note="is None checks that it is the one and only None object."),
 [["Writing `none` in lowercase.", "That is an undefined name, so it raises NameError."],
  ["Treating None like 0 or \"\".", "None + 1 raises TypeError, because None is not a number."],
  ["Using a value that turned out to be None.", "zone.upper() on None raises AttributeError: 'NoneType' object has no attribute 'upper'."]],
 [["Why is None, not == None", "There is exactly one None object in Python, so asking 'is it that object?' with is is both fast and clear.", None]])

L("input()", [
 "input() pauses the program and waits for the user to type something and press Enter.",
 "The text inside the brackets is a prompt shown to the user, like a question on a form.",
 "input() always gives back a string, even if the user types digits.",
 "To do maths with the answer, convert it first with int() or float().",
 "Store the answer in a variable, or it is lost as soon as the line finishes."],
 [["name = input(\"Your city? \")", "Python shows Your city? , waits, reads the typed line (Kandy) as a string without the newline, and binds name to it."],
  ["print(\"Ayubowan,\", name)", "Prints the greeting and the typed text with a space between."]],
 dict(change="Convert the typed answer to a number (type 20 when asked).", code='age = int(input("Age? "))\nprint(age + 1)', stdin="20\n", note="int() turns the string \"20\" into the number 20, so + 1 works."),
 [["Doing maths on input without int().", "\"20\" + 1 raises TypeError: can only concatenate str (not \"int\") to str."],
  ["Not storing the result.", "input(\"City? \") on its own line throws the answer away."],
  ["Typing letters when int() expects digits.", "int(\"abc\") raises ValueError: invalid literal for int() with base 10: 'abc'."]],
 [["When there is nothing to read", "If no input is available (for example, a program run without a keyboard), input() raises EOFError: EOF when reading a line.", None]])

L("Type conversion", [
 "Type conversion means turning a value of one type into another, like changing rupees into dollars.",
 "int() makes a whole number, float() makes a decimal number, and str() makes text.",
 "int() on a float cuts off the decimal part instead of rounding, so int(7.9) is 7.",
 "int() on text only works if the text looks like a whole number; \"2.5\" and \"abc\" raise ValueError.",
 "type() tells you what type a value is, which helps when you are not sure.",
 "Data from files, CSVs and input() usually arrives as text, so conversion is an everyday GIS task."],
 [["n = int(\"25\")", "int reads the characters 2 and 5 and builds the integer 25."],
  ["print(n + 5)", "Both are ints, so this is maths: 30."],
  ["print(str(n) + \" districts\")", "str(n) makes the text \"25\", and + joins two strings."]],
 dict(change="Convert a decimal string in two steps.", code='print(float("2.5"))\nprint(int(float("2.5")))\nprint(type("25"), type(25))', note="int(\"2.5\") fails, but float first, then int works (and cuts to 2)."),
 [["Adding a number to text without str().", "\"Total: \" + 25 raises TypeError; use str(25) or an f-string."],
  ["Expecting int(7.9) to be 8.", "int truncates towards zero; use round(7.9) for 8."],
  ["Converting None.", "int(None) raises TypeError because None is not text or a number."]],
 [["Whitespace is forgiven", "int() and float() ignore spaces and newlines around the number, which helps with messy data.", 'print(int("  42\\n"))']])

L("Operators & precedence", [
 "Operators are symbols that do work: + - * / for maths, ** for power, // and % for division parts.",
 "Precedence is the order Python does operations in, like BODMAS from school maths.",
 "** comes first, then * / // %, then + and -; brackets beat everything.",
 "Operators at the same level usually go left to right, but ** goes right to left.",
 "When in doubt, add brackets: they make your intent clear to Python and to readers."],
 [["print(2 + 3 * 4)", "Multiplication first: 3 * 4 = 12, then 2 + 12 = 14."],
  ["print((2 + 3) * 4)", "Brackets first: 2 + 3 = 5, then 5 * 4 = 20."],
  ["print(2 ** 3)", "Power: 2 × 2 × 2 = 8."]],
 dict(change="See right-to-left power and same-level left-to-right.", code='print(2 ** 3 ** 2)\nprint((2 ** 3) ** 2)\nprint(7 / 2 * 2)', note="2 ** 3 ** 2 is 2 ** 9 = 512; / and * go left to right, so 7 / 2 * 2 is 7.0."),
 [["Assuming strict left to right.", "2 + 3 * 4 is 14, not 20, because * is higher precedence."],
  ["Using `^` for power.", "^ is bitwise XOR in Python, so 2 ^ 3 gives 1, not 8; use **."],
  ["Multiplying two strings.", "\"5\" * \"2\" raises TypeError: can't multiply sequence by non-int of type 'str'."]],
 [["Unary minus and power", "** binds tighter than a leading minus, so -2 ** 2 is -(2 ** 2).", 'print(-2 ** 2)\nprint((-2) ** 2)'],
  ["Augmented assignment", "x += 3 is a shortcut for x = x + 3.", 'x = 10\nx += 3\nx *= 2\nprint(x)']])

def run(code, stdin=""):
    r = subprocess.run([sys.executable, "-c", code], input=stdin, capture_output=True, text=True, timeout=10)
    out = r.stdout.rstrip("\n")
    if r.returncode: out = (out + "\nTraceback (most recent call last): ...\n" + r.stderr.strip().splitlines()[-1]).strip()
    return out
n = 0
for k, v in D.items():
    v["tr"]["out"] = run(v["tr"]["code"], v["tr"].get("stdin", "")); n += 1
    v["deeper"] = [[t, x, c, run(c) if c else None] for t, x, c in v["deeper"]]
    n += sum(1 for d in v["deeper"] if d[2])
json.dump(D, open("depth.json", "w"), ensure_ascii=False, indent=1)
print(len(D), "lessons,", n, "snippets run on", sys.version.split()[0])
for k, v in D.items(): print(k, "|", v["tr"]["out"].replace("\n", " / "), "|", [d[3] for d in v["deeper"]])
