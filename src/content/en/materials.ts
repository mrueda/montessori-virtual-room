import { drawingTableContent } from "./drawing-table";
import { expansionContent } from "./expansion";
import { elementaryContent } from "./elementary";
import type { MaterialContent, MaterialId } from "../../domain/material";
import { studyMaterialContent } from "./studies";
import narration from "./narration.json";
// Editorial drafts: review with a qualified Montessori educator before publishing as guidance.
const coreContent: Partial<Record<MaterialId, MaterialContent>> = {
  "pink-tower": {
    narration: narration["pink-tower"],
    name: "Pink Tower",
    ageLabel: "2½–6 years",
    description:
      "Ten pink cubes. A quiet invitation to discover dimension, balance, and order.",
    purpose:
      "Explore how objects differ in three dimensions by building with graduated cubes.",
    directAim: "Visual discrimination of dimension.",
    indirectAims: [
      "Coordination of movement",
      "Concentration and order",
      "Preparation for mathematics",
    ],
    skills: ["Visual discrimination", "Coordination", "Concentration"],
    presentation: [
      "Unroll a work mat and carry the cubes individually, using both hands where needed.",
      "Arrange the cubes on the mat. Find the largest and place it in front of you.",
      "Choose the next largest cube and center it on the first. Continue to the smallest.",
      "Look at the tower from different sides. Dismantle it one cube at a time and return the material.",
    ],
    controlOfError:
      "The changing dimensions and visible edges invite the child to notice irregularities. This digital study leaves out weight and physical balance.",
    prerequisites:
      "Experience carrying materials carefully and working on a mat.",
    related: ["cylinder-blocks", "color-tablets"],
    next: "Further dimension work with the Broad Stair and Red Rods.",
    adultNote:
      "Offer a slow presentation with few words, then allow uninterrupted repetition. Observe before stepping in. Real cubes provide weight, texture, and movement that a screen cannot reproduce.",
    reviewStatus: "draft",
    sources: [],
  },
  "cylinder-blocks": {
    narration: narration["cylinder-blocks"],
    name: "Cylinder Blocks",
    ageLabel: "3–6 years",
    description: "Lift, compare, and find a place for each wooden cylinder.",
    purpose:
      "Explore differences in dimension through a material with a visible fit.",
    directAim: "Visual discrimination of dimension.",
    indirectAims: ["Refinement of hand movement", "Concentration"],
    skills: ["Discrimination", "Coordination", "Order"],
    presentation: [
      "Carry one block to a table.",
      "Lift each cylinder by its knob and place it nearby.",
      "Compare cylinders and return each to its corresponding socket.",
    ],
    controlOfError:
      "A cylinder may not fit a socket, or an unmatched cylinder may remain.",
    prerequisites: "Careful handling of a tray or block.",
    related: ["pink-tower"],
    next: "Explore other cylinder blocks.",
    adultNote:
      "Allow time for comparison and experimentation. Avoid pointing out each mismatch; the fit provides information.",
    reviewStatus: "draft",
    sources: [],
  },
  pouring: {
    narration: narration.pouring,
    name: "Pouring Exercise",
    ageLabel: "2–6 years",
    description:
      "A small pitcher, a steady hand, and a purposeful everyday movement.",
    purpose: "Practice an everyday act of independence.",
    directAim: "Controlled pouring from one vessel into another.",
    indirectAims: ["Independence", "Coordination", "Care of the environment"],
    skills: ["Coordination", "Independence", "Concentration"],
    presentation: [
      "Bring the tray to a table.",
      "Hold the pitcher securely and position its spout over the receiving vessel.",
      "Tilt slowly, then return the pitcher upright. Wipe any spills and restore the tray.",
    ],
    controlOfError:
      "Spilled water and the level of the receiving vessel are visible.",
    prerequisites: "Carrying a tray and experience with dry transferring.",
    related: ["dressing-frame"],
    next: "Pouring to a marked level or serving water.",
    adultNote:
      "At home, use small, manageable vessels and a modest amount of water. Make a cloth available so cleanup belongs to the activity.",
    reviewStatus: "draft",
    sources: [],
  },
  "dressing-frame": {
    narration: narration["dressing-frame"],
    name: "Dressing Frame",
    ageLabel: "3–6 years",
    description:
      "Explore the small movements that make getting dressed your own.",
    purpose: "Isolate a fastening skill before applying it to clothing.",
    directAim: "Opening and closing buttons.",
    indirectAims: ["Independence in dressing", "Coordination of both hands"],
    skills: ["Fine motor control", "Sequencing", "Independence"],
    presentation: [
      "Set the frame on a table.",
      "Slowly demonstrate pushing a button through its hole, then open the fabric.",
      "Bring the fabric together and close the buttons one at a time.",
    ],
    controlOfError:
      "The fabric does not lie together evenly when the buttons are misaligned.",
    prerequisites:
      "Interest in dressing and readiness for small hand movements.",
    related: ["pouring"],
    next: "Other fastenings and practice on clothing.",
    adultNote:
      "A screen can show sequence but cannot teach the tactile resistance of a real button. Offer opportunities with real fabric.",
    reviewStatus: "draft",
    sources: [],
  },
  "color-tablets": {
    narration: narration["color-tablets"],
    name: "Color Tablets",
    ageLabel: "3–6 years",
    description: "Look closely. Discover colors that belong together.",
    purpose:
      "Compare and pair colors using tablets of otherwise equal appearance.",
    directAim: "Visual discrimination of color.",
    indirectAims: ["Order", "Concentration", "Color vocabulary"],
    skills: ["Matching", "Observation", "Concentration"],
    presentation: [
      "Bring a small set of paired tablets to a mat.",
      "Hold the tablets by their edges and spread them out.",
      "Select a tablet, find its matching color, and place the pair together.",
    ],
    controlOfError:
      "Compare pairs side by side; an unmatched tablet invites another look.",
    prerequisites: "Experience handling small materials carefully.",
    related: ["pink-tower"],
    next: "More color pairs, then grading shades when ready.",
    adultNote:
      "Start with a small set. Screens and lighting affect color appearance; adapt for differences in color vision.",
    reviewStatus: "draft",
    sources: [],
  },
  "red-rods": {
    narration: narration["red-rods"],
    name: "Red Rods",
    ageLabel: "2½–6 years",
    description:
      "Ten red rods. Compare their lengths and create a visible progression.",
    purpose:
      "Explore variation in one dimension by arranging rods of equal thickness and graduated length.",
    directAim: "Visual and muscular discrimination of length.",
    indirectAims: [
      "Coordination of movement",
      "Concentration and order",
      "Preparation for mathematical relationships",
    ],
    skills: ["Length comparison", "Coordination", "Sequencing"],
    presentation: [
      "Prepare a floor mat and carry the rods individually, holding longer rods with two hands.",
      "Place the rods in mixed order, then choose the longest and align one end with the edge of the mat.",
      "Compare the remaining rods and place each next shorter rod below the previous one.",
      "Observe the progression, then return the rods individually to their place.",
    ],
    controlOfError:
      "Aligned ends make an irregular change in length visible when rods are out of sequence.",
    prerequisites:
      "Experience carrying long materials carefully and working on a floor mat.",
    related: ["pink-tower", "broad-stair"],
    next: "Further work with dimension and, when ready, Number Rods.",
    adultNote:
      "The real material involves whole-body movement and careful carrying. This virtual study focuses on visual ordering and cannot reproduce the rods’ physical scale.",
    reviewStatus: "draft",
    sources: [],
  },
  "broad-stair": {
    narration: narration["broad-stair"],
    name: "Broad Stair",
    ageLabel: "2½–6 years",
    description:
      "Ten brown prisms. Notice how thickness changes while length stays the same.",
    purpose:
      "Explore variation in two dimensions through prisms with a constant length and graduated square cross-section.",
    directAim: "Visual discrimination of thickness.",
    indirectAims: [
      "Coordination of movement",
      "Concentration and order",
      "Preparation for geometry and mathematics",
    ],
    skills: ["Thickness comparison", "Coordination", "Sequencing"],
    presentation: [
      "Prepare a floor mat and carry each prism carefully to the work area.",
      "Place the prisms in mixed order. Select the thickest and position it horizontally.",
      "Compare the square ends and place each next thinner prism beside the previous one.",
      "Observe the completed stair from the side, then return each prism.",
    ],
    controlOfError:
      "The stepped profile becomes irregular when neighboring prisms are out of sequence.",
    prerequisites:
      "Experience carrying materials carefully and comparing graduated dimensions.",
    related: ["pink-tower", "red-rods"],
    next: "Further dimension work and combinations with the Pink Tower when introduced by a guide.",
    adultNote:
      "The physical prisms provide weight, reach, and precise dimensional relationships. The screen offers a simplified visual comparison and should not replace the real material.",
    reviewStatus: "draft",
    sources: [],
  },
  "number-rods": {
    narration: narration["number-rods"],
    name: "Number Rods",
    ageLabel: "3–6 years",
    description:
      "Graduated red and blue rods make the quantities from one to ten visible.",
    purpose:
      "Connect ordered length with discrete quantities represented by alternating equal sections.",
    directAim: "Association of quantity with the number names from one to ten.",
    indirectAims: [
      "Preparation for counting",
      "Ordered sequence",
      "Coordination and concentration",
    ],
    skills: ["Quantity recognition", "Counting", "Length comparison"],
    presentation: [
      "Carry the rods individually to a floor mat and arrange them in mixed order.",
      "Build the stair from longest to shortest, aligning the left ends.",
      "Beginning with a small set, touch and count each alternating section while naming the quantity.",
      "Return the rods carefully when the work is complete.",
    ],
    controlOfError:
      "The ordered lengths provide a visible stair; the alternating equal sections can be counted again.",
    prerequisites:
      "Experience with the Red Rods and interest in spoken number names.",
    related: ["red-rods"],
    next: "Sandpaper Numerals and later work associating symbols with quantities.",
    adultNote:
      "The current simulation emphasizes ordering and the visible unit sections. A complete presentation of number names and quantities should be reviewed and demonstrated by a Montessori educator.",
    reviewStatus: "draft",
    sources: [],
  },
  "sandpaper-letters": {
    narration: narration["sandpaper-letters"],
    name: "Sandpaper Letters",
    ageLabel: "3–6 years",
    description:
      "Large letter forms invite a slow hand movement and attention to written shapes.",
    purpose:
      "Connect a letter sound and its written form through sight, movement, and tactile experience with the physical material.",
    directAim:
      "Preparation for writing and recognition of letter forms and sounds.",
    indirectAims: [
      "Muscular memory for writing",
      "Vocabulary and sound awareness",
      "Concentration",
    ],
    skills: [
      "Letter-form recognition",
      "Pre-writing movement",
      "Sound awareness",
    ],
    presentation: [
      "Select a small set of contrasting letters according to the child’s readiness.",
      "Trace one letter slowly with two fingers while giving its sound, then invite the child to try.",
      "Use a three-period lesson when appropriate and allow repeated tracing without testing or rushing.",
      "Return the cards in order when the work is complete.",
    ],
    controlOfError:
      "The physical material’s rough letter and smooth board guide the fingers. A screen cannot reproduce that tactile boundary.",
    prerequisites:
      "Interest in spoken sounds and readiness for controlled hand movement.",
    related: [],
    next: "More letter sounds and later word building with the Moveable Alphabet.",
    adultNote:
      "This digital trace is a visual movement study. It does not replace the sandpaper texture, a guide’s modeled stroke direction, or a carefully pronounced phoneme. The three sample letters and their forms require educator review before release.",
    reviewStatus: "draft",
    sources: [],
  },
  transferring: {
    narration: narration.transferring,
    name: "Bowl Transferring",
    ageLabel: "18 months–3 years",
    description:
      "One object at a time. Explore carrying and releasing with two small bowls.",
    purpose:
      "Practice a simple sequence of picking up, carrying, and releasing.",
    directAim: "Controlled transfer of objects from one container to another.",
    indirectAims: ["Coordination of movement", "Concentration", "Order"],
    skills: ["Hand coordination", "Purposeful movement", "Concentration"],
    presentation: [
      "Place two bowls on a tray with a few large, easy-to-grasp objects in one bowl.",
      "Slowly pick up one object, carry it over the empty bowl, and release it gently.",
      "Offer the work without rushing. Return the objects and restore the tray when finished.",
    ],
    controlOfError:
      "The objects and the changing contents of the bowls are visible. An object outside a bowl can be noticed and returned.",
    prerequisites:
      "Interest in moving objects and the ability to grasp and release deliberately.",
    related: ["pouring"],
    next: "Other purposeful transferring movements, chosen with the guide according to readiness.",
    adultNote:
      "Use the virtual study together as a conversation starter. Real work offers grip and weight that a screen cannot provide. A guide should select large age-appropriate objects and supervise the physical activity; the balls shown here are illustrative.",
    reviewStatus: "draft",
    sources: [
      "https://amshq.org/blog/child-psychology/2023-10-23-practical-life-through-the-ages-part-one-early-childhood/",
    ],
  },
  "shape-puzzle": {
    narration: narration["shape-puzzle"],
    name: "Three-Shape Puzzle",
    ageLabel: "18 months–3 years",
    description:
      "Lift a simple shape. Look at its outline. Discover where it belongs.",
    purpose: "Explore the relationship between a shape and a matching opening.",
    directAim: "Coordinating a simple inset with its matching outline.",
    indirectAims: [
      "Visual discrimination",
      "Hand-eye coordination",
      "Concentration",
    ],
    skills: ["Observation", "Shape matching", "Coordination"],
    presentation: [
      "Set the puzzle on a low table or mat.",
      "Lift one piece by its knob and place it beside the board.",
      "Compare the piece with its opening and return it gently. Invite exploration and repeat.",
    ],
    controlOfError:
      "A different outline leaves a visible mismatch. The matching piece fills its opening.",
    prerequisites: "Interest in inset work and experience grasping a knob.",
    related: ["transferring"],
    next: "Other simple inset puzzles chosen for the individual child.",
    adultNote:
      "This is a simplified three-shape inset study, not a geometric cabinet presentation. Some children may begin with a single-shape inset. Ask the guide which puzzle and amount of work suit the child; an age range alone does not establish readiness.",
    reviewStatus: "draft",
    sources: [],
  },
};

export const content = {
  ...coreContent,
  ...studyMaterialContent,
  ...elementaryContent,
  ...expansionContent,
  ...drawingTableContent,
} as Record<MaterialId, MaterialContent>;
