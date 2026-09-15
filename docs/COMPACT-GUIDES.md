# Compact architecture guides

The five standalone guides start with three compact previews: apply them to a workload,
learn the concepts, and read the supporting material. Learning has a small
marine illustration; calculator and reading previews have distinct treatments.
Full explanations, questions and sources remain available inside each section.

The shared order is classification → platform → connectivity → resilience → cost.
Connectivity comes before resilience so recovery includes the paths, DNS and
other dependencies it must recover. This is a suggested reading path; engineering
still requires iteration. The menu, onward offers and combined voyage agree.

## Components and behavior

- `GuideHero`: title and one coherent introduction, matching the other page heroes.
  No eyebrow labels or duplicate entry cards.
- `GuideChapter`: native details/summary with a designed preview when closed and
  a compact heading when open. Closing preserves answers.
- `GuidePreview`: static decorative marine SVGs. Full animations keep their
  existing scene components and playback controller.
- `guide-chapters.ts`: reveals ancestor sections for fragment links, handles
  clicking the same fragment again, and restores focus on close. Native controls
  and static learning content work without JavaScript.
- `/guides`: existing calculators remain outside the new chapter wrappers.
  Recording results, invalidation, resets and downloads keep their existing flow.
- Header: active/inactive font weights and SVG arrow dimensions remain constant,
  preventing navigation items from shifting when a page is selected.

## Live decision explanations

Platform eligibility is distinct from score preference. Muted approaches have
been excluded by a stated constraint; other approaches remain possible. Selected
answers explain positive and negative preferences. The sidebar shows the leading
factors, with optional approach details, trade-offs and the complete ranking.
Remaining questions stay available because they still affect the recommendation
or its operating requirements.

A machine-bound licence does not imply VM-only hosting. Containers and Kubernetes
remain candidates; a vendor-approved portable/floating licence is a separate
answer. Check the exact identifier, runtime support, virtualisation rights,
replacement and failover rules with the publisher. Physical-hardware binding may
require a dedicated host or bare metal, outside this five-approach comparison.
Examples verified against the licensing supplier's primary documentation:

- [Revenera: container ID licensing](https://docs.revenera.com/fnp/2024r1/LicAdmin_Guide/Content/helplibrary/Container_ID.htm)
- [Revenera: virtual-environment binding](https://docs.revenera.com/fnp/2024r1/LicAdmin_Guide/Content/helplibrary/Binding_Solutions_in_a_Virtual_Environment.htm)

Cost, connectivity and recovery models expose partial priorities without marking
the brief complete. Unanswered fields do not choose default answers.
`planner-feedback.ts` compares the full selection with the selection excluding
one answer, so feedback includes interactions such as regional recovery conflicting
with a single-region restriction. Sidebar, inline feedback and export share the
same models. Compliance retains its incompatible-level explanations and limits.

## Verification

Two independent reviews covered navigation/disclosures and calculator causality.
Contrast, negative-preference, interacting-answer and empty-detail findings were
corrected. The independent comparison confirmed identical completed outputs for
all 774 cost/connectivity/recovery combinations. New tests cover 972 machine-bound
licence combinations (VM, container and Kubernetes can lead), portable licensing,
partial plans, recovery interactions and reset behavior.

Browser checks covered stable navigation geometry and guide order; all five
compact pages; fragment links and reopening; keyboard/focus; four viewport widths;
retained answers; motion/replay; no-JavaScript learning; and the combined calculator
including both classification scopes and exported limitations. Production build
and Astro type checking passed. Integration is local, with no push or deployment.

## Visual hierarchy

Planner comes first as a navy summary with a light action, then the learning
preview and field notes. Compliance keeps its unofficial-source notice above all
three. Use Data Classification, Platform Planner, Connectivity Planner, Resilience
Planner and Cost Planner as the primary titles. No eyebrow labels above guide or
preview titles. All summary actions share a width. Quiet chart, vessel and logbook
illustrations replace decorative check marks and stacked slogans. Only the hub
link receives emphasis in the navigation dropdown; sibling links stay regular.

The hub uses one coherent introductory paragraph. Its connected planner heading
only appears once the workspace opens; start still moves keyboard focus to that
heading. The home CTA retains the existing lighthouse paths with a smaller,
muted rendering and thinner outlines applied only inside that banner. Two
independent reviews caught title alignment and an overpromise of priced output;
both were corrected. Browser checks confirmed all six title positions/sizes,
planner-first order, equal actions, four widths, and the combined journey.
