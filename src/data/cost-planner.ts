export const COST_QUESTIONS = [
{key:'demand',label:'Demand',prompt:'What does demand look like over a typical week?',help:'Choose the pattern for one workload. If you have no measurements, keep that uncertainty visible.',options:[{value:'steady',label:'Steady, measured demand'},{value:'variable',label:'Quiet periods and significant peaks'},{value:'unknown',label:'We have not measured it yet'}]},
{key:'idle',label:'Baseline',prompt:'Can any capacity safely stop when there is no work?',help:'Consider restart time, scheduled jobs and availability requirements—not just office hours.',options:[{value:'yes',label:'Yes, some capacity can stop'},{value:'no',label:'No, it must stay ready'},{value:'unknown',label:'We need to test this'}]},
{key:'movement',label:'Data movement',prompt:'Which data routes must the estimate include?',help:'Include application traffic, replication, backups, logs, exports and recovery exercises.',options:[{value:'local',label:'Mainly within one region'},{value:'external',label:'Substantial cross-region, internet or cross-cloud traffic'},{value:'unknown',label:'The routes or volumes are not measured'}]},
{key:'operations',label:'Operating effort',prompt:'Who owns the work after deployment?',help:'Include patching, application incidents, access, support, backup checks and recovery tests.',options:[{value:'team',label:'Our team, with measured effort'},{value:'managed',label:'A provider handles some tasks; our remaining work is identified'},{value:'unknown',label:'Ownership or effort is still unclear'}]},
{key:'commitment',label:'Commitment',prompt:'How confident are you about future eligible usage?',help:'A discount commitment should follow the workload forecast. Do not infer a stable baseline from a monthly average.',options:[{value:'stable',label:'We have a measured baseline and a credible forecast'},{value:'changing',label:'The workload or architecture is likely to change'},{value:'unknown',label:'We do not have enough evidence yet'}]}
] as const;
export type CostSelection=Partial<Record<(typeof COST_QUESTIONS)[number]['key'],string>>;
export function planCost(selection:CostSelection) {
const answers:CostSelection={};
for(const q of COST_QUESTIONS)if(q.options.some(o=>o.value===selection[q.key]))answers[q.key]=selection[q.key];
const answered=Object.keys(answers).length;
const priorities:{title:string;detail:string}[]=[];
const gaps:string[]=[];
if(answered!==COST_QUESTIONS.length)return{answered,complete:false,priorities,gaps,summary:'Complete the five questions to prepare your cost checklist.'};
const add=(title:string,detail:string)=>priorities.push({title,detail});
if(answers.demand==='unknown')gaps.push('Measure a representative demand cycle: useful work, resource consumption, peak and quiet periods.');
else if(answers.demand==='variable')add('Price quiet, typical and peak scenarios','Record how long each lasts. Test scaling delay and safe scale-in, then include the minimum allocation, peak capacity and consumption meters.');
else add('Size against the measured baseline','Check memory, throughput and latency alongside CPU. Keep the capacity required for failure or maintenance; identify excess separately.');
if(answers.idle==='unknown')gaps.push('Test which services can stop, how long they take to restart and which charges remain.');
else if(answers.idle==='yes')add('Evaluate a shutdown schedule','List eligible hours and verify the billable state. Retained disks, IP addresses, backups or service minimums can remain chargeable. Preserve the recovery target.');
else add('Make the always-ready cost explicit','Price the minimum live footprint, redundancy and standby separately. Explain why each is needed rather than labelling all low utilisation as waste.');
if(answers.movement==='unknown')gaps.push('Map sources, destinations, directions and monthly volumes before applying transfer rates.');
else add(answers.movement==='external'?'Price every external route':'Check the local routes too','Record bytes in each direction, repeated copies and expected growth. Check service-specific transfer, gateway, inspection, request and retrieval meters; include backup and recovery traffic.');
if(answers.operations==='unknown')gaps.push('Name the operating owner and estimate recurring hours, support coverage and tooling.');
else add(answers.operations==='managed'?'Account for the work that stays with you':'Include the team’s operating effort','Budget application support, incident response, upgrades, access reviews and recovery exercises. Compare provider fees and team hours for the same responsibilities without counting a task twice.');
if(answers.commitment==='unknown')gaps.push('Establish eligible baseline usage and the forecast horizon before purchasing a commitment.');
else if(answers.commitment==='changing')add('Keep the uncertain portion flexible','Compare on-demand use with commitment exposure if the workload changes. Record existing obligations and any verified exchange or cancellation terms.');
else add('Test a commitment against downside usage','Use your actual eligible rates, term and matching rules. Calculate the break-even usage and model a migration or demand drop; a measured baseline does not guarantee future savings.');
add('Build the complete estimate','Attach current regional and contractual rates to measured quantities. Include storage, requests, licences, support, security, observability, recovery and one-time migration or exit work.');
add('Assign a cost owner and response plan','Choose a useful unit such as cost per completed order. Compare actuals with the estimate and investigate deviations. Budget alerts notify; they do not by themselves stop consumption.');
return{answered,complete:true,priorities,gaps,summary:gaps.length?'Your checklist is ready. Resolve the measurement gaps before treating an estimate as reliable.':'Your checklist is ready. Use these measurements to compare designs against the same service requirements.'};
}
