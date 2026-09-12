# Deployment: GitHub Pages now, portable hosting later

## GitHub Pages setup

The application is a static Vite SPA with no server, credentials, payment processing, or database. `.github/workflows/pages.yml` verifies pull requests and pushes to `main`. Publishing is opt-in: only a manual run on `main` with the `publish` input enabled can configure, upload, and deploy Pages.

1. Put the project in a GitHub repository with the application at the repository root. Commit `package-lock.json`, `.nvmrc`, and the workflow along with the source.
2. In the repository, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. After release approval, run **Verify and deploy GitHub Pages** from the Actions tab on `main` and enable the **Publish to GitHub Pages** input. Ordinary pushes run verification only.
4. The deployment job exposes the site URL through the `github-pages` environment and its workflow summary.

If the production branch is different, change the workflow's push/pull-request branch lists and both `refs/heads/main` deployment conditions. Configure environment protection consistently. No personal access token or custom deployment secret is required; the workflow uses GitHub's scoped token and Pages OIDC deployment permissions.

**Publication is authorized by the founder.** The repository is public at `mrueda/montessori-virtual-room`, and GitHub Pages is configured to use Actions. The site address is <https://mrueda.github.io/montessori-virtual-room/>. Ordinary pushes verify the app; publishing requires a manual run with `publish` enabled. Local working notes are ignored and are not part of repository history.

## Build and URL behavior

CI uses Node 22 from `.nvmrc`, `npm ci`, formatting checks, activity-rule tests, and TypeScript/production compilation. The artifact is `dist/`, not source code or `node_modules`. Pull requests validate a subpath build and do not upload or deploy Pages artifacts.

The Pages action reports the site's actual `base_path`. The workflow passes that path to Vite's standard `--base` option, so no repository name is hard-coded into application components or Vite configuration:

- Project site: `https://OWNER.github.io/REPOSITORY/` → `/REPOSITORY/`.
- User/organization site or configured custom domain: root → `/`.
- Local development and ordinary Vercel deployment: default `/`.

The home link uses `import.meta.env.BASE_URL`; Vite resolves its built CSS, JavaScript, and lazy 3D/activity chunks using the same base. Future static assets should be imported from source or referenced with `import.meta.env.BASE_URL` when they are in `public/`. Avoid literal `/assets/...` URLs.

Classroom and activity navigation use state. The release is public: no login, school-code gate, or commercial preview is mounted. The historical `/school/greenwood/` URL is emitted as a static public entry page so previously shared links continue working without rewrites; `?preview=school` also opens the public classroom. If route-based URLs are added while staying on Pages, choose hash routing or explicit static entry pages rather than depending on server fallback.

This setup follows [GitHub's custom Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Vite's static deployment guidance](https://vite.dev/guide/static-deploy).

## Test a project-site build locally

```sh
npm ci
npm test
npm run build -- --base=/montessori-virtual-room/
npm run preview -- --base=/montessori-virtual-room/
```

Open `http://localhost:4173/montessori-virtual-room/`, then test the home link, legacy public entry, material dialogs, activity launch, and 2D/3D switching. A built artifact is tied to its base URL; rebuild when moving it to a different base.

For a root deployment:

```sh
npm run build
npm run preview
```

`vite preview` is a local build-checking server; it is not the production host. GitHub Pages serves the uploaded static files.

## Moving to Vercel

Import the same repository into Vercel using its Vite preset. Use `npm ci` to install, `npm run build` to build, and `dist` as the output directory. Select Node 22. Leave the base at its default `/`. Do not carry the GitHub Pages project subpath into the Vercel build. No Vercel-specific runtime adapter is required for the current static app. Disable the Pages publishing workflow when Pages is no longer a desired deployment target.

The material registry, educator content, activity reducers, and 2D/3D renderers do not depend on GitHub or Vercel. Keep them portable when server features arrive:

- Introduce a service/API boundary for organization identity, roles, and saved progress. Keep client interaction state local and persist only deliberately chosen events/state.
- Implement authentication/session handling and authorization at a server boundary; client-side role or entitlement flags are presentation hints, not enforcement.
- Create Stripe checkout/customer-portal sessions and process verified webhook events on the server. Store secret keys only in server environment variables. Do not put secrets into `VITE_*` variables or the static bundle.
- Derive paid entitlements from server-verified subscription state. Do not gate pedagogy or activity rules inside individual material reducers.
- Add Vercel functions or an independent backend when required. A later framework migration can reuse the domain models and activity components; hosting migration alone does not require Next.js.

These are future migration boundaries, not first-release requirements. The first release has no authentication, subscriptions, school licensing, or tiers. Historical school prototypes are not imported by the public app.
