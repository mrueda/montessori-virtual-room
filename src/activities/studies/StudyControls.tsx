import type { StudyCopy } from "../../content/en/studies";
import type { StudyConfig } from "./config";
import type { StudyAction, StudyState } from "./model";

export default function StudyControls({
  config,
  copy,
  state,
  dispatch,
  compact = false,
}: {
  config: StudyConfig;
  copy: StudyCopy;
  state: StudyState;
  dispatch: (action: StudyAction) => void;
  compact?: boolean;
}) {
  const loose = config.pieces.filter(
    (piece) => !(piece.id in state.placements),
  );
  return (
    <div
      className={`study-controls study-layout-${config.layout}${compact ? " compact" : ""}`}
    >
      <div className="study-piece-tray" aria-label="Pieces to place">
        {loose.map((piece) => (
          <button
            key={piece.id}
            aria-pressed={state.selected === piece.id}
            onClick={() => dispatch({ type: "select", piece: piece.id })}
            style={{ "--study-color": piece.color } as React.CSSProperties}
          >
            <span className={`study-symbol ${piece.shape ?? "box"}`} />
            {copy.pieces[piece.id]}
          </button>
        ))}
        {!loose.length && <p>Every piece is on the work mat.</p>}
      </div>
      <div className="study-targets" aria-label="Places on the work mat">
        {config.targets.map((target, index) => {
          const piece = config.pieces.find(
            (candidate) => state.placements[candidate.id] === target,
          );
          const correct = piece?.target === target;
          return (
            <button
              key={target}
              className={piece ? (correct ? "filled correct" : "filled") : ""}
              aria-label={
                piece
                  ? `${copy.targets[target]} contains ${copy.pieces[piece.id]}; return it to the tray`
                  : `Place selected piece at ${copy.targets[target]}`
              }
              onClick={() =>
                piece
                  ? dispatch({ type: "return", piece: piece.id })
                  : dispatch({ type: "place", target })
              }
              style={
                piece
                  ? ({ "--study-color": piece.color } as React.CSSProperties)
                  : undefined
              }
            >
              <small>{config.mode === "ordering" ? index + 1 : "place"}</small>
              <strong>{copy.targets[target]}</strong>
              {piece && <span>{copy.pieces[piece.id]}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
