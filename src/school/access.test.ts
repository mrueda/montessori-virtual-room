import { describe, it, expect, vi, afterEach } from "vitest";
import { parseSession, schoolSlugFromPath, schoolAccess } from "./access";
afterEach(() => vi.unstubAllGlobals());
describe("School-level demo access", () => {
  it("resolves root and GitHub Pages school paths", () => {
    expect(schoolSlugFromPath("/school/greenwood/", "/")).toBe("greenwood");
    expect(schoolSlugFromPath("/repo/school/greenwood", "/repo/")).toBe(
      "greenwood",
    );
    expect(schoolSlugFromPath("/repo/", "/repo/")).toBeNull();
  });
  it("rejects malformed, expired, and cross-school remembered grants", () => {
    expect(parseSession("bad", "one")).toBeNull();
    expect(parseSession("null", "one")).toBeNull();
    expect(
      parseSession(
        JSON.stringify({
          schoolId: "two",
          scope: "school-family",
          mode: "demo",
          expiresAt: "2099-01-01",
        }),
        "one",
      ),
    ).toBeNull();
    expect(
      parseSession(
        JSON.stringify({
          schoolId: "one",
          scope: "school-family",
          mode: "demo",
          expiresAt: "2000-01-01",
        }),
        "one",
      ),
    ).toBeNull();
  });
  it("remembers the school grant without storing the shared code or a user identity", async () => {
    const values = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => values.get(k) ?? null,
      setItem: (k: string, v: string) => values.set(k, v),
      removeItem: (k: string) => values.delete(k),
    });
    await expect(
      schoolAccess.redeem("demo-greenwood", "wrong", true),
    ).rejects.toThrow();
    const result = await schoolAccess.redeem(
      "demo-greenwood",
      " greenwood ",
      true,
    );
    expect(result.remembered).toBe(true);
    expect(result.session).not.toHaveProperty("userId");
    expect([...values.values()][0]).not.toContain("GREENWOOD");
    expect(await schoolAccess.restore("demo-greenwood")).toEqual(
      result.session,
    );
    await schoolAccess.forget("demo-greenwood");
    expect(await schoolAccess.restore("demo-greenwood")).toBeNull();
  });
  it("allows an unremembered visit when storage is unavailable", async () => {
    vi.stubGlobal("localStorage", {
      setItem: () => {
        throw new Error("blocked");
      },
      getItem: () => {
        throw new Error("blocked");
      },
    });
    const result = await schoolAccess.redeem(
      "demo-greenwood",
      "GREENWOOD",
      true,
    );
    expect(result.remembered).toBe(false);
    expect(result.session.schoolId).toBe("demo-greenwood");
    expect(await schoolAccess.restore("demo-greenwood")).toBeNull();
  });
});
