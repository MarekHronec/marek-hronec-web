import { billingExample } from '../data/cost-billing';
import type { CostKey } from '../data/cost-concepts';
// Follow the scene's own timeline so pause, replay and reduced motion stay aligned.
export function initializeCostLedgers() {
document.querySelectorAll<HTMLElement>('.cost-explainer:not([data-ledgers-ready])').forEach(root=>{
root.dataset.ledgersReady='true';
let frame=0;
const panels=[...root.querySelectorAll<HTMLElement>('[data-panel]')];
const money=(value:number)=>'€'+Math.round(value).toLocaleString('en-IE');
const tick=()=>{
frame=0;let moving=false;
for(const panel of panels){
if(panel.hidden)continue;
const ledger=panel.querySelector<HTMLElement>('[data-cost-ledger]');if(!ledger)continue;
const animation=panel.querySelector('svg')?.getAnimations({subtree:true}).find(a=>a instanceof CSSAnimation);
const timing=animation?.effect?.getComputedTiming();
const progress=panel.dataset.demonstrate!=='true'?0:Number(timing?.progress??0);
const read=(selector:string)=>ledger.querySelector<HTMLInputElement>(selector);
const hour=Number(read('[data-billing-hour]')?.value??360),days=Number(read('[data-billing-days]')?.value??10),gb=Number(read('[data-billing-gb]')?.value??1000);
const scenario=billingExample(ledger.dataset.concept as CostKey,{mode:read('[data-billing-mode]')?.value,hour,days,gb,storage:read('[data-billing-storage]')?.checked});
const before=scenario.rows.reduce((n,r)=>n+r.before,0);
const write=(selector:string,text:string)=>{const el=ledger.querySelector(selector);if(el&&el.textContent!==text)el.textContent=text;};
write('[data-cost-before]',money(before));
write('[data-billing-hour-label]',hour+' hours · day '+hour/24);write('[data-billing-days-label]',days+' days');write('[data-billing-gb-label]',gb.toLocaleString('en-IE')+' GB');
write('[data-cost-assumption]',scenario.assumption);write('[data-cost-outcome]','After the decision: '+scenario.outcome);
if(scenario.accrued!==undefined)write('[data-cost-accrual]',money(scenario.accrued)+' already accrued or owed at release. '+money(scenario.remaining!)+' further charges after release in the completed scenario.');
let value=0;
const total=ledger.querySelector('[data-cost-total]'),delta=ledger.querySelector('[data-cost-delta]');
ledger.querySelectorAll<HTMLElement>('[data-cost-row]').forEach((row,index)=>{
const item=scenario.rows[index];
row.querySelector('dt')!.textContent=item.label;row.querySelector('[data-row-before]')!.textContent=money(item.before)+' → ';
const start=item.before,end=item.after,current=Math.round(start+(end-start)*progress);
value+=current;
const label=row.querySelector('[data-cost-value]'),bar=row.querySelector('progress');
if(label)label.textContent=money(current);
if(bar){bar.max=Math.max(before,scenario.rows.reduce((n,r)=>n+r.after,0));bar.value=current;}
});
if(total)total.textContent=money(value);
if(delta){const change=value-before;delta.textContent=money(Math.abs(change))+(change<0?' less ':change>0?' more ':' change')+(change===0?'':ledger.dataset.period);}
if(animation?.playState==='running'&&progress<1)moving=true;
}
if(moving&&!document.hidden)frame=requestAnimationFrame(tick);
};
const schedule=()=>{if(!frame)frame=requestAnimationFrame(tick);};
const observer=new MutationObserver(schedule);
observer.observe(root,{subtree:true,attributes:true,attributeFilter:['data-demonstrate','hidden','data-paused']});
root.addEventListener('click',schedule);
root.addEventListener('input',schedule);
root.querySelectorAll('[data-billing-reset]').forEach(button=>button.addEventListener('click',()=>{const ledger=button.closest('[data-cost-ledger]')!;ledger.querySelectorAll<HTMLInputElement>('input').forEach(input=>{if(input.type==='checkbox')input.checked=false;else input.value=input.defaultValue;});const select=ledger.querySelector('select');if(select)select.selectedIndex=0;schedule();}));
document.addEventListener('visibilitychange',schedule);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
reduced.addEventListener('change',schedule);
schedule();
document.addEventListener('astro:before-swap',()=>{cancelAnimationFrame(frame);observer.disconnect();root.removeEventListener('click',schedule);root.removeEventListener('input',schedule);document.removeEventListener('visibilitychange',schedule);reduced.removeEventListener('change',schedule);},{once:true});
});
}
