import type {
  Demonstration,
  DemoPose,
  Triple,
} from "../../domain/demonstration";
export const durationOf = (demo: Demonstration) =>
  demo.steps.reduce((n, s) => n + s.duration, 0);
function lerp(a: Triple, b: Triple, t: number): Triple {
  return a.map((n, i) => n + (b[i] - n) * t) as Triple;
}
export function sample(
  demo: Demonstration,
  time: number,
  reduceMotion = false,
) {
  const poses: Record<string, DemoPose> = Object.fromEntries(
    demo.objects.map((o) => [o.id, { ...o.pose }]),
  );
  let start = 0,
    index = 0;
  let moving: string[] = [];
  for (const step of demo.steps) {
    if (time < start) break;
    const raw = Math.min(1, Math.max(0, (time - start) / step.duration)),
      t = reduceMotion ? (raw >= 1 ? 1 : 0) : raw * raw * (3 - 2 * raw);
    moving = step.changes.map((c) => c.id);
    for (const change of step.changes) {
      if (t === 1) {
        poses[change.id] = { ...change.to };
        continue;
      }
      const from = poses[change.id],
        position = lerp(from.position, change.to.position, t);
      position[1] += reduceMotion
        ? 0
        : Math.sin(Math.PI * t) * (change.lift ?? 0);
      poses[change.id] = {
        position,
        rotation: lerp(from.rotation, change.to.rotation, t),
        scale: lerp(from.scale, change.to.scale, t),
      };
    }
    if (raw < 1) break;
    start += step.duration;
    index++;
  }
  return {
    poses,
    index: Math.min(index, demo.steps.length - 1),
    moving,
    complete: time >= durationOf(demo),
  };
}
