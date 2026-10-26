// Py Dojo acceptance suite. Usage: node tests/qa.cjs chromium|firefox|webkit
// Env: PYDOJO_URL (default dist/index.html), PYDOJO_SHOTS (default qa-results/shots/), PYDOJO_SIZES (e.g. "laptop,phone")
// Chromium: CHROME_PATH (default /usr/bin/google-chrome). CHROME_NO_SANDBOX=1 adds --no-sandbox.
const pw=require('playwright-core');const fs=require('fs');const path=require('path');const http=require('http');
const BR=process.argv[2]||'chromium';
const DIST=path.resolve(__dirname,'../dist');
const D=process.env.PYDOJO_SHOTS||path.join(__dirname,'../qa-results/shots/');
const URL=process.env.PYDOJO_URL||('file://'+path.join(DIST,'index.html'));
fs.mkdirSync(D,{recursive:true});
const SIZES=[[1280,800,'laptop'],[390,844,'phone'],[768,1024,'ipad'],[1920,1080,'desktop']].filter(s=>!process.env.PYDOJO_SIZES||process.env.PYDOJO_SIZES.split(',').includes(s[2]));
const FOUNDER='print("*** Welcome to Nuwara Eliya, Little England ***")\nprint("Population:", 27500, "people")\nprint("Distance to Colombo:", 160, "km")\nprint("Try the strawberries!")\n';
function audit(){
  const vis=e=>{{const d=e.closest('details:not([open])');if(d&&!e.closest('summary'))return false;}const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return false;let p=e;while(p&&p.nodeType===1){const c=getComputedStyle(p);if(+c.opacity===0)return false;p=p.parentElement}return e.getClientRects().length>0};
  const els=[...document.querySelectorAll('body *')].filter(e=>!e.closest('textarea,[hidden],.toast,[aria-hidden=true]')&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&vis(e));
  const clipR=(e,r0)=>{let r={l:r0.left,t:r0.top,r:r0.right,b:r0.bottom};let p=e.parentElement;while(p){const cs=getComputedStyle(p);if(/(auto|scroll|hidden)/.test(cs.overflow+cs.overflowX+cs.overflowY)){const q=p.getBoundingClientRect();r={l:Math.max(r.l,q.left),t:Math.max(r.t,q.top),r:Math.min(r.r,q.right),b:Math.min(r.b,q.bottom)}}p=p.parentElement}return r};
  const R=[];els.filter(e=>!(e instanceof SVGElement)).forEach(e=>[...e.getClientRects()].forEach(q=>{const r=clipR(e,q);if(r.r-r.l>1&&r.b-r.t>1)R.push([e,r])}));
  const over=[];for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const[a,x]=R[i],[b,y]=R[j];if(a===b||a.contains(b)||b.contains(a))continue;if(Math.min(x.r,y.r)-Math.max(x.l,y.l)>2&&Math.min(x.b,y.b)-Math.max(x.t,y.t)>2)over.push(a.textContent.slice(0,15)+' x '+b.textContent.slice(0,15))}
  const trunc=[];document.querySelectorAll('#script .sline,#scr .ol').forEach(e=>{if(e.scrollWidth>e.clientWidth+1)trunc.push(e.textContent)});
  els.forEach(e=>{if(getComputedStyle(e).textOverflow==='ellipsis')trunc.push('ellipsis:'+e.textContent.slice(0,20))});
  const c=document.getElementById('code');if(c&&c.scrollWidth>c.clientWidth+1)trunc.push('editor hscroll');
  const sg=document.getElementById('sign');if(sg&&(sg.scrollWidth>sg.clientWidth+1||sg.scrollHeight>sg.clientHeight+1))trunc.push('sign');
  {const skip=[...document.querySelectorAll('#load,.sc-interp,#toast')].map(e=>e.innerText);let t=document.body.innerText;skip.forEach(x=>{t=t.split(x).join('')});if(/\w…/.test(t))trunc.push('ellipsis in text');}
  // contrast
  const rgb=s=>{const m=s.match(/[\d.]+/g);if(!m)return [0,0,0,0];const v=m.map(Number);if(/^color\(/.test(s)){const o=[v[0]*255,v[1]*255,v[2]*255];if(v.length>3)o.push(v[3]);return o}return v};
  const lum=v=>{const a=v.slice(0,3).map(x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4});return .2126*a[0]+.7152*a[1]+.0722*a[2]};
  const blend=(f,b)=>{const a=f[3]===undefined?1:f[3];return [0,1,2].map(i=>f[i]*a+b[i]*(1-a))};
  const bgOf=e=>{if(e instanceof SVGElement){if(e.closest('#sign'))return rgb(getComputedStyle(document.getElementById('signBox')).fill);e=e.closest('.mapbox')||e;}
    const stack=[];let p=e;while(p&&p.nodeType===1){const b=rgb(getComputedStyle(p).backgroundColor);if(b.length>=3&&(b[3]===undefined||b[3]>0))stack.push(b);if(b[3]===undefined)break;p=p.parentElement}
    let base=rgb(getComputedStyle(document.body).backgroundColor).slice(0,3);for(let i=stack.length-1;i>=0;i--)base=blend(stack[i],base);return base};
  const low=[];let minC=99;els.forEach(e=>{if(e.closest('button:disabled'))return;const cs=getComputedStyle(e);const fg=rgb(e instanceof SVGElement?cs.fill:cs.color),bg=bgOf(e);const f=blend(fg,bg);const A=lum(f),B=lum(bg);const cr=(Math.max(A,B)+.05)/(Math.min(A,B)+.05);
    let fs=parseFloat(cs.fontSize);if(e instanceof SVGElement)fs*=e.ownerSVGElement.getScreenCTM().a;const big=fs>=24||(fs>=18.66&&+cs.fontWeight>=700);const need=big?3:4.5;
    if(!/[A-Za-z0-9]/.test(e.textContent))return;minC=Math.min(minC,cr);if(cr<need)low.push(e.textContent.trim().slice(0,20)+' '+cr.toFixed(2))});
  const sign=[...document.querySelectorAll('#sign small,#sign b,#fact1,#fact2')].filter(t=>t.textContent).map(t=>parseFloat(getComputedStyle(t).fontSize));
  const scE=document.querySelector('.scene'),mE=document.querySelector('main');const sc=scE&&scE.getBoundingClientRect(),m=mE&&mE.getBoundingClientRect();const scr=document.getElementById('script');
  return {over,trunc,low,minC:+minC.toFixed(2),signPx:sign.length?Math.min(...sign):null,hscroll:document.documentElement.scrollWidth>innerWidth+1,sceneW:sc&&m?Math.round(sc.width/m.width*1000)/10:null,scriptPx:scr?parseFloat(getComputedStyle(scr).fontSize):null};
}

