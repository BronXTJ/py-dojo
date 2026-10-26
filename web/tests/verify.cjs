// Runs every lesson answer, solution, quiz answer, bug, error example and glossary example in the real Pyodide engine
// inside the built app. Usage: node tests/verify.cjs [samples]
const pw = require('playwright-core');
const path = require('path');
const URL = process.env.PYDOJO_URL || ('file://' + path.join(__dirname, '../dist/index.html'));
(async () => {
  const b = await pw.chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
    args: process.env.CHROME_NO_SANDBOX === '1' ? ['--no-sandbox', '--disable-dev-shm-usage'] : [],
  });
  const pg = await b.newPage();
  await pg.goto(URL);
  for (let i = 0; i < 120; i++) { const ok = await pg.evaluate(async () => (await window.pydojoTest.runPy('print(1)')).err === null); if (ok) break; await pg.waitForTimeout(1000); }
  const res = await pg.evaluate(async (n) => {
    const T = window.pydojoTest; const KNOWN = { 'glossary asyncio': 'asyncio.run() needs a real event loop; Pyodide runs on the browser loop', 'glossary SQL': 'sqlite3 is not in the offline Pyodide bundle' }; const rows = T.checks(n); const out = { total: rows.length, groups: {}, fails: [], warns: [], known: [] };
    for (const [label, code, stdin, exp, mustErr] of rows) {
      const r = await T.runPy(code, stdin);
      let buf = ''; for (const e of r.ev) if (e[0] === 'out') buf += e[1];
      const outp = buf.replace(/\n$/, '').split('\n').map(s => s.replace(/\s+$/, '')).join('\n');
      const g = label.split(' ')[0] === 'error' ? 'errors' : label.startsWith('glossary') ? 'glossary' : label.split(' ')[1];
      out.groups[g] = out.groups[g] || { pass: 0, fail: 0 };
      if (KNOWN[label]) { out.known.push(label + ': ' + KNOWN[label]); continue; }
      let ok = true, note = '';
      if (exp && exp.startsWith('ERR:')) { const want = exp.slice(4); const type = want.split(':')[0]; ok = !!r.err && r.err.type === type; const got = r.err ? r.err.tb.trim().split('\n').pop() : ''; if (ok && got !== want) out.warns.push(label + ' | 3.13 says: ' + want + ' | Pyodide says: ' + got); note = got; }
      else if (exp && exp.startsWith('SPOT:')) { const want = exp.slice(5); ok = want === 'No error' ? !r.err : !!r.err && r.err.type === want; note = r.err ? r.err.type : 'No error'; }
      else if (mustErr) { ok = !!r.err; note = r.err ? r.err.type : 'no error'; }
      else if (exp === null) { ok = !r.err; note = r.err ? r.err.type + ': ' + r.err.msg : ''; }
      else { ok = !r.err && outp === exp.replace(/\n$/, '').split('\n').map(s => s.replace(/\s+$/, '')).join('\n'); note = r.err ? r.err.type : JSON.stringify(outp); }
      if (ok) out.groups[g].pass++; else { out.groups[g].fail++; out.fails.push(label + ' => ' + note + ' (expected ' + JSON.stringify(exp) + ')'); }
    }
    return out;
  }, +(process.argv[2] || 25));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
  process.exit(res.fails.length ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
