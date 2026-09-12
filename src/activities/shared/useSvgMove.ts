import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
/** Coordinates follow the SVG transform, so pointer movement works at any viewport size. */
export function useSvgMove(
  onMove: (index: number, x: number, y: number, settle: boolean) => void,
) {
  const ref = useRef<SVGSVGElement>(null);
  const drag = useRef<{
    index: number;
    dx: number;
    dy: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const point = (e: ReactPointerEvent) => {
    const svg = ref.current;
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return null;
    const p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    return p.matrixTransform(matrix.inverse());
  };
  return {
    ref,
    dragging,
    bind: (index: number, x: number, y: number, onTap: () => void) => ({
      onPointerDown: (e: ReactPointerEvent<SVGGElement>) => {
        if (e.button !== 0) return;
        const p = point(e);
        if (!p) return;
        e.preventDefault();
        e.currentTarget.focus({ preventScroll: true });
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = {
          index,
          dx: p.x - x,
          dy: p.y - y,
          startX: e.clientX,
          startY: e.clientY,
          lastX: x,
          lastY: y,
        };
      },
      onPointerMove: (e: ReactPointerEvent<SVGGElement>) => {
        const d = drag.current;
        if (!d || d.index !== index) return;
        const p = point(e);
        if (!p) return;
        if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 4) {
          setDragging(true);
          d.lastX = p.x - d.dx;
          d.lastY = p.y - d.dy;
          onMove(index, d.lastX, d.lastY, false);
        }
      },
      onPointerUp: (e: ReactPointerEvent<SVGGElement>) => {
        const d = drag.current;
        if (!d || d.index !== index) return;
        drag.current = null;
        setDragging(false);
        if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) <= 4)
          onTap();
        else onMove(index, d.lastX, d.lastY, true);
      },
      onPointerCancel: () => {
        const d = drag.current;
        drag.current = null;
        setDragging(false);
        if (d) onMove(d.index, d.lastX, d.lastY, true);
      },
    }),
  };
}
