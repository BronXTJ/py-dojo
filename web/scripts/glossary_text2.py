TEXT = r'''
Style and tooling|7
ruff|Ruff is a linter and formatter, written in Rust, that checks Python for style and many bug patterns.|-|-|linter
black|Black is an opinionated formatter that rewrites Python to one consistent layout.|-|-|PEP 8
isort|isort reorders import lines into groups.|-|-|import
flake8|flake8 runs a set of style checks and plugin rules over Python files.|-|-|linter
pylint|Pylint analyses Python for bugs, smells, and style, and scores a module.|-|-|linter
pyright|Pyright is a static type checker used by Pylance in editors.|-|-|mypy
formatter|A formatter rewrites source so layout follows a style, without changing what the program does.|print('layout only')|layout only|black
four-space indent|PEP 8 uses four spaces per indent level and does not use tabs for new code.|print('    x'.startswith('    '))|True|indentation
blank line|PEP 8 puts two blank lines around top-level functions and classes, and one around methods.|print('separate blocks')|separate blocks|PEP 8
import grouping|A common import order is standard library, then third-party, then your own package, with a blank line between groups.|import json, math\nprint(sorted([json.__name__, math.__name__]))|['json', 'math']|import
CapWords|Class names use CapWords, also called Pascal case, by PEP 8.|class BusStop: pass\nprint(BusStop.__name__)|BusStop|class
constant naming|Module-level constants are written in CAPITALS_WITH_UNDERSCORES.|MAX_LAT = 90\nprint(MAX_LAT)|90|snake_case
noqa|A noqa comment tells a linter to ignore a finding on that line.|print('code  # noqa: E501')|code  # noqa: E501|linter
type ignore comment|A comment reading type: ignore asks a type checker to skip a line.|x: object = 1\nprint(x)|1|mypy
line length|PEP 8 recommends keeping lines to 79 characters, while Black's default limit is 88.|print(79)|79|PEP 8
trailing comma|A trailing comma in a multi-line collection lets version control show one changed line when you add an item.|print([1, 2,][1])|2|list
PEP 257|PEP 257 describes how to write docstrings.|def f():\n    'Return one.'\n    return 1\nprint(f.__doc__)|Return one.|docstring
quote style|Formatters pick one quote style and stick to it, usually double quotes for Black.|print('same value' == "same value")|True|string
magic comma|A trailing comma in a call or literal is what many formatters use to decide the layout stays expanded.|print((1,))|(1,)|tuple
static checker|A static checker reads source without running it.|print('reads source')|reads source|mypy
f-string debug|An f-string can print a name and its value with {name=}.|city = 'Galle'\nprint(f'{city=}')|city='Galle'|f-string
underscore in numbers|You can put underscores in numeric literals to make them easier to read.|print(1_000)|1000|integer
ellipsis in types|The token ... is also used in type hints as a placeholder, for example tuple[int, ...].|print(... is Ellipsis)|True|type hint
soft keyword|match, case, and type can be keywords in their statement form and still be used as names elsewhere.|type = 1\nprint(type)|1|keyword
---
OOP|5
class attribute|A class attribute lives on the class and is shared by instances that do not override it.|class C:\n    n = 1\nprint(C().n)|1|class
instance attribute|An instance attribute is stored on one object, usually in __init__.|class C:\n    def __init__(self):\n        self.n = 2\nprint(C().n)|2|attribute
isinstance|isinstance reports whether an object is an instance of a class or of one of its parents.|print(isinstance(True, int))|True|class
issubclass|issubclass reports whether a class is another class or a subclass of it.|print(issubclass(bool, int))|True|inheritance
method resolution order|The method resolution order is the sequence of classes Python searches for an attribute.|print([c.__name__ for c in bool.__mro__])|['bool', 'int', 'object']|inheritance
object class|object is the root class of every new-style class.|print(issubclass(int, object))|True|class
type class|type is the class of classes, and calling it reads an object's class.|print(type(1).__name__)|int|class
__new__|__new__ creates the instance before __init__ initialises it.|class C:\n    def __new__(cls):\n        obj = object.__new__(cls)\n        obj.n = 3\n        return obj\nprint(C().n)|3|__init__
__slots__|__slots__ reserves named attributes and omits the per-instance __dict__.|class C:\n    __slots__ = ('n',)\n    def __init__(self):\n        self.n = 4\nprint(C().n)|4|attribute
__dict__|__dict__ is the mapping where an ordinary instance stores its attributes.|class C: pass\nc = C()\nc.n = 5\nprint(c.__dict__['n'])|5|attribute
__mro__|__mro__ is the tuple of classes in the method resolution order.|print(bool.__mro__[1].__name__)|int|method resolution order
__bases__|__bases__ is the tuple of direct parent classes.|class A: pass\nclass B(A): pass\nprint(B.__bases__[0].__name__)|A|inheritance
classmethod|A classmethod receives the class as its first argument, not an instance.|class C:\n    n = 2\n    @classmethod\n    def get(cls):\n        return cls.n\nprint(C.get())|2|class
staticmethod|A staticmethod is a function parked on a class that does not receive the instance or the class.|class C:\n    @staticmethod\n    def add(a, b):\n        return a + b\nprint(C.add(2, 3))|5|class
name mangling|A name that starts with two underscores and does not end with them is rewritten to include the class name.|class C:\n    def __init__(self):\n        self.__n = 6\nprint(C()._C__n)|6|attribute
leading underscore|A single leading underscore is a convention that says an attribute is internal.|class C:\n    def __init__(self):\n        self._n = 7\nprint(C()._n)|7|attribute
mixin|A mixin is a small class you combine with others to share one behaviour.|class Tag:\n    tag = 'gis'\nclass Road(Tag):\n    pass\nprint(Road.tag)|gis|inheritance
multiple inheritance|A class may list several bases, and the MRO decides which method wins.|class A:\n    def f(self):\n        return 'A'\nclass B:\n    def f(self):\n        return 'B'\nclass C(A, B):\n    pass\nprint(C().f())|A|inheritance
diamond problem|The diamond problem is when two bases share a grandparent, and super() follows the MRO so the grandparent runs once.|class A:\n    def f(self):\n        return 'A'\nclass B(A):\n    def f(self):\n        return 'B' + super().f()\nclass C(A):\n    def f(self):\n        return 'C' + super().f()\nclass D(B, C):\n    def f(self):\n        return 'D' + super().f()\nprint(D().f())|DBCA|super
cooperative super|Cooperative super means each override calls super() so the next class in the MRO gets a turn.|class A:\n    def f(self):\n        return 'A'\nclass B(A):\n    def f(self):\n        return super().f() + 'B'\nprint(B().f())|AB|super
frozen dataclass|A frozen dataclass refuses assignment after it is created, so it can be hashed if its fields can.|from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Pt:\n    x: int\nprint(hash(Pt(1)) == hash(Pt(1)))|True|dataclass
IntEnum|IntEnum members are also integers, so they compare equal to their values.|from enum import IntEnum\nclass Color(IntEnum):\n    RED = 1\nprint(Color.RED == 1)|True|enum
Flag enum|A Flag enum combines members with bitwise operators.|from enum import Flag\nclass Perm(Flag):\n    READ = 1\n    WRITE = 2\nprint(bool(Perm.READ.__or__(Perm.WRITE)))|True|enum
abstractmethod|abstractmethod marks a method that a concrete subclass must override.|from abc import ABC, abstractmethod\nclass A(ABC):\n    @abstractmethod\n    def f(self):\n        pass\nprint(hasattr(A.f, '__isabstractmethod__'))|True|abstract base class
__init_subclass__|__init_subclass__ runs on a base class whenever another class inherits from it.|class A:\n    def __init_subclass__(cls):\n        cls.tag = 'child'\nclass B(A):\n    pass\nprint(B.tag)|child|class
data class field|A dataclass field can set a default or a factory so each instance gets its own list.|from dataclasses import dataclass, field\n@dataclass\nclass Box:\n    items: list = field(default_factory=list)\nprint(Box().items)|[]|dataclass
encapsulation|Encapsulation means keeping an object's data behind a small set of methods.|class C:\n    def __init__(self):\n        self._n = 1\n    def n(self):\n        return self._n\nprint(C().n())|1|attribute
overriding|Overriding replaces a parent method with a more specific one on the child.|class A:\n    def f(self):\n        return 1\nclass B(A):\n    def f(self):\n        return 2\nprint(B().f())|2|inheritance
---
Dunder methods|5
__repr__|__repr__ returns the official string of an object, aimed at developers.|class C:\n    def __repr__(self):\n        return 'C()'\nprint(repr(C()))|C()|dunder method
__str__|__str__ returns the informal string print uses.|class C:\n    def __str__(self):\n        return 'hi'\nprint(C())|hi|__repr__
__eq__|__eq__ defines what == means for a class.|class C:\n    def __init__(self, n):\n        self.n = n\n    def __eq__(self, other):\n        return self.n == other.n\nprint(C(1) == C(1))|True|comparison
__lt__|__lt__ defines <, which sorted() uses when it is present.|class C:\n    def __init__(self, n):\n        self.n = n\n    def __lt__(self, other):\n        return self.n < other.n\nprint(sorted([C(2), C(1)])[0].n)|1|sorting
__hash__|__hash__ returns the hash of an object, and it must agree with __eq__.|class C:\n    def __init__(self, n):\n        self.n = n\n    def __hash__(self):\n        return hash(self.n)\n    def __eq__(self, other):\n        return self.n == other.n\nprint(hash(C(3)) == hash(C(3)))|True|hashable
__bool__|__bool__ decides the truth value of an object.|class C:\n    def __bool__(self):\n        return False\nprint(bool(C()))|False|truthiness
__len__|__len__ answers len() for a container you write.|class C:\n    def __len__(self):\n        return 4\nprint(len(C()))|4|collection length
__getitem__|__getitem__ answers obj[key].|class C:\n    def __getitem__(self, i):\n        return i * 2\nprint(C()[3])|6|index
__setitem__|__setitem__ answers obj[key] = value.|class C:\n    def __init__(self):\n        self.d = {}\n    def __setitem__(self, k, v):\n        self.d[k] = v\nc = C()\nc['a'] = 1\nprint(c.d['a'])|1|dictionary
__contains__|__contains__ answers the in operator for your object.|class C:\n    def __contains__(self, x):\n        return x == 'a'\nprint('a' in C())|True|in operator
__iter__|__iter__ returns an iterator, which is what for asks for.|class C:\n    def __iter__(self):\n        yield 1\n        yield 2\nprint(list(C()))|[1, 2]|iterable
__next__|__next__ returns the next value from an iterator you write.|class It:\n    def __init__(self):\n        self.n = 0\n    def __iter__(self):\n        return self\n    def __next__(self):\n        self.n += 1\n        if self.n > 1:\n            raise StopIteration\n        return self.n\nprint(next(It()))|1|iterator
__enter__|__enter__ runs at the start of a with block and its return value is bound by as.|class C:\n    def __enter__(self):\n        return 5\n    def __exit__(self, *a):\n        return False\nwith C() as n:\n    print(n)|5|context manager
__exit__|__exit__ runs when a with block ends, and returning true swallows an exception.|class C:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc, tb):\n        return exc_type is ZeroDivisionError\nwith C():\n    1/0\nprint('lived')|lived|__enter__
__add__|__add__ defines the + operator for a class.|class C:\n    def __init__(self, n):\n        self.n = n\n    def __add__(self, other):\n        return C(self.n + other.n)\nprint((C(1) + C(2)).n)|3|operator
__getattr__|__getattr__ runs only when a normal attribute lookup fails.|class C:\n    def __getattr__(self, name):\n        return name.upper()\nprint(C().city)|CITY|attribute
__getattribute__|__getattribute__ runs for every attribute read, which makes it easy to recurse by accident.|class C:\n    def __getattribute__(self, name):\n        if name == 'n':\n            return 8\n        return object.__getattribute__(self, name)\nprint(C().n)|8|attribute
__setattr__|__setattr__ runs for every attribute write.|class C:\n    def __setattr__(self, name, value):\n        object.__setattr__(self, name, value + 1)\nc = C()\nc.n = 1\nprint(c.n)|2|attribute
__format__|__format__ customises format(obj) and f-strings.|class C:\n    def __format__(self, spec):\n        return 'Galle'\nprint(f'{C()}')|Galle|f-string
__missing__|__missing__ is called by dict subclasses when a key is absent.|class C(dict):\n    def __missing__(self, key):\n        return 0\nprint(C()['z'])|0|dictionary
__set_name__|__set_name__ tells a descriptor the class and attribute name it was assigned to.|class D:\n    def __set_name__(self, owner, name):\n        self.name = name\nclass C:\n    x = D()\nprint(C.x.name)|x|descriptor
__class_getitem__|__class_getitem__ lets a class accept C[int] without being a real generic.|class C:\n    def __class_getitem__(cls, item):\n        return item.__name__\nprint(C[int])|int|type hint
__match_args__|__match_args__ names the positional fields match may unpack for a class.|class C:\n    __match_args__ = ('n',)\n    def __init__(self, n):\n        self.n = n\nmatch C(4):\n    case C(n):\n        print(n)|4|match-case
__del__|__del__ may run when an object is about to be destroyed, but the timing is not a promise you should rely on for cleanup.|class C:\n    def __del__(self):\n        pass\nprint('defined')|defined|garbage collection
__dir__|__dir__ customises the list dir() shows.|class C:\n    def __dir__(self):\n        return ['lat']\nprint(dir(C()))|['lat']|attribute
__bytes__|__bytes__ answers bytes(obj).|class C:\n    def __bytes__(self):\n        return b'ab'\nprint(bytes(C()))|b'ab'|bytes
__length_hint__|__length_hint__ tells tools an estimated length for an iterator that has no len.|class It:\n    def __length_hint__(self):\n        return 3\nimport operator\nprint(operator.length_hint(It()))|3|iterator
__reversed__|__reversed__ customises reversed() for a class.|class C:\n    def __reversed__(self):\n        yield 2\n        yield 1\nprint(list(reversed(C())))|[2, 1]|reversed
---
Iterators and generators|6
iter builtin|iter() asks an object for an iterator, or builds one from a callable and a sentinel.|print(list(iter([1, 2])))|[1, 2]|iterable
next builtin|next() pulls one item from an iterator, and can take a default instead of raising.|print(next(iter([7]), 0))|7|iterator
iterator protocol|The iterator protocol is __iter__ returning self and __next__ returning items until StopIteration.|it = iter([9])\nprint(next(it))|9|iterator
generator expression|A generator expression is a lazy comprehension in parentheses.|g = (x * x for x in range(3))\nprint(list(g))|[0, 1, 4]|comprehension
yield from|yield from delegates to another iterable and passes its items through.|def g():\n    yield from [1, 2]\nprint(list(g()))|[1, 2]|yield
generator send|send resumes a generator and makes yield return the value you passed.|def g():\n    x = yield 1\n    yield x\ngen = g()\nnext(gen)\nprint(gen.send(5))|5|generator
lazy sequence|A lazy sequence computes the next item only when you ask, so a long series need not sit in memory.|import itertools\nprint(next(itertools.count(10)))|10|generator
islice|islice takes a slice of an iterator without building the whole sequence.|import itertools\nprint(list(itertools.islice(range(10), 2, 5)))|[2, 3, 4]|slicing
groupby|groupby clumps consecutive equal keys, so the input usually needs to be sorted first.|import itertools\nprint([(k, list(g)) for k, g in itertools.groupby('aaab')])|[('a', ['a', 'a', 'a']), ('b', ['b'])]|iterable
product iterator|product walks the Cartesian product of several iterables.|import itertools\nprint(list(itertools.product([0, 1], [2])))|[(0, 2), (1, 2)]|iterable
permutations|permutations yields ordered selections of a given length.|import itertools\nprint(list(itertools.permutations('ab', 2)))|[('a', 'b'), ('b', 'a')]|iterable
combinations|combinations yields unordered selections, without repeating a position.|import itertools\nprint(list(itertools.combinations('abc', 2)))|[('a', 'b'), ('a', 'c'), ('b', 'c')]|iterable
accumulate|accumulate yields running totals, or running results of another function.|import itertools\nprint(list(itertools.accumulate([1, 2, 3])))|[1, 3, 6]|prefix sum
cycle iterator|cycle repeats an iterable forever, so you normally take only a prefix.|import itertools\nprint(list(itertools.islice(itertools.cycle('ab'), 3)))|['a', 'b', 'a']|iterable
repeat iterator|repeat yields the same object a set number of times, or forever if you do not set a count.|import itertools\nprint(list(itertools.repeat(7, 3)))|[7, 7, 7]|iterable
zip longest|zip_longest walks several iterables and fills the shorter ones with a fill value.|import itertools\nprint(list(itertools.zip_longest([1], [2, 3], fillvalue=0)))|[(1, 2), (0, 3)]|zip
starmap|starmap calls a function with each tuple from an iterable as its arguments.|import itertools\nprint(list(itertools.starmap(lambda a, b: a + b, [(1, 2), (3, 4)])))|[3, 7]|iterable
pairwise|pairwise yields overlapping pairs from an iterable.|import itertools\nprint(list(itertools.pairwise([1, 2, 3])))|[(1, 2), (2, 3)]|iterable
generator close|close() raises GeneratorExit inside a generator so it can finish.|def g():\n    try:\n        yield 1\n    finally:\n        pass\ngen = g()\nnext(gen)\ngen.close()\nprint('closed')|closed|generator
infinite iterator|An infinite iterator never ends on its own, so the consumer decides when to stop.|import itertools\nprint(list(itertools.islice(itertools.count(), 3)))|[0, 1, 2]|loop
sentinel iter|iter(callable, sentinel) calls the callable until it returns the sentinel.|n = 0\ndef pull():\n    global n\n    n += 1\n    return n\nprint(list(iter(pull, 3)))|[1, 2]|iter builtin
map builtin|map applies a function to each item and returns an iterator.|print(list(map(str.upper, ['ab'])))|['AB']|iterable
filter builtin|filter keeps items for which a function returns true.|print(list(filter(None, [0, 1, 2])))|[1, 2]|truthiness
---
Decorators and metaclasses|6
decorator syntax|The @ line above a function passes that function through the decorator and rebinds the name.|def twice(f):\n    def inner(x):\n        return f(x) * 2\n    return inner\n@twice\ndef n(x):\n    return x\nprint(n(3))|6|decorator
functools.wraps|wraps copies the wrapped function's name and docstring onto the wrapper.|import functools\ndef deco(f):\n    @functools.wraps(f)\n    def inner():\n        return f()\n    return inner\n@deco\ndef hello():\n    'Hi.'\n    return 1\nprint(hello.__name__)|hello|decorator
stacked decorators|Decorators stack from the bottom up: the one nearest the def runs first.|def tag(s):\n    def deco(f):\n        def inner():\n            return s + f()\n        return inner\n    return deco\n@tag('A')\n@tag('B')\ndef f():\n    return 'C'\nprint(f())|ABC|decorator
parameterized decorator|A parameterized decorator is a function that takes options and returns the real decorator.|def add(k):\n    def deco(f):\n        return lambda: f() + k\n    return deco\n@add(2)\ndef f():\n    return 3\nprint(f())|5|decorator
class decorator|A class decorator receives a class and returns a class, often the same one after editing it.|def deco(cls):\n    cls.n = 4\n    return cls\n@deco\nclass C:\n    pass\nprint(C.n)|4|class
cached property|cached_property computes an attribute once per instance and then stores it.|import functools\nclass C:\n    @functools.cached_property\n    def n(self):\n        return 2 + 2\nprint(C().n)|4|property
lru_cache decorator|lru_cache stores recent return values so repeated calls can skip the work.|import functools\n@functools.lru_cache(maxsize=8)\ndef f(n):\n    return n + 1\nprint(f(3))|4|functools
cache decorator|cache is an unbounded lru_cache, suitable when the argument set is small.|import functools\n@functools.cache\ndef f(n):\n    return n * 2\nprint(f(5))|10|lru_cache decorator
descriptor protocol|The descriptor protocol is __get__, __set__, and __delete__ on an object stored on a class.|class D:\n    def __get__(self, obj, owner):\n        return 9\nclass C:\n    x = D()\nprint(C().x)|9|descriptor
data descriptor|A data descriptor defines __set__ or __delete__, and it wins over an instance __dict__ entry of the same name.|class D:\n    def __get__(self, obj, owner):\n        return 'd'\n    def __set__(self, obj, value):\n        pass\nclass C:\n    x = D()\nprint(C().x)|d|descriptor protocol
non-data descriptor|A non-data descriptor defines only __get__, so an instance attribute of the same name hides it.|class D:\n    def __get__(self, obj, owner):\n        return 'd'\nclass C:\n    x = D()\nc = C()\nc.__dict__['x'] = 'i'\nprint(c.x)|i|descriptor protocol
property setter|A property can grow a setter so assignment runs your function.|class C:\n    def __init__(self):\n        self._n = 0\n    @property\n    def n(self):\n        return self._n\n    @n.setter\n    def n(self, value):\n        self._n = value\nc = C()\nc.n = 6\nprint(c.n)|6|property
property deleter|A property deleter runs when you del the attribute.|class C:\n    def __init__(self):\n        self._n = 1\n    @property\n    def n(self):\n        return self._n\n    @n.deleter\n    def n(self):\n        self._n = 0\nc = C()\ndel c.n\nprint(c.n)|0|property
type metaclass|type is the default metaclass: calling type(name, bases, namespace) builds a class.|C = type('C', (), {'n': 3})\nprint(C.n)|3|metaclass
__prepare__|__prepare__ on a metaclass returns the mapping that collects the class body.|class M(type):\n    @classmethod\n    def __prepare__(cls, name, bases):\n        return {'n': 1}\nclass C(metaclass=M):\n    pass\nprint(C.n)|1|metaclass
class body namespace|The class body runs once, and the names it binds become the class namespace.|class C:\n    n = 1 + 1\nprint(C.n)|2|class
singleton metaclass|A metaclass can force a class to build only one instance, though a module-level instance is usually simpler.|class One(type):\n    def __call__(cls):\n        if not hasattr(cls, '_obj'):\n            cls._obj = type.__call__(cls)\n        return cls._obj\nclass C(metaclass=One):\n    pass\nprint(C() is C())|True|metaclass
decorator factory|A decorator factory is the outer function that receives arguments and returns a decorator.|def times(k):\n    return lambda f: (lambda x: f(x) * k)\n@times(3)\ndef f(x):\n    return x\nprint(f(2))|6|decorator
context decorator|contextlib.contextmanager turns a generator function into a context manager.|from contextlib import contextmanager\n@contextmanager\ndef cm():\n    yield 7\nwith cm() as n:\n    print(n)|7|context manager
total ordering|total_ordering fills in the missing comparison methods from the ones you wrote.|import functools\n@functools.total_ordering\nclass C:\n    def __init__(self, n):\n        self.n = n\n    def __eq__(self, other):\n        return self.n == other.n\n    def __lt__(self, other):\n        return self.n < other.n\nprint(C(1) <= C(2))|True|comparison
---
Typing|6
variable annotation|A variable annotation notes a type on a name and does not change the runtime value.|x: int = 3\nprint(x)|3|annotation
return annotation|A return annotation sits after -> and is stored for tools, not enforced by Python itself.|def f() -> int:\n    return 4\nprint(f())|4|type hint
Optional type|Optional[T] means T or None, and a modern annotation can write the same union with a vertical bar.|from typing import Optional\nn: Optional[int] = None\nprint(n is None)|True|None
union type|A union type means a value may be any of the listed types, such as an int or a str.|from typing import Union\ndef f(x: Union[int, str]) -> str:\n    return str(x)\nprint(f(3))|3|type hint
list of int|list[int] says the list is expected to hold integers.|xs: list[int] = [1, 2]\nprint(xs[1])|2|list
dict of str|dict[str, int] says the keys are strings and the values are integers.|d: dict[str, int] = {'a': 1}\nprint(d['a'])|1|dictionary
tuple of two|tuple[float, float] describes a pair, such as a coordinate.|p: tuple[float, float] = (6.9, 79.8)\nprint(p[0])|6.9|tuple
Callable type|Callable[[int], str] describes a function that takes an int and returns a str.|from typing import Callable\ndef run(f: Callable[[int], str]) -> str:\n    return f(2)\nprint(run(str))|2|function
TypeVar|A TypeVar is a placeholder that links types, so a function can return the same type it received.|from typing import TypeVar\nT = TypeVar('T')\ndef first(xs: list[T]) -> T:\n    return xs[0]\nprint(first([7]))|7|type hint
Generic class|A Generic class is parameterised by a TypeVar, such as Box[int].|from typing import Generic, TypeVar\nT = TypeVar('T')\nclass Box(Generic[T]):\n    def __init__(self, value: T):\n        self.value = value\nprint(Box(3).value)|3|class
Protocol type|A Protocol describes the methods an object must have, without requiring a shared base class.|from typing import Protocol\nclass Named(Protocol):\n    def name(self) -> str: ...\nclass City:\n    def name(self) -> str:\n        return 'Galle'\nprint(City().name())|Galle|type hint
TypedDict|A TypedDict describes the keys and value types of a dict for type checkers.|from typing import TypedDict\nclass Point(TypedDict):\n    lat: float\nprint({'lat': 6.9}['lat'])|6.9|dictionary
Literal type|A Literal type restricts a value to specific constants.|from typing import Literal\nMode = Literal['r', 'w']\nmode: Mode = 'r'\nprint(mode)|r|type hint
Final annotation|Final marks a name that type checkers should treat as not reassigned.|from typing import Final\nN: Final = 3\nprint(N)|3|type hint
ClassVar|ClassVar marks a variable that belongs to the class rather than each instance.|from typing import ClassVar\nclass C:\n    n: ClassVar[int] = 2\nprint(C.n)|2|class attribute
Any type|Any switches off checking for a value, so a type checker allows it anywhere.|from typing import Any\nx: Any = 1\nprint(x)|1|type hint
cast function|cast tells a type checker to treat a value as a type, and at runtime it returns the value unchanged.|from typing import cast\nprint(cast(int, 5))|5|type hint
TYPE_CHECKING|TYPE_CHECKING is false at runtime and true while type checkers read the file, so imports for hints can sit under it.|from typing import TYPE_CHECKING\nprint(TYPE_CHECKING)|False|mypy
overload decorator|overload declares several call signatures for type checkers, and the real function is the one without it.|from typing import overload\n@overload\ndef f(x: int) -> int: ...\ndef f(x):\n    return x\nprint(f(3))|3|type hint
get_type_hints|get_type_hints returns a function's annotations with strings resolved when it can.|def f(n: int) -> int:\n    return n\nimport typing\nprint(typing.get_type_hints(f)['n'].__name__)|int|annotation
Self type|Self refers to the class of the current instance, which helps type checkers with methods that return self.|from typing import Self\nclass C:\n    def me(self) -> Self:\n        return self\nprint(C().me() is not None)|True|class
type alias statement|The type statement, added in Python 3.12, names an alias for a type.|type Pair = tuple[int, int]\nprint(Pair.__value__ if hasattr(Pair, '__value__') else (1, 2))|tuple[int, int]|type hint
assert_type helper|Type checkers understand assert_type, and at runtime typing.assert_type returns the value.|import typing\nprint(typing.assert_type(3, int))|3|mypy
Never type|Never means a function does not return, for example because it always raises.|from typing import Never\ndef stop() -> Never:\n    raise RuntimeError('x')\nprint('declared')|declared|type hint
NotRequired key|NotRequired marks a TypedDict key that may be absent.|from typing import NotRequired, TypedDict\nclass Row(TypedDict):\n    name: str\n    note: NotRequired[str]\nprint('note' in Row.__annotations__)|True|TypedDict
Required key|Required marks a key as mandatory inside a TypedDict that is not total.|from typing import Required, TypedDict\nclass Row(TypedDict, total=False):\n    name: Required[str]\nprint(Row.__required_keys__)|frozenset({'name'})|TypedDict
Annotated type|Annotated attaches metadata to a type that libraries may read and that Python itself ignores.|from typing import Annotated\nprint(Annotated[int, 'metres'].__metadata__[0])|metres|type hint
TypeAlias|TypeAlias marks an assignment as a type alias for checkers that need the hint.|from typing import TypeAlias\nMeters: TypeAlias = float\nprint(Meters is float)|True|type hint
runtime checkable|runtime_checkable lets isinstance look for the methods of a Protocol.|from typing import Protocol, runtime_checkable\n@runtime_checkable\nclass HasName(Protocol):\n    def name(self) -> str: ...\nclass City:\n    def name(self) -> str:\n        return 'Kandy'\nprint(isinstance(City(), HasName))|True|Protocol type
NoReturn|NoReturn is the older spelling of a function that never returns normally.|from typing import NoReturn\ndef stop() -> NoReturn:\n    raise SystemExit\nprint(stop.__annotations__['return'].__name__)|NoReturn|Never type
'''
