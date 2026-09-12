import narration from "./narration.json";
import type { MaterialContent } from "../../domain/material";
export const elementarySources = {
  counters:
    "https://www.montessorialbum.com/montessori/index.php/Cards_and_Counters",
  stamps:
    "https://www.montessorialbum.com/montessori/index.php/Addition_With_the_Stamp_Game",
  fractions:
    "https://www.montessorinorthshore.org/materials-highlight-the-fraction-insets",
  equivalence:
    "https://www.montessorialbum.com/montessori/index.php/Fraction_Equivalence",
  triangles:
    "https://www.montessorialbum.com/montessori/index.php/Constructive_Triangles_-_Rectangular_Box",
  geometry:
    "https://www.alisonsmontessori.com/Study_of_Equivalency_Constructive_Triangles_Less_p/m598.lp.htm",
  map: "https://usa.montessorimaterials.com/articles/world-puzzle-map-presentation",
};
export const elementaryContent = {
  "cards-counters": {
    narration: narration["cards-counters"],
    name: "Cards and Counters",
    ageLabel: "Children’s House · elementary revisiting",
    description:
      "Ten numerals and 55 red counters make quantities, pairs, and unpaired counters visible.",
    purpose: "Connect numerals with counted quantities.",
    directAim: "Quantity–symbol association and recognition of odd and even.",
    indirectAims: ["Preparation for division"],
    skills: ["Counting", "Pairing", "Order"],
    presentation: [
      "Arrange numeral cards from 1 to 10.",
      "Count the corresponding counters beneath each numeral. Place pairs side by side, with any unpaired counter centered below.",
      "Observe which arrangements leave a clear path between the pairs. Return the material.",
    ],
    controlOfError:
      "The supply contains exactly 55 counters. Surplus or shortage invites recounting; inspect each arrangement too.",
    prerequisites:
      "Familiarity with numerals and quantities through Number Rods and Spindle Boxes.",
    related: ["number-rods", "stamp-game"],
    next: "Further work with odd and even quantities.",
    adultNote:
      "This begins in Children’s House. Its elementary placement is for revisiting foundations, not a required lesson for every six-year-old. The digital mat offers placement guides; a physical mat does not.",
    reviewStatus: "draft",
    sources: [elementarySources.counters],
  },
  "stamp-game": {
    narration: narration["stamp-game"],
    name: "Stamp Game · Addition",
    ageLabel: "5+ years · readiness matters",
    description:
      "Build addends with green, blue, and red decimal stamps, then bring the quantities together.",
    purpose: "Represent addition with place-value symbols.",
    directAim: "Addition, including exchange between decimal categories.",
    indirectAims: ["Movement toward abstraction"],
    skills: ["Place value", "Addition", "Exchange"],
    presentation: [
      "Represent each addend in thousands, hundreds, tens, and units, separated by a divider.",
      "Remove the divider and combine corresponding stamps.",
      "Count from units onward. Exchange ten stamps for one of the next category when needed.",
      "Record the sum and restore the material.",
    ],
    controlOfError:
      "Recount and compare with the written problem. The material does not mechanically reject incorrect quantities.",
    prerequisites:
      "Decimal-system understanding and addition with Golden Beads; exchange experience before dynamic addition.",
    related: ["number-rods", "cards-counters"],
    next: "Other operations with the Stamp Game.",
    adultNote:
      "These are three digital practice problems, not a complete presentation sequence. Introductions may begin before elementary. Observe how the child represents quantities before introducing exchanges.",
    reviewStatus: "draft",
    sources: [elementarySources.stamps],
  },
  "fraction-insets": {
    narration: narration["fraction-insets"],
    name: "Fraction Insets · Equivalence",
    ageLabel: "6–12 years · after fraction introductions",
    description:
      "Red circular sectors sit in green frames. Compare equal areas made from differently sized parts.",
    purpose: "Make fraction equivalence visible through area.",
    directAim: "Recognize different fractions representing an equal quantity.",
    indirectAims: ["Preparation for fraction operations"],
    skills: ["Equivalence", "Area comparison", "Fraction notation"],
    presentation: [
      "Explore the whole and the divided circular insets.",
      "Remove a reference piece and compare it with smaller equal pieces.",
      "Fit the smaller pieces into the same space. Record the relationship when appropriate.",
    ],
    controlOfError: "A gap or an overhang reveals unequal coverage.",
    prerequisites: "Experience with fraction insets and naming equal parts.",
    related: ["constructive-triangles"],
    next: "Further equivalent fractions and operations with fractions.",
    adultNote:
      "The comparison work spans elementary ages. This digital study includes divisions through tenths and three references. Pieces keep a common radius; the software aligns consecutive sectors. A guide should review the sequence before classroom use.",
    reviewStatus: "draft",
    sources: [elementarySources.fractions, elementarySources.equivalence],
  },
  "constructive-triangles": {
    narration: narration["constructive-triangles"],
    name: "Constructive Triangles · Shape Study",
    ageLabel: "Elementary revisiting · introduced from about 4",
    description:
      "Move and rotate three pairs from the rectangular box. Their marked edges meet to form larger figures.",
    purpose: "Investigate how triangles compose polygons.",
    directAim:
      "Recognize relationships between triangles and composed figures.",
    indirectAims: ["Preparation for geometry"],
    skills: ["Rotation", "Composition", "Edge comparison"],
    presentation: [
      "Lay out the triangles and examine the black marks.",
      "Choose a matching pair and trace its marked edges.",
      "Slide the pieces until those edges meet. Observe the resulting figure.",
    ],
    controlOfError:
      "The black edges coincide; gaps or overlap remain visible when they do not.",
    prerequisites:
      "Geometric Cabinet experience and familiarity with plane figures.",
    related: ["fraction-insets"],
    next: "Other rectangular-box pairs, followed by reviewed elementary equivalency investigations.",
    adultNote:
      "This is a selected-pair introduction, not the full rectangular box or an advanced upper-elementary lesson. It represents the green square, gray rectangle, and yellow rhombus pairs. Elementary users may revisit it as a foundation for geometry.",
    reviewStatus: "draft",
    sources: [elementarySources.triangles, elementarySources.geometry],
  },
  "world-puzzle-map": {
    narration: narration["world-puzzle-map"],
    name: "World Puzzle Map",
    ageLabel: "3–6 introduction · elementary revisiting",
    description:
      "Lift continent-shaped pieces from two hemispheres and compare their outlines before replacing them.",
    purpose: "Explore the shapes and relative locations of continents.",
    directAim: "Recognize continent forms and their places on the world map.",
    indirectAims: ["Preparation for further geography"],
    skills: ["Spatial comparison", "Geography", "Observation"],
    presentation: [
      "Connect the flat hemispheres with prior globe exploration.",
      "Lift a continent by its knob and observe its form.",
      "Replace it in the corresponding outline. Continue with other pieces and restore the map.",
    ],
    controlOfError:
      "The continent edge matches its opening; misplaced pieces leave mismatched boundaries.",
    prerequisites: "Experience with a continent globe and inset puzzles.",
    related: [],
    next: "Continent maps, names, and further geographic investigations.",
    adultNote:
      "This rebuild uses generalized Natural Earth geography, not a replica of one manufacturer’s board. Seven color groups include Antarctica and Australia with Oceanian islands; fragments crossing hemisphere edges move together. Classroom conventions and presentation need educator review.",
    reviewStatus: "draft",
    sources: [
      elementarySources.map,
      "https://www.naturalearthdata.com/about/terms-of-use/",
    ],
  },
} satisfies Record<string, MaterialContent>;
export const elementaryActivityContent = {
  "cards-counters": {
    instruction:
      "Arrange the numerals, then place individual counters beneath them. Touch a counter to return it.",
    guidance:
      "Count each quantity in pairs. For an odd quantity, center the last counter below the pairs. The bowl starts with 55.",
    completion:
      "The numerals and quantities correspond. Notice the paired and unpaired counters.",
  },
  "stamp-game": {
    instruction:
      "Build each addend with stamps. Combine them, exchange if needed, and record your sum.",
    guidance:
      "Units and thousands are green, tens blue, hundreds red. Ten of one category exchange for one of the next. Inspect the quantities before recording.",
    completion:
      "The represented quantities, exchanges, and written sum agree. Recount or choose another addition.",
  },
  "fraction-insets": {
    instruction:
      "Choose a fraction inset and move pieces to the comparison frame. Find smaller equal pieces covering the reference area.",
    guidance:
      "Compare the curved edges and the covered area. Return pieces to explore another denominator. Two fourths cover one half.",
    completion:
      "The equal pieces cover the same area as the reference. Different fractions, equal quantities.",
  },
  "constructive-triangles": {
    instruction:
      "Drag a triangle by its surface. Select it to rotate. Bring matching black edges together.",
    guidance:
      "Pair the same colors. Rotate until the black edges face each other, then slide them together. The edges settle when closely aligned.",
    completion:
      "The three pairs form a square, rectangle, and rhombus. Separate a pair to investigate again.",
  },
  "world-puzzle-map": {
    instruction:
      "Lift each continent by its knob. Drag it back to its matching outline, or use the piece controls below.",
    guidance:
      "Compare the coastlines and the openings. A piece settles only near its original outline. You can lift and replace one continent at a time.",
    completion:
      "Every continent has been lifted and returned. Take a moment to explore the two hemispheres.",
  },
};
