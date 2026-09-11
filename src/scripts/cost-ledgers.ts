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
const before=Number(ledger.dataset.before);
let value=0;
const total=ledger.querySelector('[data-cost-total]'),delta=ledger.querySelector('[data-cost-delta]');
ledger.querySelectorAll<HTMLElement>('[data-cost-row]').forEach(row=>{
const start=Number(row.dataset.before),end=Number(row.dataset.after),current=Math.round(start+(end-start)*progress);
value+=current;
const label=row.querySelector('[data-cost-value]'),bar=row.querySelector('progress');
if(label)label.textContent=money(current);
if(bar)bar.value=current;
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
document.addEventListener('visibilitychange',schedule);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
reduced.addEventListener('change',schedule);
schedule();
document.addEventListener('astro:before-swap',()=>{cancelAnimationFrame(frame);observer.disconnect();root.removeEventListener('click',schedule);document.removeEventListener('visibilitychange',schedule);reduced.removeEventListener('change',schedule);},{once:true});
});
}
