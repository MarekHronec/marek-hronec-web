const PRIORITY_GROUPS: readonly (readonly string[])[] = [
  ['beginner', 'intermediate', 'advanced'],
  ['azure', 'oci', 'aws', 'gcp'],
  ['landing zones', 'networking', 'identity', 'security', 'finops', 'devops', 'bpm', 'governance', 'naming conventions'],
  ['kql', 'log analytics', 'azure monitor', 'terraform', 'github actions', 'argo cd', 'helm', 'camunda', 'activiti', 'kogito'],
];

/**
 * Returns tags sorted by editorial priority (difficulty > platform > topic > tools > rest).
 * Original relative order within each group is preserved.
 * Matching is case-insensitive. Duplicates are dropped.
 */
export function sortTagsByPriority(tags: string[]): string[] {
  if (tags.length === 0) return [];
  const placed = new Set<number>();
  const result: string[] = [];

  for (const group of PRIORITY_GROUPS) {
    const groupSet = new Set(group);
    tags.forEach((tag, i) => {
      if (!placed.has(i) && groupSet.has(tag.toLowerCase())) {
        result.push(tag);
        placed.add(i);
      }
    });
  }

  // Remaining tags in their original order
  tags.forEach((tag, i) => {
    if (!placed.has(i)) result.push(tag);
  });

  return result;
}
