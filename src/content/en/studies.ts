import type { MaterialContent } from "../../domain/material";
import type { StudyMaterialId } from "../../activities/studies/config";
import narration from "./narration.json";

export interface StudyCopy {
  material: MaterialContent;
  activity: { instruction: string; guidance: string; completion: string };
  pieces: Record<string, string>;
  targets: Record<string, string>;
}

type Draft = Omit<
  MaterialContent,
  "ageLabel" | "reviewStatus" | "sources" | "narration"
> & {
  id: StudyMaterialId;
  activity: StudyCopy["activity"];
  pieces: Record<string, string>;
  targets: Record<string, string>;
};

function study(draft: Draft): StudyCopy {
  const { id, activity, pieces, targets, ...material } = draft;
  return {
    material: {
      ...material,
      ageLabel: "3–6 years",
      reviewStatus: "draft",
      sources: [],
      narration: narration[id],
    },
    activity,
    pieces,
    targets,
  };
}

const commonSkills = ["Observation", "Coordination", "Concentration"];

export const studyCopy: Record<StudyMaterialId, StudyCopy> = {
  "continent-globe": study({
    id: "continent-globe",
    name: "Continent Globe",
    description:
      "Land, water, and the colored continents invite a first view of our world.",
    purpose:
      "Connect a sensorial impression of the globe with the names of the continents.",
    directAim: "Visual recognition and naming of continents.",
    indirectAims: [
      "Geographic orientation",
      "Vocabulary",
      "Awareness of the wider world",
    ],
    skills: commonSkills,
    presentation: [
      "Explore the globe first as land and water, then introduce a small set of continent names.",
      "Compare each colored area with its corresponding continent card.",
      "Return to the whole globe after the matching work.",
    ],
    controlOfError:
      "Color and position on the globe support comparison with the continent cards.",
    prerequisites:
      "Interest in the globe and experience distinguishing land and water.",
    related: ["world-puzzle-map", "land-water-forms"],
    next: "World Puzzle Map and continent folders chosen by the guide.",
    adultNote:
      "Begin with a sensorial impression and a few precise names. The digital globe does not replace handling a tactile globe.",
    activity: {
      instruction:
        "Choose a colored continent piece, then place it beside its continent name.",
      guidance:
        "Compare one color at a time and return any piece you want to reconsider.",
      completion:
        "Each colored continent has found its name. Look at the whole world again.",
    },
    pieces: {
      "africa-piece": "brown continent",
      "europe-piece": "red continent",
      "asia-piece": "yellow continent",
      "americas-piece": "green continents",
      "oceania-piece": "violet continent",
      "antarctica-piece": "white continent",
    },
    targets: {
      africa: "Africa",
      europe: "Europe",
      asia: "Asia",
      americas: "The Americas",
      oceania: "Oceania",
      antarctica: "Antarctica",
    },
  }),
  "world-puzzle-map": study({
    id: "world-puzzle-map",
    name: "World Puzzle Map",
    description:
      "Move the continent pieces and discover their places in the world.",
    purpose: "Explore the shapes and relative positions of the continents.",
    directAim:
      "Visual and tactile recognition of continent shapes and positions.",
    indirectAims: [
      "Geographic vocabulary",
      "Fine motor coordination",
      "Whole-to-part understanding",
    ],
    skills: commonSkills,
    presentation: [
      "Carry the map to a work space and remove continent pieces carefully by their knobs.",
      "Compare a piece with the outlines and return it to its place.",
      "Name selected continents according to the child’s readiness, then restore the map.",
    ],
    controlOfError:
      "Each continent piece corresponds to a visible outline and position.",
    prerequisites: "Experience with the Continent Globe.",
    related: ["continent-globe"],
    next: "Individual continent maps and classified geography materials.",
    adultNote:
      "Map conventions and colors vary by material maker. Review this draft against the school’s own sequence and map.",
    activity: {
      instruction:
        "Choose a continent piece and return it to its place on the map.",
      guidance:
        "Look at the shape and its neighbors. You can lift any placed piece and compare again.",
      completion: "The continent pieces are together as a world map again.",
    },
    pieces: {
      "north-piece": "North America",
      "south-piece": "South America",
      "europe-piece": "Europe",
      "africa-piece": "Africa",
      "asia-piece": "Asia",
      "australia-piece": "Australia",
    },
    targets: {
      north: "northwest place",
      south: "southwest place",
      europe: "small northern place",
      africa: "central place",
      asia: "large eastern place",
      australia: "southeast place",
    },
  }),
  "land-water-forms": study({
    id: "land-water-forms",
    name: "Land and Water Forms",
    description:
      "Contrasting land and water shapes make geographic language visible.",
    purpose:
      "Compare paired geographic forms before or alongside precise vocabulary.",
    directAim: "Recognition of contrasting land and water forms.",
    indirectAims: [
      "Geographic vocabulary",
      "Visual discrimination",
      "Preparation for map study",
    ],
    skills: commonSkills,
    presentation: [
      "Prepare matching trays with colored water and modeled land forms.",
      "Trace and compare one contrasting pair, such as island and lake.",
      "Introduce the names with a three-period lesson when the child is ready.",
    ],
    controlOfError: "The same contour appears once as land and once as water.",
    prerequisites: "Interest in land, water, maps, or outdoor geography.",
    related: ["continent-globe", "world-puzzle-map"],
    next: "Additional land and water contrasts and examples in maps or nature.",
    adultNote:
      "The real lesson uses modeled forms and water. This screen study focuses on visual pairing only.",
    activity: {
      instruction:
        "Place each land or water card beside the geographic form it represents.",
      guidance:
        "Notice whether the central shape is land or water, and compare the paired contours.",
      completion: "Each land and water form is beside its matching name.",
    },
    pieces: {
      "land-island": "land surrounded by water",
      "water-lake": "water surrounded by land",
      "land-peninsula": "land reaching into water",
      "water-gulf": "water reaching into land",
      "land-isthmus": "narrow land connection",
      "water-strait": "narrow water connection",
    },
    targets: {
      island: "island",
      lake: "lake",
      peninsula: "peninsula",
      gulf: "gulf",
      isthmus: "isthmus",
      strait: "strait",
    },
  }),
  "botany-cabinet": study({
    id: "botany-cabinet",
    name: "Botany Cabinet",
    description:
      "Leaf shapes invite careful looking, tracing, matching, and language.",
    purpose: "Isolate common leaf forms for visual and tactile discrimination.",
    directAim: "Discrimination of leaf shapes.",
    indirectAims: [
      "Botanical vocabulary",
      "Preparation for drawing",
      "Observation of plants",
    ],
    skills: commonSkills,
    presentation: [
      "Select one drawer or a small set of contrasting leaf insets.",
      "Remove an inset, trace its edge, compare it with the frame, and replace it.",
      "Match the shape with leaves or cards and add names when appropriate.",
    ],
    controlOfError:
      "Each inset fits its corresponding frame; outlines support later card matching.",
    prerequisites: "Interest in plants and experience with simple insets.",
    related: ["shape-puzzle"],
    next: "Leaf cards, classified nomenclature, and observation of real plants.",
    adultNote:
      "Offer real leaves whenever possible. Botanical names and cabinet sequence need review against the school’s material.",
    activity: {
      instruction:
        "Choose a leaf form and place it on the outline with the same shape.",
      guidance:
        "Follow the outside edge with your eyes and compare the widest part of each leaf.",
      completion: "Each leaf form rests on its matching outline.",
    },
    pieces: {
      "heart-leaf": "heart-shaped leaf",
      "egg-leaf": "oval leaf",
      "spear-leaf": "narrow leaf",
      "hand-leaf": "hand-shaped leaf",
    },
    targets: {
      cordate: "cordate outline",
      ovate: "ovate outline",
      lanceolate: "lanceolate outline",
      palmate: "palmate outline",
    },
  }),
  "animal-classification": study({
    id: "animal-classification",
    name: "Animal Classification",
    description:
      "Familiar animals become an invitation to observe, compare, and organize.",
    purpose:
      "Connect animal examples with broad biological groups through precise language.",
    directAim: "Classification of animals by shared characteristics.",
    indirectAims: [
      "Scientific vocabulary",
      "Logical organization",
      "Respect for living things",
    ],
    skills: ["Classification", "Observation", "Vocabulary"],
    presentation: [
      "Begin with animals the child knows and invite careful observation of visible features.",
      "Introduce a small number of broad groups with representative cards or models.",
      "Sort, discuss, and restore the material without turning the work into a test.",
    ],
    controlOfError:
      "Reference cards and observable characteristics support comparison.",
    prerequisites:
      "Interest in animals and matching familiar objects or pictures.",
    related: ["life-cycle-sequencing"],
    next: "More detailed zoology classification and animal-part nomenclature.",
    adultNote:
      "This is a simplified overview. A Montessori educator should review the classification sequence and chosen examples.",
    activity: {
      instruction:
        "Choose an animal card and place it with its broad animal group.",
      guidance:
        "Think about coverings, movement, and where the animal lives. Return a card to compare again.",
      completion: "Each animal is with its broad biological group.",
    },
    pieces: {
      horse: "horse",
      robin: "robin",
      salmon: "salmon",
      frog: "frog",
      butterfly: "butterfly",
    },
    targets: {
      mammal: "mammal",
      bird: "bird",
      fish: "fish",
      amphibian: "amphibian",
      insect: "insect",
    },
  }),
  "life-cycle-sequencing": study({
    id: "life-cycle-sequencing",
    name: "Butterfly Life Cycle",
    description: "Order the visible stages of change from egg to butterfly.",
    purpose: "Observe and sequence stages in the life cycle of a butterfly.",
    directAim: "Understanding biological change in an ordered cycle.",
    indirectAims: [
      "Scientific vocabulary",
      "Temporal sequence",
      "Respect for living things",
    ],
    skills: ["Sequencing", "Observation", "Vocabulary"],
    presentation: [
      "Invite observation of real specimens, models, or clear picture cards.",
      "Name and arrange the stages in sequence, following the child’s interest.",
      "Read the cycle as a whole and connect it with observations in nature.",
    ],
    controlOfError:
      "A reference cycle or observed transformation supports rechecking the order.",
    prerequisites: "Interest in insects, change, or ordered picture stories.",
    related: ["animal-classification"],
    next: "Other plant and animal life cycles and outdoor observation.",
    adultNote:
      "Life cycles are best grounded in living observation. Use this sequence as a prompt for real-world study.",
    activity: {
      instruction:
        "Arrange the four butterfly stages from the beginning of the cycle.",
      guidance:
        "Ask what emerges from each stage and what must come before the next.",
      completion: "The butterfly life cycle is in order from egg to adult.",
    },
    pieces: {
      egg: "egg",
      caterpillar: "caterpillar",
      chrysalis: "chrysalis",
      butterfly: "butterfly",
    },
    targets: {
      first: "first stage",
      second: "second stage",
      third: "third stage",
      fourth: "fourth stage",
    },
  }),
  "color-mixing": study({
    id: "color-mixing",
    name: "Color Mixing",
    description:
      "Bring two primary colors together and predict the color they can create.",
    purpose:
      "Explore relationships among primary and secondary colors through experimentation.",
    directAim: "Observation of color change through mixing.",
    indirectAims: ["Creative choice", "Concentration", "Care of art materials"],
    skills: ["Color observation", "Prediction", "Creative exploration"],
    presentation: [
      "Prepare small amounts of two colors, a mixing space, brush, water, and cloth.",
      "Combine the colors slowly and observe the change without prescribing a finished picture.",
      "Restore the tools and invite later experimentation with different proportions.",
    ],
    controlOfError:
      "The resulting color is directly visible and can be compared with the starting colors.",
    prerequisites:
      "Experience using a brush and caring for a prepared art space.",
    related: ["color-tablets"],
    next: "Open-ended painting and experiments with lighter, darker, or mixed hues.",
    adultNote:
      "Real pigment, water, resistance, and cleanup are essential parts of the work. This digital study only prepares a prediction.",
    activity: {
      instruction:
        "Choose a pair of primary colors and place it with the secondary color it can make.",
      guidance:
        "Imagine the two colors blending. You can move a pair back and compare again.",
      completion:
        "Each primary-color pair is beside the secondary color it can create.",
    },
    pieces: {
      "red-yellow": "red + yellow",
      "yellow-blue": "yellow + blue",
      "blue-red": "blue + red",
    },
    targets: { orange: "orange", green: "green", violet: "violet" },
  }),
  "line-design": study({
    id: "line-design",
    name: "Line Design",
    description: "Arrange simple lines into a quiet geometric composition.",
    purpose:
      "Explore direction, sequence, and composition with simple line elements.",
    directAim: "Controlled arrangement of line directions in a chosen design.",
    indirectAims: [
      "Preparation of the hand",
      "Visual organization",
      "Creative confidence",
    ],
    skills: ["Composition", "Direction", "Fine motor planning"],
    presentation: [
      "Prepare a small set of drawing or collage tools and a clearly defined work space.",
      "Demonstrate careful handling, then leave design choices open to the child.",
      "Allow the work to finish naturally and restore the art materials together when needed.",
    ],
    controlOfError:
      "The maker judges the composition; there is no single correct artistic result.",
    prerequisites: "Interest in drawing, arranging, or repeated marks.",
    related: ["color-mixing"],
    next: "Open-ended line, shape, and color work with real materials.",
    adultNote:
      "The ordered digital example teaches the controls. Art itself should preserve choice rather than require copying one design.",
    activity: {
      instruction:
        "Build the sample line path from left to right, then imagine your own variation.",
      guidance:
        "Look at the direction of each line and how one segment could continue into the next.",
      completion:
        "The sample line path is complete. Real art can continue in any direction you choose.",
    },
    pieces: {
      horizontal: "horizontal line",
      rising: "rising line",
      vertical: "vertical line",
      falling: "falling line",
      closing: "closing line",
    },
    targets: {
      one: "beginning",
      two: "rise",
      three: "center",
      four: "fall",
      five: "ending",
    },
  }),
  "greeting-practice": study({
    id: "greeting-practice",
    name: "Greeting Practice",
    description:
      "A short Grace and Courtesy sequence for meeting another person calmly.",
    purpose:
      "Practice a respectful greeting through deliberate social movements.",
    directAim: "Knowing how to approach and greet another person.",
    indirectAims: [
      "Social confidence",
      "Awareness of others",
      "Community belonging",
    ],
    skills: ["Courtesy", "Listening", "Self-regulation"],
    presentation: [
      "Invite a small group and model the greeting slowly with another adult or child.",
      "Show how to approach, pause at a comfortable distance, greet, and listen for a response.",
      "Offer practice without demanding eye contact, touch, or one culturally fixed form.",
    ],
    controlOfError:
      "The response and comfort of the other person provide social feedback.",
    prerequisites: "Interest in joining classroom social life.",
    related: ["walking-around-mat"],
    next: "Offering help, welcoming a visitor, and joining a group respectfully.",
    adultNote:
      "Adapt language, gesture, eye contact, and personal space to culture and individual needs. Courtesy should never override consent.",
    activity: {
      instruction: "Arrange the calm greeting movements in a respectful order.",
      guidance:
        "Begin by noticing the person and leave time for their response.",
      completion: "The greeting sequence leaves room for both people.",
    },
    pieces: {
      approach: "approach calmly",
      pause: "pause with space",
      greet: "offer a greeting",
      listen: "listen for a response",
    },
    targets: {
      one: "notice and approach",
      two: "leave comfortable space",
      three: "greet",
      four: "listen",
    },
  }),
  "table-setting": study({
    id: "table-setting",
    name: "Table Setting",
    description:
      "Prepare one place at the table with order and care for the community.",
    purpose:
      "Practice placing everyday table objects and contributing to a shared meal.",
    directAim: "Orderly preparation of a place setting.",
    indirectAims: ["Independence", "Care of community", "Spatial organization"],
    skills: ["Sequencing", "Coordination", "Responsibility"],
    presentation: [
      "Carry only the objects needed for one place, using a guide or placemat if appropriate.",
      "Place each object slowly in the arrangement used by the classroom community.",
      "Check the whole setting, then later clear and restore each object.",
    ],
    controlOfError:
      "A marked placemat or consistent classroom arrangement shows each object’s place.",
    prerequisites:
      "Carrying objects carefully and participating in snack or meal routines.",
    related: ["pouring"],
    next: "Serving, clearing, washing, and other contributions to shared meals.",
    adultNote:
      "Table customs vary. Review the arrangement with the school and emphasize contribution rather than decorative perfection.",
    activity: {
      instruction:
        "Choose each table object and place it on the prepared setting.",
      guidance:
        "Start with the plate in the center and compare the spaces around it.",
      completion: "The place is prepared for a shared meal.",
    },
    pieces: {
      plate: "plate",
      fork: "fork",
      spoon: "spoon",
      glass: "glass",
      napkin: "napkin",
    },
    targets: {
      center: "center",
      left: "left of the plate",
      right: "right of the plate",
      "upper-right": "above the plate",
      "napkin-place": "beside the setting",
    },
  }),
  "walking-around-mat": study({
    id: "walking-around-mat",
    name: "Walking Around a Mat",
    description:
      "Notice another person’s work and make a careful path around it.",
    purpose:
      "Practice moving through a shared classroom without disturbing concentrated work.",
    directAim: "Controlled movement around another person’s work space.",
    indirectAims: [
      "Respect for concentration",
      "Body awareness",
      "Community harmony",
    ],
    skills: ["Spatial awareness", "Self-regulation", "Courtesy"],
    presentation: [
      "Lay out a work mat and model approaching its boundary at an ordinary walking pace.",
      "Slow down, leave enough space, and walk around rather than across the work.",
      "Practice naturally in the room without turning another child’s concentration into a performance.",
    ],
    controlOfError: "The mat boundary and the undisturbed work remain visible.",
    prerequisites: "Walking independently in a shared classroom.",
    related: ["greeting-practice"],
    next: "Carrying a tray, moving a chair, and observing work without interruption.",
    adultNote:
      "Model this in the real environment. Movement paths and accessibility needs differ; preserve safety and dignity.",
    activity: {
      instruction:
        "Arrange the choices that protect the work mat and the learner’s concentration.",
      guidance:
        "Notice the boundary first, slow your body, and leave a comfortable space.",
      completion: "The path moves respectfully around the work.",
    },
    pieces: {
      "see-work": "notice the work",
      "slow-down": "slow down",
      "walk-around": "leave space and walk around",
      "continue-path": "continue on your path",
    },
    targets: {
      notice: "notice",
      slow: "slow",
      space: "make space",
      continue: "continue",
    },
  }),
};

export const studyMaterialContent = Object.fromEntries(
  Object.entries(studyCopy).map(([id, copy]) => [id, copy.material]),
) as Record<StudyMaterialId, MaterialContent>;

export const studyActivityContent = Object.fromEntries(
  Object.entries(studyCopy).map(([id, copy]) => [id, copy.activity]),
) as Record<StudyMaterialId, StudyCopy["activity"]>;
