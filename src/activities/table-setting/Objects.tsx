import type { Item } from "./model";
// Original object outlines, shared by the work surface and its outline mat.
export function ObjectArt({
  item,
  folded = false,
  outline = false,
}: {
  item: Item;
  folded?: boolean;
  outline?: boolean;
}) {
  const stroke = outline ? "#7f8f77" : "#737e70",
    fill = outline
      ? "none"
      : item === "napkin"
        ? "#ce9b85"
        : item === "glass"
          ? "#bfd8d5"
          : "#f1efdf";
  if (item === "plate")
    return (
      <g>
        <circle r="95" fill={fill} stroke={stroke} strokeWidth="3" />
        <circle r="73" fill="none" stroke={stroke} strokeWidth="1.5" />
      </g>
    );
  if (item === "glass")
    return (
      <g>
        <circle r="34" fill={fill} stroke={stroke} strokeWidth="3" />
        <circle r="26" fill="none" stroke={stroke} />
        {!outline && (
          <path
            d="M-22-12Q-26 0-21 10"
            fill="none"
            stroke="#eff8f4"
            strokeWidth="4"
          />
        )}
      </g>
    );
  if (item === "napkin")
    return (
      <g>
        <rect
          x={folded ? -27 : -54}
          y="-57"
          width={folded ? 54 : 108}
          height="114"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <path
          d={folded ? "M-19-48V48H19" : "M0-57V57"}
          fill="none"
          stroke={outline ? stroke : "#a47662"}
          strokeDasharray="3 4"
        />
      </g>
    );
  if (item === "spoon")
    return (
      <g fill={outline ? "none" : "#b9c2ba"} stroke={stroke} strokeWidth="2">
        <path d="M-5-22C-5 8-9 35-8 64Q0 79 8 64C9 35 5 8 5-22Z" />
        <ellipse cy="-44" rx="20" ry="29" />
        {!outline && (
          <ellipse cy="-45" rx="12" ry="20" fill="#d7ded7" strokeWidth="1" />
        )}
      </g>
    );
  return (
    <path
      d="M-6-22L-9 64Q0 79 9 64L6-22Q20-25 20-40V-72H14V-43H7V-72H2V-43H-4V-72H-10V-43H-15V-72H-21V-40Q-20-25-6-22Z"
      fill={outline ? "none" : "#b9c2ba"}
      stroke={stroke}
      strokeWidth="2"
    />
  );
}
