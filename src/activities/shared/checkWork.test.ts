import { describe, it, expect } from "vitest";
import {
  towerCheck,
  cylinderCheck,
  dressingCheck,
  pourCheck,
} from "./checkWork";
import {
  initialState as towerInitial,
  reduce as towerReduce,
} from "../pink-tower/model";
import { initialState as cylinderInitial } from "../cylinder-blocks/model";
import { initialState as dressingInitial } from "../dressing-frame/model";
import { initialState as pourInitial } from "../pouring/model";
import * as counters from "../cards-counters/model";
import * as fractions from "../fraction-insets/model";
import * as stamps from "../stamp-game/model";
import * as map from "../world-puzzle-map/model";

describe("requested observations", () => {
  it("distinguishes a correct partial tower from order and alignment issues", () => {
    let s = towerReduce(
      towerReduce(towerInitial(), { type: "select", size: 10 }),
      { type: "place", offset: 0 },
    );
    expect(towerCheck(s)).toContain("1 placed cubes");
    expect(towerCheck({ ...s, stack: [{ size: 9, offset: 0 }] })).toContain(
      "cube 1 from the bottom",
    );
    s = towerReduce(s, { type: "adjust", offset: 30 });
    expect(towerCheck(s)).toContain("off center");
  });
  it("explains why preassembled work is not yet complete", () => {
    expect(cylinderCheck(cylinderInitial())).toContain(
      "10 pieces have not been lifted",
    );
    expect(dressingCheck(dressingInitial())).toContain("starts fastened");
    expect(map.checkWork(map.initialState())).toContain(
      "7 continents still need to be lifted",
    );
  });
  it("distinguishes pouring cleanup from the need to repeat an empty failed pour", () => {
    expect(
      pourCheck({
        ...pourInitial(),
        source: 0,
        receiver: 98,
        spilled: 2,
        poured: true,
      }),
    ).toContain("wipe");
    expect(
      pourCheck({
        ...pourInitial(),
        source: 0,
        receiver: 0,
        spilled: 100,
        poured: true,
      }),
    ).toContain("Start again");
  });
  it("reports the specific misplaced quantity and reference coverage", () => {
    let s = counters.initialState();
    for (let n = 1; n <= 10; n++)
      s = counters.reduce(counters.reduce(s, { type: "select", value: n }), {
        type: "card",
        column: n - 1,
      });
    expect(counters.checkWork(s)).toContain(
      "Under numeral 1, you have placed 0",
    );
    let f = fractions.reduce(fractions.initialState(), {
      type: "select",
      denominator: 3,
    });
    f = fractions.reduce(f, { type: "place" });
    expect(fractions.checkWork(f)).toContain("less area");
    f = fractions.reduce(f, { type: "place" });
    expect(fractions.checkWork(f)).toContain("beyond");
    expect(stamps.checkWork(stamps.initialState())).toContain(
      "Addend 1 currently represents 0",
    );
  });
});
