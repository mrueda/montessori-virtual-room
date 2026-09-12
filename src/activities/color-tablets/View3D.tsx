import type { ActivityViewProps } from "../../domain/activity";
import { tablets } from "./model";
import type { ColorState, ColorAction } from "./model";
import ActivityStage, { Block, SelectionRing } from "../shared/ActivityStage";
import { activityContent } from "../../content/en/activities";
function Tablet({ id }: { id: number }) {
  return (
    <>
      <Block
        position={[0, 0.07, 0]}
        size={[0.62, 0.14, 0.95]}
        color="#ddc69b"
      />
      <Block
        position={[0, 0.15, 0]}
        size={[0.44, 0.022, 0.91]}
        color={tablets[id].hex}
      />
    </>
  );
}
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<ColorState, ColorAction>) {
  const available = [0, 5, 1, 3, 2, 4].filter(
    (id) => !state.pairs.flat().includes(id),
  );
  return (
    <section>
      <p className="activity-instruction">
        Touch two tablets to place them side by side. Touch a pair to separate
        it and compare again.
      </p>
      <ActivityStage label="Color Tablets in 3D" camera={[4, 6, 7]}>
        <Block
          position={[1.1, 0.035, 0]}
          size={[2.9, 0.07, 4.3]}
          color="#ded4ba"
        />
        <Block
          position={[1.1, 0.077, 0]}
          size={[2.75, 0.012, 4.15]}
          color="#e8dfc7"
        />
        {[0, 5, 1, 3, 2, 4].map((id, i) =>
          available.includes(id) ? (
            <group
              key={id}
              position={[
                -2.65 + (i % 2) * 0.88,
                0.03,
                -1.3 + Math.floor(i / 2) * 1.3,
              ]}
              rotation={[0, ((i % 2) - 0.5) * 0.2, 0]}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                dispatch({ type: "choose", id });
              }}
            >
              <Tablet id={id} />
              {state.selected === id && (
                <SelectionRing position={[0, 0.012, 0]} radius={0.6} />
              )}
            </group>
          ) : null,
        )}
        {state.pairs.map(([a, b], index) => (
          <group
            key={`${a}-${b}`}
            position={[1.1, 0.09, (index - 1) * 1.3]}
            onClick={(e) => {
              if (e.delta > 5) return;
              e.stopPropagation();
              dispatch({ type: "separate", index });
            }}
          >
            <group position={[-0.37, 0, 0]}>
              <Tablet id={a} />
            </group>
            <group position={[0.37, 0, 0]}>
              <Tablet id={b} />
            </group>
          </group>
        ))}
      </ActivityStage>
      <div className="spatial-controls">
        <div
          className="compact-choices"
          role="group"
          aria-label="Choose a color tablet"
        >
          {available.map((id) => (
            <button
              key={id}
              className="material-choice color-choice"
              aria-label={`Choose ${tablets[id].color} tablet ${id < 3 ? "one" : "two"}`}
              aria-pressed={state.selected === id}
              onClick={() => dispatch({ type: "choose", id })}
            >
              <span style={{ background: tablets[id].hex }} />
              {tablets[id].color} {id < 3 ? "1" : "2"}
            </button>
          ))}
        </div>
        <div className="spatial-actions">
          {state.pairs.map(([a, b], index) => (
            <button
              key={`${a}-${b}`}
              className="text-button"
              onClick={() => dispatch({ type: "separate", index })}
            >
              Separate {tablets[a].color} and {tablets[b].color} pair
            </button>
          ))}
        </div>
      </div>
      {guidance && (
        <p className="gentle-note">
          {activityContent["color-tablets"].guidance}
        </p>
      )}
    </section>
  );
}
