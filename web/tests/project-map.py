import json,math
g=json.load(open('lka.json'))['features'][0]['geometry']
polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
K=math.cos(math.radians(7.8));S=60;X0,Y0=79.5,9.95;OX,OY=222,12
P=lambda lo,la:(OX+(lo-X0)*K*S,OY+(Y0-la)*S)
def dp(pts,t):
    if len(pts)<3:return pts
    a,b=pts[0],pts[-1];dm,ix=0,0
    for i in range(1,len(pts)-1):
        x,y=pts[i];dx,dy=b[0]-a[0],b[1]-a[1];L=math.hypot(dx,dy) or 1
        d=abs(dy*x-dx*y+b[0]*a[1]-b[1]*a[0])/L
        if d>dm:dm,ix=d,i
    return dp(pts[:ix+1],t)[:-1]+dp(pts[ix:],t) if dm>t else [a,b]
def area(p):return abs(sum(p[i][0]*p[i-1][1]-p[i-1][0]*p[i][1] for i in range(len(p))))/2
def path(t,minA):
    out=[]
    for poly in polys:
        r=[P(*c) for c in poly[0]]
        if area(r)<minA:continue
        if t:
            m=max(range(len(r)),key=lambda i:math.hypot(r[i][0]-r[0][0],r[i][1]-r[0][1]));r=dp(r[:m+1],t)[:-1]+dp(r[m:],t)
        out.append("M"+" ".join("%.1f %.1f"%q for q in r)+"Z")
    return "".join(out)
cities={"colombo":(79.861,6.927),"kandy":(80.636,7.291),"galle":(80.217,6.053),"jaffna":(80.015,9.661),"trincomalee":(81.233,8.587),"anuradhapura":(80.403,8.312),"matara":(80.535,5.948),"negombo":(79.838,7.209),"kurunegala":(80.366,7.487),"batticaloa":(81.692,7.731),"nuwara eliya":(80.783,6.970),"badulla":(81.056,6.989),"ratnapura":(80.399,6.705),"kalutara":(79.959,6.584)}
json.dump({"simple":path(0.5,2),"full":path(0,0),"cities":{k:[round(v,1) for v in P(*c)] for k,c in cities.items()}},open('map.json','w'))
m=json.load(open('map.json'));print(len(m['simple']),len(m['full']),m['cities'])
