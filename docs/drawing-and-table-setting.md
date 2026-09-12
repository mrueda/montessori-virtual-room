# Drawing and table preparation

This batch adds Metal Insets and restores Table Setting, bringing the collection to **20 unique accessible prototypes**. Sharing a material between scenes does not add to that count. Nine older drafts remain unavailable. No activity is Montessori-educator-approved yet.

## Metal Insets

References: [Nienhuis material description](https://www.nienhuis.com/us/product/the-metal-insets/500_004600/), [Montessori Services drawing presentations](https://www.montessoriservices.com/ideas-insights/take-another-look-at-the-metal-insets), and [West Side Montessori School's explanation](https://www.wsms.org/montessori-materials-explained-the-metal-insets).

The module offers five figures from the ten-figure set: circle, square, triangle, rectangle, and ellipse. The user brings a pink frame or a matching blue inset onto a sheet, traces the edge with a chosen pencil, and returns the material before drawing freely. Frame and inset strokes fall slightly inside and outside their common edge, so their outlines can be compared. The Art studio links to the same material for drawing exploration; its catalog area remains Language, where the preparation-for-writing presentation belongs.

The digital stencil constrains marks near the edge. Moving through the middle of an inset or frame does not count as tracing. Optional feedback considers how much of the current figure's boundary was visited and whether free drawn points extend beyond it. This observation is not a handwriting assessment. Free work has no required design, and finishing records putting away materials. Mouse, stylus, touch, and a keyboard pencil are supported; drawings can be downloaded as standalone SVGs.

An educator should review the chosen figure proportions, presentation order, wording about indirect preparation, and the distinction between digital edge assistance and the physical experience of grip and pressure. The five omitted figures are not represented as completed work.

## Table Setting

References: [Montessori Services' classroom activity](https://www.montessoriservices.com/table-setting-activity) and [AMS on practical life](https://amshq.org/blog/child-psychology/2023-10-23-practical-life-through-the-ages-part-one-early-childhood/).

The old fixed-answer cards are replaced by individually movable dishes, utensils, and a napkin. A four-object snack setting and five-object meal setting share one module. Both use an optional outline mat, rotation, folding, restoration, and natural correction of misplaced objects. A round plate or glass does not acquire a hidden orientation error. The completed setting is compared with one explicitly identified example arrangement; it is not a universal etiquette rule.

The 2D surface supports dragging, select-and-place, keyboard movement, and ordinary HTML controls. The optional 3D renderer uses the same state and actual plate, vessel, utensil, and cloth representations. Object contact, fabric, and carrying remain simplified. The 3D outline mats are original SVG illustrations generated with `scripts/build-table-outlines.py`.

The material appears in the toddler community and in the Children's House Practical Life and Courtesy scenes. The toddler scene has a separate low table for it. An adult may offer the toddler only one part of the real meal routine; the app does not establish readiness from age alone.

## Shared framework and verification

Both modules provide independent moving examples, narration with visible transcripts, reset, and optional check-work observations through the existing activity interface. `src/content/en/drawing-table.ts` contains the educational drafts, interaction copy, source links, and example captions. Audio uses the existing local Piper voice. The withdrawn invented Line Design remains unavailable and is not relabeled as Metal Insets.

`src/activities/drawing-table.test.ts` checks edge coverage, interrupted traces, free marks, bounded input, placement, dish rotational symmetry, restoration, independent examples, and scene availability. `scripts/browser-drawing-table-check.py` exercises the real UI, export, keyboard drawing, pointer and touch movement, 3D, and responsive layouts. Browser checks validate behavior, not Montessori pedagogy.
