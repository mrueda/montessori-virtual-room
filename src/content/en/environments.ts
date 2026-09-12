import type { RoomDefinition } from "../../domain/material";
const infantSource = {
  title: "AMS · Infant and Toddler environments",
  url: "https://amshq.org/about-us/inside-the-montessori-classroom/infant-and-toddler/",
};
const elementarySource = {
  title: "AMI · Montessori 6–12",
  url: "https://montessori-ami.org/node/2176",
};
const elementaryAms = {
  title: "AMS · Elementary programs",
  url: "https://amshq.org/about-us/inside-the-montessori-classroom/elementary/",
};
const adolescentSource = {
  title: "AMI · The prepared environment for the adolescent",
  url: "https://montessori-ami.org/node/8312",
};

export const environmentRooms = {
  "0-18m": {
    id: "nido",
    name: "The Nido",
    ageLabel: "0–18 months",
    ageGroup: "0-18m",
    introduction: "A quiet beginning, shaped by movement and human connection.",
    defaultSceneId: "nido",
    scenes: [
      {
        id: "nido",
        name: "The Nido",
        shortName: "Nido",
        description: "Space to move. Time to connect.",
        renderer: "nido",
        placements: [],
      },
    ],
    guide: {
      audience: "A room tour for adults",
      introduction:
        "Explore how an infant environment supports movement, care, and connection. This is an illustrative room for parents and educators, not a screen activity for babies. Readiness and classroom arrangements vary.",
      sources: [infantSource],
      points: [
        {
          id: "movement",
          title: "Freedom of movement",
          description:
            "An uncluttered floor area leaves room for movement. Adults observe the individual child and prepare surroundings for their developing abilities.",
          position: [-1.7, 0.7, 0.7],
        },
        {
          id: "connection",
          title: "Care and connection",
          description:
            "Responsive relationships and everyday care are central. A comfortable place for an adult supports quiet conversation, shared books, and attentive care.",
          position: [2.5, 1.45, -1.5],
        },
        {
          id: "choice",
          title: "A small, ordered selection",
          description:
            "Low, accessible storage offers a small selection chosen through observation. The amount and type of material change with the child’s development.",
          position: [-2.1, 0.9, -2.55],
        },
      ],
    },
  },
  "6-9y": {
    id: "lower-elementary",
    name: "Lower Elementary",
    ageLabel: "6–9 years",
    ageGroup: "6-9y",
    introduction: "Questions grow into stories, shared work, and discoveries.",
    defaultSceneId: "lower-elementary",
    scenes: [
      {
        id: "lower-elementary",
        name: "Lower Elementary",
        shortName: "Lower Elementary",
        description: "From concrete exploration to wider questions",
        renderer: "lower-elementary",
        placements: [
          {
            materialId: "stamp-game",
            position: [-3.25, 0.7, -2.65],
            shelf: "Mathematics",
          },
          {
            materialId: "cards-counters",
            position: [-1.9, 0.7, -2.65],
            shelf: "Mathematics",
          },
          {
            materialId: "world-puzzle-map",
            position: [-2.8, 0.1, 1.1],
            shelf: "Culture",
          },
          {
            materialId: "fraction-insets",
            position: [0.4, 1.0, 0.7],
            shelf: "Mathematics",
          },
          {
            materialId: "constructive-triangles",
            position: [-2.6, 1.23, -2.65],
            shelf: "Mathematics",
          },
        ],
      },
    ],
    guide: {
      audience: "Explore the elementary environment",
      introduction:
        "Elementary Montessori connects subjects through broad stories and investigations. This illustrative lower-elementary room emphasizes shared work and space for concrete materials. Some schools group all ages 6–12 together.",
      sources: [elementarySource, elementaryAms],
      points: [
        {
          id: "collaboration",
          title: "Working together",
          description:
            "Shared tables allow children to exchange ideas and work together, alongside individual study. The guide introduces lessons and helps children take responsibility for their work.",
          position: [0.2, 1.5, 0.9],
        },
        {
          id: "concrete",
          title: "Room for concrete exploration",
          description:
            "Open shelves and floor space support work with elementary materials. Concrete experiences continue as children develop more abstract reasoning.",
          position: [-2.7, 1.3, -2.5],
        },
        {
          id: "stories",
          title: "Stories that open questions",
          description:
            "Stories about the universe, life, and human beings introduce connected areas of study. Books and further investigation help children pursue questions that follow.",
          position: [2.9, 1.5, -2.3],
        },
      ],
    },
  },
  "9-12y": {
    id: "upper-elementary",
    name: "Upper Elementary",
    ageLabel: "9–12 years",
    ageGroup: "9-12y",
    introduction:
      "A home base for research, reasoning, and growing independence.",
    defaultSceneId: "upper-elementary",
    scenes: [
      {
        id: "upper-elementary",
        name: "Upper Elementary",
        shortName: "Upper Elementary",
        description: "Investigate, record, discuss, and connect",
        renderer: "upper-elementary",
        placements: [
          {
            materialId: "fraction-insets",
            position: [1.1, 1.13, 0.65],
            shelf: "Mathematics",
          },
          {
            materialId: "constructive-triangles",
            position: [-2.75, 1.13, 0.4],
            shelf: "Mathematics",
          },
        ],
      },
    ],
    guide: {
      audience: "Explore the elementary environment",
      introduction:
        "Upper elementary continues the same 6–12 developmental plane. This room emphasizes extended research, discussion, and planning. It illustrates one possible arrangement, not a required Montessori floor plan.",
      sources: [elementarySource, elementaryAms],
      points: [
        {
          id: "research",
          title: "Research and reference",
          description:
            "Books and reference resources support questions developed through lessons. Children gather information, record findings, and share their understanding.",
          position: [-2.8, 2.1, -2.5],
        },
        {
          id: "discussion",
          title: "A place to compare ideas",
          description:
            "A shared work area supports collaboration, explanation, and discussion. Individual responsibilities develop within the mixed-age community.",
          position: [1.65, 1.6, 0.7],
        },
        {
          id: "beyond",
          title: "Beyond the classroom",
          description:
            "The classroom is a base for learning in the wider world. Carefully prepared investigations outside it connect questions with people, places, and direct experience.",
          position: [2.7, 2.1, -2.7],
        },
      ],
    },
  },
  "12-18y": {
    id: "adolescent",
    name: "The Adolescent Community",
    ageLabel: "12–18 years",
    ageGroup: "12-18y",
    introduction:
      "Study and real work, with responsibility for a shared community.",
    defaultSceneId: "adolescent",
    scenes: [
      {
        id: "adolescent",
        name: "The Adolescent Community",
        shortName: "Adolescent Community",
        description: "Land, practical work, and community life",
        renderer: "adolescent",
        placements: [],
      },
    ],
    guide: {
      audience: "Understanding adolescent Montessori",
      introduction:
        "This illustrative land-based study and workshop space introduces adolescent Montessori. Study connects with real work and community life. Programs vary; the room is not a model of every school or a complete residential environment.",
      sources: [
        adolescentSource,
        {
          title: "AMI · Adolescent environment and development",
          url: "https://montessori-ami.org/trainingvoices/environment-prepared-adolescent",
        },
      ],
      points: [
        {
          id: "land",
          title: "Study connected with the land",
          description:
            "Working with land provides a context for investigation and contribution. Practical responsibilities connect study with observable needs and consequences.",
          position: [3.3, 0.9, 0.1],
        },
        {
          id: "workshop",
          title: "Real work and economic life",
          description:
            "Making and exchanging products can involve costs, planning, craftsmanship, and service. These are real responsibilities; this room tour does not simulate completing them.",
          position: [-2.9, 1.65, -2.4],
        },
        {
          id: "community",
          title: "Living and learning in community",
          description:
            "Shared work and study bring individual contributions into a social setting. Adults provide expertise and model responsible participation.",
          position: [-0.3, 1.55, 1.4],
        },
      ],
    },
  },
} satisfies Record<string, RoomDefinition>;
