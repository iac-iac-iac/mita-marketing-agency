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
- Blog posts with MDX
- Case studies
- Testimonials with per-service categories
- Lead tracking
- Admin panel at /admin

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
| NEXT_PUBLIC_SITE_URL | Site URL (e.g. https://mita.top) | Yes |
| ADMIN_PASSWORD | Admin panel password | Yes |
| DATABASE_PATH | SQLite database file path | Yes |

## Project Structure

```
company_site/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (main)/services/          # Service landing pages
│   │   │   ├── leadgen/
│   │   │   ├── call-center/
│   │   │   ├── avito/
│   │   │   └── recruiting/
│   │   ├── admin/                    # Admin panel
│   │   │   ├── blog/
│   │   │   ├── cases/
│   │   │   └── testimonials/
│   │   ├── api/
│   │   │   ├── submit-lead/          # Lead submission API
│   │   │   └── admin/                # Admin API routes
│   │   ├── blog/
│   │   ├── cases/
│   │   ├── career/                   # Career page
│   │   ├── contact/
│   │   ├── legal/
│   │   ├── security/
│   │   ├── about/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home page
│   │   ├── error.tsx
│   │   └── loading.tsx
│   ├── components/
│   │   ├── layout/                   # Header, Footer
│   │   ├── blocks/                   # Page sections (Hero, Stats, etc.)
│   │   ├── forms/                    # ContactForm, LeadForm
│   │   ├── ui/                       # Buttons, widgets
│   │   └── contact/
│   ├── content/                      # MDX content
│   │   ├── blog/
│   │   ├── cases/
│   │   └── pages/
│   ├── lib/
│   │   ├── cms/                      # CMS functions (blog, cases, testimonials)
│   │   ├── db/                       # SQLite setup and schema
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── analytics/                # Event tracking
│   │   ├── seo/                      # Schema.org markup
│   │   └── utils/                    # Utilities (cn, env, sanitize)
│   ├── public/                       # Static files
│   ├── styles/
│   └── types/
├── data/                             # SQLite database (gitignored)
├── docs/                             # Project documentation
├── scripts/                          # Build scripts
├── .github/                          # GitHub Actions
├── .env.local.example
├── next.config.mjs
├── package.json
└── tsconfig.json
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

Content is stored in SQLite (data/mita.db) with four tables:

| Table | Purpose |
|-------|---------|
| blog_posts | Blog articles |
| cases | Client case studies |
| testimonials | Customer reviews (with per-service categories) |
| leads | Form submissions |

Admin authentication uses JWT tokens via HTTP-only cookies with bcrypt password hashing.

## Deployment

The site is deployed on a VPS (Ubuntu 24.04) with:

- Nginx as reverse proxy with SSL (Let's Encrypt)
- PM2 for process management
- Node.js 20

Auto-renewing SSL certificate via Certbot.

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

Address: Saratov, Astrakhanskaya st., 87V
Website: https://mita.top

Status: Production-ready (April 2026)
