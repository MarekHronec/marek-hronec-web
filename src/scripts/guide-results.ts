export interface GuideResult {
  complete: boolean;
  title: string;
  summary: string;
  points: string[];
  gaps: string[];
}
const results = new WeakMap<HTMLElement, GuideResult>();
export function publishGuideResult(root: HTMLElement, result: GuideResult) {
  results.set(root, result);
  root.dispatchEvent(new CustomEvent<GuideResult>('guide:result', { bubbles: true, detail: result }));
}
export function readGuideResult(root: HTMLElement) { return results.get(root); }
