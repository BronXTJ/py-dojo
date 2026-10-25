# Each entry: topic, error, code, why, fix. Messages captured by running with python3.
E = [
 ("How computers run code","SyntaxError",'print("Hello"',"Python reads the whole file first and can't understand an unclosed bracket.","Close every bracket and quote you open."),
 ("How computers run code","NameError",'print(Hello)',"Python stops at the first line it can't run; unquoted text looks like a variable.","Put text in quotes or create the variable first."),
 ("Installing Python","NameError",'python --version',"This is a terminal command; inside Python, the word python looks like an unknown variable.","Run it in the terminal (outside the >>> prompt)."),
 ("The REPL","SyntaxError",'>>> print(5)',"The >>> is the prompt, not code you type.","Type only what comes after >>>."),
 ("VS Code setup","NameError",'Print("hi")',"VS Code runs exactly what you saved; Print with a capital P doesn't exist.","Use lowercase print and save before running."),
 ("print()","NameError",'Print("Colombo")',"Python is case-sensitive, so Print is unknown.","Write print in lowercase."),
 ("print()","SyntaxError",'print("Colombo)',"The closing quote is missing, so the text never ends.","Match every opening quote with a closing one."),
 ("print()","TypeError",'print("Districts: " + 25)',"You can't glue text and a number with +.","Use a comma, str(25), or an f-string."),
 ("Comments","SyntaxError",'// a comment\nprint(1)',"// is a comment in other languages, not in Python.","Start comments with #."),
 ("Variables","NameError",'print(parks)\nparks = 5',"The variable is used before it is created; Python runs top to bottom.","Create the variable on an earlier line."),
 ("Variables","IndentationError",'x = 1\n  y = 2',"A line started with unexpected spaces.","Start top-level lines at the left edge."),
 ("Naming rules","SyntaxError",'2nd_road = 5',"Names cannot start with a digit.","Start names with a letter or underscore, like road_2."),
 ("Naming rules","SyntaxError",'bus-stops = 5',"The hyphen means minus, so Python sees maths on the left of =.","Use underscores: bus_stops."),
 ("Naming rules","SyntaxError",'class = "A"',"class is a reserved keyword.","Pick another name, like class_name."),
 ("Numbers: int, float, Decimal","ZeroDivisionError",'print(10 / 0)',"Dividing by zero has no answer.","Check the divisor is not 0 before dividing."),
 ("Numbers: int, float, Decimal","OverflowError",'print(10.0 ** 400)',"The float result is too big to store.","Use smaller numbers, or ints (which can grow), or Decimal."),
 ("Numbers: int, float, Decimal","NOT an error",'print(0.1 + 0.2)',"Floats are stored in binary, so some decimals are slightly off. This is a silent surprise, not an error.","Use round(x, 2) for display or Decimal for money."),
 ("Strings & f-strings","SyntaxError","print('hello\")","The quotes don't match, so the string never closes.","Open and close with the same quote type."),
 ("Strings & f-strings","AttributeError",'"kandy".uppercase()',"Strings have no method called uppercase.","Use .upper()."),
 ("Strings & f-strings","TypeError",'"Galle"[0] = "g"',"Strings are immutable; you can't change one letter.","Build a new string, e.g. \"g\" + s[1:]."),
 ("Strings & f-strings","IndexError",'"Galle"[10]',"There is no character at position 10.","Use an index less than len(s)."),
 ("Booleans","NameError",'flooded = true',"Lowercase true is not a Python value.","Write True and False with capitals."),
 ("Booleans","SyntaxError",'if 5 = 5:\n    print("same")',"= stores a value; it can't compare.","Use == to compare."),
 ("None","AttributeError",'zone = None\nzone.upper()',"None has no methods like upper().","Check with if zone is not None: before using it."),
 ("None","TypeError",'print(None + 1)',"None is not a number, so maths fails.","Give the variable a real value first."),
 ("input()","TypeError",'age = "20"  # what input() returns\nprint(age + 1)',"input() always returns text, and text + number fails.","Convert first: int(input())."),
 ("input()","EOFError",'name = input()',"input() reached the end of input with nothing to read (happens when no keyboard input exists).","Type an answer, or put lines in the playground's input box."),
 ("input()","KeyboardInterrupt",'',"Pressing Ctrl+C while a program waits or runs stops it on purpose.","Nothing is broken; just run the program again."),
 ("Type conversion","ValueError",'int("abc")',"The text is not a number, so it can't be converted.","Check the text is digits, or use try/except later (Blue Belt)."),
 ("Type conversion","ValueError",'int("2.5")',"int() only accepts whole-number text.","Use int(float(\"2.5\")) or float()."),
 ("Type conversion","TypeError",'int(None)',"None can't be turned into a number.","Make sure the value isn't None first."),
 ("Operators & precedence","TypeError",'print("5" * "2")',"You can't multiply text by text.","Convert to numbers first: int(\"5\") * int(\"2\")."),
 ("Operators & precedence","NOT an error",'print(2 ** 3 ** 2)',"** groups right to left, so this is 2 ** 9 = 512, not 64. A silent logic surprise.","Add brackets to make your intent clear: (2 ** 3) ** 2."),
 ("Operators & precedence","NOT an error",'print(7 / 2 * 2)',"Same-level operators run left to right: (7 / 2) * 2 = 7.0. Usually fine, but check your intent.","Use brackets when unsure."),
]
import subprocess, json, sys
out = []
for topic, err, code, why, fix in E:
    if err == "KeyboardInterrupt":
        msg = "KeyboardInterrupt"
        tb = "Traceback (most recent call last):\n  ...\nKeyboardInterrupt"
    else:
        p = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True, input="")
        res = (p.stdout + p.stderr).strip()
        if err == "NOT an error":
            assert p.returncode == 0, code
            msg = p.stdout.strip(); tb = msg
        else:
            assert p.returncode != 0, code
            lines = p.stderr.strip().split("\n")
            msg = lines[-1]
            assert msg.startswith(err), (code, msg)
            tb = p.stderr.strip().replace('File "<string>"', 'File "main.py"')
    out.append(dict(topic=topic, error=err, code=code, why=why, fix=fix, message=msg, traceback=tb))
ver = sys.version.split()[0]
json.dump({"python": ver, "errors": out}, open("errors.json", "w"), indent=1)
print(ver, len(out))
for o in out: print(o["error"], "|", o["message"])
