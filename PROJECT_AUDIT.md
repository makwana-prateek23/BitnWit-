# BITnWIT Technologies — Complete Project Audit
**Audit Date:** November 17, 2026  
**Auditor:** Senior UI/UX Designer, Full-Stack Architect & QA Engineer  
**Live Production URL:** https://www.bitnwit.com/  
**Repository Branch:** `main`  
**Target Design Paradigm:** Premium Neumorphism, Modern Soft UI & Accessible Design System  

---

## 1. Executive Summary

BITnWIT Technologies Pvt. Ltd. is a digital engineering, AI workflow integration, and business growth company operating across India and globally. The existing application is a production-grade full-stack web application built on **Next.js 14 (App Router)** with **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a hybrid data access layer connecting to **MongoDB Atlas** with an offline-capable atomic JSON fallback.

The purpose of this audit is to assess the entire architecture, route hierarchy, API layer, admin console, assets, and design system before executing the **Complete Neumorphism Redesign**.

---

## 2. Technology Stack & Dependencies

### Core Framework & Runtime
* **Framework:** Next.js `14.2.5` (App Router architecture with React Server Components and Client Components)
* **Frontend Library:** React `18.3.1` & React DOM `18.3.1`
* **Programming Language:** TypeScript `5.6.2` (Strict mode enabled, type-safe API contracts)
* **Styling & CSS:** Tailwind CSS `3.4.5`, PostCSS `8.4.40`, Autoprefixer `10.4.19`
* **Motion & Animation:** Framer Motion `^11.18.2`
* **Iconography:** React Icons `^5.7.0` (Feather Icons `react-icons/fi`, Lucide `react-icons/lu`, Ant Design `react-icons/ai`)
* **Database Driver:** Official MongoDB Node.js Driver `^6.8.0`

### Build & Tooling Configuration
* **Package Manager:** npm / bun compatibility
* **Development Server:** `next dev` (Port 3000)
* **Production Build:** `next build`
* **Type Checker:** `tsc --noEmit` (passing with 0 errors)
* **Linter:** ESLint `8.57.0` with `eslint-config-next`

---

## 3. Database Architecture & State Management

The application features a resilient **Dual-Engine Persistence Layer** (`src/lib/db/store.ts` & `src/lib/db/mongodb.ts`):
1. **Cloud Production Engine:** When `MONGODB_URI` is provided, the application connects to a MongoDB Atlas cluster (`Cluster0`), using a singleton connection pool cached across serverless invocations and dev hot-reloads (`global._mongoClientPromise`).
2. **Offline Fallback Engine:** If `MONGODB_URI` is unset or temporarily unreachable, it seamlessly executes against `.data/bitnwit-db.json` with zero application downtime.
3. **DNS Resilience:** Integrated `dns.setServers(['8.8.8.8', '1.1.1.1'])` resolver override to resolve Windows ISP DNS SRV timeout quirks for MongoDB Atlas connections.

### Database Collections (11 Total)
* `admin_users` — Administrative accounts with salted SHA-256 password hashing.
* `leads` — CRM inquiries received from contact forms and manual entries.
* `services` — 8 core services with detailed deliverables and process steps.
* `projects` — 7 featured and standard case study projects.
* `blogs` — Articles with markdown content, metadata, and reading time.
* `testimonials` — Client reviews with ratings and company details.
* `media_files` — Media library indexing filenames, URLs, and MIME types.
* `team_members` — Leadership and core engineers with contact info and roles.
* `website_settings` — Site metadata, phone numbers, email, social links, and branding.
* `seo_metadata` — Route-specific meta titles, canonical URLs, and Open Graph tags.
* `activity_logs` — Auditing log of all administrative actions.

---

## 4. Architecture & Routing Structure

### Public Routes (10 Routes)
* `/` — Comprehensive homepage with hero, white rabbit guide, 8 service previews, expandable bento grid, process, stats, differentiators, and CTA.
* `/about` — Company story, leadership (Founder Sandeep Kumar, Tech Head Prateek Makwana), operating principles, process, and capabilities.
* `/services` — Complete directory of all 8 digital disciplines with deliverables and tech stacks.
* `/services/[slug]` — Dedicated dynamic detail page per service (`/services/web-development`, `/services/app-development`, `/services/ai-integration`, `/services/digital-marketing`, `/services/ui-ux-design`, `/services/seo-analytics`, `/services/custom-code`, `/services/branding-strategy`).
* `/work` — Selected portfolio and case studies with category badges.
* `/work/[slug]` — Deep-dive case study detail pages (`resume-iq`, `service-website`, `app-concept`, `ai-support-workflow`, `growth-campaign-system`, `brand-launch-system`, `operations-dashboard`).
* `/clients` — Collaboration profiles (Founders, Service Teams, Growing Brands, Global Teams).
* `/blog` — Engineering and strategic insights directory.
* `/blog/[slug]` — Rich blog post detail view.
* `/contact` — High-conversion inquiry form with budget selectors, timeline picker, and WhatsApp prefill integration.

