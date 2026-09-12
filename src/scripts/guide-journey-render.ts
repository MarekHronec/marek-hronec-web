import { VOYAGE } from '../data/guide-voyage';
import type { GuideResult } from './guide-results';
export function renderVoyage(root: HTMLElement, accepted: Map<number,GuideResult>, current: number) {
  root.querySelector<HTMLElement>('[data-journey-progress]')!.textContent=accepted.size+' of 5 stages recorded'+(accepted.size===5?' · Brief assembled':'');
  const manifest=root.querySelector<HTMLElement>('[data-journey-manifest]')!;
  manifest.replaceChildren(...VOYAGE.map((step,i)=>{
    const li=document.createElement('li'),number=document.createElement('span'),body=document.createElement('div'),title=document.createElement('strong'),detail=document.createElement('span');
    const result=accepted.get(i);li.dataset.loaded=String(!!result);
    number.textContent=String(i+1).padStart(2,'0');title.textContent=step.label;detail.textContent=result?.title??'Awaiting your decision';
    body.append(title,detail);li.append(number,body);return li;
  }));
  const scene=root.querySelector<SVGElement>('[data-voyage-scene="plan"]')!;
  scene.querySelector('[data-voyage-trolley]')?.setAttribute('transform','translate('+(256+Math.min(current,4)*80)+' 55)');
  VOYAGE.forEach((step,i)=>{
    scene.querySelectorAll<SVGElement>('[data-load="'+step.key+'"],[data-ship-part="'+step.key+'"]').forEach(el=>{
      const loaded=String(accepted.has(i));if(el.dataset.loaded!==loaded)el.dataset.loaded=loaded;
      el.dataset.current=String(current===i);
      el.dataset.unassessed=String(i===0&&accepted.get(0)?.title==='Not assessed — outside or unconfirmed ISVS scope');
    });
  });
}
function list(items:string[]) { const ul=document.createElement('ul');items.forEach(text=>{const li=document.createElement('li');li.textContent=text;ul.append(li);});return ul; }
export function renderVoyageBrief(root:HTMLElement, accepted:Map<number,GuideResult>) {
  root.querySelector('[data-journey-results]')!.replaceChildren(...VOYAGE.map((step,i)=>{
    const result=accepted.get(i)!,article=document.createElement('article'),heading=document.createElement('h4'),summary=document.createElement('p');
    heading.textContent=String(i+1).padStart(2,'0')+' · '+step.label+' — '+result.title;summary.textContent=result.summary;article.append(heading,summary);
    if(result.gaps.length){const title=document.createElement('h5');title.textContent='To verify or resolve';article.append(title,list(result.gaps));}
    if(result.points.length){const detail=document.createElement('details'),label=document.createElement('summary');label.textContent='Review the full result';detail.append(label,list(result.points));article.append(detail);}
    return article;
  }));
}
export function voyageText(accepted:Map<number,GuideResult>) {
  return 'CLOUD VOYAGE BRIEF\nPlanning guidance, not a validated design or compliance approval.\n\n'+VOYAGE.map((step,i)=>{
    const r=accepted.get(i)!;return step.label+' — '+r.title+'\n'+r.summary+'\n\n'+r.gaps.map(t=>'TO VERIFY: '+t).join('\n')+'\n'+r.points.map(t=>'• '+t).join('\n');
  }).join('\n\n');
}
