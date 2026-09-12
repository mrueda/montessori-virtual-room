import { elementarySources } from "./en/elementary";
import type { MaterialId } from "../domain/material";

/** Source verification and simulation fidelity are separate from educator approval. */
export interface AuthenticityRecord {
  status: "simplified-prototype" | "rebuild" | "unverified";
  reason: string;
  sources: string[];
}
const practical =
  "https://amshq.org/blog/child-psychology/2023-10-23-practical-life-through-the-ages-part-one-early-childhood/";
const catalog = "https://publications-hg.cld.bz/Price-list-2025-USA-Nienhuis/1";
const maps =
  "https://usa.montessorimaterials.com/articles/world-puzzle-map-presentation";
const courtesy =
  "https://amshq.org/blog/montessori-education/grace-courtesy-the-montessori-blueprint-for-respect-early-childhood/";
const prototype = (reason: string, sources: string[]): AuthenticityRecord => ({
  status: "simplified-prototype",
  reason,
  sources,
});
const rebuild = (
  reason: string,
  sources: string[] = [],
): AuthenticityRecord => ({ status: "rebuild", reason, sources });
const unverified = (reason: string): AuthenticityRecord => ({
  status: "unverified",
  reason,
  sources: [],
});
export const authenticity: Record<MaterialId, AuthenticityRecord> = {
  "cards-counters": prototype(
    "Numerals and 55 individually placed counters; guided digital positions simplify the physical mat. Review the presentation and readiness with an educator.",
    [elementarySources.counters],
  ),
  "stamp-game": prototype(
    "Static and dynamic addition with quantity-preserving exchanges. Three practice problems; no physical carrying or complete presentation sequence.",
    [elementarySources.stamps],
  ),
  "fraction-insets": prototype(
    "Equal-radius sectors through tenths support three equivalence comparisons. Consecutive alignment is assisted; physical handling and the complete sequence are absent.",
    [elementarySources.fractions, elementarySources.equivalence],
  ),
  "constructive-triangles": prototype(
    "Three specified rectangular-box pairs with marked joining edges, translation, and rotation. This is a foundational subset, not the complete box or an advanced equivalency presentation.",
    [elementarySources.triangles, elementarySources.geometry],
  ),
  "pink-tower": prototype(
    "Graduated cube construction is represented. Digital balance and handling remain simplified; presentation needs educator review.",
    ["https://www.nienhuis.com/us/product/the-pink-tower/500_002400/"],
  ),
  "cylinder-blocks": prototype(
    "Removal and socket fitting are represented. Audit exact dimensions against one specified physical block.",
    [catalog],
  ),
  "red-rods": prototype(
    "Ordering by length is represented. Carrying and scale are simplified.",
    [catalog],
  ),
  "broad-stair": prototype(
    "Ordering by thickness is represented. Physical weight and carrying are absent.",
    [catalog],
  ),
  "number-rods": prototype(
    "Only the ordering preparation is simulated. Quantity naming and counting presentation remain incomplete.",
    [catalog],
  ),
  "color-tablets": prototype(
    "Pairing three primary colors corresponds to first-box matching. Screen color varies.",
    [catalog],
  ),
  pouring: prototype(
    "Controlled pouring and restoration are represented with simplified flow.",
    [practical],
  ),
  "dressing-frame": prototype(
    "Opening and closing buttons is represented. Tactile hand movements are simplified.",
    [catalog],
  ),
  transferring: prototype(
    "Hand transferring is a Practical Life movement. Exact objects and toddler presentation need review.",
    [practical],
  ),
  "shape-puzzle": prototype(
    "Inset removal and fitting are represented. Exact board and developmental selection need review.",
    [catalog],
  ),
  "sandpaper-letters": rebuild(
    "Arbitrary pointer travel and a completion button do not establish letter tracing. Rebuild around modeled strokes, appropriate forms, and reviewed sounds.",
    [catalog],
  ),
  "world-puzzle-map": prototype(
    "Natural Earth continent outlines in two hemispheres, with knobs and lift/replace work. Includes Antarctica. Edge fragments move as one continent group; not an exact physical-board replica. Educator review is pending.",
    [maps],
  ),
  "continent-globe": rebuild(
    "Colored rectangles and decorative circles do not represent a continent globe. Restore actual geography and globe exploration.",
    [maps],
  ),
  "land-water-forms": rebuild(
    "Text matching omits contrasting physical land/water contours. Model the actual paired forms.",
    [maps],
  ),
  "botany-cabinet": rebuild(
    "Rectangular cards omit leaf-shaped insets, frames, and edge tracing.",
    [catalog],
  ),
  "animal-classification": unverified(
    "Verify a specific classified-card presentation and scientific group scheme. Colored rectangles do not support observation of animals.",
  ),
  "life-cycle-sequencing": unverified(
    "A generic butterfly ordering exercise is not sufficient evidence of a Montessori presentation. Verify a source and use observable stage imagery.",
  ),
  "color-mixing": unverified(
    "Predicting a color using answer cards does not simulate mixing paint. Verify the intended Montessori art presentation.",
  ),
  "line-design": unverified(
    "The fixed five-line answer sequence was invented. Withdraw it; do not relabel it as Metal Insets.",
  ),
  "greeting-practice": rebuild(
    "Greeting is an established Grace and Courtesy practice; fixed-answer card sorting is not the social practice.",
    [courtesy],
  ),
  "table-setting": rebuild(
    "Table setting is established Practical Life work. Replace labeled cards with manipulable utensils and a real arrangement.",
    [practical],
  ),
  "walking-around-mat": rebuild(
    "Replace fixed-answer text sequencing with modeled and practiced movement respecting another person's work space.",
    [courtesy],
  ),
};
export const isAvailableMaterial = (id: MaterialId) =>
  authenticity[id].status === "simplified-prototype";
