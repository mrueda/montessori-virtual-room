import { towerCheck } from "../shared/checkWork";
import { lazy } from "react";
import type { ActivityDefinition } from "../../domain/activity";
import { initialState, reduce, isComplete } from "./model";
import type { TowerState, TowerAction } from "./model";
import View from "./View2D";
const pinkTower: ActivityDefinition<TowerState, TowerAction> = {
  id: "pink-tower",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["pink-tower"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: towerCheck,
  guidance: "Compare the sizes and look at the edges of your tower.",
  View,
  View3D: lazy(() => import("./View3D")),
};
export default pinkTower;
