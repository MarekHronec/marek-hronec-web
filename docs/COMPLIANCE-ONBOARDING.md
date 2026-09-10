# Compliance onboarding: C, I, A and U

The /compliance calculator opens with four coordinated nautical illustrations.
They teach the meaning and impact of each classification dimension before users
choose values. Demonstrations never modify calculator answers.

## Structure

- src/components/compliance/CiaExplainer.astro: introduction and accessible tabs.
- src/components/compliance/ExplainerPanel.astro: shared figure, explanation,
  demonstration button, status, assessment question, and scoped drawing styles.
- src/components/compliance/scenes/: one component per concept, plus the shared
  SailingVessel and ChartWater drawing vocabulary.
- src/data/cia-explainer.ts: editable English/Slovak labels and explanatory copy.
- src/scripts/cia-explainer.ts: tab navigation and demonstration/playback behavior.
- src/styles/tokens.css: marine colors and nautical illustration size/duration tokens.

No animation library or image download is used. The SVGs scale with their
containers. 

## Stories and boundaries

- C: a private cargo manifest is readable by its captain. A simulated disclosure
  sends a copy toward an outsider and exposes private crew details.
- I: a depth record is improperly changed from 3 m to 12 m. The ship needs 4 m;
  its keel grounds on the unchanged seabed. Legitimate, verified corrections
  preserve integrity. A high requirement is not a data-quality score.
- A: the ship rounds the lighthouse on a channel route. The beam rotates in a
  horizontally projected plane. The ship follows a closed, smooth motion path
  without masking or zero-width turns.
  Without the light or backup guidance, the ship deviates onto the outer reef.
  This is a simplified dependency illustration, not navigation instruction.
- U: an explicitly illustrative U3 result excludes U1/U2 at the level threshold
  and highlights U3/U4. The copy includes risk/category criteria, matching the
  existing calculator model. It does not imply that CIA alone determines U or
  that meeting U alone authorizes a cloud placement.

General CIA terminology was checked against the
[NIST information security glossary](https://csrc.nist.gov/glossary/term/information_security).
U wording follows the existing src/data/security-calculator.ts model. This UI
change does not alter or independently revalidate that model's legal thresholds.

## Interaction and accessibility

Tabs support Left/Right, Home/End, roving focus, and associated panels.
Readers trigger and reset each scenario explicitly. Failure demonstrations have finite durations and retain their final state.
The healthy availability ship and beam loop continuously at linear speed; UI
transitions retain the site easing. Pause/resume and replay are available.
Motion pauses offscreen and in background tabs. Reduced-motion preferences
resolve the scene immediately to its meaningful final state and hide playback
controls. Changing the preference while the page is open is supported.

Without JavaScript, all four explanations remain visible and inactive controls
stay hidden. SVG titles describe the stories, while adjacent HTML gives the full
explanation and outcome without depending on motion or small diagram labels.

## Verification

- Astro check: no errors, warnings, or hints.
- Production build and Pagefind indexing.
- Browser inspection of all four before/after states.
- Desktop 1440 px and responsive checks at 375 px and 768 px.
- Keyboard tab navigation, pause/resume, replay, reduced motion, and no-JS fallback.
- Calculator inputs remain independent of illustration controls.

## Playback regression checks

Replay and scenario restoration explicitly rewind every CSS animation through
the Web Animations API. The same controller owns pause/resume so CSS and script
play states cannot conflict. Continuous travel deliberately uses linear timing.
Reduced motion limits loops to a single near-instant iteration; without script,
the illustrations remain paused.

Browser checks now inspect actual animation currentTime before and after replay
in every panel, pause stability, beam restart after several laps and an off/on
cycle, and ship bounds throughout a complete orbit. Checking button labels or
CSS declarations alone is insufficient to verify playback.

## Question hierarchy and notice

CalculatorNotice is the subdued information notice below the unchanged hero
choices. Its four original source references remain in an expandable list.
CalculatorGuide introduces three stages and tracks the current stage using
aria-current. The first stage contains three separately labeled properties,
C, I and A; stages two and three cover incident impact and hosting criteria.

Question sections use a warm surface, answer cards use a white surface, and
selected choices use a marine tint, an inset marker, and an explicit Selected
label. Unavailable choices retain readable explanations. Official definitions
remain available on demand. Selection summaries name the current answer.

Integrity now makes one uninterrupted linear approach rather than easing and
holding at intermediate points. Availability uses SVG painter order: the ship
is drawn before the island and lighthouse, so the far side is naturally occluded;
the near-side route clears the tower's silhouette. No collapsing scale or
artificial visibility animation is involved.

Browser verification covers source expansion, definition toggles without
selecting answers, all three stage transitions, unchanged C1/I1/A1 + incident-0
baseline result U2, steady integrity travel, tower layering, and 375/768 px layouts.
