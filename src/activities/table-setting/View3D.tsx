import { useTexture } from "@react-three/drei";
import type { ActivityViewProps } from "../../domain/activity";
import type { State, Action } from "./model";
import { items, activeItems } from "./model";
import { tableCopy as c } from "../../content/en/drawing-table";
import ActivityStage, { Block, SelectionRing } from "../shared/ActivityStage";
import ObjectModel from "./ObjectModel";
import Controls from "./Controls";
export default function View3D(props: ActivityViewProps<State, Action>) {
  const { state, dispatch } = props;
  return (
    <section className="elementary-work setting-work">
      <Controls {...props} />
      <ActivityStage label={c.scene} camera={[0, 7.5, 8]} target={[0, 0, 0]}>
        <Block position={[0, -0.12, 0]} size={[10, 0.2, 5.5]} color="#d9c19c" />
        <Block
          position={[-1.625, 0.002, 0]}
          size={[5.85, 0.015, 4.4]}
          color="#e4e8d5"
        />
        <Block
          position={[3.125, 0.025, 0.075]}
          size={[3.25, 0.06, 4.95]}
          color="#b8996a"
        />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.045, 0]}
          onClick={(e) => {
            if (e.delta > 5 || state.selected === null) return;
            e.stopPropagation();
            dispatch({
              type: "move",
              index: state.selected,
              x: e.point.x * 100 + 500,
              y: e.point.z * 100 + 275,
              settle: true,
            });
          }}
        >
          <planeGeometry args={[10, 5.5]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {state.outlines && <OutlineMat setting={state.setting} />}
        {activeItems(state).map((i) => {
          const p = state.poses[i];
          return (
            <group
              key={i}
              position={[(p.x - 500) / 100, 0.07, (p.y - 275) / 100]}
              rotation={[0, (-p.angle * Math.PI) / 180, 0]}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                dispatch({ type: "select", index: i });
              }}
            >
              <ObjectModel item={items[i]} folded={state.folded} />
              {state.selected === i && (
                <SelectionRing
                  position={[0, 0.025, 0]}
                  radius={i === 0 ? 1.05 : 0.8}
                />
              )}
            </group>
          );
        })}
      </ActivityStage>
      <p className="work-caption">{c.threeD}</p>
      <p className="work-caption">{c.restore}</p>
    </section>
  );
}

function OutlineMat({ setting }: { setting: State["setting"] }) {
  const texture = useTexture(
    `${import.meta.env.BASE_URL}materials/table-outlines-${setting}.svg`,
  );
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.055, 0]}>
      <planeGeometry args={[10, 5.5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </mesh>
  );
}
