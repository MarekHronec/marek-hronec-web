import type { ConceptStory } from './platform-concepts';
export type CostKey = 'idle' | 'scaling' | 'transfer' | 'operations';
export const COST_STORIES: ConceptStory<CostKey>[] = [
{key:'idle',ordinal:'01',name:'Idle capacity',model:'Baseline',cue:'Paid for, even at rest',title:'Idle capacity can still be on the bill.',
definition:'Like chartered vessels, allocated cloud capacity can cost money while idle. Release only what you can safely spare; stopping an app may leave its resources billable.',
analogy:'The harbour has four chartered vessels but cargo for only one. Releasing two reduces the chartered fleet; keeping one spare may still be a deliberate recovery decision.',
question:'Which capacity can you safely release or schedule off, while keeping enough ready to meet your service target?',
action:'Release two idle vessels',reset:'Restore the chartered fleet',before:'Four vessels: one working, one spare, two to release.',after:'Two vessels remain: one working and one spare.',
lesson:'Stopping application work is not necessarily stopping billing. Verify the service’s billable state.'},
{key:'scaling',ordinal:'02',name:'Scaling',model:'Demand',cue:'The fleet follows the work',title:'Price the peak, not just the average.',
definition:'A busy harbour needs extra vessels. Cloud capacity has the same trade-off: more capacity serves the peak, and its duration determines the extra cost.',
analogy:'Two extra vessels join a busy route. They take time to arrive, and every additional vessel adds capacity that must be accounted for.',
question:'What baseline, peak duration and scaling delay must you plan for—and what happens at your capacity limit?',
action:'Bring in peak capacity',reset:'Return to baseline demand',before:'Two vessels cover normal demand.',after:'Two extra vessels cover the peak; the baseline stays.',
lesson:'Autoscaling is not an unlimited spending guardrail. Set bounds and define what happens when demand exceeds them.'},
{key:'transfer',ordinal:'03',name:'Data transfer',model:'Movement',cue:'Every route has a meter',title:'Every data route needs a price.',
definition:'Shipping cargo adds a journey cost. For cloud data, check the route, direction and volume—plus any processing fees. Local traffic is not always free.',
analogy:'A cargo vessel crosses between two ports. The outbound route and the return route are separate journeys to inspect—not automatically two equal charges.',
question:'Which routes carry your data, in each direction, and what transfer, gateway and retrieval fees apply?',
action:'Trace an outbound shipment',reset:'Return to the departure port',before:'Trace one outbound shipment between the ports.',after:'One shipment charged. Copies and retries can add more.',
lesson:'Do not assume a universal egress rate—or that changing providers is free. Use current service pricing and your agreement.'},
{key:'operations',ordinal:'04',name:'Operational effort',model:'Ownership',cue:'Someone still runs the harbour',title:'A smaller invoice can hide more work.',
definition:'Handing dock maintenance to an operator raises its fee but frees your crew. Managed cloud services can do the same; your team still owns the application.',
analogy:'The port operator takes over dock maintenance. Your crew still owns cargo checks and delivery decisions. Work changes hands; it does not disappear.',
question:'Who will own routine work, support and recovery—and what will their time cost alongside the provider invoice?',
action:'Hand over dock maintenance',reset:'Bring maintenance back in-house',before:'Your team handles all three recurring tasks.',after:'Maintenance changes hands; cargo and delivery stay yours.',
lesson:'Compare total cost for the same service requirements: platform charges, operations, support and recovery.'}
];
