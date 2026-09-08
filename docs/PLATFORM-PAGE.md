# /platform — Platform Architecture

The abstraction ladder from a bare VM to a SaaS subscription: what each rung
hands over, what it takes away, and what it would cost to leave.

## Thesis

Portability is a bill you either price up front or get handed later. The page is
deliberately **not** an argument for containers. Every rung carries a "wrong call
when", and the closing section argues that the portability tax is real and
sometimes should not be paid. If an edit makes the page read like advocacy for
one rung, it is off-thesis.

Voice matches the Knowledge Base titles it links to (*Without the Marketing
Layer*, *The Honest Catch*): concrete, trade-off first, no buzzwords.

## Structure

| Section | Component | Content source |
|---|---|---|
| Hero + choice cards | `src/pages/platform.astro` | inline |
| Responsibility register | `platform/ResponsibilityLadder.astro` | `data/platform-ladder.ts` |
| Five animated concepts | `platform/ConceptExplainer.astro` | `data/platform-concepts.ts` |
| Chooser | `platform/PlatformChooser.astro` | `data/platform-chooser.ts` |
| Twelve-Factor + beyond | `platform/PortabilityPractices.astro` | `data/platform-portability.ts` |
| Reading, close | `src/pages/platform.astro` | `READING` slug list |

No component holds a hard-coded string of content. Wording, ordering, weights
and the responsibility split are all editable in `src/data/platform-*.ts`.

## Tuning the chooser

Everything lives in `src/data/platform-chooser.ts`. Two mechanisms, kept apart on
purpose:

- **`excludes`** — a hard constraint. The rung is ruled out and the reason is
  shown to the reader. Use this only for things that genuinely cannot work.
- **`scores`** — a preference nudge, never decisive on its own.

One deliberate exception: `build: plumbing` carries `saas: 20`. The other six
questions all ask *how* to run something; that one asks *whether* to run it at
all, and when the answer is no the rest are moot. A real blocker still overrides
it, because blockers are exclusions rather than weights — answering "needs a
kernel module" rules SaaS out no matter how large the weight is. Verify that case
still holds after changing weights.

`evaluate()` sorts viable rungs first, then by score; ties keep the declared
ladder order, which biases toward the simpler rung. `close` is true when the top
two are within 2 points, and the UI then says so rather than pretending to be
sure.

## The animated scenes

Each figure is a self-contained component under `platform/scenes/`, drawn in a
`0 0 600 360` viewBox using the shared vocabulary defined in `ConceptPanel.astro`
(`.scene__line`, `.scene__hull`, `.scene__crate`, `.scene__label`, …). Keep the
viewBox consistent — the panel height must not jump when switching tabs.

Two SVG transform rules that have caused real bugs here:

- Never put a CSS `transform` on an element that also carries a `transform`
  **attribute** — CSS replaces the attribute and the element jumps to the origin.
  Position with the attribute on an outer `<g>`, animate with CSS on an inner one.
- A combined `translate` + `rotate` pivots about the viewBox centre by default.
  Use `.scene__pivot` (`transform-box: fill-box`) to rotate about the element's
  own centre, or `.scene__pinned` (`transform-box: view-box; transform-origin: 0 0`)
  to make `translate()` read as absolute viewBox coordinates.

Ambient motion runs always; the story runs only under
`:global(.cp[data-demonstrate='true'])`, driven by the panel's action button.

`src/scripts/explainer.ts` is a generic, selector-driven controller (roving
tabindex, Web Animations playback, IntersectionObserver pausing, reduced motion).
`src/components/compliance/` has a near-identical `cia-explainer.ts` — when both
feature branches have landed, collapse the two onto this one.

## Verifying figure motion

Browser screenshots of animated SVG are unreliable in the preview pane (stale
composites, and nothing repaints at all while the pane is hidden). Verify motion
numerically instead: pause the panel's animations, set `currentTime` to a
percentage of the duration, and read back computed `opacity`/`transform`. That
checks the keyframes rather than a frame that may or may not have painted.

## Not done yet

- Not linked from the header or footer — wiring was deliberately deferred.
- `tokens.css` gains the same `--nautical-*` block the compliance branch adds.
  Both branches append it at end of file, so expect one trivial merge conflict
  there; the resolution is to keep a single copy.