function sceneAudit(){
  const sc=document.querySelector('.scene');const out=[];
  const R=e=>{const r=e.getBoundingClientRect();return {l:r.left,t:r.top,r:r.right,b:r.bottom}};
  const clip=(e,r)=>{let p=e.parentElement;while(p&&p!==sc){const cs=getComputedStyle(p);if(/(auto|scroll|hidden)/.test(cs.overflow+cs.overflowX+cs.overflowY)){const q=R(p);r={l:Math.max(r.l,q.l),t:Math.max(r.t,q.t),r:Math.min(r.r,q.r),b:Math.min(r.b,q.b)}}p=p.parentElement}return r};
  const vis=e=>{if(e.closest('[hidden],[aria-hidden=true]'))return false;const cs=getComputedStyle(e);return cs.display!=='none'&&cs.visibility!=='hidden'&&e.getClientRects().length>0};
  const name=e=>(e.id?'#'+e.id:'')+'.'+String(e.className.baseVal??e.className).split(' ')[0]+'"'+(e.textContent||'').trim().slice(0,14)+'"';
  const boxes=[...sc.querySelectorAll('.sc-box,.paperbox,.scr,.mapbox,.snake,.callout,.errbadge,.signboard')].filter(vis);
  const texts=[...sc.querySelectorAll('*')].filter(e=>!(e instanceof SVGElement)&&vis(e)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()));
  const dots=[...sc.querySelectorAll('.hot')].filter(vis).map(d=>{const r=R(d),cx=(r.l+r.r)/2,cy=(r.t+r.b)/2;return {d,c:d.dataset.c,cx,cy,r:{l:cx-7,t:cy-7,r:cx+7,b:cy+7}}});
  const items=texts.map(e=>({e,r:clip(e,R(e))})).filter(x=>x.r.r-x.r.l>1&&x.r.b-x.r.t>1).concat(dots.map(x=>({e:x.d,r:x.r})));
  const inter=(a,b)=>Math.min(a.r,b.r)-Math.max(a.l,b.l)>0.5&&Math.min(a.b,b.b)-Math.max(a.t,b.t)>0.5;
  for(const {e,r} of items)for(const B of boxes){if(B===e||e.contains(B))continue;const b=R(B);
    if(B.contains(e)){const scr=B.scrollHeight>B.clientHeight+1;if(scr){if(r.l<b.l+1||r.r>b.r-1)out.push('crosses own border: '+name(e)+' in '+name(B));}else if(r.l<b.l+1||r.t<b.t+1||r.r>b.r-1||r.b>b.b-1)out.push('crosses own border: '+name(e)+' in '+name(B));}
    else if(inter(r,b))out.push('hits box: '+name(e)+' x '+name(B));}
  for(const x of dots){const box=sc.querySelector('[data-box="'+x.c+'"]');const head=x.d.closest('.sc-head');if(!box||!head||!box.contains(x.d))out.push('dot not in its element: '+x.c);else{const b=R(box);if(x.cx<b.l||x.cx>b.r||x.cy<b.t||x.cy>b.b)out.push('dot outside bounds: '+x.c)}
    const lbl=document.getElementById('lbl-'+x.c);if(!lbl||x.r.l-R(lbl).r>14||x.r.l<R(lbl).r)out.push('dot not next to its label: '+x.c);
    if(!/^Explain /.test(x.d.getAttribute('aria-label')||'')||!x.d.title)out.push('dot label/tooltip: '+x.c)}
  for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){const a=dots[i],b=dots[j];const gap=Math.hypot(a.cx-b.cx,a.cy-b.cy)-14;if(gap<24)out.push('dots too close: '+a.c+'/'+b.c+' '+gap.toFixed(0))}
  for(const l of sc.querySelectorAll('.sc-lbl')){const b=R(l.closest('.sc-box')),r=R(l);if(r.l-b.l<8||r.t-b.t<8)out.push('label padding <8px: '+l.textContent)}
  if(dots.length!==4)out.push('dot count '+dots.length);
  return out;
}
const opt=BR==='chromium'?{executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:process.env.CHROME_NO_SANDBOX==='1'?['--no-sandbox','--disable-dev-shm-usage']:[]}:{};
const doneL=(n)=>{const L={};for(let i=1;i<=n;i++)L['white-'+i]={stage:6,done:[0,1,2,3,4,5,6],complete:true,code:{},quiz:{},seed:1,variant:0,hints:0,think:[],founder:false};return L};
async function open(w,h,extra={}){const b=await pw[BR].launch(opt);const ctx=await b.newContext({viewport:{width:w,height:h},acceptDownloads:true,...extra});const pg=await ctx.newPage();const errs=[];
  pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});pg.on('pageerror',e=>errs.push(String(e)));
  await pg.addInitScript(sceneAudit.toString()+';window.sceneAudit=sceneAudit;');
  await pg.addInitScript(()=>{window.__lt=[];try{new PerformanceObserver(l=>l.getEntries().forEach(e=>__lt.push([Math.round(e.startTime),Math.round(e.duration)]))).observe({type:'longtask',buffered:true})}catch(e){}});
  return {b,ctx,pg,errs};}
