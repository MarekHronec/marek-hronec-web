export const RECOVERY_QUESTIONS = [
  { key:'rto', label:'Time', prompt:'How long can this business operation be unavailable?', help:'Agree the target with its business owner. Include detection, decisions, restore and validation.', options:[
    {value:'minutes',label:'15 minutes or less'}, {value:'hours',label:'Up to 4 hours'}, {value:'day',label:'Up to 24 hours'}, {value:'unknown',label:'We have not agreed this yet'}]},
  { key:'rpo', label:'Data', prompt:'How much recent data could you lose?', help:'Think about the business changes you would have to reconstruct, not just the backup schedule.', options:[
    {value:'zero',label:'No acknowledged changes'}, {value:'minutes',label:'Up to 15 minutes of changes'}, {value:'day',label:'Up to 24 hours of changes'}, {value:'unknown',label:'We have not agreed this yet'}]},
  { key:'scope', label:'Failure', prompt:'What is the widest infrastructure outage you need to plan for?', help:'Every plan also needs a way back from deletion or corruption. Select the widest infrastructure boundary in scope.', options:[
    {value:'host',label:'One instance or host'}, {value:'zone',label:'An entire zone or availability domain'}, {value:'region',label:'An entire region'}]},
  { key:'placement', label:'Location', prompt:'Can recovery data and operations move to another region?', help:'Check the permitted locations for production data, backups, keys and supporting services.', options:[
    {value:'allowed',label:'Yes, an approved alternate region is available'}, {value:'restricted',label:'No, this workload must remain in this region'}, {value:'unknown',label:'We still need to establish what is allowed'}]},
  { key:'evidence', label:'Readiness', prompt:'Have you restored the whole business operation under these conditions?', help:'A backup success message or a tabletop exercise alone does not measure an end-to-end restore.', options:[
    {value:'tested',label:'Yes, we have measured a representative recovery exercise'}, {value:'untested',label:'No, or the exercise did not cover these conditions'}]},
] as const;
export type RecoverySelection = Partial<Record<(typeof RECOVERY_QUESTIONS)[number]['key'], string>>;
export interface RecoveryPriority { title: string; detail: string }
export function planRecovery(selection: RecoverySelection) {
  const answers: RecoverySelection = {};
  for (const q of RECOVERY_QUESTIONS) if (q.options.some(o=>o.value===selection[q.key])) answers[q.key]=selection[q.key];
  const answered=Object.keys(answers).length;
  const priorities: RecoveryPriority[]=[];
  const gaps: string[]=[];
  const add=(title:string,detail:string)=>priorities.push({title,detail});
  if(answered!==RECOVERY_QUESTIONS.length) return {answered,complete:false,priorities,gaps,summary:'Complete the five questions to prepare a recovery brief.'};
  if(answers.rto==='unknown') gaps.push('Agree an RTO with the business owner before sizing the recovery design.');
  else if(answers.rto==='minutes') add('Prepare recovery before the incident','Evaluate ready capacity, tested traffic switching and automated recovery steps. A cold rebuild may miss this target. Measure detection and decision time as well as failover.');
  else if(answers.rto==='hours') add('Compare warm standby with a measured rebuild','Time infrastructure deployment, data recovery and dependency validation using representative volumes. Keep the option that meets the target with margin.');
  else add('Test whether backup and rebuild meet the time budget','A longer RTO can make restore-based recovery practical. Do not assume large datasets or unavailable capacity can be recovered within one day.');
  if(answers.rpo==='unknown') gaps.push('Agree an RPO and identify which records the business can reconstruct.');
  else if(answers.rpo==='zero') add('Validate how acknowledged writes survive','Evaluate synchronous commit and consistency for the chosen failure boundary. Verify failure behavior, latency and quorum requirements. “Zero” is a target, not a guarantee from this tool.');
  else if(answers.rpo==='minutes') add('Measure the age of your usable recovery point','Evaluate replication or point-in-time recovery. Alert on lag and failed protection jobs; test that a usable, consistent recovery point stays within 15 minutes.');
  else add('Keep a usable recovery point within 24 hours','Allow for failed jobs, copy delays and consistency checks. Retention and restore tests matter as much as the nominal backup interval.');
  if(answers.scope==='host') add('Remove single-host dependencies','Evaluate another healthy instance and service-level redundancy. Confirm that storage, routing and identity do not depend on the failed host.');
  if(answers.scope==='zone') add('Separate zone-level dependencies','Use supported zone or availability-domain placement for every critical dependency. Fault domains within one domain do not establish protection against the loss of that whole domain.');
  if(answers.scope==='region') {
    if(answers.placement==='allowed') add('Prepare and exercise the alternate region','Verify services, quotas, capacity, keys, networking and data there. Test failover and failback; region pairing alone does not configure either.');
    else gaps.push(answers.placement==='restricted'?'Your region-outage scope conflicts with a single-region restriction. In-region redundancy cannot keep operating through loss of that whole region. Resolve the constraint or document the accepted interruption.':'Confirm a permitted recovery location before claiming readiness for a region outage.');
  }
  if(answers.placement==='unknown' && answers.scope!=='region') gaps.push('Confirm where backups and recovery services may operate; keep placement provisional until approved.');
  if(answers.placement==='restricted') add('Keep recovery placement within the approved boundary','Check backup replication, keys and managed service behavior. Single-region protection still needs isolated recovery points and a documented regional-outage limitation.');
  add('Protect a recoverable history','Keep retained recovery points with suitable access controls and isolation. Replication can repeat deletion or corruption. Test recovery to a known-good point and reconcile later valid changes.');
  add(answers.evidence==='tested'?'Keep the recovery evidence current':'Run a representative recovery exercise',
    answers.evidence==='tested'?'Record achieved recovery time, actual data loss and the covered failure scope. Revalidate after meaningful changes; an earlier passing test does not prove every future incident.':'Start in an isolated environment. Measure from interruption to a validated business transaction, record actual data loss, and assign owners for the gaps. Include identity and communications.');
  return {answered,complete:true,priorities,gaps,summary:gaps.length?'Resolve the open requirements before selecting a recovery pattern.':'Use these priorities to compare designs and plan your next recovery exercise.'};
}
