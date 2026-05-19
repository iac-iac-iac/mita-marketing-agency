# M.И.T.A. — Marketing IT Agency Website

Corporate website for a full-cycle marketing IT agency built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

Production: https://mita.top

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom styles |
| Animations | Framer Motion |
| CMS | SQLite (better-sqlite3) |
| Auth | JWT (jose) + bcrypt |
| Deployment | VPS + Nginx + PM2 |

## Features

### Content Management
- Blog and cases: **SQLite** (`data/mita.db` by default); body text is rendered with **next-mdx-remote** (MDX/Markdown from DB fields)
- Static legal/security copy: MDX in `src/content/pages/`
- Optional MDX samples in `src/content/blog/` and `src/content/cases/` (file-based helpers in `lib/cms/blog.ts` and `lib/cms/cases.ts` are not used for public routes)
- Testimonials with per-service categories
- Lead tracking
- Admin panel at `/admin`

### Pages
| Page | URL | Description |
|------|-----|-------------|
| Home | / | Hero, services, stats, testimonials |
| About | /about | Company info, team, timeline |
| Career | /career | Open positions, benefits |
| Blog | /blog | Article listing |
| Blog Post | /blog/[slug] | Full article |
| Cases | /cases | Case study listing |
| Case Detail | /cases/[slug] | Full case study |
| Leadgen | /services/leadgen | Service landing page |
| Call Center | /services/call-center | Service landing page |
| Avito | /services/avito | Service landing page |
| Recruiting | /services/recruiting | Service landing page |
| Contact | /contact | Contact form |
| Security | /security | Data protection info |
| Legal Terms | /legal/terms | Terms of service |
| Legal Privacy | /legal/privacy | Privacy policy |
| Admin Login | /admin/login | Admin authentication |
| Admin Blog | /admin/blog | Blog management |
| Admin Cases | /admin/cases | Case management |
| Admin Testimonials | /admin/testimonials | Testimonial management |
| Admin Leads | /admin/leads | View form submissions (SQLite) |

## Getting Started

### Requirements
- Node.js 20+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build