const ready=pg=>pg.waitForFunction(()=>/ready/.test((document.getElementById('loadTxt')||{}).textContent||'')||window.__engineOk,null,{timeout:120000});
async function engineUp(pg){for(let i=0;i<150;i++){if(await pg.evaluate(async()=>(await window.pydojoTest.runPy('pass')).err===null))return;await pg.waitForTimeout(800)}throw new Error('engine never ready')}
const nav=async(pg,h)=>{await pg.evaluate(h=>{location.hash=h},h);await pg.waitForTimeout(350)};
const waitRun=(pg,s)=>pg.waitForFunction(s=>{const e=document.getElementById('runState');return e&&e.textContent===s},s,{timeout:30000});

async function layoutCase(theme,w,h,n){
  const {b,ctx,pg,errs}=await open(w,h);const F=[];const fail=(k,v)=>F.push(k+(v!==undefined?':'+JSON.stringify(v).slice(0,400):''));const info={};
  await pg.goto(URL);await pg.evaluate(([t,L])=>{localStorage.clear();window.pydojoTest.reset(t,{lessons:L,last:'white-5',srs:{'white-5|hello':{box:1,due:0},'white-1|order':{box:1,due:0}}})},[theme,doneL(4)]);await pg.reload();await engineUp(pg);
  const chk=async(tag,scene)=>{if(scene){const sa=await pg.evaluate(()=>sceneAudit());if(sa.length)fail(tag+' scene',sa.slice(0,6));}const a=await pg.evaluate(audit);if(a.over.length)fail(tag+' overlap',a.over.slice(0,6));if(a.trunc.length)fail(tag+' trunc',a.trunc.slice(0,6));if(a.low.length)fail(tag+' contrast',a.low.slice(0,6));if(a.hscroll)fail(tag+' hscroll');info.minC=Math.min(info.minC??99,a.minC);return a};
  const shot=async(tag,full)=>pg.screenshot({path:`${D}${n}-${theme}-${tag}.png`,fullPage:!!full});
  // non-lesson screens
  for(const [s,h2] of [['home','#/'],['errors','#/errors'],['glossary','#/glossary'],['review','#/review'],['practice','#/practice']]){await nav(pg,h2);await pg.waitForTimeout(250);await chk(s);await shot(s);}
  // lesson 5: every stage
  await nav(pg,'#/lesson/white-5/0');await pg.waitForSelector('#stage-hook');let a=await chk('hook',true);info.sceneW=a.sceneW;info.scriptPx=a.scriptPx;await shot('lesson-hook');
  await pg.click('#stageDone');await pg.waitForSelector('#stage-learn');await chk('learn',true);await shot('lesson-learn');
  for(const c of ['script','console','interp','map']){await pg.click('.hot[data-c='+c+']');await pg.waitForTimeout(250);
    if(!await pg.evaluate(c=>document.querySelector('[data-box="'+c+'"]').classList.contains('sel')&&document.querySelectorAll('.sc-box.sel').length===1,c))fail('selected element not highlighted '+c);
    if(n!=='ipad'){const hb=await pg.evaluate(c=>{const r=document.querySelector('[data-box="'+c+'"] .sc-head').getBoundingClientRect();return {x:Math.max(0,r.left-10),y:Math.max(0,r.top-10),width:Math.min(r.width+20,innerWidth),height:r.height+20}},c);if(hb.y+hb.height<=h)await pg.screenshot({path:`${D}crop-${n}-${theme}-${c}.png`,clip:hb});}
    const sa=await pg.evaluate(()=>sceneAudit());if(sa.length)fail('hotspot '+c,sa.slice(0,4));}
  await pg.click('#stageDone');await pg.waitForSelector('#stage-watch');
  await pg.fill('#pred','Ayubowan, Colombo!\nDistricts: 25\n100');await pg.focus('#code');await pg.keyboard.press('Control+Enter');await waitRun(pg,'DONE');await pg.waitForTimeout(300);
  const m1=await pg.textContent('#msg');if(!/3\/3/.test(m1))fail('predict',m1.slice(0,80));
  a=await chk('watch',true);info.signPx=a.signPx;if(a.signPx!==null&&a.signPx<12)fail('sign<12px',a.signPx);await shot('lesson-watch');
  const pins=await pg.evaluate(()=>document.querySelectorAll('.pin.on').length);if(pins<1)fail('map pin not lit');
  await pg.evaluate(()=>{const s=document.getElementById('scrub');s.value=1;s.dispatchEvent(new Event('input'))});const sc1=await pg.evaluate(()=>document.querySelectorAll('#out .out-line').length);
  await pg.evaluate(()=>{const s=document.getElementById('scrub');s.value=s.max;s.dispatchEvent(new Event('input'))});const sc3=await pg.evaluate(()=>document.querySelectorAll('#out .out-line').length);if(sc1!==1||sc3!==3)fail('scrubber',[sc1,sc3]);
  await pg.click('#stageDone');await pg.waitForSelector('#stage-try');
  const t=await pg.evaluate(()=>window.pydojoTest.tryTask('white-5'));await pg.fill('#code',t.solution);await pg.click('#run');await waitRun(pg,'DONE');await pg.waitForTimeout(200);
  if(!/Task complete/.test(await pg.textContent('#msg')))fail('try task');a=await chk('try',true);await shot('lesson-try');
  await pg.click('#stageDone');await pg.waitForSelector('#stage-fix');await pg.click('#run');await waitRun(pg,'STOPPED');await pg.waitForTimeout(300);
  if(!await pg.isVisible('#bug'))fail('bug creature not shown');
  if(!await pg.evaluate(()=>{const e=document.querySelector('#script .sline.err');return !!e&&e.dataset.l==='1'&&getComputedStyle(e).backgroundColor!=='rgba(0, 0, 0, 0)'}))fail('scene error line not red');
  await chk('fix-error',true);await shot('lesson-bug');
  await pg.fill('#code',await pg.evaluate(()=>window.pydojoTest.bugFix('white-5')));await pg.click('#run');await waitRun(pg,'DONE');if(!/Bug squashed/.test(await pg.textContent('#msg')))fail('bug fix');
  await pg.click('#stageDone');await pg.waitForSelector('#stage-quiz');const ans=await pg.evaluate(()=>window.pydojoTest.quizAnswers('white-5'));
  for(let i=0;i<ans.length;i++)await pg.click(`button[data-q="${i}"][data-o="${ans[i]}"]`);await pg.waitForSelector('#quizScore');await chk('quiz',true);await shot('lesson-quiz');
  await pg.click('#stageDone');await pg.waitForSelector('#stage-reward');await pg.fill('#code',FOUNDER);await pg.click('#run');await waitRun(pg,'DONE');await pg.waitForTimeout(200);
  if(!/Founder approved/.test(await pg.textContent('#msg')))fail('founder');await chk('reward',true);await shot('lesson-reward');
  const st=await pg.evaluate(()=>({xp:document.getElementById('xp').textContent,m:['mPS','mCT','mCR'].map(i=>document.getElementById(i).style.transform),belt:document.getElementById('beltTxt').textContent}));
  if(st.m.some(t=>/scaleX\(0\)/.test(t)))fail('meter zero',st.m);if(st.belt!=='5/15')fail('belt count',st.belt);info.xp=st.xp;
  const lt=await pg.evaluate(()=>__lt.filter(([s,d])=>s>performance.now()-25000));info.longTasksMs=lt.map(x=>x[1]);
  await pg.waitForTimeout(800);await pg.reload();await engineUp(pg);
  const after=await pg.evaluate(()=>({xp:document.getElementById('xp').textContent,code:(document.getElementById('code')||{}).value,theme:document.documentElement.dataset.theme,belt:document.getElementById('beltTxt').textContent}));
  if(after.xp!==st.xp||after.code!==FOUNDER||after.theme!==theme||after.belt!=='5/15')fail('persist',{...after,code:(after.code||'').length});
  if(errs.length)fail('console',errs.slice(0,4));
  await ctx.close();await b.close();return {browser:BR,size:n,theme,pass:F.length===0,fails:F,...info};
}

