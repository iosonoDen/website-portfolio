# Dennis Oteri — Portfolio

Personal site of **Dennis Oteri**, Front End Developer based between Canegrate, Milan.

The site is a single-page portfolio built to be read by recruiters and hiring managers in one sitting: who I am, what I ship, where I have worked, and how to contact me. Copy, stats, and projects live in typed files — not in a CMS — so the page stays honest, fast, and easy to update.

Live site: [iosonoden.github.io/website-portfolio](https://iosonoden.github.io/website-portfolio/) · Source: [iosonoDen/website-portfolio](https://github.com/iosonoDen/website-portfolio)

## What a visitor sees

The homepage is one scroll. The header stays on top and jumps to each section; **Download CV** lives in the header (and in the mobile menu) and serves `/dennis-oteri-cv.pdf`. A floating **E-mail me** button (`mailto:`) follows the page and slides away when the contact section is near.

| Section | What it does |
| --- | --- |
| **Hero** | Name, location, short pitch, portrait, `1+` years and `9+` technologies in production. |
| **Work** | Current projects (DevPulse, Financy, Zafferano Milano), each with a screenshot and a short description. |
| **About** | Origin story with a childhood photo. |
| **Experience** | MADIC (Beta Testing Specialist, Nov 2024–present) and Vodafone (L2 Technical Support, 2022–2024). |
| **Skills** | Tools grouped by how they are used: Frontend, Backend & Data, Quality & Delivery, Design. Not a logo wall. |
| **Contact** | Email, LinkedIn, GitHub, and Instagram. There is no contact form; mail is the conversion path. |

The design is dark, high-contrast, and cinematic: orange accent, Inter for text. Clickable controls scale slightly on hover with a white glow, and darken on press.

## How it works in practice

You do not log into an admin panel. You edit TypeScript content, then the App Router renders it.

1. Change facts in `content/` (`profile.ts`, `experience.ts`, `work.ts`, `skills.ts`, `site.ts`).
2. Swap images in `public/images/` or the CV in `public/dennis-oteri-cv.pdf`, and keep `width`/`height` in `content/` in sync.
3. Run `npm run dev` and check the homepage.
4. Commit. CI lints, type-checks, tests, and builds on `main` and `develop`; every push to `main` deploys to GitHub Pages.

Navigation, the CV, the about copy, and the share image live in `content/site.ts`. Social links and the email address live in `content/profile.ts`; the contact block, the floating email button, and the JSON-LD all read from there, so they stay in sync.

TypeScript guards the content: every skill `id` must have an icon in `components/ui/skill-icons.tsx`, and every social `label` must have an icon in `components/ui/social-links.tsx`. `tests/content-assets.test.ts` fails if a path in `content/` points to a file that is not in `public/`.

## Architecture

```
app/                    Next.js App Router
  layout.tsx            Metadata, Inter font, schema.org Person JSON-LD
  page.tsx              Composes header + sections + footer
  robots.ts             Allows crawlers (static)
  globals.css           Design tokens, .interactive-hit, reveal and mobile menu motion
content/                Source of truth for copy and facts
types/content.ts        Shared TypeScript contracts
components/
  layout/               Header, mobile menu, footer, skip link, email button
  sections/             Hero, work, about, experience, skills, contact
  ui/                   Button, container, section heading, count-up, icons
  motion/               Reveal, reveal observer, cursor glow
lib/                    cn() class helper, withBasePath() for public/ files
public/                 Logo, images, CV PDF
```

**Rendering.** The site is a static export (`output: 'export'` in `next.config.ts`): `npm run build` writes plain HTML, CSS, and JS to `out/`. Everything is a Server Component except five small client components — `MobileNav`, `EmailFab`, `CountUp`, `CursorGlow`, and `RevealObserver` — so the home page ships about 8 kB of its own JavaScript on top of the React/Next runtime. The mobile menu content is rendered on the server and passed to `MobileNav`, which only owns the open state.

**Navigation.** Section links are plain `<a href="#…">`. The browser does the scrolling: `scroll-padding-top` keeps sections clear of the sticky header and `scroll-behavior: smooth` is turned off for `prefers-reduced-motion`. The skip link moves keyboard focus into the page. In the mobile menu, Tab moves from the toggle into the menu, leaving the menu or pressing Escape closes it.

**Motion.** No animation library. `Reveal` is a server-rendered wrapper; one `IntersectionObserver` in `RevealObserver` fades in the sections that start below the fold, so content already on screen is never hidden after load and nothing is hidden without JavaScript. The mobile menu, icon swap, and hover states are CSS transitions. `CountUp` renders the final number on the server and animates only when the stat is in view. `prefers-reduced-motion` disables all of it.

**SEO and sharing.** `layout.tsx` sets title, description, Open Graph, and Twitter cards. The share image is `public/images/og-image.jpg` (1200×630 JPEG — LinkedIn does not reliably render WebP). A Person JSON-LD block exposes name, role, email, Milan, and social URLs. `NEXT_PUBLIC_SITE_URL` makes those URLs absolute; the Pages workflow sets it for production.

**Images.** A static export has no image optimizer, so files in `public/` are served exactly as committed: keep them sized for how they are displayed. The portrait and about photo are high-quality originals; project screenshots are WebP. Files in `public/` referenced from code go through `withBasePath()` so they also resolve when the site is served from a sub-path.

**Accessibility.** Skip link, sticky header with `scroll-padding`, visible focus rings, semantic landmarks (`header`, `main`, `nav`, labelled sections), keyboard-usable menu, and reduced-motion support. The CV is a real file download, not a gate behind a form.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, static export), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3, CSS variables in `app/globals.css` |
| Motion | CSS transitions + `IntersectionObserver` |
| Tests | Vitest (`tests/`) |
| CI | GitHub Actions: `npm ci`, lint, `tsc --noEmit`, tests, `next build` on Node 22 |
| Hosting | GitHub Pages, deployed by `.github/workflows/nextjs.yml` |
| Quality | ESLint (next), Prettier |

A contact form or any other server-side feature would need a host that runs Node (for example Vercel) and dropping `output: 'export'`.

## Local development

Node 22 is the CI version. npm 10 is what the lockfile is generated with.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is taken, Next picks the next free one and prints it in the terminal.

`.env.local` only needs `NEXT_PUBLIC_SITE_URL` for local OG URLs. Leave `NEXT_PUBLIC_BASE_PATH` empty unless you want to reproduce the GitHub Pages sub-path locally (`/website-portfolio`). Never commit `.env.local`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve `out/` locally (`npx serve`) |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript without emit |
| `npm test` | Vitest once |
| `npm run test:watch` | Vitest watch mode |

## Deployment

Every push to `main` runs `.github/workflows/nextjs.yml`: install, tests, static build, then deploy of `out/` to GitHub Pages. The workflow reads the site URL and base path (`/website-portfolio`) from `actions/configure-pages` and passes them to the build, so the same code works on a project page, a user page, or a custom domain. In the repository settings, **Pages → Source** must be **GitHub Actions**.

## Git workflow

- `main` — production-ready code
- `develop` — integration
- `feature/*` — one focused change

Conventional Commits, for example: `feat(hero): enlarge stats labels`.

Pushes and pull requests to `main` and `develop` run the CI workflow in `.github/workflows/ci.yml`.
