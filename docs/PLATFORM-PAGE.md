# /platform — Platform Architecture

Five ways to run an application, from a bare VM to a SaaS subscription: what
each one hands over, what it takes away, and what it would cost to leave.

## Vocabulary

Nothing here uses the word "rung", in copy or in code, and the ladder metaphor
it belonged to went with it. It was obscure — especially for a reader whose
first language is not English.

Reader-facing copy says **option**, **level**, or names the thing directly.
Code calls the concept an **approach**: `Approach`, `ApproachKey`, `APPROACHES`,
`ApproachDetail.astro`, `platform-approaches.ts`. The responsibility component is
`ResponsibilityTable.astro`. "Tier" is out of the copy for the same reason.

If you add either, keep to plain words.

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
| Responsibility register | `platform/ResponsibilityTable.astro` | `data/platform-approaches.ts` |
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

`evaluate()` sorts viable options first, then by score. Array order breaks exact
ties, but that order is the page's narrative order (most you run → least), which
is no kind of recommendation — so **a tie at the top is reported as a tie**.
`tiedTop` counts how many share the lead, `undecided` is true when that is more
than one, and the panel then hides the winner's detail block and says which
options are level. Without this the tool crowned "Virtual machine" — the most
operationally expensive option — off a four-way 0–0–0–0 tie, with 200 words
justifying it. `close` is the separate, milder case: one clear leader, but by
two points or fewer.

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
- **DORA splits across two articles.** Article 30 requires exit strategies in
  contracts covering critical or important functions; the requirement that exit
  plans be documented and periodically *tested* is Article 28(8). An earlier
  draft attributed the testing to Article 30, and the two files disagreed with
  each other.
- A licence counted **per physical socket or core** (Oracle DB, IBM PVU) is not
  satisfied by an ordinary shared VM — it needs a dedicated host or bare metal.
  The licence option says so in a note rather than pointing at a plain VM.
- SaaS examples are labelled by **vendor, not cloud**: Microsoft 365 is not an
  Azure service and NetSuite is not an OCI one. This also stops "OCI" meaning
  the Open Container Initiative in one paragraph and Oracle Cloud
  Infrastructure in the next line.
- "Most SaaS incidents are misconfiguration" was softened to "a large share of
  SaaS breaches" — the strong version is a measured claim nobody has measured.

## Known gaps

- **The chooser never asks how long the workload will live**, yet the closing
  portability argument turns on exactly that ("do not pay it on a workload that
  will be retired before the contract ends"). Adding an eighth question is the
  most substantive improvement available; it needs weights designed, not guessed.
- **The chooser cannot say "replace the software."** All three blockers in
  question 02 rule SaaS out with reasons that point back to question 01, but if
  the answer there was "every company has one," the honest verdict for a
  commodity capability whose current implementation needs a kernel module is
  often to swap the product. The prompt is scoped ("the software you intend to
  keep") rather than the tool being taught to say it.
- **The chooser does not work without JavaScript** — a `<noscript>` says so.
  The five options' trade-offs live only in the verdict panel, so a no-JS reader
  cannot reach them. Fixing it properly means shipping the panel expanded and
  letting the script collapse it, at the cost of a load-time flash.

## Not done yet

- Not linked from the header or footer — wiring was deliberately deferred.
- `tokens.css` gains the same `--nautical-*` block the compliance branch adds.
  Both branches append it at end of file, so expect one trivial merge conflict
  there; the resolution is to keep a single copy.
