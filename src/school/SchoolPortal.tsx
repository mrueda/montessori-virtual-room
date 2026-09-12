import { schoolLink } from "./access";
import { lazy, Suspense, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Palette,
  Search,
  Settings2,
  Sprout,
  Users,
  X,
} from "lucide-react";
import type { MaterialId } from "../domain/material";
import { materialsForRoom, primaryRoom } from "../content/materials";
import { content } from "../content/en/materials";
import MaterialArt from "../components/MaterialArt";
import { parentQuestions, sampleInterest, sampleMetrics } from "./demo";
import type { SchoolBrand } from "./demo";
const RoomRenderer = lazy(() => import("../room/RoomRenderer"));
const materials = materialsForRoom(primaryRoom);
const primaryScene =
  primaryRoom.scenes.find((scene) => scene.id === primaryRoom.defaultSceneId) ??
  primaryRoom.scenes[0];
type Tab = "families" | "educators" | "school";
export default function SchoolPortal({
  brand,
  onBrand,
  onSelect,
  onExplore,
}: {
  brand: SchoolBrand;
  onBrand: (brand: SchoolBrand) => void;
  onSelect: (id: MaterialId) => void;
  onExplore: () => void;
}) {
  const [tab, setTab] = useState<Tab>("families"),
    [query, setQuery] = useState(""),
    [draft, setDraft] = useState(brand),
    [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const settings = useRef<HTMLDialogElement>(null);
  const filtered = materials.filter((m) =>
    (content[m.id].name + " " + m.area)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <main className="school-page" id="main">
      <div className="preview-banner">
        <span>
          <span className="preview-dot" /> SCHOOL EXPERIENCE · INTERACTIVE
          PREVIEW
        </span>
        <p>A fictional school. A real way to explore the possibilities.</p>
        <button
          onClick={() => {
            setDraft(brand);
            settings.current?.showModal();
          }}
        >
          <Settings2 size={14} /> Make it your school
        </button>
      </div>
      <div className="school-identity">
        <div className="school-wordmark">
          <span>
            <Leaf size={29} strokeWidth={1.2} />
          </span>
          <div>
            <h2>{brand.name}</h2>
            <p>{brand.tagline}</p>
          </div>
        </div>
        <div className="school-powered">
          A PARENT COMPANION
          <br />
          <span>powered by Montessori Virtual Room</span>
        </div>
      </div>
      <nav className="portal-nav" aria-label="School preview views">
        <button
          aria-pressed={tab === "families"}
          onClick={() => setTab("families")}
        >
          <Sprout size={16} /> For families
        </button>
        <button
          aria-pressed={tab === "educators"}
          onClick={() => setTab("educators")}
        >
          <GraduationCap size={16} /> Educator library
        </button>
        <button
          aria-pressed={tab === "school"}
          onClick={() => setTab("school")}
        >
          <LayoutDashboard size={16} /> School overview{" "}
          <span className="sample-tag">SAMPLE</span>
        </button>
      </nav>
      {tab === "families" && (
        <>
          <section className="parent-hero">
            <div className="parent-hero-copy">
              <p className="eyebrow">WELCOME TO YOUR CHILD’S WORLD</p>
              <h1>
                A window into
                <br />
                their everyday
                <br />
                <em>discoveries.</em>
              </h1>
              <p>
                Understand the materials, the quiet moments, and the purposeful
                work that make a Montessori classroom special.
              </p>
              <button className="primary-button" onClick={onExplore}>
                Step inside the classroom <ArrowUpRight size={17} />
              </button>
              <span className="parent-hero-foot">
                <Sprout size={14} /> Children’s House · Ages 3–6
              </span>
            </div>
            <div className="parent-room-preview">
              <div className="parent-room-label">
                <span /> YOUR VIRTUAL CHILDREN’S HOUSE
              </div>
              <Suspense
                fallback={
                  <div className="room-fallback">Preparing the classroom…</div>
                }
              >
                <RoomRenderer
                  scene={primaryScene}
                  onSelect={onSelect}
                  resetKey={0}
                />
              </Suspense>
              <div className="parent-room-note">
                <Compass size={17} />
                <span>
                  Wonder what they’ve been working on?
                  <br />
                  <strong>Touch a material to discover its purpose.</strong>
                </span>
              </div>
            </div>
          </section>
          <section className="parent-welcome">
            <span className="welcome-icon">
              <BookOpen size={22} strokeWidth={1.3} />
            </span>
            <div>
              <p className="eyebrow">A NOTE FOR FAMILIES</p>
              <h2>You’re part of the discovery.</h2>
              <p>
                You don’t need to become a Montessori expert. This is a place to
                ask questions, look a little closer, and better understand the
                learning you hear about at home.
              </p>
            </div>
            <span className="welcome-signoff">
              A connection between
              <br />
              school and home.
            </span>
          </section>
          <section className="parent-materials">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE PURPOSE BEHIND THE WORK</p>
                <h2>Small materials. Big discoveries.</h2>
              </div>
              <button
                className="text-button"
                onClick={() => setTab("educators")}
              >
                Browse all five materials <ArrowRight size={15} />
              </button>
            </div>
            <div className="parent-material-grid">
              {(
                ["pink-tower", "pouring", "dressing-frame"] as MaterialId[]
              ).map((id) => (
                <button
                  key={id}
                  className={`parent-material-card ${id}`}
                  onClick={() => onSelect(id)}
                >
                  <div className="parent-material-art">
                    <MaterialArt id={id} />
                  </div>
                  <div>
                    <p className="card-area">
                      {materials.find((m) => m.id === id)?.area}
                    </p>
                    <h3>
                      {content[id].name}
                      <ArrowUpRight size={17} />
                    </h3>
                    <p>{content[id].purpose}</p>
                    <span>
                      Explore the material & its purpose{" "}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
          <section className="parent-questions">
            <div>
              <p className="eyebrow">YOU MIGHT BE WONDERING</p>
              <h2>
                A different way
                <br />
                of seeing learning.
              </h2>
              <p>
                A few questions that open up
                <br />
                meaningful conversations.
              </p>
              <span className="editorial-draft">
                Parent content draft · educator review pending
              </span>
            </div>
            <div>
              {parentQuestions.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <ChevronDown size={16} />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <div className="school-invitation">
            <div>
              <p className="eyebrow">FROM EXPLORATION TO CONVERSATION</p>
              <h2>Bring your curiosity to school.</h2>
              <p>
                Use what you discover here to start a conversation with your
                child’s guide.
              </p>
            </div>
            <button
              className="secondary-button"
              onClick={() => {
                setDraft(brand);
                settings.current?.showModal();
              }}
            >
              Preview school customization <ArrowUpRight size={16} />
            </button>
          </div>
        </>
      )}
      {tab === "educators" && (
        <section className="educator-library">
          <div className="portal-section-title">
            <div>
              <p className="eyebrow">A SHARED LANGUAGE FOR LEARNING</p>
              <h1>The material library.</h1>
              <p>
                Purpose, presentation, and progression. Ready for your
                educator’s review.
              </p>
            </div>
            <BookOpen size={44} strokeWidth={1} />
          </div>
          <div className="library-toolbar">
            <label className="library-search">
              <Search size={17} />
              <span className="sr-only">Search the material library</span>
              <input
                placeholder="Find a material or learning area…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <span>3–6 classroom · {filtered.length} materials</span>
          </div>
          <div className="library-list">
            {filtered.map((m) => (
              <button
                className="library-row"
                key={m.id}
                onClick={() => onSelect(m.id)}
              >
                <MaterialArt id={m.id} />
                <div>
                  <p className="card-area">
                    {m.area} · {content[m.id].ageLabel}
                  </p>
                  <h3>{content[m.id].name}</h3>
                  <p>{content[m.id].directAim}</p>
                </div>
                <span className="library-status">
                  <span /> Draft for review
                </span>
                <span className="library-format">2D + 3D</span>
                <ArrowUpRight size={19} />
              </button>
            ))}
            {!filtered.length && (
              <p className="library-empty">
                No materials match that search. Try “Sensorial” or “Pouring”.
              </p>
            )}
          </div>
          <div className="library-review-note">
            <GraduationCap size={24} />
            <div>
              <h3>Your expertise shapes the experience.</h3>
              <p>
                Review the terminology, presentation, and control of error with
                your guides before sharing these drafts with families.
              </p>
            </div>
          </div>
        </section>
      )}
      {tab === "school" && (
        <section className="school-dashboard">
          <div className="portal-section-title">
            <div>
              <p className="eyebrow">YOUR SCHOOL, MORE CONNECTED</p>
              <h1>A clearer picture.</h1>
              <p>
                A preview of how a school could understand and support parent
                exploration.
              </p>
            </div>
            <button
              className="secondary-button"
              onClick={() => setTab("families")}
            >
              Preview family experience <ExternalLink size={15} />
            </button>
          </div>
          <div className="sample-data-notice">
            <span className="sample-tag">ILLUSTRATIVE DATA</span>
            <p>
              These numbers are examples. No family accounts, tracking, or
              reporting are connected.
            </p>
          </div>
          <div className="dashboard-metrics">
            {sampleMetrics.map((m, i) => (
              <article key={m.label}>
                <span className="metric-icon">
                  {i === 0 ? (
                    <Users size={19} />
                  ) : i === 1 ? (
                    <Compass size={19} />
                  ) : (
                    <BookOpen size={19} />
                  )}
                </span>
                <p>{m.label}</p>
                <strong>{m.value}</strong>
                <small>{m.note}</small>
              </article>
            ))}
          </div>
          <div className="dashboard-columns">
            <article className="interest-card">
              <div className="dashboard-card-heading">
                <div>
                  <h3>What families are exploring</h3>
                  <p>Sample material visits · illustrative month</p>
                </div>
                <Compass size={21} />
              </div>
              <div className="interest-bars">
                {sampleInterest.map((m) => (
                  <div key={m.name}>
                    <div>
                      <span>{m.name}</span>
                      <span>{m.count}</span>
                    </div>
                    <div className="interest-track">
                      <span style={{ width: `${(m.count / 128) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="school-ready-card">
              <p className="eyebrow">YOUR SCHOOL EXPERIENCE</p>
              <h3>A thoughtful first impression.</h3>
              <p>
                Make the virtual classroom feel like an extension of your
                school.
              </p>
              <ul>
                <li>
                  <Check size={15} /> School name and welcome message
                </li>
                <li>
                  <Check size={15} /> Complete parent-facing experience
                </li>
                <li>
                  <Check size={15} /> Five materials with adult explanations
                </li>
              </ul>
              <button
                className="secondary-button"
                onClick={() => {
                  setDraft(brand);
                  settings.current?.showModal();
                }}
              >
                <Palette size={16} /> Edit this preview
              </button>
              <small>Preview settings apply only during this session.</small>
            </article>
          </div>
          <article className="school-share-card">
            <div>
              <p className="eyebrow">ONE SCHOOL LINK. EVERY FAMILY.</p>
              <h3>School access, without family accounts.</h3>
              <p>
                Share a school link and one access code. Families can remember
                access on their device.
              </p>
              <a href={schoolLink("greenwood")}>{schoolLink("greenwood")}</a>
              <p>
                Demo code: <strong>GREENWOOD</strong>
              </p>
            </div>
            <button
              className="secondary-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(schoolLink("greenwood"));
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Link copied" : "Copy demo school link"}
            </button>
          </article>
          <div className="pilot-callout">
            <div>
              <p className="eyebrow">A SMALL, USEFUL FIRST STEP</p>
              <h2>Start with a conversation.</h2>
              <p>
                Show a guide. Explore with a parent. Learn what your school
                needs before choosing a plan.
              </p>
            </div>
            <button
              className="primary-button"
              onClick={() => setTab("families")}
            >
              Open the family portal <ArrowRight size={17} />
            </button>
          </div>
          <p className="dashboard-footnote">
            School licensing and customization are product concepts. This
            preview does not create accounts, send invitations, or process
            payments.
          </p>
        </section>
      )}
      <div className="portal-bottom">
        <button className="text-button" onClick={onExplore}>
          <ArrowLeft size={14} /> Return to the public classroom
        </button>
        <span>{brand.name} · School preview</span>
      </div>
      <dialog
        ref={settings}
        className="school-settings"
        aria-labelledby="school-settings-title"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onBrand({
              name: draft.name.trim() || "Your Montessori school",
              tagline: draft.tagline.trim(),
            });
            setSaved(true);
            settings.current?.close();
          }}
        >
          <button
            type="button"
            className="icon-button panel-close"
            aria-label="Close school settings"
            onClick={() => settings.current?.close()}
          >
            <X size={18} />
          </button>
          <Palette size={28} strokeWidth={1.3} />
          <p className="eyebrow">MAKE THE PREVIEW YOUR OWN</p>
          <h2 id="school-settings-title">A familiar welcome.</h2>
          <p>
            Try your school’s name and a short introduction. These demo settings
            stay in this browser session.
          </p>
          <label>
            School name
            <input
              required
              maxLength={65}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </label>
          <label>
            School message
            <input
              maxLength={130}
              value={draft.tagline}
              onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
            />
          </label>
          <button className="primary-button full-width" type="submit">
            Apply to the preview <Check size={16} />
          </button>
        </form>
      </dialog>
      <span className="sr-only" role="status">
        {saved ? "School preview updated." : ""}
      </span>
    </main>
  );
}
