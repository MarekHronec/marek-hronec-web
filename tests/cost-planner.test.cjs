const fs=require('fs'),ts=require('typescript'),assert=require('node:assert/strict');
const code=ts.transpileModule(fs.readFileSync('src/data/cost-planner.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod={exports:{}};new Function('exports','module',code)(mod.exports,mod);
const {COST_QUESTIONS:q,planCost}=mod.exports;
assert.equal(planCost({}).complete,false);
assert.equal(planCost(Object.fromEntries(q.map(x=>[x.key,'invalid']))).answered,0);
let count=0;
function visit(i,a){if(i===q.length){const r=planCost(a);assert.equal(r.complete,true);assert.equal(r.answered,5);assert.equal(r.gaps.length,Object.values(a).filter(v=>v==='unknown').length);assert(r.priorities.some(p=>p.title==='Build the complete estimate'));assert(r.priorities.some(p=>p.title==='Assign a cost owner and response plan'));count++;return;}for(const o of q[i].options)visit(i+1,{...a,[q[i].key]:o.value});}
visit(0,{});
const known={demand:'steady',idle:'no',movement:'local',operations:'managed',commitment:'changing'};
assert(planCost(known).priorities.some(p=>p.title==='Keep the uncertain portion flexible'));
assert(!planCost(known).priorities.some(p=>p.title==='Test a commitment against downside usage'));
assert.equal(planCost({...known,commitment:undefined}).complete,false);
assert.equal(planCost({...known,idle:'unknown'}).gaps.length,1);
console.log('PASS: '+count+' combinations, invalid/partial answers, unknown gaps and commitment branch');
