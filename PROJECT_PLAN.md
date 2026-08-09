# BITnWIT Website Build Plan

## Goal
Build a polished BITnWIT marketing website with a strong brand system, AI-enabled lead capture, editable content, and a frontend designed for fast growth.

## Phase 1: Project Planning

### 1. Scope
- Homepage with hero, services, trust signals, and CTA
- Services overview page and individual service pages
- Work/case studies grid and detail pages
- About page with brand story and mascot introduction
- Blog listing and post pages
- Contact page with smart form and AI assistant entry
- Custom 404 page with mascot personality

### 2. Core Brand System
- Colors: Ink Black, Rabbit Blue, Signal Red, Cloud Grey, Line Grey
- Typography: rounded technical sans-serif for headings, clean sans-serif for body
- Mascot: White Rabbit used on hero, AI chat, 404, loading/empty states
- Voice: confident, friendly, clever, no heavy jargon on marketing pages

### 3. Recommended Stack
- Framework: Next.js app router
- Styling: Tailwind CSS with CSS variables for theme tokens
- Content source: Markdown/MDX in repo initially for zero external dependency
- Data layer: Supabase backend later for leads/chat storage
- AI: serverless Anthropic/Claude integration via API route
- Hosting: Vercel Hobby free tier

### 4. Build Priorities
1. Scaffold frontend and layout system
2. Add brand token styles and reusable components
3. Build pages structure and route placeholders
4. Add AI chat widget shell and contact form UI
5. Wire content into editable data files or CMS-ready structure

## Phase 2: Frontend Build

### Milestone 1: Scaffold and baseline
- Next.js + Tailwind project created
- Global CSS variables defined
- Common layout component with header/footer
- Page templates for Home, Services, Work, About, Blog, Contact, 404

### Milestone 2: Core components
- Hero section with tagline and mascot callout
- Service cards grid
- Testimonial/CTA banner block
- Blog teaser cards
- Contact form and footer newsletter signup

### Milestone 3: AI and lead flow
- Chat widget UI in bottom-right
- Contact form with lead capture fields
- API route placeholder for future AI/chat backend

### Milestone 4: Polish and deploy
- Responsive design checks
- SEO metadata and page titles
- Simple performance and accessibility review
- Prepare repo for Vercel deployment

## Phase 3: Next steps after frontend
- Add Supabase lead/chat tables and RLS
- Add Anthropic chat API route
- Add admin-side content tooling or CMS integration
- Connect domain and go live checklist

## Notes
- Use CSS custom properties for all brand colors
- Keep component props flexible and reusable
- Prefer Markdown content over hardcoded text where practical
- Avoid committing API keys; use environment variables in Vercel
