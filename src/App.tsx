import { Component, Suspense, lazy, useCallback, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Compass,
  Flower2,
  Leaf,
  Maximize2,
  Move,
  RotateCcw,
  Sprout,
  X,
} from "lucide-react";
import { materials, rooms, materialsForRoom } from "./content/materials";
import { content } from "./content/en/materials";
import type { AvailableAgeGroup } from "./content/materials";
import type { Area, MaterialId } from "./domain/material";
import type { ProgressEvent } from "./domain/activity";
import MaterialArt from "./components/MaterialArt";
import MaterialPanel from "./components/MaterialPanel";
import { activityRegistry, hasActivity } from "./activities/registry";
const RoomRenderer = lazy(() => import("./room/RoomRenderer"));
const areas: ("All materials" | Area)[] = [
  "All materials",
  "Practical Life",
  "Sensorial",
  "Language",
  "Mathematics",
  "Culture",
  "Art",
  "Grace and Courtesy",
];
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="room-fallback">
        <Leaf size={32} />
        <p>The room preview is unavailable on this device.</p>
        <p>All materials are accessible in the collection below.</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  const [selected, setSelected] = useState<MaterialId | null>(null),
    [activity, setActivity] = useState<string | null>(null),
    [area, setArea] = useState<(typeof areas)[number]>("All materials"),
    [resetKey, setResetKey] = useState(0),
    [expanded, setExpanded] = useState(false),
    [about, setAbout] = useState(false);
  const [age, setAge] = useState<AvailableAgeGroup>("3-6y");
  const room = rooms[age];
  const [sceneId, setSceneId] = useState(room.defaultSceneId);
  const scene =
    room.scenes.find((candidate) => candidate.id === sceneId) ?? room.scenes[0];
  const roomMaterials = materialsForRoom(room);
  const roomAreaNames = new Set(roomMaterials.map((material) => material.area));
  const visibleAreas = areas.filter(
    (candidate) =>
      candidate === "All materials" || roomAreaNames.has(candidate),
  );
  const [, setEvents] = useState<ProgressEvent[]>([]);
  const onProgress = useCallback(
    (event: ProgressEvent) =>
      setEvents((events) => [...events.slice(-99), event]),
    [],
  );
  const material = materials.find((m) => m.id === selected),
    ActiveActivity =
      activity && hasActivity(activity) ? activityRegistry[activity] : null;
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a
          className="brand"
          href={import.meta.env.BASE_URL}
          aria-label="Montessori Virtual Room home"
        >
          <span className="brand-mark">
            <Sprout size={25} strokeWidth={1.4} />
          </span>
          <span>
            Montessori Virtual Room
            <span className="brand-subtitle">EXPLORE. PRACTICE. DISCOVER.</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <button
            className={!about ? "nav-link active" : "nav-link"}
            onClick={() => {
              setActivity(null);
              setAbout(false);
            }}
          >
            The classroom
          </button>
          <button className="nav-link" onClick={() => setAbout(!about)}>
            Our approach
          </button>
          <span className="nav-divider" />
          <button
            className="nav-link guide-link"
            onClick={() => {
              setAbout(true);
              setActivity(null);
            }}
          >
            <BookOpen size={16} /> A guide for grown-ups
          </button>
        </nav>
      </header>
      {about && (
        <aside className="approach-note">
          <div>
            <p className="eyebrow">LEARNING THROUGH DOING</p>
            <h2>A little space for independent discovery.</h2>
            <p>
              Open to everyone, with no account needed. This digital room
              introduces Montessori materials through quiet, purposeful
              activities. Give the learner time to notice and try again. Open
              any material’s parent & educator notes for its purpose and
              presentation.
            </p>
            <p>
              These early educational drafts await educator review. Virtual
              exploration complements the weight, texture, movement, and
              relationships of a real classroom.
            </p>
          </div>
          <button
            className="icon-button"
            aria-label="Close approach"
            onClick={() => setAbout(false)}
          >
            <X size={20} />
          </button>
        </aside>
      )}
      {ActiveActivity ? (
        <div id="main">
          <Suspense fallback={<p className="loading">Preparing your mat…</p>}>
            <ActiveActivity
              onExit={() => setActivity(null)}
              onProgress={onProgress}
            />
          </Suspense>
        </div>
      ) : (
        <main id="main">
          <section className="intro">
            <div>
              <p className="eyebrow">
                <span /> SMALL DISCOVERIES. MEANINGFUL GROWTH.
              </p>
              <h1>A room for curiosity.</h1>
              <p>{room.introduction}</p>
            </div>
            <div className="age-control">
              <label htmlFor="age-group">YOUR LEARNING ENVIRONMENT</label>
              <div className="age-select">
                <Sprout size={20} />
                <select
                  id="age-group"
                  value={age}
                  onChange={(e) => {
                    const nextAge = e.target.value as AvailableAgeGroup;
                    setAge(nextAge);
                    setSceneId(rooms[nextAge].defaultSceneId);
                    setArea("All materials");
                    setSelected(null);
                    setResetKey((k) => k + 1);
                  }}
                >
                  {Object.entries(rooms).map(([id, environment]) => (
                    <option key={id} value={id}>
                      {environment.name} · {environment.ageLabel}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </div>
          </section>
          <section
            className={`room-section ${expanded ? "expanded" : ""}`}
            aria-label="Interactive Montessori classroom"
          >
            <div className="room-topline">
              <span className="room-label">
                <span /> {scene.name.toUpperCase()}
              </span>
              <span className="room-caption">{scene.description}</span>
            </div>
            {room.scenes.length > 1 && (
              <div className="room-scene-navigation">
                <span>Explore this environment</span>
                <div role="group" aria-label="Classroom views">
                  {room.scenes.map((candidate) => (
                    <button
                      key={candidate.id}
                      type="button"
                      aria-pressed={candidate.id === scene.id}
                      onClick={() => {
                        setSceneId(candidate.id);
                        setSelected(null);
                        setResetKey((key) => key + 1);
                      }}
                    >
                      {candidate.shortName}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="room-canvas">
              <SceneBoundary>
                <Suspense
                  fallback={
                    <div className="room-fallback">
                      <Sprout size={28} />
                      <p>Preparing the classroom…</p>
                    </div>
                  }
                >
                  <RoomRenderer
                    scene={scene}
                    onSelect={setSelected}
                    resetKey={resetKey}
                  />
                </Suspense>
              </SceneBoundary>
            </div>
            <div className="room-bottom">
              <span className="room-instructions">
                <Move size={15} /> Drag to look around <span>·</span>{" "}
                {room.guide
                  ? "Select a material or a numbered place"
                  : "Select a material to explore"}
              </span>
              <div className="room-controls">
                <button
                  className="icon-button"
                  aria-label="Reset room view"
                  onClick={() => setResetKey((k) => k + 1)}
                >
                  <RotateCcw size={17} />
                </button>
                <button
                  className="icon-button"
                  aria-label={
                    expanded ? "Reduce room view" : "Expand room view"
                  }
                  aria-pressed={expanded}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? <X size={18} /> : <Maximize2 size={17} />}
                </button>
              </div>
            </div>
            <button
              className="room-discover"
              onClick={() =>
                scrollTo(
                  roomMaterials.length ? "materials" : "environment-guide",
                )
              }
            >
              <Compass size={18} /> Find your first discovery{" "}
              <ArrowDown size={15} />
            </button>
          </section>
          {age === "18m-3y" && (
            <div
              className="toddler-room-features"
              aria-label="Toddler environment features"
            >
              <span>SPACE TO MOVE</span>
              <span>CHILD-HEIGHT MIRROR</span>
              <span>QUIET READING NOOK</span>
              <span>EVERYDAY CARE</span>
            </div>
          )}
          {room.guide && (
            <section
              className="environment-guide"
              id="environment-guide"
              key={room.id}
            >
              <p className="eyebrow">{room.guide.audience}</p>
              <h2>Inside {room.name.replace(/^The /, "the ")}</h2>
              <p className="environment-introduction">
                {room.guide.introduction}
              </p>
              <div className="environment-points">
                {room.guide.points.map((point, index) => (
                  <details id={`environment-${point.id}`} key={point.id}>
                    <summary>
                      <span>{index + 1}</span>
                      {point.title}
                    </summary>
                    <p>{point.description}</p>
                  </details>
                ))}
              </div>
              <p className="environment-footnote">
                Illustrative environment tour · educational draft awaiting
                educator review.{" "}
                {roomMaterials.length > 0
                  ? "Explore the available materials below; readiness matters more than age labels."
                  : "This environment currently offers an explanatory tour."}
              </p>
              <div className="environment-sources">
                {room.guide.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.title} ↗
                  </a>
                ))}
              </div>
            </section>
          )}
          {roomMaterials.length > 0 && (
            <section className="materials-section" id="materials">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
                  <h2>A shelf full of possibilities.</h2>
                </div>
                <p>
                  Each material has a purpose.
                  <br />
                  Each discovery begins with you.
                </p>
              </div>
              <div
                className="material-filters"
                aria-label="Filter materials by classroom area"
              >
                {visibleAreas.map((a) => (
                  <button
                    key={a}
                    aria-pressed={a === area}
                    className={a === area ? "filter active" : "filter"}
                    onClick={() => setArea(a)}
                  >
                    {a}
                  </button>
                ))}
                <span className="collection-count">
                  {
                    roomMaterials.filter(
                      (m) => area === "All materials" || m.area === area,
                    ).length
                  }{" "}
                  materials to discover
                </span>
              </div>
              <div
                className={`material-grid ${age === "18m-3y" ? "toddler-material-grid" : ""}`}
              >
                {roomMaterials
                  .filter((m) => area === "All materials" || m.area === area)
                  .map((m) => (
                    <button
                      className={`material-card ${m.id}`}
                      key={m.id}
                      onClick={() => setSelected(m.id)}
                    >
                      <div className="card-art">
                        <MaterialArt id={m.id} />
                        {hasActivity(m.activityId) && (
                          <span
                            className="available-dot"
                            title="Interactive activity available"
                          />
                        )}
                      </div>
                      <div className="card-content">
                        <p className="card-area">{m.area}</p>
                        <div className="card-title">
                          <h3>{content[m.id].name}</h3>
                          <ArrowUpRight size={17} />
                        </div>
                        <p className="card-description">
                          {content[m.id].description}
                        </p>
                        <span className="card-age">
                          {content[m.id].ageLabel}
                          <span>·</span>
                          {hasActivity(m.activityId)
                            ? "Explore & practice"
                            : "Meet the material"}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
              {area !== "All materials" &&
                !roomMaterials.some((m) => m.area === area) && (
                  <div className="empty-area">
                    <BookOpen size={28} />
                    <h3>This shelf is still taking shape.</h3>
                    <p>
                      {area} materials will join the classroom in a future
                      chapter.
                    </p>
                    <button
                      className="text-button"
                      onClick={() => setArea("All materials")}
                    >
                      Explore the current collection <ArrowUpRight size={16} />
                    </button>
                  </div>
                )}
            </section>
          )}
          <section className="philosophy">
            <Flower2 size={34} strokeWidth={1} />
            <div>
              <h3>Less hurry. More wonder.</h3>
              <p>
                No scores. No rush. Just space to explore, practice, and
                discover at your own pace.
              </p>
            </div>
            <span className="philosophy-end">
              Space to explore.
              <br />
              And growing minds.
            </span>
          </section>
        </main>
      )}
      <footer>
        <span className="footer-brand">
          <Sprout size={17} /> Montessori Virtual Room
        </span>
        <p>A free Montessori resource for families and educators.</p>
        <span>EXPLORE AT YOUR OWN PACE</span>
      </footer>
      {material && (
        <MaterialPanel
          key={material.id}
          material={material}
          onClose={() => setSelected(null)}
          onStart={() => {
            setActivity(material.activityId);
            setSelected(null);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </>
  );
}
