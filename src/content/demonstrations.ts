import type {
  Demonstration,
  DemoObject,
  DemoModel,
  DemoPose,
  DemoStep,
  Triple,
} from "../domain/demonstration";
import type { MaterialId } from "../domain/material";
const pose = (
  position: Triple,
  rotation: Triple = [0, 0, 0],
  scale: Triple = [1, 1, 1],
): DemoPose => ({ position, rotation, scale });
const object = (
  id: string,
  model: DemoModel,
  position: Triple,
  size: Triple,
  color: string,
): DemoObject => ({ id, model, pose: pose(position), size, color });
const move = (
  id: string,
  position: Triple,
  caption: string,
  lift = 0.6,
  duration = 1700,
): DemoStep => ({
  caption,
  duration,
  changes: [{ id, to: pose(position), lift }],
});
const mat = () => object("mat", "box", [0, 0, 0], [6.7, 0.06, 4.6], "#dfd6bd");
function pinkTower(): Demonstration {
  const objects = [mat()];
  const steps: DemoStep[] = [];
  let height = 0.1;
  for (let i = 0; i < 10; i++) {
    const size = 10 - i,
      side = size * 0.075;
    objects.push(
      object(
        `cube-${size}`,
        "box",
        [-2.5 + (i % 2) * 0.9, side / 2 + 0.07, -1.7 + Math.floor(i / 2) * 0.8],
        [side, side, side],
        "#cf8697",
      ),
    );
    steps.push(
      move(
        `cube-${size}`,
        [1.25, height + side / 2, 0],
        i === 0
          ? "Begin with the largest cube."
          : size === 1
            ? "Place the smallest cube gently on top."
            : `Compare the sizes. Center cube ${size} on the tower.`,
        0.75,
      ),
    );
    height += side;
  }
  return { objects, steps, camera: [6, 7, 10], target: [0, 1.2, 0] };
}
function cylinders(): Demonstration {
  const objects = [
      mat(),
      object("block", "box", [0, 0.21, -1], [6.35, 0.32, 0.8], "#c9aa79"),
    ],
    steps: DemoStep[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = 0.075 + (i + 1) * 0.022,
      x = -2.8 + i * 0.62;
    objects.push(
      object(
        `socket-${i}`,
        "cylinder",
        [x, 0.377, -1],
        [radius + 0.02, 0.012, radius + 0.02],
        "#8c7048",
      ),
    );
    objects.push(
      object(
        `cylinder-${i}`,
        "cylinder",
        [x, 0.45, -1],
        [radius, 0.22, radius],
        "#d9b57d",
      ),
    );
    steps.push(
      move(
        `cylinder-${i}`,
        [-2.7 + (i % 5) * 1.3, 0.2, 0.25 + Math.floor(i / 5) * 1.15],
        `Lift cylinder ${i + 1} by its knob.`,
        0.7,
        1200,
      ),
    );
  }
  for (let i = 0; i < 10; i++)
    steps.push(
      move(
        `cylinder-${i}`,
        [-2.8 + i * 0.62, 0.45, -1],
        `Compare the widths. Return cylinder ${i + 1} to its matching opening.`,
        0.7,
        1500,
      ),
    );
  return { objects, steps };
}
function colors(): Demonstration {
  const objects = [mat()],
    steps: DemoStep[] = [];
  const colors = ["#bd6056", "#d5b557", "#668ca5"],
    names = ["red", "yellow", "blue"];
  for (let i = 0; i < 6; i++)
    objects.push(
      object(
        `tablet-${i}`,
        "tablet",
        [-2.3 + (i % 2) * 0.9, 0.15, -1.3 + Math.floor(i / 2) * 1.3],
        [0.58, 0.11, 0.85],
        colors[i % 3],
      ),
    );
  for (let i = 0; i < 3; i++) {
    steps.push(
      move(
        `tablet-${i}`,
        [0.65, 0.15, (i - 1) * 1.3],
        `Choose a ${names[i]} tablet.`,
        0.5,
        1500,
      ),
    );
    steps.push(
      move(
        `tablet-${i + 3}`,
        [1.4, 0.15, (i - 1) * 1.3],
        `Find the other ${names[i]} tablet. Place them side by side.`,
        0.5,
        1800,
      ),
    );
  }
  return { objects, steps };
}
function dressing(): Demonstration {
  const objects = [
      mat(),
      object("frame", "box", [0, 0.11, 0], [3.5, 0.2, 3.8], "#bb9a6c"),
      object(
        "fabric-left",
        "box",
        [-0.77, 0.24, 0],
        [1.52, 0.04, 3.4],
        "#9cb1bd",
      ),
      object(
        "fabric-right",
        "box",
        [0.77, 0.23, 0],
        [1.52, 0.04, 3.4],
        "#a4b9c2",
      ),
    ],
    steps: DemoStep[] = [];
  for (let i = 0; i < 4; i++) {
    objects.push(
      object(
        `button-${i}`,
        "button",
        [0, 0.31, -1.2 + i * 0.8],
        [0.14, 0.05, 0.14],
        "#e1d3b6",
      ),
    );
    steps.push(
      move(
        `button-${i}`,
        [-0.4, 0.31, -1.2 + i * 0.8],
        `Open button ${i + 1}, one movement at a time.`,
        0.08,
        1400,
      ),
    );
  }
  const open = {
    caption: "All the buttons are open. Separate the fabric.",
    duration: 2000,
    changes: [
      { id: "fabric-left", to: pose([-1.2, 0.24, 0], [0, 0, 0], [0.43, 1, 1]) },
      { id: "fabric-right", to: pose([1.2, 0.23, 0], [0, 0, 0], [0.43, 1, 1]) },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `button-${i}`,
        to: pose([-1.25, 0.31, -1.2 + i * 0.8]),
      })),
    ],
  };
  steps.push(open);
  steps.push({
    caption: "Bring the two sides of the fabric together.",
    duration: 2000,
    changes: [
      { id: "fabric-left", to: pose([-0.77, 0.24, 0]) },
      { id: "fabric-right", to: pose([0.77, 0.23, 0]) },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `button-${i}`,
        to: pose([-0.4, 0.31, -1.2 + i * 0.8]),
      })),
    ],
  });
  for (let i = 0; i < 4; i++)
    steps.push(
      move(
        `button-${i}`,
        [0, 0.31, -1.2 + i * 0.8],
        `Close button ${i + 1}.`,
        0.08,
        1400,
      ),
    );
  return { objects, steps };
}
function transfer(): Demonstration {
  const objects = [
      mat(),
      object("left-bowl", "bowl", [-1.5, 0.07, 0], [1, 1, 1], "#c4a271"),
      object("right-bowl", "bowl", [1.5, 0.07, 0], [1, 1, 1], "#c4a271"),
    ],
    steps: DemoStep[] = [];
  for (let i = 0; i < 6; i++) {
    const dx = ((i % 3) - 1) * 0.35,
      z = (Math.floor(i / 3) - 0.5) * 0.38;
    objects.push(
      object(
        `ball-${i}`,
        "ball",
        [-1.5 + dx, 0.31, z],
        [0.17, 0.17, 0.17],
        "#c29359",
      ),
    );
    steps.push(
      move(
        `ball-${i}`,
        [1.5 + dx, 0.31, z],
        `Pick up one object and gently release it into the other bowl.`,
        1,
        1900,
      ),
    );
  }
  return { objects, steps };
}
function puzzle(): Demonstration {
  const objects = [
      mat(),
      object("board", "box", [0, 0.14, -0.8], [5.1, 0.22, 1.65], "#c9ab79"),
    ],
    steps: DemoStep[] = [];
  const shapes = ["circle", "square", "triangle"] as const;
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 1.6;
    objects.push(
      object(
        `hole-${i}`,
        shapes[i],
        [x, 0.257, -0.8],
        [0.54, 0.012, 0.54],
        "#947345",
      ),
    );
    objects.push(
      object(
        `piece-${i}`,
        shapes[i],
        [x, 0.31, -0.8],
        [0.5, 0.09, 0.5],
        "#dfbb7f",
      ),
    );
    steps.push(
      move(
        `piece-${i}`,
        [x, 0.14, 1.1],
        `Lift the ${shapes[i]} and place it beside the board.`,
        0.7,
      ),
    );
  }
  for (let i = 0; i < 3; i++)
    steps.push(
      move(
        `piece-${i}`,
        [(i - 1) * 1.6, 0.31, -0.8],
        `Match the ${shapes[i]} to its outline.`,
        0.7,
      ),
    );
  return { objects, steps };
}
function pouring(): Demonstration {
  const objects = [
    mat(),
    object("tray", "box", [0, 0.1, 0], [4.8, 0.1, 2.7], "#c5aa7a"),
    object("jug", "jug", [-1.4, 0.17, 0], [1, 1, 1], "#ebe6d7"),
    object("cup", "cup", [1.1, 0.17, 0], [1, 1, 1], "#a9b9a2"),
    object(
      "source-water",
      "water",
      [-1.4, 0.65, 0],
      [0.33, 0.78, 0.33],
      "#91b8bf",
    ),
    object("cup-water", "water", [1.1, 0.25, 0], [0.33, 0.78, 0.33], "#91b8bf"),
    object("stream", "water", [1.1, 1.61, 0], [0.025, 1.05, 0.025], "#91b8bf"),
  ];
  objects.find((o) => o.id === "cup-water")!.pose.scale = [1, 0.001, 1];
  objects.find((o) => o.id === "stream")!.pose.scale = [1, 0.001, 1];
  const steps: DemoStep[] = [
    {
      caption: "Pick up the pitcher, keeping it upright.",
      duration: 1600,
      changes: [
        { id: "jug", to: pose([-1.4, 1.0, 0]) },
        { id: "source-water", to: pose([-1.4, 1.48, 0]) },
      ],
    },
    {
      caption: "Bring the spout above the cup.",
      duration: 1700,
      changes: [
        { id: "jug", to: pose([0.63, 1.3, 0]) },
        { id: "source-water", to: pose([0.63, 1.78, 0]) },
      ],
    },
    {
      caption: "Tilt slowly. Watch the water move into the cup.",
      duration: 4500,
      changes: [
        { id: "jug", to: pose([0.38, 1.5, 0], [0, 0, -0.7]) },
        {
          id: "source-water",
          to: pose([0.6, 1.85, 0], [0, 0, -0.7], [1, 0.001, 1]),
        },
        { id: "cup-water", to: pose([1.1, 0.65, 0]) },
        { id: "stream", to: pose([1.1, 1.6, 0]) },
      ],
    },
    {
      caption: "Bring the pitcher upright to stop pouring.",
      duration: 1500,
      changes: [
        { id: "jug", to: pose([0.63, 1.3, 0]) },
        { id: "stream", to: pose([1.1, 1.6, 0], [0, 0, 0], [1, 0.001, 1]) },
      ],
    },
    move(
      "jug",
      [-1.4, 0.17, 0],
      "Return the pitcher gently to the tray.",
      0.25,
      1900,
    ),
  ];
  return { objects, steps, target: [0, 0.65, 0], camera: [4, 5.5, 7] };
}
function redRods(): Demonstration {
  const objects = [mat()];
  const steps: DemoStep[] = [];
  for (let size = 1; size <= 10; size++) {
    const width = size * 0.43;
    objects.push(
      object(
        `rod-${size}`,
        "box",
        [-2.75 + width / 2, 0.12, -2 + (size - 1) * 0.42],
        [width, 0.14, 0.2],
        "#b8493f",
      ),
    );
  }
  for (let size = 10; size >= 1; size--) {
    const width = size * 0.43;
    steps.push(
      move(
        `rod-${size}`,
        [-2.75 + width / 2, 0.12, -2 + (10 - size) * 0.42],
        size === 10
          ? "Begin with the longest rod and align its left end."
          : "Compare the remaining lengths and place the next shorter rod.",
        0.55,
        1450,
      ),
    );
  }
  return { objects, steps, camera: [6.7, 7.8, 9.5], target: [0, 0.3, 0] };
}
function broadStair(): Demonstration {
  const objects = [mat()];
  const steps: DemoStep[] = [];
  for (let size = 1; size <= 10; size++) {
    const side = 0.1 + size * 0.045;
    objects.push(
      object(
        `prism-${size}`,
        "box",
        [0, side / 2 + 0.05, -2 + (size - 1) * 0.42],
        [4.25, side, side],
        "#927054",
      ),
    );
  }
  for (let size = 10; size >= 1; size--) {
    const side = 0.1 + size * 0.045;
    steps.push(
      move(
        `prism-${size}`,
        [0, side / 2 + 0.05, -2 + (10 - size) * 0.42],
        size === 10
          ? "Begin with the thickest prism."
          : "Compare the square ends and place the next thinner prism.",
        0.55,
        1450,
      ),
    );
  }
  return { objects, steps, camera: [6.7, 7.8, 9.5], target: [0, 0.3, 0] };
}
function numberRods(): Demonstration {
  const objects = [mat()];
  const steps: DemoStep[] = [];
  for (let size = 1; size <= 10; size++) {
    const startZ = -2 + (size - 1) * 0.42;
    for (let unit = 0; unit < size; unit++)
      objects.push(
        object(
          `number-rod-${size}-${unit}`,
          "box",
          [-2.75 + 0.215 + unit * 0.43, 0.12, startZ],
          [0.43, 0.14, 0.2],
          unit % 2 ? "#416f97" : "#b8493f",
        ),
      );
  }
  for (let size = 10; size >= 1; size--)
    steps.push({
      caption:
        size === 10
          ? "Begin with the longest rod and align its left end."
          : `Place the next shorter rod. Notice its ${size} alternating sections.`,
      duration: 1500,
      changes: Array.from({ length: size }, (_, unit) => ({
        id: `number-rod-${size}-${unit}`,
        to: pose([-2.75 + 0.215 + unit * 0.43, 0.12, -2 + (10 - size) * 0.42]),
        lift: 0.55,
      })),
    });
  return { objects, steps, camera: [6.7, 7.8, 9.5], target: [0, 0.3, 0] };
}
function sandpaperLetters(): Demonstration {
  const objects: DemoObject[] = [
    mat(),
    object("letter-m", "letter-m", [-1.7, 0.15, 0], [1.3, 0.1, 1.7], "#49779a"),
    object("letter-a", "letter-a", [0, 0.15, 0], [1.3, 0.1, 1.7], "#49779a"),
    object("letter-s", "letter-s", [1.7, 0.15, 0], [1.3, 0.1, 1.7], "#49779a"),
    object(
      "finger",
      "ball",
      [-1.98, 0.48, 0.48],
      [0.11, 0.11, 0.11],
      "#c89d7d",
    ),
  ];
  const steps: DemoStep[] = [
    move(
      "finger",
      [-1.98, 0.48, -0.48],
      "Trace the first letter slowly in its written direction.",
      0.08,
      1700,
    ),
    move(
      "finger",
      [-1.45, 0.48, 0.18],
      "Continue the movement without hurrying.",
      0.08,
      1500,
    ),
    move(
      "finger",
      [-0.28, 0.48, 0.35],
      "Move to the next card when the learner is ready.",
      0.35,
      1500,
    ),
    move(
      "finger",
      [0.25, 0.48, -0.25],
      "Follow the complete letter form with a steady hand.",
      0.08,
      1800,
    ),
    move(
      "finger",
      [1.45, 0.48, 0.38],
      "Repeat with another contrasting letter.",
      0.35,
      1500,
    ),
    move(
      "finger",
      [1.95, 0.48, -0.38],
      "Finish the movement and pause before repeating.",
      0.08,
      1800,
    ),
  ];
  return { objects, steps, camera: [4.5, 5.6, 7.2], target: [0, 0.25, 0] };
}
/** Virtual solutions, kept separate from traditional educator presentation text. */
export const demonstrations = {
  "pink-tower": pinkTower(),
  "cylinder-blocks": cylinders(),
  "color-tablets": colors(),
  "dressing-frame": dressing(),
  pouring: pouring(),
  transferring: transfer(),
  "shape-puzzle": puzzle(),
  "red-rods": redRods(),
  "broad-stair": broadStair(),
  "number-rods": numberRods(),
  "sandpaper-letters": sandpaperLetters(),
} satisfies Partial<Record<MaterialId, Demonstration>>;
