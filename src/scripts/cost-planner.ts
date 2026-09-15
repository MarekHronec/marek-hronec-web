import { renderAnswerImpacts } from './planner-feedback';
import { publishGuideResult } from './guide-results';
import { COST_QUESTIONS, planCost, type CostSelection } from '../data/cost-planner';
export function initializeCostPlanner() {
  document.querySelectorAll<HTMLElement>('.cost-planner:not([data-ready])').forEach(root=>{
    const form=root.querySelector<HTMLFormElement>('form');
    const summary=root.querySelector<HTMLElement>('[data-cost-summary]');
    const progress=root.querySelector<HTMLElement>('[data-cost-progress]');
    const output=root.querySelector<HTMLElement>('[data-cost-output]');
    const priorities=root.querySelector<HTMLOListElement>('[data-cost-priorities]');
    const gaps=root.querySelector<HTMLElement>('[data-cost-gaps]');
    const body=root.querySelector<HTMLElement>('.cost-planner__body');
    if(!form||!summary||!progress||!output||!priorities||!gaps||!body)return;
    root.dataset.ready='true';
    const resets=[...root.querySelectorAll<HTMLButtonElement>('[data-cost-reset]')];
    const render=()=>{
      const selection:CostSelection={};
      const data=new FormData(form);
      for(const q of COST_QUESTIONS){
        const value=data.get(q.key);
        if(typeof value==='string')selection[q.key]=value;
        const label=root.querySelector<HTMLElement>('[data-q-selection="'+q.key+'"]');
        const option=q.options.find(o=>o.value===value);
        if(label){label.textContent=option?.label??'No answer selected';label.dataset.selected=String(!!option);}
      }
      const result=planCost(selection);
      renderAnswerImpacts(root, COST_QUESTIONS, selection, planCost);
      progress.textContent=result.answered+' of 5 answered'+(result.complete?' · Checklist ready':'');
      summary.textContent=result.summary;output.hidden=result.answered===0;
      resets.forEach(button=>button.disabled=result.answered===0);
      priorities.replaceChildren(...result.priorities.map(item=>{
        const li=document.createElement('li'),title=document.createElement('h4'),detail=document.createElement('p');
        title.textContent=item.title;detail.textContent=item.detail;li.append(title,detail);return li;
      }));
      gaps.hidden=result.gaps.length===0;
      gaps.querySelector('ul')?.replaceChildren(...result.gaps.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
      publishGuideResult(root,{complete:result.complete,title:'Cost checklist',summary:result.summary,points:[...COST_QUESTIONS.map(q=>q.label+': '+(q.options.find(o=>o.value===selection[q.key])?.label??'Unanswered')),...result.priorities.map(p=>p.title+' — '+p.detail)],gaps:result.gaps});
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
