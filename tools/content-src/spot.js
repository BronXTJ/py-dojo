/* ===== SPOT-THE-ERROR generator. Every answer verified by running with python3. ===== */
const SPOT_CITIES = ["Colombo","Kandy","Galle","Jaffna","Matara","Negombo"];
const SPOT_TPL = [
  { id:"zero", topic:"Numbers: int, float, Decimal", make: r => { const n = r.int(5,99); return { code:"parks = " + n + "\nzones = 0\nprint(parks / zones)", answer:"ZeroDivisionError" }; } },
  { id:"concat", topic:"print()", make: r => { const c = r.pick(SPOT_CITIES), n = r.int(2,40); return { code:'print("' + c + ' has " + ' + n + ' + " parks")', answer:"TypeError" }; } },
  { id:"intText", topic:"Type conversion", make: r => { const c = r.pick(SPOT_CITIES); return { code:'pop = int("' + c + '")', answer:"ValueError" }; } },
  { id:"intFloat", topic:"Type conversion", make: r => { const a = r.int(1,9), b = r.int(1,9); return { code:'area = int("' + a + "." + b + '")', answer:"ValueError" }; } },
  { id:"name", topic:"Variables", make: r => { const c = r.pick(SPOT_CITIES); return { code:'City = "' + c + '"\nprint(city)', answer:"NameError" }; } },
  { id:"unclosed", topic:"print()", make: r => { const c = r.pick(SPOT_CITIES); return { code:'print("' + c + '"', answer:"SyntaxError" }; } },
  { id:"index", topic:"Strings & f-strings", make: r => { const c = r.pick(SPOT_CITIES); return { code:'city = "' + c + '"\nprint(city[' + (c.length + r.int(0,3)) + '])', answer:"IndexError" }; } },
  { id:"attr", topic:"Strings & f-strings", make: r => { const c = r.pick(SPOT_CITIES); return { code:'print("' + c + '".uppercase())', answer:"AttributeError" }; } },
  { id:"none", topic:"None", make: r => { const n = r.int(1,9); return { code:"zone = None\nprint(zone + " + n + ")", answer:"TypeError" }; } },
  { id:"indent", topic:"Variables", make: r => { const n = r.int(1,9); return { code:"lat = " + n + "\n    print(lat)", answer:"IndentationError" }; } },
  { id:"lowerTrue", topic:"Booleans", make: r => ({ code:"flooded = " + r.pick(["true","false"]) + "\nprint(flooded)", answer:"NameError" }) },
  { id:"fine", topic:"Numbers: int, float, Decimal", make: r => { const n = r.int(5,99); return { code:"print(" + n + " / 4)", answer:"No error" }; } },
  { id:"floatSurprise", topic:"Numbers: int, float, Decimal", make: r => ({ code:"print(0.1 + 0.2 == 0.3)", answer:"No error" }) },
  { id:"geoLat", topic:"Type conversion", make: r => { const c = r.pick(SPOT_CITIES); return { code:'lat = "6.9271"  # from a CSV\nprint(lat + 1)', answer:"TypeError" }; } },
];
const SPOT_POOL = ["SyntaxError","IndentationError","NameError","TypeError","ValueError","ZeroDivisionError","AttributeError","IndexError","No error"];
