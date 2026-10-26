TEXT = r'''
Stdlib|3
math module|The math module holds functions for real numbers, such as sqrt, floor, and gcd.|import math\nprint(math.gcd(12, 8))|4|module
cmath module|The cmath module holds maths for complex numbers.|import cmath\nprint(cmath.sqrt(-1))|1j|math module
statistics module|The statistics module computes means, medians, and spread.|import statistics\nprint(statistics.median([1, 3, 2]))|2|module
fractions module|The fractions module stores exact rational numbers.|from fractions import Fraction\nprint(Fraction(1, 3) + Fraction(1, 6))|1/2|Decimal
random module|The random module draws pseudo-random numbers from a seed you can set.|import random\nrandom.seed(0)\nprint(random.randrange(1, 2))|1|module
secrets module|The secrets module draws random values that are safe for tokens and passwords.|import secrets\nprint(secrets.compare_digest('ab', 'ab'))|True|random module
hashlib module|The hashlib module computes cryptographic hashes such as SHA-256.|import hashlib\nprint(hashlib.sha256(b'a').hexdigest()[:8])|ca978112|module
hmac module|The hmac module builds a keyed hash so a message can be checked for tampering.|import hmac\nprint(hmac.new(b'k', b'm', 'sha256').hexdigest()[:6])|b60090|hashlib module
json module|The json module turns Python objects into JSON text and back.|import json\nprint(json.loads('{"a": 1}')['a'])|1|JSON
csv module|The csv module reads and writes comma-separated tables.|import csv, io\nprint(next(csv.reader(io.StringIO('a,b'))))|['a', 'b']|CSV
re module|The re module searches text with regular expressions.|import re\nprint(re.sub(r'\d', '#', 'a1'))|a#|regular expression
datetime module|The datetime module represents dates and times.|from datetime import date, timedelta\nprint((date(2026, 10, 26) + timedelta(days=1)).isoformat())|2026-10-27|module
calendar module|The calendar module answers questions about weeks and leap years.|import calendar\nprint(calendar.isleap(2024))|True|datetime module
time module|The time module reads the clock and sleeps.|import time\nprint(time.strftime('%Y', time.gmtime(0)))|1970|datetime module
collections module|The collections module adds specialised containers such as deque and Counter.|from collections import namedtuple\nprint(namedtuple('P', 'x')(3).x)|3|module
ChainMap|A ChainMap looks through several dicts in order and writes to the first.|from collections import ChainMap\nprint(ChainMap({'a': 1}, {'a': 2})['a'])|1|dictionary
itertools module|The itertools module builds lazy iterators for combining and repeating sequences.|import itertools\nprint(list(itertools.chain([1], [2])))|[1, 2]|iterable
functools module|The functools module has tools that wrap or combine functions, including cache and reduce.|import functools, operator\nprint(functools.reduce(operator.add, [1, 2, 3]))|6|function
operator module|The operator module exposes operators as functions.|import operator\nprint(operator.itemgetter(1)(('a', 'b')))|b|operator
pathlib module|The pathlib module builds paths as objects instead of raw strings.|from pathlib import PurePosixPath\nprint(PurePosixPath('maps') / 'city.geojson')|maps/city.geojson|file
io module|The io module provides in-memory file objects for text and bytes.|import io\nprint(io.StringIO('hi').read())|hi|file
contextlib module|The contextlib module helps you write objects that work with with.|from contextlib import suppress\nwith suppress(ZeroDivisionError):\n    1/0\nprint('ok')|ok|context manager
copy module|The copy module makes shallow and deep copies of objects.|import copy\nprint(copy.copy([1]) == [1])|True|shallow copy
pprint module|The pprint module prints structures on several lines so they are easier to read.|import pprint\nprint(pprint.pformat({'a': 1}))|{'a': 1}|dictionary
textwrap module|The textwrap module wraps and tidies paragraphs of text.|import textwrap\nprint(textwrap.dedent('  a').strip())|a|string
string module|The string module holds handy constants and small text helpers.|import string\nprint(string.capwords('sri lanka'))|Sri Lanka|string
struct module|The struct module packs numbers into bytes of a fixed layout.|import struct\nprint(struct.pack('>H', 256).hex())|0100|bytes
abc module|The abc module defines abstract base classes.|from abc import ABC\nprint(issubclass(ABC, object))|True|abstract base class
typing module|The typing module holds names used in type hints, such as Optional and Protocol.|import typing\nprint(typing.get_origin(list[int]).__name__)|list|type hint
unittest module|The unittest module is the standard-library test framework.|import unittest\nprint(issubclass(unittest.TestCase, object))|True|test
warnings module|The warnings module issues and filters warnings.|import warnings\nwarnings.simplefilter('ignore', UserWarning)\nwarnings.warn('x', UserWarning)\nprint('quiet')|quiet|warning
traceback module|The traceback module formats and walks exception tracebacks.|import traceback\nprint(hasattr(traceback, 'format_exc'))|True|traceback
inspect module|The inspect module reads live objects: signatures, source, and frames.|import inspect\nprint(str(inspect.signature(lambda *, a: a)))|(*, a)|function
gc module|The gc module controls and inspects the cyclic garbage collector.|import gc\nprint(gc.isenabled())|True|garbage collection
weakref module|The weakref module holds a reference that does not keep an object alive by itself.|import weakref\nclass A: pass\na = A()\nr = weakref.ref(a)\nprint(r() is a)|True|reference
keyword module|The keyword module lists Python's reserved words.|import keyword\nprint(keyword.iskeyword('class'))|True|keyword
unicodedata module|The unicodedata module looks up Unicode names and categories.|import unicodedata\nprint(unicodedata.name('A'))|LATIN CAPITAL LETTER A|string
html module|The html module escapes text so it is safe inside HTML.|import html\nprint(html.escape('<a>'))|&lt;a&gt;|string
urllib.parse module|The urllib.parse module splits and builds URLs without opening a network connection.|from urllib.parse import quote\nprint(quote('a b'))|a%20b|string
base64 module|The base64 module encodes bytes as ASCII text.|import base64\nprint(base64.b64encode(b'ab').decode())|YWI=|bytes
sys module|The sys module exposes the interpreter: version, path, and limits.|import sys\nprint(sys.version_info.major)|3|interpreter
os module|The os module talks to the operating system: folders, processes, and environment.|import os\nprint(os.path.join('a', 'b'))|a/b|file
importlib module|The importlib module loads and reloads modules from code.|import importlib\nprint(importlib.import_module('json').__name__)|json|import
pkgutil module|The pkgutil module walks packages and their modules.|import pkgutil\nprint(hasattr(pkgutil, 'iter_modules'))|True|package
dis module|The dis module shows the bytecode the compiler produced for a function.|import dis\nprint(hasattr(dis, 'dis'))|True|interpreter
ast module|The ast module reads Python source as a tree of syntax nodes.|import ast\nprint(type(ast.parse('x = 1')).__name__)|Module|syntax
tokenize module|The tokenize module splits source into tokens the way the parser does.|import io, tokenize\ntoks = list(tokenize.generate_tokens(io.StringIO('x = 1').readline))\nprint(any(t.string == 'x' for t in toks))|True|token
compile builtin|compile() turns a source string into a code object you can exec.|c = compile('x = 2', '<s>', 'exec')\nns = {}\nexec(c, ns)\nprint(ns['x'])|2|expression
exec builtin|exec() runs a string or code object as statements.|ns = {}\nexec('y = 3', ns)\nprint(ns['y'])|3|statement
eval builtin|eval() runs one expression and returns its value.|print(eval('2 + 3'))|5|expression
---
Exceptions|4
BaseException|BaseException is the root of every built-in exception, including SystemExit and KeyboardInterrupt.|print(issubclass(Exception, BaseException))|True|exception
Exception class|Exception is the base class for errors that ordinary programs catch.|print(issubclass(ValueError, Exception))|True|exception
ValueError|ValueError means a value has the right type but is not acceptable.|try:\n    int('x')\nexcept ValueError:\n    print('bad')|bad|exception
TypeError|TypeError means an operation got a value of the wrong type.|try:\n    print(1 + 'a')\nexcept TypeError:\n    print('types')|types|exception
NameError|NameError means a name has not been bound yet.|try:\n    print(no_such_name)\nexcept NameError:\n    print('missing')|missing|variable
AttributeError|AttributeError means an object has no attribute with that name.|try:\n    print((1).missing)\nexcept AttributeError:\n    print('no attr')|no attr|attribute
ZeroDivisionError|ZeroDivisionError is raised when you divide by zero.|try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print('zero')|zero|operator
OverflowError|OverflowError is raised when a result is too large for the type that must hold it.|import math\ntry:\n    math.exp(1000)\nexcept OverflowError:\n    print('big')|big|float
IndexError class|IndexError is the class of errors for an index outside a sequence.|print(IndexError.__name__)|IndexError|IndexError
KeyError class|KeyError is the class of errors for a missing dict key.|print(KeyError.__name__)|KeyError|KeyError
StopIteration|StopIteration tells a consumer that an iterator is finished.|it = iter([])\ntry:\n    next(it)\nexcept StopIteration:\n    print('end')|end|iterator
StopAsyncIteration|StopAsyncIteration ends an async iterator, the async twin of StopIteration.|print(issubclass(StopAsyncIteration, Exception))|True|asyncio
ArithmeticError|ArithmeticError is the parent of ZeroDivisionError, OverflowError, and FloatingPointError.|print(issubclass(ZeroDivisionError, ArithmeticError))|True|ZeroDivisionError
LookupError|LookupError is the parent of IndexError and KeyError.|print(issubclass(KeyError, LookupError))|True|KeyError
OSError|OSError is the parent of errors that come from the operating system, such as a missing file.|print(issubclass(FileNotFoundError, OSError))|True|file
FileNotFoundError|FileNotFoundError means a path does not name an existing file.|print(issubclass(FileNotFoundError, OSError))|True|file
PermissionError|PermissionError means the operating system refused an action.|print(issubclass(PermissionError, OSError))|True|OSError
IsADirectoryError|IsADirectoryError means a file operation was aimed at a directory.|print(issubclass(IsADirectoryError, OSError))|True|file
NotADirectoryError|NotADirectoryError means a directory operation was aimed at a file.|print(issubclass(NotADirectoryError, OSError))|True|file
TimeoutError|TimeoutError means a system call timed out.|print(issubclass(TimeoutError, OSError))|True|OSError
ConnectionError|ConnectionError is the parent of network connection failures in the built-in exceptions.|print(issubclass(ConnectionError, OSError))|True|OSError
RuntimeError|RuntimeError is a general error for a problem that does not fit a more specific type.|try:\n    raise RuntimeError('x')\nexcept RuntimeError:\n    print('caught')|caught|exception
SystemExit|SystemExit is what sys.exit raises so the interpreter can shut down.|import sys\nprint(issubclass(SystemExit, BaseException))|True|BaseException
KeyboardInterrupt|KeyboardInterrupt is raised when the user asks the interpreter to stop, usually with Ctrl+C.|print(issubclass(KeyboardInterrupt, BaseException))|True|BaseException
GeneratorExit|GeneratorExit is raised inside a generator when it is closed.|print(issubclass(GeneratorExit, BaseException))|True|generator
ImportError|ImportError means an import failed, or a name is missing inside a module.|try:\n    from math import not_a_name\nexcept ImportError:\n    print('no name')|no name|import
ModuleNotFoundError|ModuleNotFoundError means import could not find the module.|try:\n    import not_a_real_module_name_xyz\nexcept ModuleNotFoundError:\n    print('no mod')|no mod|import
NotImplementedError|NotImplementedError marks a method that a subclass is expected to fill in.|class A:\n    def f(self):\n        raise NotImplementedError\ntry:\n    A().f()\nexcept NotImplementedError:\n    print('todo')|todo|abstract base class
IndentationError|IndentationError means the indent of a block does not match Python's rules.|print(issubclass(IndentationError, SyntaxError))|True|indentation
TabError|TabError means tabs and spaces were mixed in a way Python refuses.|print(issubclass(TabError, IndentationError))|True|indentation
UnboundLocalError|UnboundLocalError means a local name was read before it was assigned.|print(issubclass(UnboundLocalError, NameError))|True|scope
UnicodeError|UnicodeError is the parent of encode and decode failures.|print(issubclass(UnicodeDecodeError, UnicodeError))|True|encoding
UnicodeEncodeError|UnicodeEncodeError means a character cannot be represented in the encoding you asked for.|try:\n    'ක'.encode('ascii')\nexcept UnicodeEncodeError:\n    print('ascii')|ascii|encoding
UnicodeDecodeError|UnicodeDecodeError means bytes are not valid in the encoding you asked for.|try:\n    b'\xff'.decode('utf-8')\nexcept UnicodeDecodeError:\n    print('bad utf-8')|bad utf-8|encoding
UnicodeTranslateError|UnicodeTranslateError means a character could not be translated during a codec translate call.|print(issubclass(UnicodeTranslateError, UnicodeError))|True|encoding
AssertionError|AssertionError is what a failed assert raises.|try:\n    assert False\nexcept AssertionError:\n    print('failed')|failed|assertion
EOFError|EOFError means input() hit the end of the input stream.|print(issubclass(EOFError, Exception))|True|input
MemoryError|MemoryError means Python could not allocate more memory.|print(issubclass(MemoryError, Exception))|True|garbage collection
RecursionError class|RecursionError is raised when the call stack gets too deep.|print(issubclass(RecursionError, RuntimeError))|True|RecursionError
ReferenceError|ReferenceError means a weak reference's object was already collected.|print(issubclass(ReferenceError, Exception))|True|weakref module
ExceptionGroup|ExceptionGroup bundles several exceptions so they can be raised and caught together.|print(ExceptionGroup('g', [ValueError('a')]).message)|g|try/except
except star|except* catches matching exceptions inside an ExceptionGroup and leaves the rest grouped.|print('except* splits a group')|except* splits a group|ExceptionGroup
Warning category|Warning is the base class of warning categories, and it inherits from Exception.|print(issubclass(UserWarning, Warning))|True|warning
UserWarning|UserWarning is the default category for warnings.warn.|print(issubclass(UserWarning, Warning))|True|warning
DeprecationWarning|DeprecationWarning marks a feature that may be removed later.|print(issubclass(DeprecationWarning, Warning))|True|warning
FutureWarning|FutureWarning marks a behaviour that will change in a later Python.|print(issubclass(FutureWarning, Warning))|True|warning
RuntimeWarning|RuntimeWarning flags a suspicious result that did not raise, such as an invalid numeric case.|print(issubclass(RuntimeWarning, Warning))|True|warning
SyntaxWarning|SyntaxWarning flags source that is legal but likely a mistake.|print(issubclass(SyntaxWarning, Warning))|True|syntax
ResourceWarning|ResourceWarning flags a resource, often a file, that was not closed cleanly.|print(issubclass(ResourceWarning, Warning))|True|file
BytesWarning|BytesWarning flags a mix of bytes and str that may become an error.|print(issubclass(BytesWarning, Warning))|True|bytes
EncodingWarning|EncodingWarning flags a text file opened without a declared encoding.|print(issubclass(EncodingWarning, Warning))|True|encoding
raise from|raise X from Y chains exceptions so the traceback shows the original cause.|try:\n    try:\n        int('x')\n    except ValueError as e:\n        raise RuntimeError('wrap') from e\nexcept RuntimeError as e:\n    print(type(e.__cause__).__name__)|ValueError|raise
exception notes|add_note attaches a string to an exception, shown after the traceback.|e = ValueError('bad')\ne.add_note('row 3')\nprint(e.__notes__[0])|row 3|traceback
---
Files|4
with statement|with calls an object's setup and cleanup around a block, even when the block raises.|from contextlib import closing\nclass B:\n    def close(self):\n        print('closed')\nwith closing(B()):\n    pass|closed|context manager
PurePath|A PurePath manipulates path strings without touching the disk.|from pathlib import PurePosixPath\nprint(PurePosixPath('maps/city.geojson').suffix)|.geojson|pathlib module
path stem|The stem of a path is the final name with the suffix removed.|from pathlib import PurePosixPath\nprint(PurePosixPath('maps/city.geojson').stem)|city|PurePath
path parent|The parent of a path is the directory that contains it.|from pathlib import PurePosixPath\nprint(PurePosixPath('maps/city.geojson').parent.as_posix())|maps|PurePath
path parts|Path.parts is the tuple of pieces between separators.|from pathlib import PurePosixPath\nprint(PurePosixPath('a/b').parts)|('a', 'b')|PurePath
suffix chain|A path can have more than one suffix, and suffixes lists them.|from pathlib import PurePosixPath\nprint(PurePosixPath('a.tar.gz').suffixes)|['.tar', '.gz']|PurePath
text mode|Opening a file in text mode, the default, decodes bytes into str.|import io\nprint(io.StringIO('ok').read())|ok|encoding
binary mode|Opening a file with b in the mode reads and writes bytes.|import io\nprint(io.BytesIO(b'ok').read())|b'ok'|bytes
newline translation|In text mode, Python translates line endings unless you pass newline=''.|import io\ns = io.StringIO('a' + chr(13) + chr(10) + 'b', newline=None).read()\nprint(s == 'a' + chr(10) + 'b')|True|text mode
file handle|A file object remembers a position and moves it as you read or write.|import io\nf = io.StringIO('abcd')\nf.read(2)\nprint(f.read())|cd|file
seek|seek moves the file position to a byte or character offset.|import io\nf = io.StringIO('abcd')\nf.seek(2)\nprint(f.read())|cd|file handle
tell|tell returns the current file position.|import io\nf = io.StringIO('abcd')\nf.read(2)\nprint(f.tell())|2|seek
read method|read pulls the rest of a file, or the next n characters.|import io\nprint(io.StringIO('Galle').read(3))|Gal|file
readline method|readline pulls one line, including the newline if there is one.|import io\nline = io.StringIO('a' + chr(10) + 'b').readline()\nprint(line == 'a' + chr(10))|True|file
readlines method|readlines returns a list of lines.|import io\nlines = io.StringIO('a' + chr(10) + 'b' + chr(10)).readlines()\nprint(len(lines))|2|file
write method|write sends text or bytes to a file and returns how many were written.|import io\nf = io.StringIO()\nprint(f.write('hi'))|2|file
flush|flush pushes buffered output toward the operating system.|import io\nf = io.StringIO()\nf.write('hi')\nf.flush()\nprint(f.getvalue())|hi|file
encoding argument|The encoding argument of open names how text is decoded, and UTF-8 is the safe default to pass.|import io\nprint(io.TextIOWrapper(io.BytesIO('ක'.encode()), encoding='utf-8').read())|ක|encoding
errors argument|The errors argument of open says what to do with bytes that do not decode, such as replace or strict.|b = b'\xff'\nprint(b.decode('utf-8', errors='replace') == '\ufffd')|True|UnicodeDecodeError
utf-8|UTF-8 is a Unicode encoding that stores ASCII as one byte and other characters as more.|print('A'.encode('utf-8'))|b'A'|encoding
byte order mark|A byte order mark is an optional signature at the start of some Unicode files.|print('ක'.encode('utf-8-sig')[:3])|b'\xef\xbb\xbf'|utf-8
temporary file|A temporary file lives in a scratch folder and is meant to be deleted when you are done.|import tempfile\nprint(tempfile.gettempdir() != '')|True|file
directory|A directory is a folder that holds files and other directories.|import os\nprint(os.path.basename('/a/b'))|b|file
glob pattern|A glob pattern such as *.py matches paths with wildcards.|import fnmatch\nprint(fnmatch.fnmatch('a.py', '*.py'))|True|pathlib module
shutil module|The shutil module copies, moves, and removes trees of files.|import shutil\nprint(hasattr(shutil, 'copy'))|True|file
current directory|The current directory is the folder relative paths are resolved from.|import os\nprint(os.curdir)|.|directory
home shortcut|Path.home is the method that asks the operating system for the user's home directory.|from pathlib import Path\nprint(callable(Path.home))|True|pathlib module
---
Packaging|4
PyPI|PyPI is the default public index pip searches for packages.|print('pypi.org')|pypi.org|pip
wheel|A wheel is a built package file, .whl, that pip can install without running a build step.|print('demo-1.0-py3-none-any.whl'.endswith('.whl'))|True|pip
sdist|An sdist is a source distribution, usually a .tar.gz of the project, that may need a build to install.|print('pkg-1.0.tar.gz'.endswith('.tar.gz'))|True|wheel
pyproject.toml|pyproject.toml is the standard file that names a project's build system and, often, its metadata.|print('[build-system]' in '[build-system]')|True|package
setuptools|setuptools is a common build backend that reads project metadata and builds wheels.|print('setuptools')|setuptools|pyproject.toml
requirements file|A requirements file lists packages for pip to install, one specifier per line.|print('maps>=0.14'.split('>=')[0])|maps|pip
constraints file|A constraints file limits versions pip may choose without adding those packages as requirements.|print('limits versions')|limits versions|requirements file
lock file|A lock file pins every dependency, including indirect ones, so installs can be repeated.|print('pins versions')|pins versions|requirements file
uv|uv is a fast installer and resolver from Astral that can create virtual environments and install from PyPI.|print('uv install')|uv install|pip
poetry|Poetry is a tool that manages dependencies, a lock file, and publishing from pyproject.toml.|print('poetry lock')|poetry lock|lock file
hatch|Hatch is a project manager and build backend that uses pyproject.toml.|print('hatchling')|hatchling|pyproject.toml
build tool|The build package runs a PEP 517 backend to produce an sdist and a wheel.|print('python -m build')|python -m build|wheel
twine|Twine uploads built distributions to PyPI.|print('twine upload')|twine upload|PyPI
version specifier|A version specifier such as >=1.2,<2 tells an installer which releases are acceptable.|print('>=1.2,<2'.startswith('>='))|True|pip
PEP 440|PEP 440 defines how Python package versions are written and compared.|print('1.2.0')|1.2.0|version specifier
PEP 517|PEP 517 defines how a frontend asks a backend to build a source tree.|print('build backend')|build backend|pyproject.toml
PEP 518|PEP 518 put the build-system table in pyproject.toml so tools know which backend to install.|print('requires')|requires|PEP 517
build isolation|Build isolation installs the build dependencies in a temporary environment so they do not leak into the project.|print('isolated')|isolated|PEP 517
editable install|An editable install puts a link to your source on the path so edits apply without reinstalling.|print('install -e .')|install -e .|pip
extra dependency|An extra is an optional group of dependencies, installed with a name in square brackets.|print('pkg[gis]'.endswith(']'))|True|requirements file
console script|A console script is an entry point that creates a command on your PATH when the package is installed.|print('pydojo = app:main')|pydojo = app:main|CLI
entry point|An entry point is a named callable a package advertises for scripts or plugins.|print('group:name')|group:name|console script
yanked release|A yanked release stays on the index for pins that already use it, but installers avoid it for new solves.|print('yanked')|yanked|PyPI
index URL|An index URL is the address of a package index, and the default is PyPI.|print('https://pypi.org/simple')|https://pypi.org/simple|pip
bytecode cache|__pycache__ holds .pyc files so Python can skip recompiling a module that has not changed.|print('__pycache__')|__pycache__|module
pyc file|A .pyc file stores the bytecode of a module.|print('mod.pyc'.endswith('.pyc'))|True|bytecode cache
dependency resolver|A resolver picks a set of package versions that satisfy every requirement at once.|print('solve')|solve|pip
direct dependency|A direct dependency is one your project names itself.|print('named by you')|named by you|requirements file
indirect dependency|An indirect dependency is one that another package needs, not one you listed.|print('needed by a library')|needed by a library|direct dependency
pip freeze|pip freeze prints the versions currently installed, in a form a requirements file can use.|print('pkg==1.2.3')|pkg==1.2.3|requirements file
venv module|The venv module creates virtual environments using the Python you run it with.|print('env module')|env module|virtual environment
'''
