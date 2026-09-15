const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(relative) {
  const file = path.resolve(relative);
  if (cache.has(file)) return cache.get(file);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
  const mod = {exports: {}};
  const localRequire = name => load(path.resolve(path.dirname(file), name + '.ts'));
  new Function('exports', 'module', 'require', code)(mod.exports, mod, localRequire);
  cache.set(file, mod.exports);
  return mod.exports;
}
const {evaluate, QUESTIONS} = load('src/data/platform-chooser.ts');
const bound = evaluate({host: 'licence'});
assert.equal(bound.viableCount, 3);
assert.deepEqual(bound.verdicts.filter(v => v.excluded).map(v => v.key), ['paas', 'saas']);
assert.equal(evaluate({host: 'portable-licence'}).viableCount, 5);
assert.equal(evaluate({host: 'invalid'}).answered, 0);
assert(evaluate({build: 'core'}).undecided);
const winners = new Set(); let combinations = 0;
function visit(index, selection) {
  if (index === QUESTIONS.length) {
    const result = evaluate(selection); combinations++;
    assert(result.complete);
    assert(!result.top.excluded);
    assert(result.notes.some(note => note.includes('licence compatibility')));
    if (!result.undecided) winners.add(result.top.key);
    return;
  }
  const question = QUESTIONS[index];
  for (const option of question.options) {
    if (question.key === 'host' && option.value !== 'licence') continue;
    visit(index + 1, {...selection, [question.key]: option.value});
  }
}
visit(0, {});
assert.deepEqual([...winners].sort(), ['container', 'orchestrated', 'vm']);
const {planRecovery, RECOVERY_QUESTIONS} = load('src/data/resilience-planner.ts');
const {renderAnswerImpacts} = load('src/scripts/planner-feedback.ts');
const notes = new Map(RECOVERY_QUESTIONS.map(q => [q.key, {hidden: true, textContent: ''}]));
const root = {querySelector: selector => notes.get(selector.match(/="(.+)"/)[1])};
renderAnswerImpacts(root, RECOVERY_QUESTIONS, {scope: 'region', placement: 'restricted'}, planRecovery);
for (const key of ['scope', 'placement']) {
  assert(!notes.get(key).hidden);
  assert(notes.get(key).textContent.includes('conflicts'));
}
renderAnswerImpacts(root, RECOVERY_QUESTIONS, {scope: 'region', placement: 'allowed'}, planRecovery);
for (const key of ['scope', 'placement']) assert(notes.get(key).textContent.includes('alternate region'));
renderAnswerImpacts(root, RECOVERY_QUESTIONS, {}, planRecovery);
assert([...notes.values()].every(note => note.hidden && note.textContent === ''));
for (const [file, name, questions] of [['cost', 'planCost', 'COST_QUESTIONS'], ['connectivity', 'planConnectivity', 'CONNECTIVITY_QUESTIONS'], ['resilience', 'planRecovery', 'RECOVERY_QUESTIONS']]) {
  const model = load('src/data/' + file + '-planner.ts');
  for (const question of model[questions]) for (const option of question.options) {
    const result = model[name]({[question.key]: option.value});
    assert.equal(result.answered, 1);
    assert(!result.complete);
    assert(!JSON.stringify(result).includes('undefined'));
  }
}
console.log(`PASS ${combinations} host-bound licence combinations, viable alternatives, partial plans and interaction-aware feedback/reset`);
