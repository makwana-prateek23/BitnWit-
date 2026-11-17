# BITnWIT Technologies — Component Inventory & Modernization Plan
**Date:** November 17, 2026  
**Auditor:** Senior Frontend Architect  

---

## 1. Existing Component Directory (`src/components/`)

### Global Navigation & Layout Components
* `Header.tsx` (`src/components/Header.tsx`):
  * Sticky navigation header with scroll detection, backdrop blur, logo, nav items, and mobile drawer.
  * *Audit Issue:* Lacks route exclusion for `/admin/*`; missing Neumorphic light/dark mode switcher.
* `Footer.tsx` (`src/components/Footer.tsx`):
  * Comprehensive 4-column dark footer with service links, company links, contact info, one-click email copy, back to top.
  * *Audit Issue:* Lacks route exclusion for `/admin/*`.
* `Logo.tsx` (`src/components/Logo.tsx`):
  * Brand logo renderer with fallback transparent PNG.
* `RabbitMark.tsx` (`src/components/RabbitMark.tsx`):
  * SVG vector icon of Bitty rabbit mascot head with glasses.
* `RunningRabbitLoader.tsx` (`src/components/RunningRabbitLoader.tsx`):
  * Fixed initial page loading spinner with running rabbit graphic.
* `WhiteRabbitChat.tsx` (`src/components/WhiteRabbitChat.tsx`):
  * Global floating AI assistant drawer widget listening to `open-white-rabbit-chat` events.
  * *Audit Issue:* Must be hidden on admin console pages.

### Public Interactive UI Components
* `MascotImage.tsx` (`src/components/MascotImage.tsx`):
  * Responsive Bitty mascot image with floating badges.
* `Counter.tsx` (`src/components/Counter.tsx`):
  * Animated number counter on scroll.
* `Reveal.tsx` (`src/components/Reveal.tsx`):
  * Framer motion scroll-reveal wrapper with directional slide and fade.
* `PageHeader.tsx` (`src/components/PageHeader.tsx`):
  * Standardized public page header.
* `ServiceIcon.tsx` (`src/components/ServiceIcon.tsx`):
  * Vector icon selector for all 8 service disciplines with custom themed colors.
* `ServicesFaqAccordion.tsx` (`src/components/ServicesFaqAccordion.tsx`):
  * Interactive expandable FAQ accordion.
* `ServicesHeroMockup.tsx` (`src/components/ServicesHeroMockup.tsx`):
  * Visual mockup showcase on services overview.
* `ServicesProcessStepper.tsx` (`src/components/ServicesProcessStepper.tsx`):
  * 3-step timeline process card (Discover, Create, Launch & Grow).
* `ServiceVisual.tsx` (`src/components/ServiceVisual.tsx`):
  * Service category illustrations and visual plates.
* `TalkToRabbitButton.tsx` (`src/components/TalkToRabbitButton.tsx`):
  * Event dispatcher triggering White Rabbit AI modal.
* `WhatsAppContactForm.tsx` (`src/components/WhatsAppContactForm.tsx`):
  * Form generating instant prefilled WhatsApp messages and submitting to `/api/contact`.

### Existing Animated UI Elements (`src/components/ui/`)
* `AnimatedButton.tsx` — Styled button with primary, secondary, and glow variants.
* `AnimatedRays.tsx` — Dynamic rotating ambient light rays background effect.
* `ExpandableBentoGrid.tsx` — Interactive bento grid with expandable modal details for services.
* `FlipText.tsx` — Text rotator cycling through headline words.
* `GlassHero.tsx` — Reusable glassmorphic hero container with badge and CTA slots.
* `ShimmerBadge.tsx` — Animated gradient border badge with pulsing status dot.
* `SpotlightCard.tsx` — 3D tiltable card with cursor-following radial spotlight.
* `SpotlightNavbar.tsx` — Navbar pill list with cursor indicator spotlight.

---

## 2. Administrative Console Components (`src/components/admin/`)

* `AdminShell.tsx` (`src/components/admin/AdminShell.tsx`):
  * Root dashboard container that handles auth verification via `/api/admin/auth/me`, sidebar toggling, and notifications.
* `AdminSidebar.tsx` (`src/components/admin/AdminSidebar.tsx`):
  * Persistent desktop sidebar with 12 module links, active route highlight, unread leads count badge, and collapsible mobile drawer.
* `AdminHeader.tsx` (`src/components/admin/AdminHeader.tsx`):
  * Top navigation bar with admin avatar, profile trigger, mobile toggle, live date, and logout button.
* `AdminLoadingScreen.tsx` (`src/components/admin/AdminLoadingScreen.tsx`):
  * Centered branded loading indicator with mascot.
* `AdminEmptyState.tsx` (`src/components/admin/AdminEmptyState.tsx`):
  * Clean empty table/card state display with action button.

---

## 3. New Neumorphic UI Components To Be Developed

To fulfill the Master Neumorphism Redesign specification, the following reusable design system components will be created:

1. **`NeuSurface.tsx`** — Fundamental Neumorphic surface with variants:
   * `raised` (standard cards, containers, sections)
   * `pressed` (active buttons, clicked tabs)
   * `recessed` / `inset` (input fields, textareas, search bars, toggle tracks)
   * `floating` (modals, dropdown menus, toast alerts)
   * `flat` (subtle borderless surfaces)
2. **`NeuButton.tsx`** — Interactive Neumorphic button supporting:
   * Raised resting state with gentle dual shadow
   * Hover elevation and glow
   * Inset pressed state with active tactile feedback
   * Color themes: Default soft, Accent Purple, Accent Yellow, Accent Maroon, Danger Red
3. **`NeuInput.tsx` / `NeuTextarea.tsx`** — Recessed Neumorphic form controls with soft inner shadow, accessible contrast labels, and crisp focus rings.
4. **`NeuCard.tsx`** — Reusable card component for services, case studies, blogs, and admin telemetry statistics.
5. **`NeuThemeToggle.tsx`** — Neumorphic recessed toggle switch allowing one-click switching between Light (#E9EAF0) and Dark (#191A24) themes with `localStorage` persistence and system preference sync.
6. **`NeuBadge.tsx`** — Raised or recessed micro-pill badges for categories, tags, and status indicators.
7. **`NeuModal.tsx`** — Accessible floating dialog with soft backdrop blur and raised surface.
8. **`NeuTable.tsx`** — Responsive data table with raised header and recessed row separation for admin tables.
