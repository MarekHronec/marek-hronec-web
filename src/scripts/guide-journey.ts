import { readGuideResult, type GuideResult } from './guide-results';
import { renderVoyage, renderVoyageBrief, voyageText } from './guide-journey-render';
export function initializeGuideJourney() {
  const root=document.querySelector<HTMLElement>('[data-journey]:not([data-ready])');if(!root)return;
  root.dataset.ready='true';
  const workspace=root.querySelector<HTMLElement>('[data-journey-workspace]')!;
  const panels=[...root.querySelectorAll<HTMLElement>('[data-journey-panel]')];
  const calculators=['.calc','.pc','.connectivity-planner','.recovery-planner','.cost-planner'].map(s=>root.querySelector<HTMLElement>(s)!);
  const stepButtons=[...root.querySelectorAll<HTMLButtonElement>('[data-journey-step]')];
  const next=root.querySelector<HTMLButtonElement>('[data-journey-next]')!,back=root.querySelector<HTMLButtonElement>('[data-journey-back]')!;
  const final=root.querySelector<HTMLElement>('[data-journey-final]')!,actions=root.querySelector<HTMLElement>('[data-journey-actions]')!;
  const scopeInputs=[...root.querySelectorAll<HTMLInputElement>('[name="journey-scope"]')];
  const accepted=new Map<number,GuideResult>();let current=0,resetting=false;
  const outside:GuideResult={complete:true,title:'Not assessed — outside or unconfirmed ISVS scope',summary:'No U level or compliance conclusion has been assigned. The Slovak ISVS calculator was not applied.',points:[],gaps:['Identify the applicable data-classification and cloud-placement requirements with the accountable owner before selecting a service.']};
  const result=():GuideResult|undefined=>{
    if(current===0){const scope=scopeInputs.find(i=>i.checked)?.value;if(!scope)return;return scope==='outside'?outside:readGuideResult(calculators[0]);}
    return readGuideResult(calculators[current]);
  };
  const update=()=>{
    renderVoyage(root,accepted,current);
    stepButtons.forEach((button,i)=>{button.disabled=i>accepted.size;button.toggleAttribute('aria-current',i===current);if(i===current)button.setAttribute('aria-current','step');});
    panels.forEach((panel,i)=>panel.hidden=i!==current);
    final.hidden=current!==5;actions.hidden=current===5;
    if(current===5){renderVoyageBrief(root,accepted);return;}
    back.disabled=current===0;next.disabled=!result()?.complete;
    next.textContent=current===4?'Add result & view my brief →':'Add result & continue →';
    root.querySelector<HTMLElement>('[data-journey-hint]')!.textContent=result()?.complete?'Review this result, then add it to your plan.':current===0?'Confirm the scope and complete the applicable classification steps.':'Complete all the questions in this stage to continue.';
  };
  const focusStage=()=>{
    const heading=current===5?root.querySelector<HTMLElement>('#journey-final-title'):panels[current].querySelector<HTMLElement>('.journey__stage-title');
    heading?.focus({preventScroll:true});(current===5?final:panels[current]).scrollIntoView({block:'start',behavior:'instant'});
  };
  const invalidate=(index:number)=>{for(let i=index;i<5;i++)accepted.delete(i);root.querySelector<HTMLElement>('[data-journey-checkpoint]')!.hidden=true;};
  calculators.forEach((calculator,index)=>calculator.addEventListener('guide:result',()=>{
    if(resetting)return;invalidate(index);if(current>index)current=index;update();
  }));
  scopeInputs.forEach(input=>input.addEventListener('change',()=>{
    root.querySelector<HTMLElement>('[data-journey-classification]')!.hidden=input.value!=='isvs';
    root.querySelector<HTMLElement>('[data-journey-outside]')!.hidden=input.value!=='outside';
    invalidate(0);update();
  }));
  const checkpoint=root.querySelector<HTMLElement>('[data-journey-checkpoint]')!;
  const proceed=root.querySelector<HTMLButtonElement>('[data-journey-proceed]')!;
  proceed.addEventListener('click',()=>{checkpoint.hidden=true;focusStage();});
  next.addEventListener('click',()=>{const value=result();if(!value?.complete)return;accepted.set(current,{...value,points:[...value.points],gaps:[...value.gaps]});current++;update();
    checkpoint.hidden=false;root.querySelector<HTMLElement>('[data-journey-checkpoint-title]')!.textContent='Added to your manifest: '+value.title;
    root.querySelector<HTMLElement>('[data-journey-checkpoint-summary]')!.textContent=value.summary;
    proceed.textContent=current===5?'Read my combined brief ↓':'Continue to stage '+(current+1)+' ↓';
    proceed.focus({preventScroll:true});root.querySelector('.journey__overview')!.scrollIntoView({block:'start',behavior:'instant'});
  });
  back.addEventListener('click',()=>{if(current>0){checkpoint.hidden=true;current--;update();focusStage();}});
  stepButtons.forEach((button,i)=>button.addEventListener('click',()=>{checkpoint.hidden=true;current=i;update();focusStage();}));
  root.querySelector('[data-journey-reset]')!.addEventListener('click',()=>{
    resetting=true;calculators.forEach(c=>c.dispatchEvent(new Event('guide:reset')));scopeInputs.forEach(i=>i.checked=false);
    root.querySelector<HTMLElement>('[data-journey-classification]')!.hidden=true;root.querySelector<HTMLElement>('[data-journey-outside]')!.hidden=true;
    accepted.clear();checkpoint.hidden=true;current=0;resetting=false;update();focusStage();
  });
  root.querySelector('[data-journey-download]')!.addEventListener('click',()=>{
    if(accepted.size!==5)return;const url=URL.createObjectURL(new Blob([voyageText(accepted)],{type:'text/plain;charset=utf-8'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='cloud-voyage-brief.txt';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.querySelector('[data-start-voyage]')?.addEventListener('click',event=>{
    event.preventDefault();workspace.hidden=false;update();root.querySelector<HTMLElement>('#journey-title')?.focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'instant'});history.replaceState(null,'','#cloud-plan');
  });
  if(location.hash==='#cloud-plan')workspace.hidden=false;
  update();
}
