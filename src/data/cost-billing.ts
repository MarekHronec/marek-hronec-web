import { COST_EXAMPLES, type CostExample } from './cost-examples';
import type { CostKey } from './cost-concepts';
export interface BillingInputs { mode?:string; hour?:number; storage?:boolean; days?:number; gb?:number }
const bounded=(n:number|undefined,fallback:number,max:number)=>Number.isFinite(n)?Math.max(0,Math.min(max,n!)):fallback;
export function billingExample(key:CostKey,input:BillingInputs={}):CostExample & { accrued?:number; remaining?:number } {
if(key==='idle'){
const hour=bounded(input.hour,360,720),remaining=720-hour;
const mode=['hourly','monthly','commitment'].includes(input.mode??'')?input.mode:'hourly';
const capacity=mode==='hourly'?4*.25*hour+2*.25*remaining:720;
const storage=input.storage?.valueOf()?hour*.1:72;
const accrued=(mode==='hourly'?hour:720)+hour*.1;
const total=capacity+storage;
return {totalLabel:'Projected bill for this 30-day month',
rows:[{label:mode==='hourly'?'Capacity hours':'Capacity fee still owed',before:720,after:capacity},{label:'Unused storage allocation',before:72,after:storage}],
assumption:'Illustrative 720-hour month. '+(mode==='hourly'?'4 → 2 vessels at €0.25 per vessel-hour.':mode==='monthly'?'€180 per vessel, billed for the whole month without prorating. Cancellation takes effect next month.':'An existing €720 capacity commitment remains payable this month and through its term; no refund or reassignment assumed.')+' Unused storage is a separate €0.10/hour meter.',
outcome:'Release at hour '+hour+' ('+(hour/24).toFixed(1)+' days elapsed). '+(mode==='hourly'?'Only later capacity hours are avoided. ':'Releasing capacity does not reduce the capacity payment this month. ')+(input.storage?'The unused storage meter stops at release; earlier hours remain billed.':'Storage stays allocated and continues billing for all 720 hours.'),
accrued,remaining:total-accrued};
}
if(key==='scaling'){const days=bounded(input.days,10,30);return {...COST_EXAMPLES.scaling,rows:[{label:'Baseline & retained services',before:800,after:800},{label:'Extra capacity for the peak',before:0,after:2*days*10}],assumption:'2 extra vessels × '+days+' days × €10/day. Only the peak duration changes; the baseline remains all month.',outcome:'The peak adds €'+(2*days*10)+' this month. Ending it stops future daily charges, without refunding completed days.'};}
if(key==='transfer'){const gb=bounded(input.gb,1000,10000);return {...COST_EXAMPLES.transfer,rows:[{label:'Existing services',before:600,after:600},{label:'Additional outbound transfer',before:0,after:gb*.2}],assumption:gb+' GB × an invented €0.20/GB. Usage-based: elapsed hours do not determine this charge. No free allowance or other fees included.',outcome:'This shipment adds €'+(gb*.2)+'. Stopping a resource afterwards does not undo data already transferred.'};}
return COST_EXAMPLES[key];
}
