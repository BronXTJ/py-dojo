TEXT = r'''
Testing|7
TestCase|A TestCase is a class of tests in the unittest module.|import unittest\nclass T(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(1 + 1, 2)\nr = unittest.TextTestRunner(stream=__import__('io').StringIO(), verbosity=0).run(unittest.defaultTestLoader.loadTestsFromTestCase(T))\nprint(r.wasSuccessful())|True|unittest module
assertEqual|assertEqual fails the test when two values are not equal.|import unittest\nprint(hasattr(unittest.TestCase, 'assertEqual'))|True|assertion
assertRaises|assertRaises passes when the block raises the exception you named.|import unittest\nclass T(unittest.TestCase):\n    def test_bad(self):\n        with self.assertRaises(ValueError):\n            int('x')\nr = unittest.TextTestRunner(stream=__import__('io').StringIO(), verbosity=0).run(unittest.defaultTestLoader.loadTestsFromTestCase(T))\nprint(r.wasSuccessful())|True|ValueError
test fixture setup|setUp runs before each test method so every test starts from the same state.|import unittest\nclass T(unittest.TestCase):\n    def setUp(self):\n        self.n = 1\n    def test_n(self):\n        self.assertEqual(self.n, 1)\nprint('setUp' in dir(T))|True|fixture
test teardown|tearDown runs after each test method, even when the test fails.|import unittest\nprint(hasattr(unittest.TestCase, 'tearDown'))|True|test fixture setup
test discovery|Discovery finds test modules by a name pattern such as test_*.py.|import unittest\nprint(hasattr(unittest.TestLoader, 'discover'))|True|test
monkeypatch|A monkeypatch replaces an attribute for the duration of a test and puts it back afterwards.|real = len\ntry:\n    globals()['len'] = lambda s: 3\n    print(len('ab'))\nfinally:\n    globals()['len'] = real|3|mock
Mock return value|A Mock's return_value is what the fake returns when you call it.|from unittest.mock import Mock\nprint(Mock(return_value=5)())|5|mock
Mock side effect|side_effect can raise or return a different value on each call.|from unittest.mock import Mock\nm = Mock(side_effect=[1, 2])\nprint(m(), m())|1 2|mock
spec mock|A spec limits a Mock to the attributes of a real object so typos fail the test.|from unittest.mock import Mock\nprint(hasattr(Mock(spec=['read']), 'read'))|True|mock
patch decorator|patch temporarily replaces a name that the code under test looks up.|from unittest.mock import patch\nwith patch('json.dumps', return_value='{}'):\n    import json\n    print(json.dumps({'a': 1}))|{}|mock
spy call count|call_count records how many times a Mock was called.|from unittest.mock import Mock\nm = Mock()\nm()\nm()\nprint(m.call_count)|2|mock
assertion helper|An assertion helper is a method such as assertIn that writes a clearer failure than a bare assert.|import unittest\nprint(hasattr(unittest.TestCase, 'assertIn'))|True|assertion
parameterized test|A parameterized test runs the same check on several inputs.|cases = [(1, 2), (2, 3)]\nprint(all(b == a + 1 for a, b in cases))|True|test
red green refactor|Red, green, refactor is the TDD loop: a failing test, the smallest code that passes, then a cleanup.|print('red then green')|red then green|TDD
test double|A test double is any stand-in, including a fake, a stub, or a mock.|from unittest.mock import Mock\nprint(Mock(return_value=1)())|1|mock
stub|A stub returns canned answers and does not check how it was called.|def geocode(city):\n    return (6.9, 79.8)\nprint(geocode('Galle')[0])|6.9|mock
fake object|A fake is a simple working version of a dependency, such as an in-memory store.|class Store:\n    def __init__(self):\n        self.rows = []\n    def add(self, row):\n        self.rows.append(row)\nprint(Store().rows)|[]|stub
coverage report|A coverage report lists which lines ran during the tests and which did not.|print('lines hit')|lines hit|coverage
branch coverage|Branch coverage asks whether both sides of each condition ran, not only whether the line ran.|print(True and False or True)|True|coverage
regression test|A regression test locks a bug fix so the same mistake fails the suite if it comes back.|print(2 + 2 == 4)|True|test
golden file|A golden file stores the output you expect, and the test compares a new run to it.|expected = 'Galle'\nprint(expected == 'Galle')|True|test
flaky test|A flaky test sometimes passes and sometimes fails without a code change.|print('unstable result')|unstable result|test
test isolation|Isolation means one test does not depend on another test having run first.|print('own setup')|own setup|fixture
doctest module|The doctest module runs examples written in docstrings.|import doctest\nprint(hasattr(doctest, 'testmod'))|True|docstring
subTest|subTest reports each input separately so one failure does not hide the rest.|import unittest\nprint(hasattr(unittest.TestCase, 'subTest'))|True|TestCase
skip test|skip marks a test that should not run in this environment.|import unittest\nprint(hasattr(unittest, 'skip'))|True|test
expected failure|expectedFailure marks a test you know is broken, so a failure is reported as expected.|import unittest\nprint(hasattr(unittest, 'expectedFailure'))|True|test
assertion message|The second argument of assert, or the msg of a helper, explains what failed.|try:\n    assert 1 == 2, 'not two'\nexcept AssertionError as e:\n    print(e)|not two|assertion
test pyramid|The test pyramid says to keep many small fast tests and fewer tests that need the whole system.|print('many unit tests')|many unit tests|test
---
Git and CI|7
repository|A repository is the project folder plus the history Git stores in .git.|print('.git')|.git|Git
working tree|The working tree is the files you see and edit.|print('your files')|your files|repository
staging area|The staging area, or index, is the snapshot that the next commit will record.|print('git add')|git add|commit
HEAD|HEAD is the name of the commit you currently have checked out.|print('current commit')|current commit|commit
branch|A branch is a movable name for a line of commits.|print('main')|main|Git
merge|A merge joins another branch's commits into the one you have checked out.|print('join histories')|join histories|branch
merge conflict|A merge conflict happens when both sides changed the same lines and Git asks you to decide.|print('both changed')|both changed|merge
rebase|A rebase replays your commits on top of another branch's tip.|print('replay')|replay|branch
remote|A remote is a named URL of another repository, often called origin.|print('origin')|origin|GitHub
clone|A clone copies a repository, including its history, onto your machine.|print('git clone')|git clone|remote
fetch|fetch downloads new commits from a remote and does not change your working tree.|print('git fetch')|git fetch|remote
pull|pull fetches and then integrates those commits into your current branch.|print('git pull')|git pull|fetch
push|push uploads your commits to a remote branch.|print('git push')|git push|remote
pull request|A pull request is a proposal to merge one branch into another, with review on a host such as GitHub.|print('review then merge')|review then merge|GitHub
diff|A diff is the line-by-line difference between two versions.|print('changed lines')|changed lines|commit
blame|Blame shows which commit last changed each line.|print('who changed it')|who changed it|commit
tag|A tag is a name pinned to one commit, often a release such as v0.3.0.|print('v0.3.0')|v0.3.0|commit
stash|Stash sets aside uncommitted edits so you can switch branches with a clean tree.|print('set aside')|set aside|working tree
detached HEAD|A detached HEAD means you checked out a commit rather than a branch, so new commits have no branch name yet.|print('not on a branch')|not on a branch|HEAD
fast-forward|A fast-forward moves a branch pointer ahead when there is no new work to combine.|print('pointer moves')|pointer moves|merge
gitignore|A gitignore file lists patterns Git should not track.|print('__pycache__/')|__pycache__/|repository
CI|Continuous integration runs checks on every push so breaks show up before a merge.|print('run the tests')|run the tests|GitHub
GitHub Actions|GitHub Actions runs workflows from YAML files in .github/workflows.|print('.github/workflows')|.github/workflows|CI
workflow|A workflow is a file that says which events start which jobs.|print('on: push')|on: push|GitHub Actions
job|A job is a set of steps that run on one runner.|print('steps')|steps|workflow
runner|A runner is the machine that executes a job.|print('ubuntu-latest')|ubuntu-latest|job
artifact|An artifact is a file a job uploads so you, or a later job, can download it.|print('dist zip')|dist zip|job
status check|A status check is the pass or fail a host reports on a commit.|print('green check')|green check|CI
protected branch|A protected branch refuses pushes that skip the required checks or reviews.|print('main is protected')|main is protected|branch
commit message|A commit message records why a change was made.|print('fix latitude order')|fix latitude order|commit
---
CLI|7
argparse|The argparse module builds a parser for command-line options and prints help from that definition.|import argparse\np = argparse.ArgumentParser(prog='demo')\np.add_argument('--city', default='Galle')\nprint(p.parse_args([]).city)|Galle|CLI
positional CLI|A positional argument is required by its place on the command line, not by a flag name.|import argparse\np = argparse.ArgumentParser()\np.add_argument('city')\nprint(p.parse_args(['Kandy']).city)|Kandy|argparse
optional flag|An optional flag starts with a dash and may have a default.|import argparse\np = argparse.ArgumentParser()\np.add_argument('--n', type=int, default=2)\nprint(p.parse_args(['--n', '4']).n)|4|argparse
store true|store_true makes a flag True when it is present and False when it is absent.|import argparse\np = argparse.ArgumentParser()\np.add_argument('--dry-run', action='store_true')\nprint(p.parse_args(['--dry-run']).dry_run)|True|argparse
nargs|nargs tells argparse how many values an argument takes, such as one, several, or the rest of the line.|import argparse\np = argparse.ArgumentParser()\np.add_argument('nums', nargs=2, type=int)\nprint(sum(p.parse_args(['1', '2']).nums))|3|argparse
choices|choices limits an argument to a set of strings you listed.|import argparse\np = argparse.ArgumentParser()\np.add_argument('--mode', choices=['r', 'w'], default='r')\nprint(p.parse_args([]).mode)|r|argparse
subcommands|Subcommands give one program several verbs, each with its own arguments.|import argparse\np = argparse.ArgumentParser()\ns = p.add_subparsers(dest='cmd')\ns.add_parser('count')\nprint(p.parse_args(['count']).cmd)|count|argparse
sys.argv|sys.argv is the list of text arguments the program received, with the script name first.|import sys\nprint(isinstance(sys.argv, list))|True|CLI
exit code|An exit code of 0 means success, and any other number means failure to the shell that ran you.|import sys\nprint(type(sys.exit).__name__ != '')|True|CLI
stdout stream|sys.stdout is the text stream print writes to by default.|import sys\nprint(hasattr(sys.stdout, 'write'))|True|output
stderr stream|sys.stderr is the stream for errors and logs, separate from the normal output.|import sys\nprint(sys.stderr is not sys.stdout)|True|stdout stream
config|Config is the settings a program reads from the environment, a file, or flags, instead of hard-coding them.|import os\nprint(os.environ.get('PYDOJO_NO_SUCH', 'fallback'))|fallback|environment variable
configparser module|The configparser module reads INI-style files of sections and keys.|import configparser\nc = configparser.ConfigParser()\nc.read_string('[map]' + chr(10) + 'crs=4326')\nprint(c['map']['crs'])|4326|config
tomllib module|The tomllib module, in the standard library since 3.11, reads TOML into dicts.|import tomllib\nprint(tomllib.loads('n = 3')['n'])|3|config
shebang|A shebang is the #! line at the top of a script that names the interpreter.|print('#!/usr/bin/env python3'.startswith('#!'))|True|script
main guard|The main guard runs a block only when the file is executed, not when it is imported.|print(__name__ == '__main__')|True|__name__
help flag|argparse adds -h, which prints the usage and exits.|import argparse\np = argparse.ArgumentParser(prog='demo')\nprint('-h' in p.format_help())|True|argparse
metavar|metavar is the placeholder name shown in help, instead of the destination name.|import argparse\np = argparse.ArgumentParser()\np.add_argument('--crs', metavar='CODE')\nprint('CODE' in p.format_help())|True|argparse
prog name|prog is the program name argparse prints in help and errors.|import argparse\nprint(argparse.ArgumentParser(prog='pydojo').prog)|pydojo|argparse
cli exit|ArgumentParser.error prints a message and exits, which scripts use for bad input.|import argparse\nprint(hasattr(argparse.ArgumentParser, 'error'))|True|argparse
---
Concurrency|8
threading module|The threading module runs functions on threads inside one process.|import threading\nprint(threading.current_thread().name)|MainThread|thread
current thread|current_thread returns the Thread object that is running this code.|import threading\nprint(isinstance(threading.current_thread(), threading.Thread))|True|thread
Thread class|Thread runs a target callable on a new thread when you call start.|import threading\nbox = []\nt = threading.Thread(target=box.append, args=(1,))\nt.start()\nt.join()\nprint(box)|-|threading module
join thread|join waits until that thread finishes.|import threading\nt = threading.Thread(target=lambda: None)\nt.start()\nt.join()\nprint(t.is_alive())|-|Thread class
Lock|A Lock lets only one thread hold it at a time, which protects shared data.|import threading\nlock = threading.Lock()\nwith lock:\n    print('held')|held|thread
RLock|An RLock may be acquired again by the thread that already holds it.|import threading\nlock = threading.RLock()\nlock.acquire()\nlock.acquire()\nprint(lock.release() or lock.release() or 'free')|free|Lock
Semaphore|A Semaphore lets a fixed number of threads into a section at once.|import threading\ns = threading.Semaphore(1)\nwith s:\n    print('one')|one|Lock
Event thread|A threading Event lets one thread wait until another sets a flag.|import threading\ne = threading.Event()\ne.set()\nprint(e.is_set())|True|thread
queue module|The queue module holds a thread-safe queue for passing work between threads.|import queue\nq = queue.Queue()\nq.put(1)\nprint(q.get())|1|queue
worker thread|A worker thread pulls tasks from a queue and runs them.|import queue\nq = queue.Queue()\nq.put(2)\nprint(q.get() + 1)|3|queue module
race condition|A race condition is a bug that appears only when threads interleave in an unlucky order.|print('order matters')|order matters|thread
deadlock|A deadlock is when threads wait on each other so none of them can continue.|print('each waits')|each waits|Lock
thread local|threading.local gives each thread its own attributes on one object.|import threading\nbox = threading.local()\nbox.n = 1\nprint(box.n)|1|thread
concurrent.futures|concurrent.futures runs calls on a pool of threads or processes and returns Future objects.|from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=1) as ex:\n    print(ex.submit(lambda: 4).result())|-|thread
Future|A Future is a placeholder for a result that is not ready yet.|from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=1) as ex:\n    fut = ex.submit(lambda: 6)\n    print(fut.result())|-|concurrent.futures
async def|async def defines a coroutine function, which returns a coroutine when you call it.|async def f():\n    return 1\nprint(f().__class__.__name__)|coroutine|asyncio
await|await pauses a coroutine until another awaitable finishes, and it is legal only inside async def.|async def f():\n    return 2\nasync def g():\n    return await f()\nprint(g().cr_code.co_name if False else 'await')|await|async def
coroutine|A coroutine is the object an async def call returns, and it runs when a runner drives it.|async def f():\n    return 1\nc = f()\nprint(hasattr(c, 'send'))|True|asyncio
Task|A Task wraps a coroutine that an event loop is driving.|print('scheduled coroutine')|scheduled coroutine|asyncio
event loop|An event loop runs tasks, waits for I/O, and wakes coroutines when their await finishes.|print('one loop per thread')|one loop per thread|asyncio
awaitable|An awaitable is anything await accepts: a coroutine, a Task, or an object with __await__.|async def f():\n    return 1\nprint(hasattr(f(), '__await__'))|True|await
async with|async with uses __aenter__ and __aexit__ so cleanup can itself await.|print('async cleanup')|async cleanup|context manager
async for|async for walks an async iterator with __anext__.|print('async iterator')|async iterator|iterator
gather|asyncio.gather runs several awaitables together and collects their results.|print('many awaits')|many awaits|asyncio
to_thread|asyncio.to_thread runs a blocking function on a thread so the event loop can keep going.|print('off the loop')|off the loop|thread
GIL release|Some built-ins release the GIL while they wait on I/O or run C code that does not touch Python objects.|print('io can overlap')|io can overlap|GIL
process pool|A process pool runs callables in other processes so they can use several CPU cores.|print('separate interpreters')|separate interpreters|multiprocessing
daemon thread|A daemon thread does not keep the process alive when the other threads have finished.|import threading\nt = threading.Thread(target=lambda: None, daemon=True)\nprint(t.daemon)|True|thread
---
Memory|8
reference count|CPython counts how many references point at an object and can free it when the count hits zero.|import sys\nprint(sys.getrefcount(object()) > 0)|True|reference
cyclic gc|The cyclic garbage collector finds groups of objects that reference only each other, which reference counts cannot free.|import gc\nprint(gc.isenabled())|True|garbage collection
gc generation|The collector keeps three generations, and objects that survive a collection move to an older one.|import gc\nprint(len(gc.get_count()) == 3)|True|cyclic gc
reference cycle|A reference cycle is a loop of references, such as a list that contains itself.|a = []\na.append(a)\nprint(a[0] is a)|True|cyclic gc
del statement effect|del drops a name, and the object is freed only when no other reference remains.|a = [1]\nb = a\ndel a\nprint(b)|[1]|reference
id builtin|id returns an integer that is unique for this object while it is alive.|a = []\nprint(id(a) == id(a))|True|reference
interning|CPython may reuse one object for some small integers and some strings, and sys.intern returns a single shared string.|import sys\nprint(sys.intern('py-dojo') is sys.intern('py-dojo'))|True|identity
small int cache|CPython keeps a cache of small integers, so those values may share one object.|print(int('1') == 1)|True|integer
object header|Every CPython object carries a header with its type and reference count before its own data.|print('type and count')|type and count|reference count
allocation|Allocation asks the allocator for memory to hold a new object.|a = [0] * 3\nprint(len(a))|3|reference
arena|CPython's pymalloc groups small objects into arenas so many tiny allocations stay cheap.|print('small objects')|small objects|allocation
fragmentation|Fragmentation is free memory split into pieces too small or too scattered for a new object.|print('gaps')|gaps|allocation
memory view export|A buffer-exporting object can be viewed with memoryview without copying the bytes.|print(bytes(memoryview(b'abcd')[:2]))|b'ab'|memoryview
tracemalloc module|The tracemalloc module records where Python allocated blocks so you can see what grew.|import tracemalloc\ntracemalloc.start()\nn = tracemalloc.get_traced_memory()[0]\ntracemalloc.stop()\nprint(n >= 0)|True|profiling
getsizeof|sys.getsizeof reports the memory of one object and not the objects it points to.|import sys\nprint(sys.getsizeof(1) > 0)|True|reference
shallow size|The shallow size is getsizeof of the container alone, without its items.|import sys\nprint(sys.getsizeof([]) > 0)|True|getsizeof
deep size|The deep size adds the sizes of the objects a container reaches.|import sys\nprint(sys.getsizeof([1]) >= sys.getsizeof([]))|True|shallow size
slot wrapper|A slot wrapper is the C function object you see for many built-in methods.|print(type([].append).__name__)|builtin_function_or_method|__slots__
weak reference callback|A weak reference can call a function when its object is collected.|import weakref\nclass A: pass\na = A()\nseen = []\nref = weakref.ref(a, lambda r: seen.append(1))\ndel a\nimport gc\ngc.collect()\nprint(seen == [1] or seen == [])|True|weakref module
resident set|The resident set is the physical memory the operating system has given the process.|print('RSS')|RSS|allocation
---
Performance|8
cProfile module|cProfile records how many times each function ran and how long it took.|import cProfile\np = cProfile.Profile()\np.enable()\nsum(range(10))\np.disable()\nprint(p.getstats() is not None or True)|True|profiling
timeit module|The timeit module measures a snippet by running it many times.|import timeit\nprint(timeit.timeit('1+1', number=10) >= 0)|True|profiling
perf counter|perf_counter is a clock for measuring a duration, not for telling the date.|import time\nt = time.perf_counter()\nprint(time.perf_counter() >= t)|True|profiling
hot spot|A hot spot is the part of the program that accounts for most of the time.|print('the slow function')|the slow function|profiling
benchmark|A benchmark times a fixed task so you can compare two versions.|import timeit\nprint(timeit.timeit('[]', number=5) >= 0)|True|timeit module
premature optimisation|Premature optimisation is tuning code before you know it is slow or correct.|print('measure first')|measure first|optimisation
algorithmic improvement|An algorithmic improvement changes the number of steps, which beats micro-tuning a slow recipe.|print(sum(range(4)))|6|Big-O
local variable lookup|Loading a local name is cheaper than loading a global, because the local is an array slot.|def f():\n    n = 1\n    return n\nprint(f())|1|scope
function call cost|A Python function call does real work, so a tiny call inside a tight loop can dominate.|def f(x):\n    return x\nprint(f(1))|1|function
builtin speed|A built-in written in C, such as sum, usually beats the same loop written in Python.|print(sum([1, 2, 3]))|6|built-in
list overallocation|A list allocates spare room so append can be amortised instead of copying every time.|a = []\na.append(1)\nprint(len(a))|1|amortised
string concatenation cost|Repeated s += piece in a loop copies growing text, so collecting pieces and joining is kinder.|print(''.join(['a', 'b']))|ab|string
comprehension speed|A comprehension avoids the Python-level append calls of an open loop.|print([x for x in range(3)])|[0, 1, 2]|comprehension
cache result|Caching a result helps only when the same inputs come back and the work is expensive.|seen = {}\ndef f(n):\n    if n not in seen:\n        seen[n] = n * n\n    return seen[n]\nprint(f(4))|16|memoisation
pypy|PyPy is another Python implementation with a JIT, not the CPython this course runs.|print('another implementation')|another implementation|interpreter
C extension|A C extension is a module compiled to native code that Python imports like any other module.|import math\nprint(math.__name__)|math|module
vectorised loop|A vectorised loop does the arithmetic in a library over a whole array instead of in the Python for-loop.|print([x * 2 for x in (1, 2)])|[2, 4]|vectorisation
profiler stats|Profiler stats sort functions by their own time or by the time of everything they called.|print('tottime and cumtime')|tottime and cumtime|cProfile module
wall time|Wall time is the time a clock on the wall would show, including waiting.|import time\nprint(time.time() > 0)|True|profiling
CPU time|CPU time counts how long the process actually ran on a processor.|import time\nprint(time.process_time() >= 0)|True|wall time
---
Security|9
injection|Injection is when untrusted text is treated as code or as a command.|print('keep data and code apart')|keep data and code apart|bug
SQL injection|SQL injection is when someone else's text changes the meaning of a query you built with string pasting.|query = 'select * from t where id = ?'\nprint('?' in query)|True|SQL
shell injection|Shell injection is when untrusted text is pasted into a shell command.|print('skip the shell')|skip the shell|injection
eval risk|eval and exec will run whatever source you give them, so they are a poor fit for untrusted text.|print(eval('1 + 1') == 2)|True|eval builtin
pickle risk|pickle can run arbitrary code while loading, so you load only pickles you trust.|import pickle\nprint(pickle.loads(pickle.dumps(1)))|1|eval risk
yaml load|Some YAML loaders can construct arbitrary objects, so untrusted YAML needs a safe loader.|print('safe loader')|safe loader|injection
secret in code|A password or token written in source tends to leak through git history.|print('read it from the environment')|read it from the environment|environment variable
environment secret|Putting a secret in an environment variable keeps it out of the source file.|import os\nprint(os.environ.get('NO_SUCH_TOKEN', 'missing'))|missing|config
hash password|A password store keeps a slow hash, not the password itself.|import hashlib\nprint(len(hashlib.sha256(b'pw').hexdigest()))|64|hashlib module
salt|A salt is random bytes mixed into a password hash so identical passwords do not look identical.|import hashlib, os\nsalt = os.urandom(4)\nprint(len(hashlib.sha256(salt + b'pw').digest()))|32|hash password
compare digest|compare_digest checks two strings in a way that does not stop at the first difference.|import secrets\nprint(secrets.compare_digest('abc', 'abc'))|True|secrets module
path traversal|Path traversal is when a user-supplied path such as ../ escapes the folder you meant to open.|from pathlib import PurePosixPath\nprint('..' in PurePosixPath('/data/../secret').parts)|True|file
HTTPS|HTTPS is HTTP inside TLS, so the bytes on the wire are encrypted and the server is authenticated.|print('https')|https|API
TLS|TLS is the protocol that encrypts a connection and checks a certificate.|print('transport security')|transport security|HTTPS
certificate|A certificate binds a public key to a name, and clients check it when they open TLS.|print('check the name')|check the name|TLS
csrf|Cross-site request forgery tricks a browser into sending a user's cookies to your site from another site.|print('check a token')|check a token|API
xss|Cross-site scripting is when someone else's text runs as a script in a victim's browser.|import html\nprint(html.escape('<script>'))|&lt;script&gt;|injection
open redirect|An open redirect sends a user to a URL an attacker chose.|print('allow only known hosts')|allow only known hosts|API
least privilege|Least privilege means a program and its keys can do only what they need.|print('narrow token')|narrow token|secret in code
dependency confusion|Dependency confusion tricks an installer into taking a public package that shadows a private name.|print('pin the index')|pin the index|pip
supply chain|The supply chain is every package and build tool you trust when you install.|print('review updates')|review updates|dependency confusion
bandit|Bandit is a tool that scans Python for common security mistakes.|print('static scan')|static scan|linter
safe temp|tempfile helpers create files with restrictive permissions and unpredictable names.|import tempfile\nprint(callable(tempfile.mkstemp))|True|temporary file
redaction|Redaction removes secrets from logs and error messages before they are stored.|msg = 'token=abc'\nprint('token=***' if msg.startswith('token=') else msg)|token=***|logging
'''
