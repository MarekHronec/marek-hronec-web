export const GUIDES = [
  { key: 'platform', title: 'Choose a platform', description: 'Decide what to operate yourself and what to hand over.', href: '/platform' },
  { key: 'compliance', title: 'Classify data & assess cloud placement', description: 'Understand protection needs and applicable requirements.', href: '/compliance' },
  { key: 'resilience', title: 'Design for failure', description: 'Set recovery targets and prepare for outages and lost data.', href: '/resilience' },
] as const;
export type GuideKey = (typeof GUIDES)[number]['key'];
