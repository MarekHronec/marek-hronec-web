import { renderAnswerImpacts } from './planner-feedback';
import { publishGuideResult } from './guide-results';
import { RECOVERY_QUESTIONS, planRecovery, type RecoverySelection } from '../data/resilience-planner';
export function initializeRecoveryPlanner() {
  document.querySelectorAll<HTMLElement>('.recovery-planner:not([data-ready])').forEach(root=>{
    const form=root.querySelector<HTMLFormElement>('form');
    const summary=root.querySelector<HTMLElement>('[data-recovery-summary]');
    const progress=root.querySelector<HTMLElement>('[data-recovery-progress]');
    const output=root.querySelector<HTMLElement>('[data-recovery-output]');
    const priorities=root.querySelector<HTMLOListElement>('[data-recovery-priorities]');
    const gaps=root.querySelector<HTMLElement>('[data-recovery-gaps]');
    const body=root.querySelector<HTMLElement>('.recovery-planner__body');
    if(!form||!summary||!progress||!output||!priorities||!gaps||!body)return;
    root.dataset.ready='true';
    const resets=[...root.querySelectorAll<HTMLButtonElement>('[data-recovery-reset]')];
    const render=()=>{
      const selection:RecoverySelection={};
      const data=new FormData(form);
      for(const q of RECOVERY_QUESTIONS){
        const value=data.get(q.key);
        if(typeof value==='string')selection[q.key]=value;
        const label=root.querySelector<HTMLElement>('[data-q-selection="'+q.key+'"]');
        const option=q.options.find(o=>o.value===value);
        if(label){label.textContent=option?.label??'No answer selected';label.dataset.selected=String(!!option);}
      }
      const result=planRecovery(selection);
      renderAnswerImpacts(root, RECOVERY_QUESTIONS, selection, planRecovery);
      progress.textContent=result.answered+' of 5 answered'+(result.complete?' · Brief ready':'');
      summary.textContent=result.summary;output.hidden=result.answered===0;
      resets.forEach(button=>button.disabled=result.answered===0);
      priorities.replaceChildren(...result.priorities.map(item=>{
        const li=document.createElement('li'),title=document.createElement('h4'),detail=document.createElement('p');
        title.textContent=item.title;detail.textContent=item.detail;li.append(title,detail);return li;
      }));
      gaps.hidden=result.gaps.length===0;
      gaps.querySelector('ul')?.replaceChildren(...result.gaps.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
      publishGuideResult(root,{complete:result.complete,title:'Recovery brief',summary:result.summary,points:[...RECOVERY_QUESTIONS.map(q=>q.label+': '+(q.options.find(o=>o.value===selection[q.key])?.label??'Unanswered')),...result.priorities.map(p=>p.title+' — '+p.detail)],gaps:result.gaps});
      body.scrollTop=0;
    };
    form.addEventListener('submit',event=>event.preventDefault());
    form.addEventListener('change',render);
    const reset=()=>{form.reset();render();form.querySelector<HTMLInputElement>('input')?.focus();};
    resets.forEach(button=>button.addEventListener('click',reset));
    root.addEventListener('guide:reset',reset);
    render();
  });
}
