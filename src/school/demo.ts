/** Fictional school and illustrative reporting data for the business preview. */
export const demoSchool = {
  name: "Willow Montessori",
  tagline: "Independent minds. Connected families.",
};
export type SchoolBrand = typeof demoSchool;
export const sampleMetrics = [
  {
    label: "Family visits",
    value: "184",
    note: "An example month of exploration",
  },
  {
    label: "Materials explored",
    value: "426",
    note: "Across the classroom collection",
  },
  {
    label: "Parent notes opened",
    value: "112",
    note: "Learning the purpose behind the work",
  },
];
export const sampleInterest = [
  { name: "Pink Tower", count: 128 },
  { name: "Pouring Exercise", count: 96 },
  { name: "Color Tablets", count: 84 },
  { name: "Cylinder Blocks", count: 72 },
  { name: "Dressing Frame", count: 46 },
];
export const parentQuestions = [
  {
    question: "Why does my child repeat the same activity?",
    answer:
      "Repetition gives a child time to refine movement, notice differences, and concentrate. Ask your guide what they have observed rather than treating every repetition as a need for harder work.",
  },
  {
    question: "Why doesn’t the teacher correct every mistake?",
    answer:
      "Some materials make a mismatch visible through shape, fit, or order. A guide may allow time for a child to notice and adjust, while remaining available when support is needed.",
  },
  {
    question: "Should we buy these materials for home?",
    answer:
      "You can begin by talking with your child’s guide. Everyday opportunities to pour, dress, tidy, and participate in family life may be more useful than recreating a classroom at home.",
  },
];
