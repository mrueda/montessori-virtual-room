# School access without individual family accounts

> Historical future planning: the first release is a free public Montessori resource with no login, access codes, or tiers. The school prototype is not part of the active app. See [the current activity roadmap](activity-roadmap.md) for the current scope.

## Product contract

One annual school license covers unlimited family access. A family follows the school's URL or a QR encoding that URL, enters the school's shared code, and explores. Remembered access belongs to the device and school. A personalized account is optional later for favorites, individual progress, or a personal subscription; it is not a prerequisite for school-provided family access.

School staff/admin authentication is a separate concern. A family code must never authorize license administration, roster access, private reporting, code rotation, or billing management.

## Current static demonstration

`/school/greenwood/` opens a clearly labeled access preview. Its shared **public demo code** is `GREENWOOD`. The default checkbox remembers a school-scoped demo grant for 30 days. Unchecking it opens only the current visit. “Forget this device” removes the remembered grant. Storage failures allow the visit to proceed and explain that the code will be needed again. No name, email, user ID, or raw shared code is stored.

The demo code is intentionally public client-side code. Local storage can be edited, and the static material assets remain publicly available. This is a demonstrable access experience, not secure authentication, license enforcement, or a paid-access barrier. Do not configure real school codes in this static adapter. The sample school dashboard is also a public mockup, not a staff-only portal.

`src/school/catalog.json` contains public school metadata and the known school slugs. A Vite build plugin emits an `index.html` at each known `/school/<slug>/` path so GitHub Pages can serve school links directly, with the correct deployment base. Root and project-site builds use the same application. The sharing panel in the sample school overview exposes a copyable dedicated link; a school can encode that link in a QR without putting the code in the URL.

## Portable service boundary

`SchoolAccessService` in `src/domain/access.ts` defines restoring access, redeeming a code, and forgetting a device. `src/school/access.ts` supplies the replaceable static demo adapter. The entry UI depends on those operations rather than calling a provider SDK. `PersonalIdentity` is a separate optional concept. The family grant contains a school scope, not an individual identity or family-seat count.

When a server is introduced, replace the demo adapter with API calls:

1. Resolve public school metadata by slug and show the school welcome.
2. Submit the shared code to a server endpoint over HTTPS. Validate it against a server-side hash and check the school license status and room entitlements.
3. Issue a school-scoped session in an HttpOnly, Secure cookie. Remembered access can use a longer expiry; unremembered access should use a browser-session cookie. Never retain the raw school code in local storage or a query string.
4. Restore via a session endpoint and authorize protected content/API requests on the server. Expired/revoked licenses or code rotation must invalidate access according to a defined policy, not merely change a client flag.
5. Rate-limit code attempts and provide a school-managed rotation/recovery process. A shared code is intentionally shareable; decide acceptable redistribution and device policy without imposing individual-family accounts.
6. Authenticate school administrators independently. Stripe subscription state can grant an organization license through verified webhook processing. Family access remains unlimited under that license.
7. Offer an optional individual sign-in for personal features. Keep personal data scoped to the individual while preserving the school's organization entitlement.

No backend, payments, or real school security has been implemented in this iteration. GitHub Pages remains suitable for this public prototype; the service interface can move to Vercel functions or an independent API without changing the activity reducers or room definitions.
