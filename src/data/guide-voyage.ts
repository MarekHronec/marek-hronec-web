import { GUIDES } from './architecture-guides';
export const VOYAGE = [
  { key: 'compliance', name: 'Know your cargo', label: 'Data protection', detail: 'Classify the data and understand the placement requirements.', cargo: 'Protection' },
  { key: 'platform', name: 'Choose your vessel', label: 'Platform', detail: 'Decide what your team operates and what a provider handles.', cargo: 'Platform' },
  { key: 'connectivity', name: 'Plot the passage', label: 'Connectivity', detail: 'Plan who can connect, which path they use and how names resolve.', cargo: 'Connections' },
  { key: 'resilience', name: 'Prepare for rough water', label: 'Recovery', detail: 'Set the recovery priorities and tests that matter to the operation.', cargo: 'Recovery' },
  { key: 'cost', name: 'Account for the voyage', label: 'Cost', detail: 'Bring demand, data movement and operating effort into the estimate.', cargo: 'Cost' },
].map(step => ({ ...step, href: GUIDES.find(guide => guide.key === step.key)!.href }));
export type VoyageKey = (typeof VOYAGE)[number]['key'];