```bash
npm run build
npm start
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_SITE_URL | Site URL (e.g. https://mita.top); also used for sitemap and JSON-LD | Yes |
| BITRIX24_WEBHOOK_URL | Bitrix24 inbound webhook for leads (optional) | No |
| BITRIX24_ASSIGNED_BY_ID | Bitrix responsible user ID (`ASSIGNED_BY_ID`) | No |
| TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID | Telegram channel notifications for new leads | No |
| ADMIN_PASSWORD or ADMIN_PASSWORD_HASH | Admin login at `/admin` | Yes for admin |
| DATABASE_PATH | SQLite file path | No (defaults to `data/mita.db`) |
| NEXT_PUBLIC_YANDEX_METRIKA_ID | Yandex Metrika counter ID (latin `METRIKA` in name) | No |
| NEXT_PUBLIC_GA_ID | Google Analytics measurement ID | No |
| EMAIL_FROM / EMAIL_TO | Planned for SMTP notifications (not implemented yet) | No |

Public contact email on the site: **info@mita.top**

### Lead capture (`/contact` and other forms)

Submissions go to **`POST /api/submit-lead`** and are stored in SQLite (`leads` table in `data/mita.db`). View and update status at **`/admin/leads`**. Optional integrations: **Bitrix24** (`BITRIX24_WEBHOOK_URL`, `BITRIX24_ASSIGNED_BY_ID`) and **Telegram** (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). HTTP proxies for Telegram API are managed at **`/admin/proxies`** (with a test message button). Email notifications are not sent automatically.

See `.env.local.example` for the full list (analytics, SMTP, etc.).

### Analytics (Yandex Metrika)

The site uses Next.js App Router (client-side navigation). Metrika is integrated as for an **SPA**:

- Counter script loads after the user accepts the cookie banner (`src/components/analytics/YandexMetrika.tsx`).
- Route changes send `ym(counterId, 'hit', url)`.
- Custom goals use `trackEvent()` in `src/lib/analytics/track.ts`.

Set in `.env.local` (variable name must be ASCII `METRIKA`, not Cyrillic):

```env
NEXT_PUBLIC_YANDEX_METRIKA_ID=109296126
```

Rebuild after changing any `NEXT_PUBLIC_*` variable.

## Project Structure

```
company_site/
├── public/                           # Static assets (images, manifest, robots.txt, sw.js)
├── data/                             # SQLite database (gitignored by default)
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (main)/services/          # /services hub + service landings
│   │   │   ├── page.tsx
│   │   │   ├── leadgen/
│   │   │   ├── call-center/
│   │   │   ├── avito/
│   │   │   └── recruiting/
│   │   ├── admin/                    # Admin (blog, cases, testimonials, leads)
│   │   ├── api/
│   │   │   ├── submit-lead/
│   │   │   └── admin/                # login, logout
│   │   ├── about/, blog/, cases/, career/, contact/, legal/, offline/, security/
│   │   ├── layout.tsx, page.tsx      # Root layout + home
│   │   ├── not-found.tsx, error.tsx, sitemap.ts
│   │   └── ...
│   ├── components/
│   │   ├── layout/, blocks/, blog/, cases/, forms/, ui/, contact/, legal/, security/
│   ├── content/                      # MDX (pages/ + sample blog/ & cases/)
│   ├── lib/
│   │   ├── cms/                      # db-blog, db-cases, db-testimonials, db-leads, storage, utils
│   │   ├── db/                       # SQLite client + schema
│   │   ├── analytics/, hooks/, seo/, utils/
│   │   └── navigation.ts
│   ├── middleware.ts
│   ├── styles/
│   └── types/
├── docs/
├── scripts/
├── .github/
├── eslint.config.js, tailwind.config.js, postcss.config.cjs, tsconfig.json, package.json
├── .env.local.example
└── (optional) next.config.mjs / next.config.js — if absent, Next.js defaults apply
```

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| direct-primary | #D4A84B | Primary, CTA, accents |
| direct-gold | #F2D07A | Hover, highlights |
| direct-accent | #B8892E | Secondary accent |
| direct-dark | #0A0A0A | Primary background |
| direct-secondary | #1A1A1A | Secondary surfaces |
| direct-gray | #2A2A2A | Cards, surfaces |
| direct-light | #FFFFFF | Text |
| direct-text-secondary | #B0B0B0 | Secondary text |
| direct-muted | #707070 | Muted text |

### Animations

- **fade-in-up** — content entrance animation (opacity + translateY)
- **slide-in** — alternating left/right card reveals
- **counter** — number counting animation in stats blocks
- **hamburger** — icon morph to cross on menu open
- **parallax** — hero content fades and shifts on scroll
- **pulse CTA** — primary button glowing shadow loop

## CMS Architecture

Published blog posts and cases are read from **SQLite** (default path `data/mita.db`) and rendered on the server with **MDX Remote**. The sitemap uses the same published rows so URLs stay in sync with `/blog` and `/cases`.

| Table | Purpose |
|-------|---------|
| blog_posts | Blog articles |
| cases | Client case studies |
| testimonials | Customer reviews (with per-service categories) |
| leads | Form submissions |

Admin authentication uses JWT tokens via HTTP-only cookies with bcrypt password hashing.

## Deployment

Production runs on a **VPS** (Ubuntu 24.04, `193.233.88.174`):

| Item | Value |
|------|--------|
| App path | `/root/mita-marketing-agency` |
| Process | PM2 `mita-site` (`npm start` on port 3000) |
| Reverse proxy | Nginx → `https://mita.top` (Let's Encrypt) |
| Node.js | 20.x |

### Deploy (manual)

```bash
ssh root@193.233.88.174
cd /root/mita-marketing-agency
git pull origin main
npm ci
npm run build
pm2 restart mita-site
```

Ensure `/root/mita-marketing-agency/.env.local` exists on the server (not in git) and includes production values, especially `NEXT_PUBLIC_SITE_URL=https://mita.top` and `NEXT_PUBLIC_YANDEX_METRIKA_ID`.

GitHub Actions (`.github/workflows/ci-cd.yml`) can deploy to Vercel if secrets are configured; the live site on mita.top uses the VPS workflow above.

## Conventions

### Commits

```
feat: new feature
fix: bug fix
docs: documentation update
style: style change
refactor: code refactoring
test: test addition
chore: config change
```

### Branches

- main — production
- develop — development
- feature/* — features
- fix/* — fixes

### Naming

- Components: PascalCase (ContactForm.tsx)
- Utilities: camelCase (formatDate.ts)
- Styles: kebab-case (globals.css)
- Content: kebab-case (leadgen-guide.mdx)

## Project Stats

| Category | Count |
|----------|-------|
| Pages | 20+ |
| Components | 90+ .tsx files |
| API endpoints | 3 |
| External libraries | 20+ |

## License

MIT

M.I.T.A. — Full-cycle Marketing IT Agency

Email: info@mita.top  
Website: https://mita.top

Status: Production-ready (April 2026)
