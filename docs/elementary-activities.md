# Concrete elementary activity modules

This first batch brought the collection to 15 unique accessible prototypes. The [following batch](activity-expansion.md) brings it to 18. Shared placements count once. Each remains an educational draft requiring educator review.

| Material                             | Rooms     | Interaction and limitation                                                                                                                                               |
| ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cards and Counters                   | 3–6, 6–9  | Ten numeral cards, 55 counters, individual placements in paired arrangements. The digital mat supplies positioning guides. Elementary placement is a foundation revisit. |
| Stamp Game · Addition                | 6–9       | Build two quantities, combine them, exchange ten for one of the next place value, record the sum. Three problems; introductions may begin before elementary.             |
| World Puzzle Map                     | 3–6, 6–9  | Seven geographic color groups, two hemispheres, knobs, lifting, dragging, and fitting. Cross-hemisphere fragments move together, unlike separate physical insets.        |
| Fraction Insets · Equivalence        | 6–9, 9–12 | Whole through tenths; compare smaller equal sectors against one half, one third, or three fourths. Sector alignment is assisted.                                         |
| Constructive Triangles · Shape Study | 6–9, 9–12 | Translation and rotation of three actual rectangular-box pairs, with black joining edges. A foundational subset, not the entire box or an advanced equivalency lesson.   |

School conventions and readiness determine presentation order. Room placement is not an assertion that each material is introduced at that age. Nido and Adolescents continue as adult-facing tours; these additions do not pretend to simulate infant development or adolescent community projects.

## Framework

Each module supplies its own typed state, reducer, completion predicate, and 2D view through `ActivityDefinition`. The shared host handles reset and progress events. `example()` optionally returns successive states with captions. `WorkedExample` reuses the material view with interaction disabled, and plays or steps through movements without changing learner state. It starts paused; reduced-motion styles suppress interpolation.

A shared SVG pointer adapter translates screen coordinates through the current SVG matrix. Map and triangle pieces also accept keyboard actions and offer HTML controls. All educational copy and source links live in `src/content/en/elementary.ts`, separate from reducers.

Flat materials use 2D activity views. There is no compulsory 3D switch. The classroom still depicts them as selectable physical boards or trays, using local SVG illustrations. Use optional activity-level 3D when depth, volume, or handling contributes meaningfully to the material.

## Geography assets

Made with Natural Earth, whose datasets are public domain: <https://www.naturalearthdata.com/about/terms-of-use/>.

Input: Natural Earth `ne_110m_geography_regions_polys.geojson`, from <https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_geography_regions_polys.geojson>. Downloaded 2026-09-12. The builder joins continent polygons with islands, island groups, and isthmuses assigned to their region, then intersects them with Natural Earth `ne_110m_land.geojson` coastlines from the same repository. Region envelopes (notably island groups) include ocean and must never be rendered directly as land. Australia’s color also covers Oceanian islands. The seven-color convention and grouping require educator review.

`scripts/build-continent-paths.py` uses Shapely 2.1.2 at build time to merge polygons, then projects into two Lambert azimuthal equal-area hemispheres, centered at 110° W and 70° E. SVG simplification has a 0.35-unit tolerance on an 800-unit board. Generated paths are stored in `src/content/geography/continents.json`; no geographic dependency or network request runs in the browser.

To regenerate, provide both downloaded GeoJSON files (regions, then land) to that script using a Python environment with Shapely, then run `python3 scripts/build-elementary-thumbnails.py` and `npm run format`. The latter script generates original SVG illustrations under `public/materials/`. Static asset URLs honor `import.meta.env.BASE_URL` for GitHub Pages and future Vercel hosting.

## Validation

`src/activities/elementary.test.ts` checks quantity conservation, exact fraction coverage, triangle orientation and placement, map lift/replace history, room distribution, and demonstration final states. `scripts/browser-elementary-check.py` exercises all five completion paths, correction, resets, example state isolation, pointer manipulation, and responsive layouts. Browser and unit checks validate software behavior; they are not Montessori educator approval.

## Requested feedback

All accessible modules implement the optional `checkWork(state)` observation contract. The host displays it on request, marks it stale after further interaction, clears it on reset, and automatically confirms completion. Editable feedback copy is in `src/content/en/feedback.ts`. No scores, rewards, or constant correction prompts are added. `scripts/browser-feedback-check.py` checks this flow in both an original material and a new elementary activity.
