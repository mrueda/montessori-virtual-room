import { authenticity } from "../content/authenticity";
import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, BookOpen } from "lucide-react";
import type { Material } from "../domain/material";
import { content } from "../content/en/materials";
import { hasActivity } from "../activities/registry";
import MaterialArt from "./MaterialArt";
import NarrationButton from "./NarrationButton";
export default function MaterialPanel({
  material,
  onClose,
  onStart,
  initiallyAdult = false,
}: {
  material: Material;
  initiallyAdult?: boolean;
  onClose: () => void;
  onStart: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    [adult, setAdult] = useState(initiallyAdult),
    c = content[material.id];
  useEffect(() => {
    const el = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    el?.showModal();
    return () => {
      el?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="material-dialog"
      aria-labelledby="material-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="panel-inner">
        <button
          className="icon-button panel-close"
          aria-label="Close material information"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="panel-art">
          <MaterialArt id={material.id} />
        </div>
        <p className="eyebrow">
          {material.area} · {c.ageLabel}
        </p>
        <h2 id="material-title">{c.name}</h2>
        <p className="panel-description">{c.description}</p>
        {c.narration && <NarrationButton {...c.narration} />}
        <div className="skill-tags">
          {c.skills.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <h3>A purpose in every movement</h3>
        <p>{c.purpose}</p>
        <button
          className="primary-button full-width"
          disabled={!hasActivity(material.activityId)}
          onClick={onStart}
        >
          {hasActivity(material.activityId)
            ? "Begin the activity"
            : "Activity in development"}
          <ArrowUpRight size={17} />
        </button>
        <button
          className="text-button adult-toggle"
          aria-expanded={adult}
          onClick={() => setAdult(!adult)}
        >
          <BookOpen size={16} />
          {adult ? "Hide" : "Read"} the parent & educator notes
        </button>
        {adult && (
          <div className="educator-notes">
            <p className="gentle-note">
              Educational draft · awaiting Montessori educator review.
            </p>
            <h3>About this simulation</h3>
            <p>{authenticity[material.id].reason}</p>
            <h3>References</h3>
            <ul>
              {authenticity[material.id].sources.map((url, index) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    Material or practice reference {index + 1}
                  </a>
                </li>
              ))}
            </ul>
            <h3>Direct aim</h3>
            <p>{c.directAim}</p>
            <h3>Indirect aims</h3>
            <ul>
              {c.indirectAims.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3>Traditional presentation</h3>
            <ol>
              {c.presentation.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <h3>Control of error</h3>
            <p>{c.controlOfError}</p>
            <h3>Readiness & prerequisites</h3>
            <p>{c.prerequisites}</p>
            <h3>For the adult</h3>
            <p>{c.adultNote}</p>
            <h3>Related materials</h3>
            <p>{c.related.map((id) => content[id].name).join(" · ")}</p>
            <h3>What comes next</h3>
            <p>{c.next}</p>
          </div>
        )}
      </div>
    </dialog>
  );
}
