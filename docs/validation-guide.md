# Educator and school review guide

This is a proposed facilitated review, not a survey that has been run. Start with the founder's wife, then use her feedback to decide whether the prototype is ready for another educator or school leader. Do not present the existing draft descriptions as approved content.

## Prepare

Run `npm run dev` and open the URL it prints. Keep the review supervised. Use an adult reviewer first; any later child session should be arranged by the school with appropriate adult supervision and permission. Do not put identifiable pupil information in repository notes.

Suggested session: 25–35 minutes. Show the 3–6 room and let the reviewer explore before explaining the interface. Ask for concrete observations and examples, not general approval. Record what they do or cannot find separately from what they say.

## 1. Understand the school's problem (5 minutes)

Ask before presenting a feature list:

- What does the school repeatedly struggle to explain to parents about Montessori?
- What was the most recent example? How did staff handle it?
- Which explanations are important during admissions or new-family onboarding?
- What resources does the school already use, and where do they fall short?

Record the current task, audience, frequency, person responsible, and time spent. Do not assume the prototype is the solution.

## 2. Explore without coaching (5 minutes)

Invite the reviewer to find a familiar material and discover what it is for. Observe whether they can select room objects, find the collection, open adult notes, and start/exit an activity.

Ask what feels authentic, what feels misplaced, and what is missing from the room. The Language and Mathematics areas are currently represented lightly; do not imply the five activities cover the full 3–6 environment.

## 3. Review Pink Tower in depth (10 minutes)

Review the information, the 2D activity, and the 3D option. Switch views during construction to demonstrate that work is preserved. Try a non-descending order and an offset cube; observe whether the discrepancy is understandable without guidance.

Ask the educator to assess:

- Name, age/readiness language, area, direct/indirect aims, prerequisites, and follow-on work.
- Cube proportions, customary placement and carrying, mat use, and the complete real presentation.
- Whether optional hints support observation without taking over.
- What the digital study leaves out: weight, grip, balance, carrying, dismantling/restoration, and interaction with a real guide.
- Whether a parent might mistake the simulation for the complete presentation or for a measure of child mastery.
- What a parent most needs to understand after using this material.

Capture exact corrections and the source/reason offered. “Reviewed” should mean that a named educator approved a specific content revision, not merely that someone saw the app.

## 4. Sample the other materials (5 minutes)

Choose two based on the reviewer's interest. Cylinder Blocks models diameter fit; Color Tablets uses three color pairs; Dressing Frame models a four-button sequence; Pouring simplifies liquid movement and spill cleanup.

Ask whether each representation is appropriate to its claimed purpose, whether its control of error is understandable, and whether 3D contributes educational value. Identify any representation that should be changed or withheld before broader sharing.

## 5. Test the school proposition (5–10 minutes)

Ask: “Would you give this to parents? At what point, and to help explain what?”

Have the reviewer rank parent education, admissions, new-family onboarding, staff reference, teacher training, and supervised child use. Ask for the top use case and the least useful one, with reasons.

For leadership, ask who would decide to adopt a resource like this, what would need approval, what budget category could fund it, and what existing resource it might replace. Only after discussing actual value should you explore the pricing hypotheses in `product-strategy.md`. Avoid treating willingness to use free partner access as willingness to buy.

Finish with a concrete next step: a corrected version reviewed again, introduction to another educator, a parent-education demonstration, or a small school-led pilot. Do not solicit vague promises.

## Review record template

```text
Date:
Reviewer role (no pupil details):
Build/revision reviewed:
Device and input method:
Primary school problem, with recent example:
Most useful audience/use case:
Task observed:
Where the reviewer hesitated or needed help:
Material/content correction:
Reason or educator-provided source:
Impact: blocks sharing / important improvement / optional
2D vs 3D: what added value, what distracted:
Could the reviewer show this to another educator? Why/why not?
Would the school distribute it to parents? When and for what purpose?
Commercial evidence, if discussed (separate from free partner access):
Agreed next step:
Owner and follow-up date:
```

## Decide what to do next

Fix inaccuracies and confusing interactions before adding activities. Prioritize the parent questions the school repeatedly encounters. Expand only when the feedback points to a specific need. Keep unsupported claims, unresolved disagreements, and editorial review status visible in working notes. The goal is a trustworthy prototype worth sharing, not a positive score on a questionnaire.
