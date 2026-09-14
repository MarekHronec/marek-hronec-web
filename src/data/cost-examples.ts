import type { CostKey } from './cost-concepts';
export interface CostExample { rows: {label:string; before:number; after:number}[]; assumption:string; outcome:string; totalLabel:string }
export const COST_EXAMPLES: Record<CostKey, CostExample> = {
// 'idle' is never read: billingExample() intercepts it and computes the ledger from
// the reader's inputs, returning before the COST_EXAMPLES fallback. Kept only to
// satisfy Record<CostKey, ...>, and held equal to what the defaults render.
idle:{totalLabel:'Projected bill for this 30-day month',rows:[{label:'Capacity hours',before:720,after:540},{label:'Unused storage allocation',before:72,after:72}],assumption:'Illustrative 720-hour month. 4 → 2 vessels at €0.25 per vessel-hour. Unused storage is a separate €0.10/hour meter.',outcome:'Release at hour 360 (15.0 days elapsed). Only later capacity hours are avoided. Storage stays allocated and continues billing for all 720 hours.'},
scaling:{totalLabel:'Planned monthly bill',rows:[{label:'Baseline & retained services',before:800,after:800},{label:'Extra capacity for the peak',before:0,after:200}],assumption:'2 extra vessels × 10 days × €10/day. The baseline remains in place for the month.',outcome:'€200 more this month for the peak. Ending the peak stops new daily charges; it does not refund past use.'},
transfer:{totalLabel:'Planned monthly bill',rows:[{label:'Existing services',before:600,after:600},{label:'Additional outbound transfer',before:0,after:200}],assumption:'1,000 GB × an invented €0.20/GB rate. No free allowance or other transfer fees in this example.',outcome:'€200 added for this shipment. Repeating the shipment adds another charge.'},
operations:{totalLabel:'Monthly cost including team time',rows:[{label:'Provider invoice',before:300,after:700},{label:'Your team’s operating effort',before:1200,after:600}],assumption:'Team effort: 24 → 12 hours/month at €50/hour. Provider fee rises by €400. No transition cost included.',outcome:'Total cost falls €200, although the provider invoice rises €400. Freed staff time is not automatically a cash saving.'}
};
