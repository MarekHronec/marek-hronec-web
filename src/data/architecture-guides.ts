export const GUIDES = [
  { key: 'platform', title: 'Choose a platform', description: 'Decide what to operate yourself and what to hand over.', href: '/platform' },
  { key: 'compliance', title: 'Classify data & assess cloud placement', description: 'Understand protection needs and applicable requirements.', href: '/compliance' },
  { key: 'resilience', title: 'Design for failure', description: 'Set recovery targets and prepare for outages and lost data.', href: '/resilience' },
  { key: 'cost', title: 'Understand the cost', description: 'Identify cost drivers and prepare a measured workload estimate.', href: '/cost' },
  { key: 'connectivity', title: 'Connect your systems', description: 'Plan access, routing, DNS and resilient paths between endpoints.', href: '/connectivity' },
] as const;
export type GuideKey = (typeof GUIDES)[number]['key'];
