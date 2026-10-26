import sys, json, traceback, io
_ev=[]; _n=[0]
class _W:
    def write(self,s):
        if s: _ev.append(["out",s])
        return len(s)
    def flush(self): pass
def _tr(f,e,a):
    if f.f_code.co_filename=="main.py":
        if e=="line":
            _n[0]+=1
            if _n[0]>3000: raise RuntimeError("Too many steps. Is there an endless loop?")
            _ev.append(["line",f.f_lineno])
        return _tr
    return None
_err=None
_lines=SRC.split("\n")
try:
    _c=compile(SRC,"main.py","exec")
    sys.stdout=_W(); sys.stdin=io.StringIO(STDIN); sys.settrace(_tr)
    try:
        exec(_c,{"__name__":"__main__"})
    finally:
        sys.settrace(None); sys.stdout=sys.__stdout__; sys.stdin=sys.__stdin__
except BaseException as ex:
    sys.stdout=sys.__stdout__
    ln=getattr(ex,"lineno",None) if isinstance(ex,SyntaxError) else None
    fr=[t for t in traceback.extract_tb(ex.__traceback__) if t.filename=="main.py"]
    if ln is None and fr: ln=fr[-1].lineno
    if isinstance(ex,SyntaxError):
        tb="".join(traceback.format_exception_only(type(ex),ex))
    else:
        tb="Traceback (most recent call last):\n"+"".join('  File "main.py", line %d, in <module>\n    %s\n'%(t.lineno,(_lines[t.lineno-1] if t.lineno<=len(_lines) else "").strip()) for t in fr)+("%s: %s\n"%(type(ex).__name__,ex) if str(ex) else "%s\n"%type(ex).__name__)
    _err={"type":type(ex).__name__,"msg":str(getattr(ex,"msg",ex)),"line":ln,"tb":tb}
json.dumps({"ev":_ev,"err":_err})
