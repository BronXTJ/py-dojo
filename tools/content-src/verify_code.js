const fs=require('fs');const {execFileSync}=require('child_process');
eval(fs.readFileSync(__dirname+'/code.js','utf8')+';global.CODE_TPL=CODE_TPL;');
const R={pick:a=>a[Math.floor(Math.random()*a.length)],int:(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1))};
let n=0,bad=0,seen=new Set();
for(const t of CODE_TPL)for(let i=0;i<30;i++){const e=t.make(R);if(seen.has(e.solution))continue;seen.add(e.solution);n++;
 const o=execFileSync('python3',['-c',e.solution],{input:e.stdin}).toString().trim();
 if(o!==e.expected.trim()){bad++;console.log('BAD',t.id,JSON.stringify(o),JSON.stringify(e.expected));}
 if(e.mustContain&&!e.solution.includes(e.mustContain)){bad++;console.log('MC',t.id)}}
console.log('verified',n,'solutions, problems:',bad);
