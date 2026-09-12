import catalog from "./catalog.json";
import type {
  SchoolAccessService,
  SchoolAccessSession,
} from "../domain/access";
const prefix = "little-room:demo-school:";
export function schoolSlugFromPath(pathname: string, base: string) {
  const relative = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname.replace(/^\//, "");
  const match = /^school\/([^/]+)\/?$/.exec(relative);
  return match ? match[1] : null;
}
export const findSchool = (slug: string | null) =>
  catalog.find((s) => s.slug === slug);
export function parseSession(
  raw: string | null,
  schoolId: string,
  now = Date.now(),
): SchoolAccessSession | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    return s &&
      s.schoolId === schoolId &&
      s.scope === "school-family" &&
      s.mode === "demo" &&
      typeof s.expiresAt === "string" &&
      Date.parse(s.expiresAt) > now
      ? {
          schoolId: s.schoolId,
          scope: "school-family",
          mode: "demo",
          expiresAt: s.expiresAt,
        }
      : null;
  } catch {
    return null;
  }
}
/** Public demo only. Replace this adapter with server requests before real licensing. */
export const schoolAccess: SchoolAccessService = {
  async restore(schoolId) {
    try {
      return parseSession(localStorage.getItem(prefix + schoolId), schoolId);
    } catch {
      return null;
    }
  },
  async redeem(schoolId, code, remember) {
    if (
      !catalog.some((s) => s.id === schoolId) ||
      code.trim().toUpperCase() !== "GREENWOOD"
    )
      throw new Error(
        "That code does not match this school. Please try again.",
      );
    const session: SchoolAccessSession = {
      schoolId,
      scope: "school-family",
      mode: "demo",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    let remembered = false;
    try {
      if (remember) {
        localStorage.setItem(prefix + schoolId, JSON.stringify(session));
        remembered = true;
      } else localStorage.removeItem(prefix + schoolId);
    } catch {
      /* The visit can continue without persistent device storage. */
    }
    return { session, remembered };
  },
  async forget(schoolId) {
    try {
      localStorage.removeItem(prefix + schoolId);
    } catch {
      /* Storage may be disabled. */
    }
  },
};
export function schoolLink(slug: string) {
  return new URL(
    `${import.meta.env.BASE_URL}school/${encodeURIComponent(slug)}/`,
    window.location.origin,
  ).href;
}