### Admin Console Routes (13 Routes)
* `/admin/login` — Authentication screen with show/hide password and error handling.
* `/admin` — Master dashboard with 6 stat cards, conversion ratios, monthly leads chart, recent projects, and audit logs.
* `/admin/leads` — Lead CRM with status filtering, search, CSV export, note taking, and lead updates.
* `/admin/services` — Service catalog management (CRUD, reordering, publishing).
* `/admin/projects` — Portfolio and case study management with gallery support.
* `/admin/blogs` — Article editor with slug generation, tags, and draft/published states.
* `/admin/testimonials` — Client testimonial management.
* `/admin/media` — File asset organizer by category (Brand, Mascot, Portfolio, etc.).
* `/admin/team` — Public team member directory and role management.
* `/admin/settings` — General, Contact, Social, and Website configuration tabs.
* `/admin/seo` — Page-by-page SEO meta tag editor and canonical URL manager.
* `/admin/analytics` — GA4 integration hub and traffic breakdown.
* `/admin/profile` — Super admin profile and credential rotation.

---

## 5. Security & Authentication Audit

* **Admin Authentication:** Authenticates against `admin_users` collection using HMAC-SHA256 signature tokens stored in `bitnwit_admin_session` HTTP-only, SameSite cookies.
* **Edge Middleware (`src/middleware.ts`):** Intercepts all requests matching `/admin/:path*`. Redirects unauthenticated visitors to `/admin/login?from=...`, and redirects authenticated admins away from `/admin/login` directly to `/admin`.
* **Credential Protection:** Passwords are never stored in plaintext; salted hashes are generated via `src/lib/db/auth.ts`.
* **Zero Secret Exposure:** Database URIs and JWT secrets reside exclusively in `.env.local` (ignored in `.git`) and server-side execution contexts.

---

## 6. Identified Issues & Architectural Deficiencies

1. **Layout Contamination on Admin Routes:**
   * In `src/app/layout.tsx`, `<Header />`, `<Footer />`, and `<WhiteRabbitChat />` are rendered at the root level.
   * Neither `Header.tsx` nor `Footer.tsx` nor `WhiteRabbitChat.tsx` check whether `pathname.startsWith('/admin')`. As a result, the public navbar and footer briefly or persistently show up on admin console pages.
   * **Fix Required:** Add `if (pathname?.startsWith('/admin')) return null;` in `Header.tsx`, `Footer.tsx`, and `WhiteRabbitChat.tsx`.

2. **Inconsistent Design System & Styling:**
   * The current styling mixes Tailwind classes, ad-hoc dark purple hex codes (`#061B49`, `#6D1FA2`), glassmorphism cards, and inline shadows.
   * It lacks a unified **Neumorphism Design Token System** with coordinated light/dark themes, mathematical soft raised/pressed/recessed shadow surfaces, and unified surface elevation.

3. **Incomplete Service Detail Pages (`/services/[slug]`):**
   * Currently, service detail pages only show a hero, basic deliverables, and a static process.
   * The project requirements mandate comprehensive detail pages with: Problems Solved, Solutions, Detailed Deliverables, Tech Stack Badges, Development Process, FAQs, and Lead Enquiry CTAs.

4. **Missing Theme Persistence:**
   * The app currently runs only in light mode without a global theme state (Light/Dark toggle) that updates Neumorphic shadows dynamically.

---

## 7. Audit Conclusion & Next Steps

The application's structural foundation (Next.js 14 App Router, TypeScript, MongoDB dual-engine store, complete REST API endpoints) is solid and should NOT be replaced. The transformation into a **World-Class Neumorphic Digital Engineering Studio** requires:
1. Constructing the unified Neumorphic Token & Surface Engine.
2. Fixing the admin layout leak.
3. Implementing global theme switching (Light/Dark).
4. Redesigning every public page and individual detail view.
5. Redesigning every admin console module with raised and recessed Neumorphic dashboard surfaces.
