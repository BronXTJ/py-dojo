const fs=require('fs');const {spawnSync}=require('child_process');
eval(fs.readFileSync(__dirname+'/spot.js','utf8')+';global.SPOT_TPL=SPOT_TPL;');
const R={pick:a=>a[Math.floor(Math.random()*a.length)],int:(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1))};
let n=0,bad=0,seen=new Set();
for(const t of SPOT_TPL)for(let i=0;i<30;i++){const e=t.make(R);if(seen.has(e.code))continue;seen.add(e.code);n++;
 const p=spawnSync('python3',['-c',e.code],{encoding:'utf8'});
 const got=p.status===0?'No error':p.stderr.trim().split('\n').pop().split(':')[0];
 if(got!==e.answer){bad++;console.log('BAD',t.id,JSON.stringify(e.code),got)}}
console.log('verified',n,'spot-the-error snippets, problems:',bad);
