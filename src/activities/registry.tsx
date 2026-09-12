import { isAvailableMaterial } from "../content/authenticity";
import { lazy } from "react";
import ActivityHost from "./ActivityHost";
import type { ActivityDefinition, ProgressEvent } from "../domain/activity";
import type { MaterialId } from "../domain/material";
export interface ActivityLauncherProps {
  onExit: () => void;
  onProgress: (event: ProgressEvent) => void;
}
// The closure preserves each module's specific state/action types.
function launcher<S, A>(
  materialId: MaterialId,
  load: () => Promise<{ default: ActivityDefinition<S, A> }>,
) {
  return lazy(async () => {
    const { default: definition } = await load();
    return {
      default: (props: ActivityLauncherProps) => (
        <ActivityHost
          definition={definition}
          materialId={materialId}
          {...props}
        />
      ),
    };
  });
}
const coreActivityRegistry = {
  "metal-insets": launcher("metal-insets", () => import("./metal-insets")),
  "table-setting": launcher("table-setting", () => import("./table-setting")),
  "movable-alphabet": launcher(
    "movable-alphabet",
    () => import("./movable-alphabet"),
  ),
  "land-water-forms": launcher(
    "land-water-forms",
    () => import("./land-water-forms"),
  ),
  checkerboard: launcher("checkerboard", () => import("./checkerboard")),
  "cards-counters": launcher(
    "cards-counters",
    () => import("./cards-counters"),
  ),
  "stamp-game": launcher("stamp-game", () => import("./stamp-game")),
  "fraction-insets": launcher(
    "fraction-insets",
    () => import("./fraction-insets"),
  ),
  "constructive-triangles": launcher(
    "constructive-triangles",
    () => import("./constructive-triangles"),
  ),
  "world-puzzle-map": launcher(
    "world-puzzle-map",
    () => import("./world-puzzle-map"),
  ),
  transferring: launcher("transferring", () => import("./transferring")),
  "shape-puzzle": launcher("shape-puzzle", () => import("./shape-puzzle")),
  "pink-tower": launcher("pink-tower", () => import("./pink-tower")),
  "cylinder-blocks": launcher(
    "cylinder-blocks",
    () => import("./cylinder-blocks"),
  ),
  "color-tablets": launcher("color-tablets", () => import("./color-tablets")),
  "red-rods": launcher("red-rods", () => import("./red-rods")),
  "broad-stair": launcher("broad-stair", () => import("./broad-stair")),
  "number-rods": launcher("number-rods", () => import("./number-rods")),
  "sandpaper-letters": launcher(
    "sandpaper-letters",
    () => import("./sandpaper-letters"),
  ),
  "dressing-frame": launcher(
    "dressing-frame",
    () => import("./dressing-frame"),
  ),
  pouring: launcher("pouring", () => import("./pouring")),
};
export const activityRegistry = coreActivityRegistry;
export function hasActivity(id: string): id is keyof typeof activityRegistry {
  return (
    Object.hasOwn(activityRegistry, id) && isAvailableMaterial(id as MaterialId)
  );
}
