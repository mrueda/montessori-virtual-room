# Activity expansion: language, geography, and multiplication

This batch brings the collection to **18 unique accessible prototypes**: two new activities and one reconstructed activity. Ten earlier drafts remain withdrawn. Shared room placements count once. All presentations remain editorial drafts awaiting Montessori educator review.

## Movable Alphabet

- **Room:** Children's House, Language.
- **References:** [AMS discussion of movable letters and composition](https://amshq.org/blog/at-home-family/2023-12-13-montessori-technology-and-the-purpose-of-education/), [Nienhuis compartmented letter box](https://www.nienhuis.com/us/product/small-movable-alphabet-box/500_0060C2/).
- **Digital work:** choose individual English print letters, compose on a three-line mat, rearrange them, and return each to its compartment. Stock is finite. Sun, cat, and map are optional original picture invitations. Free composition has no prescribed answer.
- **Feedback:** optional comparison can recognize a picture's conventional spelling; it is explicitly not an assessment of phonetic writing. Completion means putting away the used letters, not spelling mastery. The host supports a module-specific completion heading.
- **Review needed:** letter forms and color convention, sound-analysis presentation, vocabulary, readiness, and adult wording. Spoken phonemes remain adult-led. The generated narration introduces the material; it does not pronounce isolated letter sounds.

## Land and Water Forms

- **Room:** Children's House, Culture.
- **Reference:** [Nienhuis Set 1](https://www.nienhuis.com/us/product/land-and-water-form-trays-set-1/500_022700/), identifying island/lake, peninsula/gulf, and isthmus/strait.
- **Digital work:** three pairs use complementary outlines, with actual recesses and raised land in 3D. SVG and extruded geometry share the same contours. Select a tray, tilt a pitcher, observe the water, stop, return the vessel, and wipe spills. Emptying a tray permits repetition.
- **Adaptation:** original simplified contours; assisted pitcher position and simplified water levels. Naming is adult-led. Filling the trays and restoring the pitcher does not establish vocabulary mastery. No generic matching-card logic remains in the launch path.
- **Review needed:** the precise physical presentation, naming sequence, practical-life prerequisites, and the difference between observing forms and learning their names.

## Checkerboard Multiplication

- **Rooms:** Lower and Upper Elementary. Placement denotes availability for continued work, not an age-specific introduction requirement.
- **Reference:** [Alison's Montessori presentation overview](https://alisonsmontessori.blog/checker-board-with-activity-cards/).
- **Digital work:** a nine-column, four-row board; multiplicand tiles below and multiplier tiles to the right. Place repeated colored bead bars in selected squares, gather equal place values along diagonals, exchange groups of ten, and record a product. Three problems include exchanges. Incorrect quantities remain editable; a correct typed answer alone cannot complete the activity.
- **Adaptation:** number tiles are prearranged and diagonal gathering is assisted. Exchanges regroup beads automatically after an explicit user action. Users can return to the original partial products. Small place-value labels and selected-cell quantities are digital aids.
- **Review needed:** bead-color convention, grouping and exchange presentation, movement order, prerequisite bead-frame work, and suitability for each learner.

## Implementation and review

Each module has its own typed reducer, view, check-work observation, and separate moving example. Source links, educational notes, captions, and introductions live in editable content files. Optional 3D is provided for tray volumes; the alphabet and checkerboard use focused 2D work surfaces. Examples preserve learner state and retain the chosen 2D/3D renderer.

The three introductions use the existing local Piper `en_US-ljspeech-high` voice, with static MP3s and visible transcripts. The new source code and illustrations are original; linked source pages and their artwork are not copied into the application.

`src/activities/expansion.test.ts` covers letter stock and restoration, complementary geometry, water conservation, overflow, multiplication conservation, exchanges, and room placement. `scripts/browser-expansion-check.py` exercises the public UI, correction, completion, example isolation, 3D geometry, touch controls, and tablet/phone layouts. These checks establish software behavior, not educator approval.
