import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, KeyRound, Leaf, LogOut, ShieldCheck } from "lucide-react";
import type { SchoolAccessSession } from "../domain/access";
import { findSchool, schoolAccess } from "./access";
export default function SchoolAccessGate({
  slug,
  children,
}: {
  slug: string | null;
  children: ReactNode;
}) {
  const school = findSchool(slug);
  const [session, setSession] = useState<SchoolAccessSession | null>(null),
    [loading, setLoading] = useState(!!school),
    [code, setCode] = useState(""),
    [remember, setRemember] = useState(true),
    [error, setError] = useState(""),
    [pending, setPending] = useState(false),
    [storageNote, setStorageNote] = useState(false);
  useEffect(() => {
    let active = true;
    if (!school) return;
    schoolAccess.restore(school.id).then((value) => {
      if (active) {
        setSession(value);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [school]);
  if (slug === null) return children;
  if (!school)
    return (
      <main className="school-entry">
        <h1>School not found.</h1>
        <p>Check the link your school shared with you.</p>
        <a className="text-button" href={import.meta.env.BASE_URL}>
          Explore the public classroom
        </a>
      </main>
    );
  if (loading)
    return (
      <main className="school-entry">
        <p>Opening your school’s classroom…</p>
      </main>
    );
  if (session)
    return (
      <>
        <div className="school-access-strip">
          <span>
            <Leaf size={17} />
            {school.name} · Family access <small>DEMO</small>
          </span>
          <button
            onClick={async () => {
              await schoolAccess.forget(school.id);
              setSession(null);
              setCode("");
              setStorageNote(false);
            }}
          >
            <LogOut size={14} /> Forget this device
          </button>
        </div>
        {storageNote && (
          <p className="storage-note">
            Access is open for this visit. Device storage is unavailable, so the
            code will be needed next time.
          </p>
        )}
        {children}
      </>
    );
  return (
    <main className="school-entry">
      <a href={import.meta.env.BASE_URL} className="entry-brand">
        <Leaf size={25} strokeWidth={1.3} /> Montessori Virtual Room
      </a>
      <div className="school-entry-card">
        <span className="entry-school-icon">
          <Leaf size={34} strokeWidth={1.2} />
        </span>
        <p className="eyebrow">WELCOME, {school.name.toUpperCase()} FAMILIES</p>
        <h1>
          A little closer
          <br />
          to their world.
        </h1>
        <p>
          Your school’s Montessori classroom, ready to explore together. Enter
          the shared code provided by your school.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            setError("");
            try {
              const result = await schoolAccess.redeem(
                school.id,
                code,
                remember,
              );
              setSession(result.session);
              setStorageNote(remember && !result.remembered);
              setCode("");
            } catch (err) {
              setError(
                err instanceof Error
                  ? err.message
                  : "Access could not be opened. Please try again.",
              );
            } finally {
              setPending(false);
            }
          }}
        >
          <label className="entry-code-label" htmlFor="school-access-code">
            School access code
          </label>
          <div className="entry-code">
            <KeyRound size={18} />
            <input
              id="school-access-code"
              required
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={80}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your school’s code"
              aria-describedby={error ? "access-error" : undefined}
              aria-invalid={!!error}
            />
          </div>
          <label className="remember-choice">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />{" "}
            Remember access on this device
          </label>
          {error && (
            <p className="access-error" role="alert" id="access-error">
              {error}
            </p>
          )}
          <button
            className="primary-button full-width"
            disabled={pending}
            type="submit"
          >
            {pending ? "Opening…" : "Enter the classroom"}
            <ArrowRight size={18} />
          </button>
        </form>
        <p className="accountless-note">
          <ShieldCheck size={16} /> No individual family account needed.
        </p>
        <div className="demo-access-note">
          <strong>Interactive access preview</strong>
          <p>
            Try the shared demo code <code>GREENWOOD</code>. This static
            prototype demonstrates the flow; it does not enforce a paid school
            license.
          </p>
        </div>
      </div>
      <p className="entry-footer">
        One school. Every family. A shared space for discovery.
      </p>
    </main>
  );
}
