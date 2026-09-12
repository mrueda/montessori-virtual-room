# Product direction: a Montessori classroom, explained to parents

> Historical future planning: the first release is a free public Montessori resource with no login, access codes, or tiers. The school prototype is not part of the active app. See [the current activity roadmap](activity-roadmap.md) for the current scope.

## Decision

Prioritize validation of school-provided parent education. The virtual classroom is the common interface for parents, educators, and supervised children; the commercial product need not be primarily child-facing. The founder's wife's school can use the software free as an early partner. This is a partner commitment, not a decision that all school access must be free or paid.

Keep the public prototype useful: focused 3–6 and 18-month–3-year environments, a growing collection of complete simplified activities, and adult explanations. Preserve a calm experience with no advertisements, scores, artificial rewards, or interruptions. The 2D/3D activity option serves exploration and explanation, while the adult layer explains purpose and the real-world presentation.

## First audience and use cases to validate

Lead with **“Your Montessori classroom, explained to parents.”** Ask the school to rank the use cases using recent examples rather than hypothetical enthusiasm:

1. Parent education: recurring questions about materials, repetition, independence, and the guide's role.
2. New-family onboarding: shared context before and after a child joins.
3. Admissions: an introduction to the classroom before an in-person visit.
4. Staff reference and teacher education: reviewed presentations and material relationships.
5. Supervised child activities: virtual exploration complementary to physical work.

Do not assume the ranking in advance. Teacher training is a future mode with actual presentation sequences, including preparation and restoration of the environment. The current manipulations are not complete teacher-training presentations or a credentialed training product.

## Boundaries for this iteration

Polish and evaluate Pink Tower, Cylinder Blocks, Pouring, Dressing Frame, and Color Tablets. Improve content, discoverability, parent explanations, and interaction quality before expanding the material library. The reference implementation remains Pink Tower.

Do not implement payments, subscription enforcement, organization dashboards, child accounts, automated analytics, broad customization, or an AI guide now. The prototype has in-memory lifecycle events for architectural purposes; it does not send usage telemetry. Do not contact educators or school leadership automatically. The founder decides how and when to share the prototype.

## Pricing hypotheses supplied by the founder

These are ideas for interviews, not offers, validated market prices, or implementation requirements.

| Audience                     | Hypothesis                       | Value to test                                                                 |
| ---------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| Families                     | €59–79/year                      | Material library, age ranges, parent explanations, favorites/history          |
| Individual educators         | €99–149/year                     | Reviewed presentations, aims, control of error, prerequisites and sequences   |
| Schools                      | €499–1,500/year                  | Family access, onboarding/admissions use, educator content, eventual branding |
| Customized school experience | €2,000+ setup plus annual access | School introduction, branding, admissions links, adapted room/content         |
| Training organizations       | €2,000–10,000+/year              | More mature presentations and institutional/seat access                       |

At a hypothetical €750 annual school license, 100, 500, and 1,000 schools would produce €75,000, €375,000, and €750,000 in annual recurring revenue before costs. These are arithmetic scenarios, not forecasts. The next evidence needed is willingness to distribute and willingness to pay, not a larger revenue model.

Potential later channels include family/educator subscriptions and clearly disclosed physical-material affiliate links in adult information. Keep commercial links outside child activities. An AI guide would require structured reviewed content, traceable sources, explicit limits, and educator evaluation; it should not invent developmental guidance.

## Architectural seams to preserve

The current code intentionally implements only the material registry, local educational content, shared activity lifecycle, independent views/rules, one room, and session-only progress events.

| Future concept  | Boundary to retain                                                                         | Implementation trigger                                                  |
| --------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Users and roles | Separate child activity UI from parent/educator content; later map identity to permissions | A school pilot needs distinct access                                    |
| Organizations   | Keep school branding and room configuration separate from material logic                   | Multiple schools need different introductions or resources              |
| Entitlements    | Keep availability policy outside activity reducers and pedagogy                            | A validated paid offering requires access control                       |
| Progress        | Stable activity IDs, versions, and lifecycle events; storage as an adapter                 | Families/educators ask for history and consent/preferences are designed |
| Localization    | Stable material IDs, locale-specific editorial content and future UI catalog               | A second language is selected for a pilot                               |
| Analytics       | Lifecycle events as a seam, no current collection                                          | A concrete pilot question requires data and appropriate governance      |
| Review workflow | Draft/review status and source metadata independent of UI                                  | Educator review starts; record reviewer and content revision            |
| School branding | Future organization configuration, no duplicated app forks                                 | A school validates the parent-distribution use case                     |

Do not equate the view choice (2D/3D), audience choice (child/parent/educator), and access policy (free/paid). They are separate concerns. Access rules must never change an activity's physical or educational rules. Local eligibility flags would not provide secure paid access; if entitlements become real, enforce them at a server boundary.

## Evidence before expansion

First: an educator is comfortable showing the prototype to another professional, with remaining inaccuracies written down.

Stronger: a director asks to make it available to families and can identify where it fits in their existing process.

Commercial validation: a decision-maker agrees on a useful offering, identifies a budget and buying process, and takes a concrete next step. The early partner's free access should be distinguished from paid-market evidence.

Use [the educator and school review guide](validation-guide.md) before adding more materials or commercial infrastructure.

## School access decision

Each licensed school should receive a dedicated URL and one shared family access code. A QR may encode the school URL. Device-remembered access is school-scoped, with unlimited family access under the school license. Individual accounts are reserved for optional personalized features. Staff/admin identity and permissions remain separate from family access. See [the service boundary and static demo limitations](school-access.md).

A public business mockup is now available under **For schools**. It demonstrates a parent portal, searchable educator library, editable session-only school branding, and an explicitly illustrative dashboard. This is a presentation aid, not live billing, analytics, or school administration.
