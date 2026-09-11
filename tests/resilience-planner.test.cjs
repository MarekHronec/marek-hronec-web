const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
(async () => {
  const source=fs.readFileSync('src/data/resilience-planner.ts','utf8');
  const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
  const {RECOVERY_QUESTIONS,planRecovery}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
  let combinations=0;
  function visit(index,selection) {
    if(index<RECOVERY_QUESTIONS.length){const q=RECOVERY_QUESTIONS[index];for(const o of q.options)visit(index+1,{...selection,[q.key]:o.value});return;}
    const result=planRecovery(selection);combinations++;
    assert(result.complete);assert.equal(result.answered,5);assert(result.priorities.length>=2);
    assert(result.priorities.some(p=>p.title==='Protect a recoverable history'));
    if(selection.scope==='region'&&selection.placement!=='allowed') {
      assert(result.gaps.length>0);assert(!result.priorities.some(p=>p.title==='Prepare and exercise the alternate region'));
    }
    if(selection.rto==='unknown')assert(result.gaps.some(g=>g.includes('RTO')));
    if(selection.rpo==='unknown')assert(result.gaps.some(g=>g.includes('RPO')));
    assert(result.priorities.some(p=>p.title===(selection.evidence==='tested'?'Keep the recovery evidence current':'Run a representative recovery exercise')));
  }
  visit(0,{});
  assert.equal(combinations,288);
  for(const selection of [{},{rto:'bogus'},{rto:'minutes',scope:'region'}]) {
    const result=planRecovery(selection);assert(!result.complete);assert.equal(result.priorities.length,0);
  }
  const region=planRecovery({rto:'minutes',rpo:'zero',scope:'region',placement:'restricted',evidence:'untested'});
  assert(region.gaps.some(g=>g.includes('conflicts')));
  assert(region.priorities.some(p=>p.title.includes('acknowledged')));
  console.log('PASS: 288 complete combinations, unknown/partial inputs, mandatory retained history, regional conflicts and evidence requirements.');
})().catch(e=>{console.error(e);process.exitCode=1;});
