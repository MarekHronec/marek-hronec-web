import type { ConceptStory } from './platform-concepts';
export type CostKey = 'idle' | 'scaling' | 'transfer' | 'operations';
export const COST_STORIES: ConceptStory<CostKey>[] = [
{key:'idle',ordinal:'01',name:'Idle capacity',model:'Baseline',cue:'Paid for, even at rest',title:'An empty berth can still be on the bill.',
definition:'Provisioned capacity can cost money while it does no useful work. First separate the capacity you must keep ready from the capacity you can release.',
analogy:'The harbour has four chartered vessels but cargo for only one. Releasing two reduces the chartered fleet; keeping one spare may still be a deliberate recovery decision.',
question:'Can part of this workload safely stop outside its working hours?',answers:{yes:'Compare a tested shutdown schedule with always-on operation. Include restart time and charges that remain.',no:'Measure the minimum capacity needed to meet the service target. Low utilisation alone does not prove that redundancy is waste.'},
action:'Release two idle vessels',reset:'Restore the chartered fleet',before:'Four vessels chartered; one carrying cargo.',after:'Two remain chartered: one working, one spare. Storage and other services may still cost money.',
lesson:'Stopping application work is not necessarily stopping billing. Verify the service’s billable state.'},
{key:'scaling',ordinal:'02',name:'Scaling',model:'Demand',cue:'The fleet follows the work',title:'A quiet average can hide an expensive peak.',
definition:'Variable demand changes capacity and consumption. An estimate needs both the quiet baseline and the busy period, including how quickly the service can respond.',
analogy:'Two extra vessels join a busy route. They take time to arrive, and every additional vessel adds capacity that must be accounted for.',
question:'Does demand change enough to justify adding and removing capacity?',answers:{yes:'Measure the peak, its duration and the time needed to scale. Test scale-in as well as scale-out.',no:'Start with measured steady demand. A fixed allocation may be simpler; compare it against the same performance target.'},
action:'Bring in peak capacity',reset:'Return to baseline demand',before:'Two vessels cover the normal demand.',after:'Four vessels cover the peak. More capacity is useful only if it arrives in time.',
lesson:'Autoscaling is not an unlimited spending guardrail. Set bounds and define what happens when demand exceeds them.'},
{key:'transfer',ordinal:'03',name:'Data transfer',model:'Movement',cue:'Every route has a meter',title:'Follow the data, not just the servers.',
definition:'Data movement can add transfer and processing charges. The price depends on the route, direction, service and contract.',
analogy:'A cargo vessel crosses between two ports. The outbound route and the return route are separate journeys to inspect—not automatically two equal charges.',
question:'Does substantial data cross regions, providers or the public internet?',answers:{yes:'Map both directions and measure their volume. Check transfer, gateways, inspection and retrieval charges for each route.',no:'Still inspect same-region paths, requests, logs and backups. A local architecture does not mean every network or storage operation is free.'},
action:'Trace an outbound shipment',reset:'Return to the departure port',before:'Identify the source, destination and direction before choosing a rate.',after:'One outbound shipment traced. Now price that exact route and include repeated copies, retries and recovery traffic.',
lesson:'Do not assume a universal egress rate—or that changing providers is free. Use current service pricing and your agreement.'},
{key:'operations',ordinal:'04',name:'Operational effort',model:'Ownership',cue:'Someone still runs the harbour',title:'The invoice is only part of the cost.',
definition:'Include the time, tooling and support needed to run the workload. A managed service can transfer tasks while leaving application and business responsibilities with your team.',
analogy:'The port operator takes over dock maintenance. Your crew still owns cargo checks and delivery decisions. Work changes hands; it does not disappear.',
question:'Have you named and budgeted the people who will operate this workload?',answers:{yes:'Compare the actual hours, support coverage and tools for each platform option. Include recovery exercises and upgrades.',no:'Assign an owner and estimate recurring work before calling one platform cheaper. Managed infrastructure still needs application ownership.'},
action:'Hand over dock maintenance',reset:'Bring maintenance back in-house',before:'Your team covers maintenance, cargo checks and delivery decisions.',after:'The operator covers dock maintenance. Your team still checks cargo and decides what to deliver.',
lesson:'Compare total cost for the same service requirements: platform charges, operations, support and recovery.'}
];
