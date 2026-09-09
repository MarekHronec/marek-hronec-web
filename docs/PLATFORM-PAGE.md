# /platform — Platform Architecture

Five ways to run an application, from a bare VM to a SaaS subscription: what
each one hands over, what it takes away, and what it would cost to leave.

## Vocabulary

Reader-facing copy says **option**, **level** or names the thing directly. It
never says "rung" — the ladder metaphor was obscure, especially for readers
whose first language is not English. The word survives only in code
identifiers (`RungKey`, `RUNGS`, `RungDetail.astro`, the branch name), which no
reader sees; renaming those is churn without benefit. If you add copy, keep to
plain words — the same rule retired "tier" from the responsibility footnote.

## Thesis

Portability is a bill you either price up front or get handed later. The page is
deliberately **not** an argument for containers. Every option carries a "wrong
call when", and the closing section argues that the portability tax is real and
sometimes should not be paid. If an edit makes the page read like advocacy for
one option, it is off-thesis.

Voice matches the Knowledge Base titles it links to (*Without the Marketing
Layer*, *The Honest Catch*): concrete, trade-off first, no buzzwords.

## Structure

In page order:

| Section | Component | Content source |
|---|---|---|
| Hero + choice cards | `src/pages/platform.astro` | inline |
| Five animated concepts | `platform/ConceptExplainer.astro` | `data/platform-concepts.ts` |
| Responsibility register | `platform/ResponsibilityLadder.astro` | `data/platform-ladder.ts` |
| Chooser | `platform/PlatformChooser.astro` + `ChooserQuestion.astro` | `data/platform-chooser.ts` |
| Twelve-Factor + beyond | `platform/PortabilityPractices.astro` | `data/platform-portability.ts` |
| Reading, close | `src/pages/platform.astro` | `READING` slug list |

The concepts come **before** the register on purpose: the register's columns are
the five options, so they have to be introduced first.

`name` is the plain name and `model` the industry category — `Kubernetes` /
`Orchestration`, not the reverse. Both files must agree; they disagreed once and
the tabs and the register showed different labels for the same thing. `Container`
carries the model `Packaging`, which is why the chooser's verdict kicker reads
just "Best fit" — "Best fit · Packaging" would assert a category that is not one.

No component holds a hard-coded string of content. Wording, ordering, weights
and the responsibility split are all editable in `src/data/platform-*.ts`.

## Tuning the chooser

Everything lives in `src/data/platform-chooser.ts`. Three mechanisms, kept apart
on purpose:

- **`excludes`** — a hard constraint. The option is ruled out and the reason is
  shown to the reader. Use this only for things that genuinely cannot work.
- **`scores`** — a preference nudge, never decisive on its own.
- **`note`** — a caveat about the answer itself, surfaced beside the verdict.
  Currently used once, on `build: plumbing`, to say that the remaining questions
  only matter if you decide to run it anyway.

Question order is purpose → constraints → storage → scale → operations → load →
exit. "Should you run this at all" is first because a yes to buying makes the
other six moot, and it is cheaper to discover that on question one than on
question seven. Exit is last so it hands off to the portability section below it.

Styling matches the ISVS calculator on `/compliance` — tonal tray per question,
navy numbered badge, category line, "choose one" guide with the answer echoed
back, and white option cards that take a primary left bar when selected. Keep
them in step; they read as one tool across two pages.

One deliberate exception: `build: plumbing` carries `saas: 20`. The other six
questions all ask *how* to run something; that one asks *whether* to run it at
all, and when the answer is no the rest are moot. A real blocker still overrides
it, because blockers are exclusions rather than weights — answering "needs a
kernel module" rules SaaS out no matter how large the weight is. Verify that case
still holds after changing weights.

`evaluate()` sorts viable options first, then by score; ties keep the declared
order, which biases toward the simpler choice. `close` is true when the top
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

## Claims that were checked

Several statements were tightened because the first draft overstated them. If
you edit these, keep them defensible:

- PaaS is excluded for local-disk state because persistent storage there is
  **network-attached**, not because it does not exist — App Service and
  Container Apps both offer it.
- Kubernetes needs a version upgrade **at least once a year** (roughly three
  minor releases a year upstream, 12–15 month managed support windows). An
  earlier draft said "every few months".
- DORA Article 30 requires exit strategies in contracts covering **critical or
  important functions**, not in every contract.
- Factors XIII–XV are Hoffman's additions, but the numbering is ours — he
  reorders the original twelve. The group lede says so.

## Not done yet

- Not linked from the header or footer — wiring was deliberately deferred.
- `tokens.css` gains the same `--nautical-*` block the compliance branch adds.
  Both branches append it at end of file, so expect one trivial merge conflict
  there; the resolution is to keep a single copy.
