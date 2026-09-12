import { elementaryActivityContent } from "./elementary";
import type { MaterialId } from "../../domain/material";
import { studyActivityContent } from "./studies";
/** Digital interaction copy, separate from the real-world presentation. */
const coreActivityContent: Partial<
  Record<
    MaterialId,
    { instruction: string; guidance: string; completion: string }
  >
> = {
  "pink-tower": {
    instruction:
      "Choose a cube, then touch the mat to place it. You can always lift the top cube again.",
    guidance:
      "Look for the largest cube first. Compare the edges as you build, and try placing each smaller cube in the center.",
    completion:
      "Your tower is complete, from largest to smallest. Take a moment to look. Repeat whenever you like.",
  },
  "cylinder-blocks": {
    instruction:
      "Lift the cylinders from the block. Choose a cylinder from the tray, then explore where it fits.",
    guidance:
      "Compare the width of the cylinder with the opening. Each cylinder has a place where it sits flush with the block. Lift and replace every cylinder at least once.",
    completion:
      "Every cylinder is back in its place. The surface is even again. Repeat whenever you like.",
  },
  "color-tablets": {
    instruction:
      "Choose two tablets to place them together. Look closely at each pair. Touch a pair to separate it and try again.",
    guidance:
      "Look for two tablets with the same color. You can separate any pair to compare the tablets again.",
    completion:
      "Each color has a companion. Take a moment to look at your pairs. Repeat whenever you like.",
  },
  "red-rods": {
    instruction:
      "Choose one rod at a time and place it in order, beginning with the longest. Touch a placed rod to return it and compare again.",
    guidance:
      "Align one end of the rods. Look at how the opposite ends change, and compare neighboring lengths before choosing the next rod.",
    completion:
      "The rods form a steady progression from longest to shortest. Take a moment to look, then repeat whenever you like.",
  },
  "broad-stair": {
    instruction:
      "Choose one prism at a time and place it in order, beginning with the thickest. Touch a placed prism to return it and compare again.",
    guidance:
      "The prisms have the same length. Compare their square ends and look for the next change in thickness.",
    completion:
      "The prisms form a broad stair from thickest to thinnest. Take a moment to look, then repeat whenever you like.",
  },
  "number-rods": {
    instruction:
      "Choose one rod at a time and arrange the rods from longest to shortest. Notice each red and blue section as you compare.",
    guidance:
      "Align the left ends. Compare the lengths and notice that every next rod changes by one section.",
    completion:
      "The Number Rods form an ordered progression. Look at the alternating sections and repeat whenever you like.",
  },
  "sandpaper-letters": {
    instruction:
      "Choose a letter card. Move slowly across the large letter to leave a trace, then explore the other cards.",
    guidance:
      "Follow the letter form with a steady movement. The line you leave shows where your hand has traveled.",
    completion:
      "You have explored all three letter forms. Return to any card and repeat the movement whenever you like.",
  },
  "dressing-frame": {
    instruction:
      "Open each button, then separate the fabric. Bring the two sides together and close the buttons again.",
    guidance:
      "Work slowly, one button at a time. The fabric can open when all the buttons are undone. Bring the fabric back together before fastening.",
    completion:
      "The fabric is together and every button is fastened. You have opened and closed the frame. Repeat whenever you like.",
  },
  pouring: {
    instruction:
      "Pick up the pitcher, bring it over the cup, and tilt slowly. Bring it upright before returning it to the tray.",
    guidance:
      "Position the spout over the cup before tilting. A gentle tilt pours slowly. Empty the pitcher, bring it upright, return it to the tray, and wipe any spills.",
    completion:
      "The water has been poured and the tray is ready again. Pause, or start again to repeat the movement.",
  },
  transferring: {
    instruction:
      "Choose an object, then touch the other bowl to move it. Take one at a time.",
    guidance:
      "Pick one object from the left bowl. Carry it to the right bowl, then release it. You can move objects back to repeat.",
    completion:
      "The objects are together in the other bowl. Take a moment, then repeat whenever you like.",
  },
  "shape-puzzle": {
    instruction:
      "Lift the shapes from the board. Choose a loose shape, then touch an opening to try it.",
    guidance:
      "Look at the outline of the shape and the opening. Try another place when the edges are different.",
    completion:
      "Each shape is back in its opening. The puzzle is together again. Repeat whenever you like.",
  },
};

export const activityContent = {
  ...coreActivityContent,
  ...studyActivityContent,
  ...elementaryActivityContent,
} as Record<
  MaterialId,
  { instruction: string; guidance: string; completion: string }
>;
