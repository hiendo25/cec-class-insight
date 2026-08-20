import fs from 'fs';
const t=fs.readFileSync('src/data/sessions.ts','utf8');
const iS=t.indexOf('SESSIONS: Record'), iA=t.indexOf('ASSIGNMENTS: Record');
const body=t.slice(iS,iA);
const blk=[...body.matchAll(/^\s{2}(\d+):\s*\[([\s\S]*?)^\s{2}\],?$/gm)];
const parse=inner=>[...inner.matchAll(/\{[^{}]*\}/g)].map(m=>{const o={};
  for(const [,k,v] of m[0].matchAll(/(\w+):\s*("(?:[^"\]|\.)*"|true|false|null|-?\d+)/g))
    o[k]= v==='true'?true : v==='false'?false : v==='null'?null : /^-?\d+$/.test(v)?+v : v.slice(1,-1);
  return o;});
const S2={}; for(const [,id,inner] of blk) S2[+id]=parse(inner);
const bodyA=t.slice(iA);
const blkA=[...bodyA.matchAll(/^\s{2}(\d+):\s*\[([\s\S]*?)^\s{2}\],?$/gm)];
const A={}; for(const [,id,inner] of blkA) A[+id]=parse(inner);
const cid=2;
console.log('LOP id',cid);
console.log('Buoi da day:', S2[cid].filter(s=>s.past).map(s=>s.no+(s.homework?'(da giao)':'(CHUA giao)')).join(' '));
console.log('Bai tap gan voi buoi:', (A[cid]||[]).map(a=>'buoi '+a.session+': '+a.title).join(' | '));
