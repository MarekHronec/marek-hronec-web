/**
 * Read-time estimation config and helpers.
 *
 * WHY SEPARATE WPM VALUES:
 * Case studies are narrative prose — readers move quickly.
 * Knowledge Base articles contain diagrams, commands, and architecture
 * decisions that require re-reading, so a lower WPM produces a more
 * honest estimate.
 *
 * HOW TO TWEAK:
 * Edit the numbers below. All values are words-per-minute.
 * Higher WPM → shorter displayed read time.
 * Lower WPM  → longer displayed read time.
 *
 * HOW TO ADD A NEW KB CATEGORY:
 * Add a new key matching the category id you added to content.config.ts:
 *   myNewCategory: 130,
 * If you omit it, the `default` value is used automatically.
 */
export const READ_SPEED = {
  knowledgeBase: {
    default:    130,
    azure:      120,
    networking: 110,
    identity:   125,
    security:   120,
    finops:     150,
    gcp:        120,
    devops:     115,
    bpm:        140,
  },
};

function calcReadTime(body: string, wpm: number): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

/**
 * Returns read time in minutes for a KB article.
 * Uses the manual frontmatter value when present, otherwise calculates
 * from word count using the per-category WPM from READ_SPEED.
 */
export function kbReadTime(body: string, category: string, override?: number): number {
  if (override !== undefined) return override;
  const speeds = READ_SPEED.knowledgeBase as Record<string, number>;
  const wpm = speeds[category] ?? READ_SPEED.knowledgeBase.default;
  return calcReadTime(body, wpm);
}