/* Full journey: all 15 lessons through all 7 stages from a fresh start, then every other screen and feature. */
async function journey(){
  const {b,ctx,pg,errs}=await open(1280,800,{reducedMotion:'reduce'});const F=[];const fail=(k,v)=>F.push(k+(v!==undefined?':'+JSON.stringify(v).slice(0,300):''));const t0=Date.now();
  await pg.goto(URL);await pg.evaluate(()=>{localStorage.clear();window.pydojoTest.reset('dark')});await pg.reload();await engineUp(pg);
  await pg.click('#continue');const per=[];
  for(let n=1;n<=15;n++){const id='white-'+n;const r={lesson:n,stages:0};
    try{
      await pg.waitForSelector('#stage-hook',{timeout:8000});const where=await pg.textContent('#where');if(!/stage 1 of 7/.test(where))fail(id+' where',where);
      await pg.click('#reveal');await pg.waitForSelector('#revealTxt');await pg.click('#stageDone');r.stages++;
      await pg.waitForSelector('#stage-learn');await pg.click('#stageDone');r.stages++;
      await pg.waitForSelector('#stage-watch');await pg.click('#run');await waitRun(pg,'DONE');await pg.click('#stageDone');r.stages++;
      await pg.waitForSelector('#stage-try');const t=await pg.evaluate(id=>window.pydojoTest.tryTask(id),id);await pg.fill('#code',t.solution);if(t.stdin)await pg.fill('#stdin',t.stdin);
      await pg.click('#run');await waitRun(pg,'DONE');await pg.waitForFunction(()=>/Task complete/.test(document.getElementById('msg').textContent),null,{timeout:5000});await pg.click('#stageDone');r.stages++;
      await pg.waitForSelector('#stage-fix');await pg.click('#run');await waitRun(pg,'STOPPED');await pg.fill('#code',await pg.evaluate(id=>window.pydojoTest.bugFix(id),id));await pg.click('#run');await waitRun(pg,'DONE');
      await pg.waitForFunction(()=>/Bug squashed/.test(document.getElementById('msg').textContent),null,{timeout:5000});await pg.click('#stageDone');r.stages++;
      await pg.waitForSelector('#stage-quiz');const ans=await pg.evaluate(id=>window.pydojoTest.quizAnswers(id),id);for(let i=0;i<ans.length;i++)await pg.click(`button[data-q="${i}"][data-o="${ans[i]}"]`);
      await pg.waitForSelector('#quizScore');await pg.click('#stageDone');r.stages++;
      await pg.waitForSelector('#rewardCard');r.stages++;
      const done=await pg.evaluate(id=>window.pydojoTest.progress().lessons[id].complete,id);if(!done)fail(id+' not complete');
      await pg.click('#nextLesson');
    }catch(e){fail(id+' stage '+(r.stages+1),e.message.split('\n')[0])}
    per.push(r.stages);
  }
  const belt=await pg.textContent('#beltTxt');if(belt!=='15/15')fail('belt',belt);
  await pg.waitForSelector('#home');if(!/White Belt complete/.test(await pg.textContent('#hereTxt')))fail('home after belt');
  const belts=await pg.evaluate(()=>[...document.querySelectorAll('.belt')].map(b=>[b.dataset.belt,getComputedStyle(b.querySelector('.swatch')).backgroundColor,!!b.querySelector('.soon')]));
  const want={White:'rgb(255, 255, 255)',Yellow:'rgb(255, 214, 0)',Orange:'rgb(255, 140, 0)',Green:'rgb(30, 158, 58)',Blue:'rgb(21, 101, 224)',Purple:'rgb(123, 47, 190)',Brown:'rgb(123, 74, 30)',Red:'rgb(214, 40, 40)',Black:'rgb(0, 0, 0)',Master:'rgb(212, 175, 55)'};
  if(belts.length!==10||belts.some(([n,c,soon])=>want[n]!==c||(n==='White')===soon))fail('belt map',belts);
  // redo a lesson
  await nav(pg,'#/lesson/white-3/6');pg.once('dialog',d=>d.accept());await pg.click('#redo');await pg.waitForSelector('#stage-hook');if(!await pg.evaluate(()=>window.pydojoTest.progress().lessons['white-3'].complete))fail('redo lost completion');
  // review (early) with spaced repetition
  await nav(pg,'#/review');const deck=await pg.evaluate(()=>Object.keys(window.pydojoTest.progress().srs).length);if(deck<30)fail('srs deck',deck);
  await pg.click('#reviewEarly');for(let i=0;i<3;i++){await pg.click('#reviewCard .opt >> nth=0');await pg.click('#nextCard');}
  const rv=await pg.evaluate(()=>window.pydojoTest.progress().reviewed);if(rv!==3)fail('review count',rv);
  // practice: a code card solved via hints+answer, and an mcq
  await nav(pg,'#/practice/white-5');const card=pg.locator('.pcard[data-kind=code]').first();await card.locator('button:has-text("Hint")').click();await card.locator('button:has-text("Hint")').click();await card.locator('button:has-text("Answer")').click();await card.locator('.prun').click();
  await card.locator('.msg.ok').waitFor({timeout:8000});await pg.locator('.pcard[data-kind=mcq] .opt').first().click();if(await pg.evaluate(()=>window.pydojoTest.progress().practiced)<2)fail('practice credit');
  const s1=await pg.textContent('.pcard p');await pg.click('#freshSet');await pg.waitForTimeout(200);const s2=await pg.textContent('.pcard p');if(s1===s2)info_fresh='same text (allowed if template repeats)';
  // errors + glossary
  await nav(pg,'#/errors');const ec=await pg.textContent('#errCount');if(!/of 43/.test(ec))fail('errors count',ec);await pg.fill('#errQ','NameError');await pg.waitForTimeout(200);const ec2=await pg.locator('.errcard').count();if(ec2<5)fail('error search',ec2);
  await pg.locator('.tryerr').first().click();await pg.locator('.realout').first().waitFor();if(!/NameError/.test(await pg.locator('.realout').first().textContent()))fail('error run for real');
  await nav(pg,'#/glossary');const gc=await pg.textContent('#glCount');const gm=(gc||'').match(/Showing (\d+) of (\d+) terms/);if(!gm||gm[1]!==gm[2]||+gm[1]<1000)fail('glossary count',gc);if(!await pg.isVisible('#wodCard'))fail('word of day');
  await pg.fill('#glQ','string');await pg.waitForTimeout(200);if(await pg.locator('.gterm').count()<1)fail('glossary search');
  await pg.selectOption('#glCat','Unicode');await pg.waitForTimeout(100);if(await pg.locator('.gterm').count()<1)fail('glossary category');
  await pg.selectOption('#glCat','all');await pg.click('.gl-alpha button[data-letter="S"]');await pg.waitForTimeout(100);if(await pg.locator('.gterm').count()<1)fail('glossary alpha');
  // export -> wipe -> import
  await nav(pg,'#/');const [dl]=await Promise.all([pg.waitForEvent('download'),pg.click('#export')]);const file=path.join(require('os').tmpdir(),'pd-export-'+BR+'.json');await dl.saveAs(file);
  const xpBefore=await pg.textContent('#xp');await pg.evaluate(()=>window.pydojoTest.reset('dark'));await pg.waitForTimeout(100);
  await pg.setInputFiles('#importFile',file);await pg.waitForFunction(()=>/imported/.test(document.getElementById('importMsg').textContent),null,{timeout:5000});
  if(await pg.textContent('#xp')!==xpBefore||await pg.textContent('#beltTxt')!=='15/15')fail('import');
  fs.writeFileSync(file+'.bad','{"nope":1}');await pg.setInputFiles('#importFile',file+'.bad');await pg.waitForFunction(()=>/isn't a Py Dojo/.test(document.getElementById('importMsg').textContent));
  // autosave survives reload
  await pg.waitForTimeout(600);await pg.reload();await engineUp(pg);if(await pg.textContent('#beltTxt')!=='15/15')fail('autosave');
  if(errs.length)fail('console',errs.slice(0,4));
  await ctx.close();await b.close();return {browser:BR,check:'journey-15-lessons',stagesPerLesson:per.join(''),seconds:Math.round((Date.now()-t0)/1000),pass:F.length===0,fails:F};
}
let info_fresh='';

async function basePath(){
  const root=fs.mkdtempSync(path.join(require('os').tmpdir(),'ghp-'));fs.symlinkSync(DIST,path.join(root,'py-dojo'));
  const types={'.html':'text/html','.js':'text/javascript','.wasm':'application/wasm','.zip':'application/zip','.json':'application/json'};
  const srv=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end();return}s.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});s.end(d)})});
  await new Promise(r=>srv.listen(0,r));const port=srv.address().port;
  const {b,ctx,pg,errs}=await open(1280,800);const F=[];
  try{await pg.goto(`http://localhost:${port}/py-dojo/`);await engineUp(pg);await pg.click('#continue');await nav(pg,'#/lesson/white-1/0');await pg.evaluate(()=>window.pydojoTest.reset('dark',{lessons:{'white-1':{stage:2,done:[0,1],complete:false,code:{},quiz:{},seed:1,variant:0,hints:0,think:[],founder:false}}}));await nav(pg,'#/lesson/white-1/2');await pg.click('#run');await waitRun(pg,'DONE');
    if(!/py-dojo\/#\/lesson/.test(pg.url()))F.push('url '+pg.url());}catch(e){F.push(e.message.split('\n')[0])}
  if(errs.length)F.push('console '+errs.slice(0,3).join(' | '));
  await ctx.close();await b.close();srv.close();return {browser:BR,check:'served-at-/py-dojo/',pass:F.length===0,fails:F};
}

async function a11y(){
  const {b,ctx,pg}=await open(1280,800,{reducedMotion:'reduce'});
  await pg.goto(URL);await pg.evaluate(L=>{localStorage.clear();window.pydojoTest.reset('dark',{lessons:{...L,'white-5':{stage:2,done:[0,1],complete:false,code:{},quiz:{},seed:1,variant:0,hints:0,think:[],founder:false}}})},doneL(4));await pg.reload();await engineUp(pg);await nav(pg,'#/lesson/white-5/2');await pg.waitForSelector('#stage-watch');
  const anim=await pg.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
  const t0=Date.now();await pg.click('#run');await waitRun(pg,'DONE');const dt=Date.now()-t0;
  await pg.evaluate(()=>document.activeElement.blur());const foc=[];for(let i=0;i<45;i++){await pg.keyboard.press('Tab');foc.push(await pg.evaluate(()=>{const e=document.activeElement;const cs=getComputedStyle(e);const ed=e.closest('.editor');const o=ed?getComputedStyle(ed).outlineStyle:cs.outlineStyle;return {id:e.id||e.className||e.tagName,ring:o!=='none'&&o!==''}}))}
  const noRing=foc.filter(f=>!f.ring&&f.id!=='BODY');
  const small=await pg.evaluate(()=>[...document.querySelectorAll('button,a.btn,.navbtn,.step,.hot,.lnode')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.width<44||r.height<44)}).map(e=>e.id||e.className).slice(0,8));
  await ctx.close();await b.close();
  return [{browser:BR,check:'reduced-motion',runningAnimations:anim,runToDoneMs:dt,pass:anim===0&&dt<1500},{browser:BR,check:'keyboard',tabStops:foc.length,withoutVisibleFocus:noRing.map(f=>f.id),pass:noRing.length===0},{browser:BR,check:'touch-targets-44px',under44:small,pass:small.length===0}];
}

(async()=>{const summary=[];
  const only=process.env.PYDOJO_ONLY;
  if(!only||only==='layout')for(const theme of ['dark','light'])for(const [w,h,n] of SIZES){try{summary.push(await layoutCase(theme,w,h,n))}catch(e){summary.push({browser:BR,size:n,theme,pass:false,fails:['FATAL '+e.message.split('\n')[0]]})}}
  if(!only||only==='journey')summary.push(await journey().catch(e=>({browser:BR,check:'journey-15-lessons',pass:false,fails:['FATAL '+e.message.split('\n')[0]]})));
  if(!only||only==='base')summary.push(await basePath().catch(e=>({browser:BR,check:'served-at-/py-dojo/',pass:false,fails:['FATAL '+e.message]})));
  if(!only||only==='a11y')summary.push(...await a11y().catch(e=>[{browser:BR,check:'a11y',pass:false,fails:['FATAL '+e.message.split('\n')[0]]}]));
  console.log(JSON.stringify(summary,null,0).replace(/\},\{/g,'},\n{'));process.exit(summary.every(s=>s.pass)?0:1);
})().catch(e=>{console.error('FATAL',e.message);process.exit(2)});
