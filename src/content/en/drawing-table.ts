import narration from "./narration.json";
import type { MaterialContent, MaterialId } from "../../domain/material";
export const drawingTableSources = {
  insets: "https://www.nienhuis.com/us/product/the-metal-insets/500_004600/",
  design:
    "https://www.montessoriservices.com/ideas-insights/take-another-look-at-the-metal-insets",
  school:
    "https://www.wsms.org/montessori-materials-explained-the-metal-insets",
  table: "https://www.montessoriservices.com/table-setting-activity",
  practical:
    "https://amshq.org/blog/child-psychology/2023-10-23-practical-life-through-the-ages-part-one-early-childhood/",
};
export const metalCopy = {
  figure: "Choose a figure",
  tools: {
    frame: "Place frame on paper",
    inset: "Place inset on paper",
    away: "Return both to tray",
  },
  pencils: "Colored pencils",
  choosePencil: "Choose pencil",
  colors: ["Terracotta", "Blue", "Green", "Ochre", "Violet"],
  surface: "Metal Insets drawing paper",
  keyboard:
    "Draw with a mouse, touch, or stylus. Keyboard: focus the paper, move the pencil with arrow keys, and press Space to lower or lift it. Escape lifts the pencil.",
  restingTray: "Material tray",
  undo: "Undo last stroke",
  keep: "Keep my drawing",
  finish: "Put away my materials",
  completionHeading: "Your materials are put away",
  follow: "Follow the edge with a continuous movement.",
  full: "This sheet has many strokes. Keep your drawing, undo a stroke, or start a fresh sheet.",
  limitation:
    "Five figures from the Metal Insets set. When a frame or inset is on the paper, the pencil follows its edge only when you move close to it. With both on the tray, you can draw freely. A screen cannot reproduce pencil grip, pressure, or the feel of metal.",
  checkFinished:
    "Your drawing remains on the paper and the materials are returned. This marks finishing your session, not handwriting proficiency.",
  checkStart:
    "Place a frame on the paper. Choose a pencil and follow its inner edge.",
  checkFrame:
    "Look at the outline made with the frame. Are there gaps? You can return to an unfinished part of the edge.",
  checkInset:
    "The frame outline is visible. Trace around the matching blue inset with another pencil and compare the two outlines.",
  checkFill:
    "Both outlines follow the same shape. Return the material to the tray and explore lines within the outline.",
  checkOutside:
    "Some drawn points extend beyond the current figure. Look at the edges; you may undo a stroke or keep exploring your design.",
  checkDesign:
    "Your drawn lines stay within the current figure. Look at their spacing and direction. There is no single finished design to copy.",
  example: [
    "Prepare a sheet, a frame, its matching inset, and colored pencils.",
    "Place the frame on the paper and trace its inner edge.",
    "Place the inset over the outline and trace its outer edge with another pencil.",
    "Return the frame and inset to the tray. The outlines remain.",
    "Draw lines within the outline. This is one possible drawing, not a required pattern.",
    "Put the materials away and keep the drawing if you wish.",
  ],
};
export const tableCopy = {
  setting: "Choose a setting",
  snack: "A place for snack",
  meal: "A place for a meal",
  outlines: "Show outline mat",
  fold: "Fold napkin in half",
  unfold: "Unfold napkin",
  selected: "Selected object",
  choose: "Choose an object",
  names: {
    plate: "Plate",
    fork: "Fork",
    spoon: "Spoon",
    glass: "Glass",
    napkin: "Napkin",
  },
  return: "Return selected object to tray",
  rotateLeft: "Rotate left 15°",
  rotateRight: "Rotate right 15°",
  positionControls: "Move selected table object",
  move: "Move selected object",
  directions: { left: "Left", up: "Up", down: "Down", right: "Right" },
  center: "Move to center of mat",
  surface: "Table setting work surface",
  scene: "Table setting in 3D",
  select: "Select",
  customs:
    "This outline mat shows one example arrangement. Table customs and the utensils needed vary between homes and schools. The snack setting uses four objects; the meal setting adds a fork.",
  restore:
    "When the place is ready, you can return each object to the tray and repeat. Arrow keys move a focused object in the 2D view.",
  threeD:
    "Select an object, then touch an open place on the table. The movement controls also work with a keyboard. Object contact and fabric folding are simplified.",
  checkObject: (item: string) =>
    `Compare the ${item} with its outline on this mat. You can turn the object or move it closer; this is an example setting, not a universal rule.`,
  checkFold:
    "The objects match this example arrangement. Fold the napkin to compare it with the narrower outline.",
  checkComplete:
    "The place matches this example setting and the napkin is folded. It is ready for the meal routine you share with an adult.",
  example: [
    "Prepare the objects needed for one place. Look at the example outline mat.",
    "Carry one object at a time from the tray to the prepared place.",
  ],
};
export const drawingTableActivityContent = {
  "metal-insets": {
    instruction:
      "Place a frame on the paper and trace its inner edge. Compare it with the matching inset. Return the material to its tray to draw freely within your outline.",
    guidance:
      "Choose two pencils to distinguish the frame and inset outlines. Move close to the edge to trace. Remove the material and explore your own drawing; you can undo a stroke.",
    completion:
      "The material is back on its tray. Your drawing stays on the paper. You may keep it, continue exploring, or start a fresh sheet.",
  },
  "table-setting": {
    instruction:
      "Move one object at a time from the tray to the mat. Fold the napkin and prepare a place for a shared meal. Select an object and touch a place on the table, or use the movement buttons.",
    guidance:
      "Compare each object with its outline on the example mat. You can rotate utensils and move them again. The optional outline mat makes the arrangement visible.",
    completion:
      "Your objects match this example setting. The place is prepared and the napkin is folded. You may clear it one object at a time and repeat.",
  },
};
export const drawingTableContent: Partial<Record<MaterialId, MaterialContent>> =
  {
    "metal-insets": {
      name: "Metal Insets",
      ageLabel: "3–6 years · after preparatory work",
      description:
        "Metal frames and matching insets invite outlines, pencil movements, and geometric designs.",
      purpose: "Explore controlled pencil movement through drawing.",
      directAim: "Preparation for writing through pencil control.",
      indirectAims: ["Concentration", "Geometric design"],
      skills: ["Tracing", "Observation", "Drawing"],
      presentation: [
        "Prepare paper, a frame, its inset, and colored pencils.",
        "Trace inside the frame, then trace around the inset with another pencil.",
        "Remove the material and draw within the outline. Explore further designs, then restore the materials.",
      ],
      controlOfError:
        "The lines on the paper reveal gaps, overlaps, and changes in spacing. The digital stencil assists the edge; it cannot assess pencil grip or pressure.",
      prerequisites:
        "Interest in drawing and experience handling a pencil and classroom materials.",
      related: ["movable-alphabet"],
      next: "Further designs and handwriting work introduced by a guide.",
      adultNote:
        "Five of the ten figures are available here: circle, square, triangle, rectangle, and ellipse. This is an original digital adaptation of the material. Creative work has no single correct picture. Finishing records restoration, not handwriting mastery.",
      reviewStatus: "draft",
      sources: [
        drawingTableSources.insets,
        drawingTableSources.design,
        drawingTableSources.school,
      ],
      narration: narration["metal-insets"],
    },
    "table-setting": {
      name: "Table Setting",
      ageLabel: "Toddler / Children’s House · with an adult",
      description:
        "Prepare a place at the table using dishes, utensils, and a cloth napkin.",
      purpose: "Contribute to the shared meal routine.",
      directAim: "Prepare an orderly place setting.",
      indirectAims: ["Independence", "Care of community"],
      skills: ["Carrying", "Spatial organization", "Order"],
      presentation: [
        "Prepare the items needed for the meal.",
        "Carry and place each object using the arrangement familiar to the community.",
        "Join the meal routine; afterward, clear and restore the objects.",
      ],
      controlOfError:
        "A familiar arrangement or outline mat supports comparison. Table customs vary; this example is not universal.",
      prerequisites:
        "Interest in helping with meals and experience carrying manageable objects.",
      related: ["pouring", "transferring"],
      next: "Serving, clearing, washing, and other contributions to a shared meal.",
      adultNote:
        "Choose utensils and tasks for the individual child. A toddler may begin with just one part of the routine. This digital study assists placement and folding and does not reproduce weight, breakage, or the social experience of a meal.",
      reviewStatus: "draft",
      sources: [drawingTableSources.table, drawingTableSources.practical],
      narration: narration["table-setting"],
    },
  };
