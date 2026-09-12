import type { ActivityViewProps } from "../../domain/activity";
import type { TowerState, TowerAction } from "./model";
import { activityContent } from "../../content/en/activities";
import ActivityStage, { Block, SelectionRing } from "../shared/ActivityStage";
import TowerAdjustments from "./TowerAdjustments";
const order = [4, 8, 2, 6, 10, 3, 7, 1, 9, 5],
  center = 1.2;
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<TowerState, TowerAction>) {
  let height = 0.12;
  const available = order.filter((n) => !state.stack.some((c) => c.size === n));
  return (
    <section>
      <p className="activity-instruction">
        Select a cube, then touch the work mat or tower to place it. Touch the
        top cube with no cube selected to lift it back.
      </p>
      <ActivityStage
        label="Pink Tower in 3D"
        target={[0, 1.2, 0]}
        camera={[6, 7, 10]}
      >
        <group
          onClick={(e) => {
            if (e.delta > 5) return;
            e.stopPropagation();
            if (state.selected !== null)
              dispatch({ type: "place", offset: (e.point.x - center) * 70 });
          }}
        >
          <Block
            position={[center, 0.035, 0]}
            size={[2.8, 0.07, 3.2]}
            color="#dcd2b5"
          />
          <Block
            position={[center, 0.075, 0]}
            size={[2.65, 0.01, 3.05]}
            color="#e6dec5"
          />
        </group>
        {order.map((size, i) => {
          if (!available.includes(size)) return null;
          const side = size * 0.075,
            x = -2.65 + (i % 2) * 1.05,
            z = -1.7 + Math.floor(i / 2) * 0.85;
          return (
            <group
              key={size}
              position={[x, 0, z]}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                dispatch({ type: "select", size });
              }}
            >
              <Block
                position={[0, side / 2 + 0.03, 0]}
                size={[side, side, side]}
                color={state.selected === size ? "#dd9aa8" : "#cf8497"}
              />
              {state.selected === size && (
                <SelectionRing position={[0, 0.012, 0]} radius={side * 0.8} />
              )}
            </group>
          );
        })}
        {state.stack.map((cube, i) => {
          const side = cube.size * 0.075,
            y = height + side / 2;
          height += side;
          return (
            <group
              key={cube.size}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                if (state.selected !== null)
                  dispatch({
                    type: "place",
                    offset: (e.point.x - center) * 70,
                  });
                else if (i === state.stack.length - 1)
                  dispatch({ type: "remove" });
              }}
            >
              <Block
                position={[center + cube.offset / 70, y, 0]}
                size={[side, side, side]}
                color="#cf8497"
              />
            </group>
          );
        })}
      </ActivityStage>
      <div className="spatial-controls">
        <div
          className="compact-choices"
          role="group"
          aria-label="Choose a cube"
        >
          {available.map((size) => (
            <button
              key={size}
              className="material-choice"
              aria-label={`Select cube ${size}, size ${size} of 10`}
              aria-pressed={state.selected === size}
              onClick={() => dispatch({ type: "select", size })}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="spatial-actions">
          <button
            className="secondary-button"
            disabled={state.selected === null}
            onClick={() => dispatch({ type: "place", offset: 0 })}
          >
            Place selected cube in the center
          </button>
        </div>
      </div>
      <TowerAdjustments state={state} dispatch={dispatch} />
      {guidance && (
        <p className="gentle-note">{activityContent["pink-tower"].guidance}</p>
      )}
    </section>
  );
}
