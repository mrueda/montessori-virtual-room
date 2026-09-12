import type { MaterialId } from "../domain/material";
import { studyConfigs } from "../activities/studies/config";
import type { StudyConfig } from "../activities/studies/config";
export default function MaterialArt({ id }: { id: MaterialId }) {
  if (
    [
      "metal-insets",
      "table-setting",
      "movable-alphabet",
      "checkerboard",
      "land-water-forms",
      "cards-counters",
      "stamp-game",
      "fraction-insets",
      "constructive-triangles",
      "world-puzzle-map",
    ].includes(id)
  )
    return (
      <svg viewBox="0 0 160 115" aria-hidden="true" className="material-art">
        <image
          href={`${import.meta.env.BASE_URL}materials/${id}.svg`}
          x="8"
          y="14"
          width="144"
          height="90"
        />
      </svg>
    );
  const study: StudyConfig | undefined = studyConfigs.find(
    (config) => config.id === id,
  );
  const initials = id
    .split("-")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <svg viewBox="0 0 160 115" aria-hidden="true" className="material-art">
      <ellipse cx="80" cy="101" rx="53" ry="7" fill="#4f4220" opacity=".07" />
      {id === "transferring" && (
        <g>
          <path d="M17 78L128 71L144 96L29 103Z" fill="#cfb78e" />
          {[48, 108].map((x, i) => (
            <g key={x}>
              <ellipse cx={x} cy="76" rx="23" ry="12" fill="#b59461" />
              <path
                d={`M${x - 23} 76Q${x - 18} 106 ${x + 18} 96L${x + 23} 76Q${x} 95 ${x - 23} 76`}
                fill="#d6b888"
              />
              {i === 0 &&
                [-10, 0, 10].map((dx, j) => (
                  <circle
                    key={dx}
                    cx={x + dx}
                    cy={j === 1 ? 67 : 74}
                    r="7"
                    fill="#a67b43"
                  />
                ))}
            </g>
          ))}
        </g>
      )}
      {id === "shape-puzzle" && (
        <g transform="translate(16 34) rotate(-6 65 35)">
          <rect width="128" height="55" rx="4" fill="#c7a875" />
          <circle cx="24" cy="27" r="15" fill="#e0bf83" />
          <rect x="48" y="13" width="29" height="29" fill="#e0bf83" />
          <path d="M103 11L119 42H87Z" fill="#e0bf83" />
          {[24, 62, 103].map((x) => (
            <circle key={x} cx={x} cy="28" r="3" fill="#a67e49" />
          ))}
        </g>
      )}
      {id === "pink-tower" &&
        Array.from({ length: 7 }, (_, i) => {
          const w = 59 - i * 7,
            y = 88 - i * 11;
          return (
            <g key={i}>
              <path
                d={`M${80 - w / 2} ${y}l${w / 2} -7 ${w / 2} 7 -${w / 2} 7Z`}
                fill="#e5a6b0"
              />
              <path
                d={`M${80 - w / 2} ${y}l${w / 2} 7v12l-${w / 2} -7Z`}
                fill="#ce8191"
              />
              <path
                d={`M80 ${y + 7}l${w / 2} -7v12L80 ${y + 19}Z`}
                fill="#b96f80"
              />
            </g>
          );
        })}
      {id === "cylinder-blocks" && (
        <g>
          <path d="M20 70l100 -16 22 16 -100 19Z" fill="#ddbd87" />
          <path d="M20 70l22 19v16L20 86Z" fill="#b18c56" />
          <path d="M42 89l100 -19v16L42 105Z" fill="#c29d68" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${39 + i * 20} ${69 - i * 3})`}>
              <path d="M-7 -8v13q7 6 14 0v-13" fill="#be975f" />
              <ellipse cy="-8" rx="7" ry="4" fill="#ecd09d" />
              <rect x="-2" y="-15" width="4" height="7" rx="2" fill="#ab814c" />
              <ellipse cy="-16" rx="4" ry="2.5" fill="#d9b57b" />
            </g>
          ))}
        </g>
      )}
      {id === "pouring" && (
        <g>
          <path d="M18 88l105 -9 22 16 -107 12Z" fill="#ccae7b" />
          <path
            d="M36 48h29l-4 42q-11 10-22 0Z"
            fill="#eee8d8"
            stroke="#c7c5b4"
          />
          <path
            d="M65 55c24 -7 21 27-2 21"
            fill="none"
            stroke="#d4d0be"
            strokeWidth="6"
          />
          <path d="M92 57h29l-4 32q-11 10-22 0Z" fill="#aab9b1" />
          <path
            d="M121 63c20 -6 17 23-2 19"
            fill="none"
            stroke="#9aaa9f"
            strokeWidth="5"
          />
          <ellipse cx="50" cy="48" rx="15" ry="5" fill="#c4d8d8" />
          <ellipse cx="106" cy="57" rx="15" ry="5" fill="#82988a" />
        </g>
      )}
      {id === "dressing-frame" && (
        <g transform="translate(35 17) rotate(7 45 40)">
          <rect width="90" height="85" rx="3" fill="#bc9465" />
          <rect x="7" y="7" width="76" height="71" fill="#a9b7c1" />
          <path d="M46 8v69" stroke="#778f9f" strokeWidth="2" />
          {[22, 42, 62].map((y) => (
            <circle key={y} cx="46" cy={y} r="4" fill="#f2e4c9" />
          ))}
        </g>
      )}
      {id === "color-tablets" && (
        <g transform="translate(32 24) rotate(-8 48 40)">
          {[
            "#c95d51",
            "#d0af51",
            "#789aa9",
            "#c95d51",
            "#d0af51",
            "#789aa9",
          ].map((c, i) => (
            <g
              key={i}
              transform={`translate(${(i % 3) * 33} ${Math.floor(i / 3) * 41})`}
            >
              <rect width="25" height="34" rx="2" fill="#e7d4b2" />
              <rect x="4" y="4" width="17" height="26" rx="1" fill={c} />
            </g>
          ))}
        </g>
      )}
      {id === "red-rods" && (
        <g transform="translate(25 26)">
          {Array.from({ length: 7 }, (_, index) => (
            <rect
              key={index}
              x="0"
              y={index * 10}
              width={105 - index * 13}
              height="6"
              rx="1"
              fill="#b84b42"
            />
          ))}
        </g>
      )}
      {id === "broad-stair" && (
        <g transform="translate(28 30) rotate(-4 52 35)">
          {Array.from({ length: 7 }, (_, index) => {
            const side = 14 - index * 1.5;
            return (
              <g
                key={index}
                transform={`translate(${index * 14} ${index * 7})`}
              >
                <path
                  d={`M0 0L${side} -5L${side + 22} 3L22 8Z`}
                  fill="#aa8669"
                />
                <path d={`M0 0L22 8V${8 + side}L0 ${side}Z`} fill="#85634a" />
                <path
                  d={`M22 8L${side + 22} 3V${3 + side}L22 ${8 + side}Z`}
                  fill="#987359"
                />
              </g>
            );
          })}
        </g>
      )}
      {id === "number-rods" && (
        <g transform="translate(24 25)">
          {Array.from({ length: 7 }, (_, row) => {
            const units = 7 - row;
            return (
              <g key={units} transform={`translate(0 ${row * 10})`}>
                {Array.from({ length: units }, (_, unit) => (
                  <rect
                    key={unit}
                    x={unit * 15}
                    width="15"
                    height="6"
                    fill={unit % 2 ? "#416f97" : "#b84b42"}
                  />
                ))}
              </g>
            );
          })}
        </g>
      )}
      {id === "sandpaper-letters" && (
        <g transform="translate(21 23) rotate(-4 58 36)">
          {[
            [0, "m"],
            [40, "a"],
            [80, "s"],
          ].map(([x, letter]) => (
            <g key={letter} transform={`translate(${x} 0)`}>
              <rect width="35" height="62" rx="2" fill="#49779a" />
              <text
                x="17.5"
                y="43"
                textAnchor="middle"
                fill="#dfc9a4"
                fontFamily="Georgia, serif"
                fontSize="38"
              >
                {letter}
              </text>
            </g>
          ))}
        </g>
      )}
      {study && (
        <g transform="translate(25 23) rotate(-4 55 36)">
          <rect width="110" height="72" rx="5" fill="#d6bc8f" />
          <rect x="5" y="5" width="100" height="62" rx="3" fill="#eee8d9" />
          {study.pieces.slice(0, 6).map((piece, index) => (
            <g
              key={piece.id}
              transform={`translate(${19 + (index % 3) * 34} ${19 + Math.floor(index / 3) * 30})`}
            >
              {piece.shape === "circle" ? (
                <circle r="10" fill={piece.color} />
              ) : piece.shape === "triangle" ? (
                <path d="M0 -11L11 9H-11Z" fill={piece.color} />
              ) : (
                <rect
                  x="-12"
                  y="-8"
                  width="24"
                  height="16"
                  rx="2"
                  fill={piece.color}
                />
              )}
            </g>
          ))}
          <text
            x="98"
            y="63"
            textAnchor="end"
            fill="#74664f"
            fontSize="9"
            fontFamily="system-ui, sans-serif"
          >
            {initials}
          </text>
        </g>
      )}
    </svg>
  );
}
