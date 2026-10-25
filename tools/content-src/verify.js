const fs=require('fs');const {execFileSync}=require('child_process');
eval(fs.readFileSync(__dirname+'/bank.js','utf8')+';global.BANK=BANK;');
let seed=1;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const R={pick:a=>a[Math.floor(rnd()*a.length)],int:(lo,hi)=>lo+Math.floor(rnd()*(hi-lo+1))};
const py=c=>execFileSync('python3',['-c',c]).toString().replace(/\n$/,'');
let n=0,bad=0,codes=new Set();
for(const [t,L] of Object.entries(BANK)){
  if(!L.code.startsWith('>>>')&&!L.code.startsWith('python')&&!L.code.includes('input(')){const o=py(L.code);n++;if(o!==L.out){bad++;console.log('EXAMPLE',t,JSON.stringify(o),JSON.stringify(L.out))}}
  for(const tp of L.ex)for(let i=0;i<40;i++){const e=tp.make(R);
    const opts=[e.correct,...e.wrong];if(new Set(opts).size!==opts.length){bad++;console.log('DUPOPT',t,tp.id,opts)}
    if(e.run&&!codes.has(e.code)){codes.add(e.code);n++;const o=py(e.code);if(o!==e.correct){bad++;console.log('BAD',t,tp.id,JSON.stringify(e.code),o,e.correct)}}}
}
console.log('checked',n,'python runs, problems:',bad);
