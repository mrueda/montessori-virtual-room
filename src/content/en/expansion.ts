import narration from "./narration.json";
import type { MaterialContent, MaterialId } from "../../domain/material";
export const expansionSources = {
  alphabet:
    "https://amshq.org/blog/at-home-family/2023-12-13-montessori-technology-and-the-purpose-of-education/",
  alphabetMaterial:
    "https://www.nienhuis.com/us/product/small-movable-alphabet-box/500_0060C2/",
  forms:
    "https://www.nienhuis.com/us/product/land-and-water-form-trays-set-1/500_022700/",
  checker: "https://alisonsmontessori.blog/checker-board-with-activity-cards/",
};
export const wordPrompts = [
  { word: "sun", label: "A sun" },
  { word: "cat", label: "A cat" },
  { word: "map", label: "A map" },
];
export const alphabetCopy = {
  promptLabel: "Choose an invitation",
  free: "My own words",
  returnLetter: "Return selected letter",
  sayObject: "Say the object's name together. Listen for its sounds.",
  selected: "Selected:",
  place: "Touch an empty place on the mat.",
  select: "Choose a letter from the box, or select one on the mat to move it.",
  mat: "Word-building mat",
  box: "The letter box",
  finish:
    "When you are finished, select and return each letter to its compartment.",
  completionHeading: "The material is put away",
  restored:
    "Your letters are back in their compartments, ready for another time.",
  empty:
    "Think of something you would like to say. Choose a letter for a sound you hear.",
  freeCheck:
    "Your letters are on the mat. Say what you intended to write with an adult, listening to the sounds. Free writing has no single expected answer here.",
  corresponds:
    "Your arrangement includes the conventional spelling for this picture. Say the word together. You may keep composing or return your letters.",
  compare:
    "Say the picture's name slowly with an adult and listen to your letters. You may rearrange them. This digital comparison is not an assessment of phonetic writing.",
  example: [
    "Here is a sun. Say its name and listen together.",
    "Find s for the first sound in sun.",
    "Listen for the middle sound and choose u.",
    "Choose n for the ending sound.",
    "The letters form sun. The adult can read the composition aloud without demanding that the child read it.",
  ],
};
export const formPairs = [
  {
    names: ["Island", "Lake"],
    observation:
      "On one tray, water surrounds land. On the other, land surrounds water. Notice the same outline.",
  },
  {
    names: ["Peninsula", "Gulf"],
    observation:
      "A peninsula extends into water. Its complementary gulf extends into land. Follow the shared coastline.",
  },
  {
    names: ["Isthmus", "Strait"],
    observation:
      "An isthmus connects two larger areas of land. A strait connects two larger areas of water between land.",
  },
];
export const formsCopy = {
  pairLabel: "Compare a pair",
  pickUp: "Pick up pitcher",
  putDown: "Return pitcher",
  over: "Move over",
  tilt: "Pitcher tilt",
  stop: "Bring the tilt back to 0° before moving or returning the pitcher.",
  empty: "Empty",
  wipe: "Wipe the tray",
  spill: "Some water spilled. Return the pitcher, then use the cloth.",
  dry: "The recess is dry.",
  filling: "Water is gathering in the recess.",
  filled: "Water reveals the outline.",
  limitation:
    "A simplified exploration of molded trays. Water stays in the prepared recess; real pouring and cleanup involve movements and sensations a screen cannot reproduce.",
  checkFill:
    "Pour a little water into both recesses to reveal the contrasting forms.",
  checkReturn:
    "Both forms are visible. Bring the pitcher upright and return it.",
  checkWipe: "The pitcher is returned. Wipe up the spilled water.",
  checkCompare:
    "Both recesses hold water and the pitcher is returned. Compare the land and water contours.",
  example: [
    "Compare the island and lake trays before adding water.",
    "Tilt the pitcher gently over the prepared recess.",
    "Watch water reveal the shape. Stop before the tray overflows.",
  ],
};
export const checkerCopy = {
  problem: "Choose a multiplication",
  board: "Montessori checkerboard",
  boardCaption:
    "White tiles below: the multiplicand. Gray tiles on the right: the multiplier. Units begin at the bottom right. Scroll the board sideways on a small screen.",
  selected: "Selected place value:",
  beadCount: "Beads:",
  bank: "Colored bead bars",
  add: "Place one selected bar",
  remove: "Return last bar",
  gather: "Gather along equal-value diagonals",
  exchange: "Exchange groups of ten to the left",
  separate: "Return to partial products",
  record: "Record the product",
  limitation:
    "This is an introductory subset of checkerboard work. Tile setup and diagonal gathering are assisted. Each bead's value depends on its square; the color of a bar identifies its bead count.",
  separateCheck:
    "Return to the partial products to check the quantities before combining them.",
  partialCheck: (actual: number, a: number, b: number, value: number) =>
    `At place value ${value.toLocaleString("en-US")}, there are ${actual} beads. Compare ${b} groups of ${a}. You can return bars and build again.`,
  gatherCheck:
    "The partial products correspond. Gather squares with equal place value along their diagonals to the bottom row.",
  exchangeCheck:
    "Some bottom-row squares hold ten or more beads. Select them and exchange groups of ten for beads in the square to the left.",
  answerCheck:
    "Read the bottom row from the greatest place value to units and compare it with your recorded product.",
  completeCheck:
    "Your partial products, exchanges, and recorded product correspond.",
  example: [
    "Represent 36 × 24. Start at the units square, at the bottom right.",
    "Place the multiplicand digit's bead bar as many times as the multiplier digit indicates.",
    "Read the bottom row: 8 hundreds, 6 tens, and 4 units. Record 864.",
  ],
};
export const expansionActivityContent = {
  "movable-alphabet": {
    instruction:
      "Build your own words with loose letters. Choose a letter, then touch an empty place on the mat. Select a placed letter to move or return it.",
    guidance:
      "Say a familiar word together and listen to its sounds. Choose letters for those sounds. The picture invitations are optional; there is no required word in free composition.",
    completion:
      "You have returned the letters you used. This marks putting the material away, not a spelling assessment.",
  },
  "land-water-forms": {
    instruction:
      "Pick up the pitcher, position it over a tray, and tilt gently. Fill both recesses, compare the forms, and return the pitcher.",
    guidance:
      "Choose Move over while the pitcher is upright. Tilt beyond 25° to pour. Stop around the time the recess is clearly blue, then compare the contrasting tray.",
    completion:
      "Water reveals both forms, the pitcher is returned, and spills are wiped. Take time to compare the contours.",
  },
  checkerboard: {
    instruction:
      "Select a square, choose a bead bar, and place repeated groups. Work through the digits, then gather equal place values and record the product.",
    guidance:
      "For 23 × 12, place two 3-bars in the bottom-right units square and two 2-bars in the tens square to its left. In the row above, place one 3-bar and one 2-bar in those columns. Gather along equal-value diagonals.",
    completion:
      "The partial products, place-value exchanges, and recorded product correspond. You can return to your partial products or choose another multiplication.",
  },
};
export const expansionContent: Partial<Record<MaterialId, MaterialContent>> = {
  "movable-alphabet": {
    narration: narration["movable-alphabet"],
    name: "Movable Alphabet",
    ageLabel: "Children’s House · readiness varies",
    description: "Loose letters give spoken ideas a visible form.",
    purpose: "Explore composing words before handwriting is fluent.",
    directAim: "Express words through movable letters.",
    indirectAims: ["Preparation for reading", "Independent expression"],
    skills: ["Sound analysis", "Letter selection", "Composition"],
    presentation: [
      "Invite a familiar word and listen to its sounds together.",
      "Select the corresponding loose letters and arrange them on the mat.",
      "Allow the child to compose further, then return letters to their compartments.",
    ],
    controlOfError:
      "The material does not mechanically correct spelling. Adult observation and later reading support reflection. The optional picture comparison is a digital aid.",
    prerequisites:
      "Interest in writing, experience with sound games, and knowledge of relevant letter-sound associations.",
    related: ["sandpaper-letters"],
    next: "Further composition and reading, guided by readiness.",
    adultNote:
      "An illustrative English print-letter adaptation. Do not turn early phonetic writing into a spelling test. This version has no phoneme audio; an adult supplies spoken sounds. Putting away the material ends the session without judging free writing.",
    reviewStatus: "draft",
    sources: [expansionSources.alphabet, expansionSources.alphabetMaterial],
  },
  "land-water-forms": {
    narration: narration["land-water-forms"],
    name: "Land and Water Forms",
    ageLabel: "3–6 years · with a guide",
    description:
      "Paired molded trays reveal complementary contours of land and water.",
    purpose: "Observe and name contrasting geographic forms.",
    directAim: "Recognize land and water forms.",
    indirectAims: ["Geographical vocabulary", "Careful observation"],
    skills: ["Comparing contours", "Controlled movement", "Vocabulary"],
    presentation: [
      "Bring a contrasting pair of trays and a small pitcher to a prepared table.",
      "Add water to reveal each recess and observe the boundary between land and water.",
      "Introduce the names with the guide, then empty and restore the material.",
    ],
    controlOfError:
      "The contours show which areas are land and which hold water. A guide supports naming; there is no hidden answer in the tray.",
    prerequisites:
      "Experience with careful pouring and introductory land-and-water vocabulary.",
    related: ["pouring", "world-puzzle-map"],
    next: "Connect the forms with maps and observed landscapes.",
    adultNote:
      "Original simplified complementary outlines, not a replica of one manufacturer's mold. Guided vocabulary presentation remains adult-led. The simulation assists pouring position and uses a simple water level.",
    reviewStatus: "draft",
    sources: [expansionSources.forms],
  },
  checkerboard: {
    narration: narration.checkerboard,
    name: "Checkerboard Multiplication",
    ageLabel: "6–12 years · after preparatory work",
    description:
      "Colored bead bars make partial products visible on a place-value board.",
    purpose: "Explore multiplication across decimal place values.",
    directAim: "Represent and combine partial products.",
    indirectAims: ["Preparation for abstract multiplication"],
    skills: ["Multiplication", "Place value", "Exchanging quantities"],
    presentation: [
      "Set the multiplicand tiles below the board and the multiplier tiles along its right edge.",
      "Build the partial products with bead bars in their corresponding squares.",
      "Gather equal place values, exchange quantities as necessary, and record the product.",
    ],
    controlOfError:
      "Recount the groups and compare the recorded product with a separate calculation or control. The board does not physically reject incorrect quantities.",
    prerequisites:
      "Decimal hierarchy, multiplication as repeated groups, exchanges, and preparatory bead-frame work with a guide.",
    related: ["stamp-game"],
    next: "More complex multiplication and further movement toward abstraction.",
    adultNote:
      "An introductory digital study with three problems. Tiles are prearranged and diagonal movement is assisted. Physical presentation and a child's readiness still need a Montessori guide.",
    reviewStatus: "draft",
    sources: [expansionSources.checker],
  },
};
