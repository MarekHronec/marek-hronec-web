import { CONNECTIVITY_QUESTIONS, planConnectivity, type ConnectivitySelection } from '../data/connectivity-planner';
export function initializeConnectivityPlanner() {
  document.querySelectorAll<HTMLElement>('.connectivity-planner:not([data-ready])').forEach(root=>{
    const form=root.querySelector<HTMLFormElement>('form');
    const summary=root.querySelector<HTMLElement>('[data-connectivity-summary]');
    const progress=root.querySelector<HTMLElement>('[data-connectivity-progress]');
    const output=root.querySelector<HTMLElement>('[data-connectivity-output]');
    const priorities=root.querySelector<HTMLOListElement>('[data-connectivity-priorities]');
    const gaps=root.querySelector<HTMLElement>('[data-connectivity-gaps]');
    const body=root.querySelector<HTMLElement>('.connectivity-planner__body');
    if(!form||!summary||!progress||!output||!priorities||!gaps||!body)return;
    root.dataset.ready='true';
    const resets=[...root.querySelectorAll<HTMLButtonElement>('[data-connectivity-reset]')];
    const render=()=>{
      const selection:ConnectivitySelection={};
      const data=new FormData(form);
      for(const q of CONNECTIVITY_QUESTIONS){
        const value=data.get(q.key);
        if(typeof value==='string')selection[q.key]=value;
        const label=root.querySelector<HTMLElement>('[data-q-selection="'+q.key+'"]');
        const option=q.options.find(o=>o.value===value);
        if(label){label.textContent=option?.label??'No answer selected';label.dataset.selected=String(!!option);}
      }
      const result=planConnectivity(selection);
      progress.textContent=result.answered+' of 5 answered'+(result.complete?' · Brief ready':'');
      summary.textContent=result.summary;output.hidden=!result.complete;
      resets.forEach(button=>button.disabled=result.answered===0);
      priorities.replaceChildren(...result.priorities.map(item=>{
        const li=document.createElement('li'),title=document.createElement('h4'),detail=document.createElement('p');
        title.textContent=item.title;detail.textContent=item.detail;li.append(title,detail);return li;
      }));
      gaps.hidden=result.gaps.length===0;
      gaps.querySelector('ul')?.replaceChildren(...result.gaps.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
      body.scrollTop=0;
    };
    form.addEventListener('submit',event=>event.preventDefault());
    form.addEventListener('change',render);
    resets.forEach(button=>button.addEventListener('click',()=>{form.reset();render();form.querySelector<HTMLInputElement>('input')?.focus();}));
    render();
  });
}
