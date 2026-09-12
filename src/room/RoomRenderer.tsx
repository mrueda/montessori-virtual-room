import { lazy, Suspense } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import type {
  MaterialId,
  RoomSceneDefinition,
  RoomSceneRendererId,
} from "../domain/material";

interface RendererProps {
  scene: RoomSceneDefinition;
  onSelect: (id: MaterialId) => void;
  resetKey: number;
}

const renderers: Record<
  RoomSceneRendererId,
  LazyExoticComponent<ComponentType<RendererProps>>
> = {
  nido: lazy(() => import("./DevelopmentalRoomScene")),
  "lower-elementary": lazy(() => import("./DevelopmentalRoomScene")),
  "upper-elementary": lazy(() => import("./DevelopmentalRoomScene")),
  adolescent: lazy(() => import("./DevelopmentalRoomScene")),
  "childrens-house-overview": lazy(() => import("./ChildrenHouseScene")),
  "toddler-community-overview": lazy(() => import("./ToddlerRoomScene")),
  "practical-life-corner": lazy(() => import("./PracticalLifeScene")),
  "sensorial-corner": lazy(() => import("./SensorialScene")),
  "language-corner": lazy(() => import("./LanguageScene")),
  "mathematics-corner": lazy(() => import("./MathematicsScene")),
  "culture-corner": lazy(() => import("./CommunityAreaScene")),
  "art-studio": lazy(() => import("./CommunityAreaScene")),
  "grace-courtesy-space": lazy(() => import("./CommunityAreaScene")),
};

export default function RoomRenderer(props: RendererProps) {
  const Renderer = renderers[props.scene.renderer];
  return (
    <Suspense fallback={null}>
      <Renderer {...props} />
    </Suspense>
  );
}
