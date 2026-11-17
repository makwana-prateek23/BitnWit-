# BITnWIT Technologies — Route Inventory & Matrix
**Date:** November 17, 2026  
**Auditor:** Senior Software Architect  
**Architecture:** Next.js 14 App Router  

---

## 1. Public Application Routes

| Path | File Location | Render Type | Data Source | Key Features & Modules |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Server/Client Hybrid | `src/data/content.ts` / MongoDB | Hero, Bitty Mascot guide, 8 Service Cards, Expandable Bento Grid, How We Work, Stats, Target Audiences, CTA Banner |
| `/about` | `src/app/about/page.tsx` | Server/Client Hybrid | `src/data/content.ts` | Story, Mission, Principles, Founder & Tech Head Profiles, Delivery Process, Work with Us CTA |
| `/services` | `src/app/services/page.tsx` | Server/Client Hybrid | `src/data/content.ts` / MongoDB | 8 Digital Engineering Services, Deliverables, Tech Stack, Interactive Stepper, FAQ Accordion, WhatsApp CTA |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | Dynamic Route (`generateStaticParams`) | `findService(slug)` / MongoDB | Individual service deep-dive, Problem statement, Solutions, Deliverables, Process, FAQs, Project Enquiry |
| `/work` | `src/app/work/page.tsx` | Server/Client Hybrid | `src/data/content.ts` / MongoDB | 7 Case studies, Category filter, Outcomes, Live preview links, Technology tags |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` | Dynamic Route (`generateStaticParams`) | `findProject(slug)` / MongoDB | Case study deep dive, Challenge, Solution, Measurable Results, Stack Used, Live URL |
| `/clients` | `src/app/clients/page.tsx` | Server/Client Hybrid | `src/data/content.ts` | Collaboration categories (Founders, Service Teams, Growing Brands, Global Teams), Remote Delivery model |
| `/blog` | `src/app/blog/page.tsx` | Server/Client Hybrid | `src/data/content.ts` / MongoDB | Engineering and strategy insights, Category pills, Reading times, Article cards |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Dynamic Route (`generateStaticParams`) | `findPost(slug)` / MongoDB | Article content, Section headings, Code & architectural breakdowns, Author bio, Back to blog |
| `/contact` | `src/app/contact/page.tsx` | Client Component | `src/app/api/contact` | Interactive inquiry form, Budget selector, Timeline picker, Service selector, Instant WhatsApp prefill, Founder direct contact |

---

## 2. Administrative Console Routes (`/admin`)

*All administrative routes are protected by Edge Middleware (`src/middleware.ts`) and verified through HTTP-Only Cookie Session tokens (`bitnwit_admin_session`).*

| Path | File Location | Guard / Permission | Data Source | Primary Admin Actions |
| :--- | :--- | :--- | :--- | :--- |
| `/admin/login` | `src/app/admin/login/page.tsx` | Public (Redirects if auth) | `POST /api/admin/auth/login` | Admin email/password login, remember me, error alerts, redirect to requested URL |
| `/admin` | `src/app/admin/page.tsx` | Authenticated | `GET /api/admin/overview` | Executive overview, 6 stat cards, leads status breakdown, monthly inquiry chart, recent activity |
| `/admin/leads` | `src/app/admin/leads/page.tsx` | Authenticated | `GET /api/admin/leads` | CRM leads list, status change (New, Contacted, Qualified, etc.), search, filter, CSV export, note addition |
| `/admin/services` | `src/app/admin/services/page.tsx` | Authenticated | `GET /api/admin/services` | Service catalog CRUD, title, slug, deliverables, ordering, publish/unpublish toggle |
| `/admin/projects` | `src/app/admin/projects/page.tsx` | Authenticated | `GET /api/admin/projects` | Portfolio case study CRUD, cover image, gallery, live URL, challenge/solution/results |
| `/admin/blogs` | `src/app/admin/blogs/page.tsx` | Authenticated | `GET /api/admin/blogs` | Blog post editor, title, slug, excerpt, markdown body, tags, draft/published status |
| `/admin/testimonials` | `src/app/admin/testimonials/page.tsx` | Authenticated | `GET /api/admin/testimonials` | Testimonial review management, client name, company, rating (1-5), featured switch |
| `/admin/media` | `src/app/admin/media/page.tsx` | Authenticated | `GET /api/admin/media` | Asset manager, folder filtering (Brand, Mascot, Portfolio, Blog), copy file URL, delete asset |
| `/admin/team` | `src/app/admin/team/page.tsx` | Authenticated | `GET /api/admin/team` | Team directory CRUD, public profile visibility, role assignment, specialties, contact phone |
| `/admin/settings` | `src/app/admin/settings/page.tsx` | SUPER_ADMIN / ADMIN | `GET /api/admin/settings` | General info, official email, phone, WhatsApp number, physical address, social links |
| `/admin/seo` | `src/app/admin/seo/page.tsx` | Authenticated | `GET /api/admin/seo` | Route SEO meta tags, title tags, meta descriptions, OpenGraph banner URLs, indexable flag |
| `/admin/analytics` | `src/app/admin/analytics/page.tsx` | Authenticated | `GET /api/admin/analytics` | Traffic telemetry, top pages, device categories, GA4 measurement ID setup |
| `/admin/profile` | `src/app/admin/profile/page.tsx` | Authenticated | `GET/PUT /api/admin/profile` | Super admin name, email, avatar URL, password change with old password verification |

---

## 3. Dynamic Slugs & Parameters

### Services Slugs (`/services/[slug]`):
1. `digital-marketing` — Digital Marketing & Performance Growth
2. `web-development` — High-Performance Web Development & Next.js Platforms
3. `app-development` — Cross-Platform Mobile Applications (iOS & Android)
4. `custom-code` — Custom Software Engineering, APIs & Internal Tools
5. `ai-integration` — AI Workflows, Automation & Intelligent Agents
6. `ui-ux-design` — Product UI/UX Design, Figma Prototypes & Design Systems
7. `seo-analytics` — Technical Search Architecture & Conversion Attribution
8. `branding-strategy` — Visual Identity, Positioning & Brand Guidelines

### Portfolio Slugs (`/work/[slug]`):
1. `resume-iq` — Intelligent AI Resume Workspace & ATS Optimizer
2. `service-website` — Modern Conversion-Led Service Platform
3. `app-concept` — Interactive Product MVP & Mobile Prototype
4. `ai-support-workflow` — Automated Customer Support AI Workflow
5. `growth-campaign-system` — Multi-Channel Growth & Attribution System
6. `brand-launch-system` — Complete Visual Brand System & Guidelines
7. `operations-dashboard` — Internal Business Operations & Analytics Dashboard

### Blog Slugs (`/blog/[slug]`):
1. `ai-first-websites` — Why AI-first websites matter in 2026
2. `lean-branding` — Building a lean digital brand with BITnWIT
