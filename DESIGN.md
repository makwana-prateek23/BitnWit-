# DESIGN.md — BITnWIT Studio

> Visual Identity, Typography, Interaction Architecture, and Design Direction for BITnWIT.

---

## 1. Brand Identity & Soul

- **Studio**: BITnWIT Engineering & AI Studio
- **Origin**: Headquartered in Jaipur, Rajasthan, India; delivering globally.
- **Founding Team**: Sandeep Kumar (Founder & Product Delivery), Prateek Makwana (Technical Head & Architecture).
- **Positioning**: We engineer, architect, build, and scale high-conversion digital platforms, mobile apps, and practical AI workflows for ambitious companies worldwide.
- **Brand Character**: Tactile, sophisticated, authentic, engineered with precision, zero agency fluff.

---

## 2. Anti-Slop Dials

```
Dial: ENERGY 2 / RHYTHM 2 / MOTION 2
```

- **ENERGY 2 (Balanced)**: Confident and premium like a high-tier product studio. Tactile physical depth rather than chaotic flashiness or sterile flatness.
- **RHYTHM 2 (Structured with Intentional Breaks)**: Deliberate section compositions alternating between wide hero narrative, bento capability matrices, interactive stepper processes, verified case studies, and responsive FAQ.
- **MOTION 2 (Tactile & Meaningful)**: 3D cursor tilt on interactive cards, smooth physics-driven Bitty mascot cursor aiming and squash/boop reactions, subtle theme transitions, and full respect for `prefers-reduced-motion`.

---

## 3. Visual System: Tactile Neumorphism

A custom dual-theme physical lighting and depth system:

### Light Mode (`--neu-bg: #E9EAF0`)
- **Surface**: Soft sculpted porcelain `#E9EAF0` / `#F2F3F7`.
- **Primary Ink**: Deep navy-charcoal `#252638`.
- **Secondary Ink**: Slate mauve `#525468` (WCAG AA 6.19:1 contrast).
- **Shadows**:
  - Raised: `-8px -8px 18px rgba(255, 255, 255, 0.85), 8px 8px 18px rgba(163, 177, 198, 0.55)`
  - Recessed: `inset 3px 3px 6px rgba(163, 177, 198, 0.5), inset -3px -3px 6px rgba(255, 255, 255, 0.9)`

### Dark Mode (`--neu-bg: #191A24`)
- **Surface**: Volcanic obsidian `#202230` / `#26293A`.
- **Primary Ink**: Crisp platinum `#F5F5FA`.
- **Secondary Ink**: Muted silver `#A4A6B7` (WCAG AA 5.1:1 contrast).
- **Shadows**:
  - Raised: `-6px -6px 16px rgba(45, 48, 66, 0.6), 6px 6px 16px rgba(14, 15, 22, 0.85)`
  - Recessed: `inset 3px 3px 6px rgba(14, 15, 22, 0.95), inset -3px -3px 6px rgba(45, 48, 66, 0.45)`

### Brand Accents
- **Signature Violet/Purple**: `#8B7CF6` (light) / `#9A8AFF` (dark).
- **Vibrant Orange**: `#FF790E` (Bitty mascot inner ears & highlight actions).
- **Emerald Pulse**: `#10B981` (Online indicators).

---

## 4. Typography System

Three distinct typefaces chosen with deliberate functional separation:

1. **Display Headings**: **Sora** (`700–800`, geometric futuristic sans) — used for hero headlines and impactful brand moments.
2. **Interface & Body**: **Plus Jakarta Sans** (`400–700`, human-centered sans) — used for section titles, body paragraphs, navigation, and tactile buttons.
3. **Admin Console & Metadata**: **Inter** (`400–600`, precision UI sans) — used across the 12 admin modules for data density and tabular legibility.

All font scales use responsive fluid CSS `clamp()` tokens:
- `--text-hero`: `clamp(2.35rem, 5.2vw + 0.8rem, 4.5rem)`
- `--text-h1`: `clamp(1.85rem, 3.5vw + 0.6rem, 3.25rem)`
- `--text-h2`: `clamp(1.45rem, 2.2vw + 0.5rem, 2.35rem)`
- `--text-body`: `clamp(0.925rem, 0.35vw + 0.825rem, 1.0625rem)`

---

## 5. Mascot Architecture: Bitty

- **Role**: AI Guide and official studio mascot.
- **Visuals**: Chibi white rabbit with thick black round spectacles, bright orange inner ears (`#FF790E`), and white tuft of hair.
- **Implementation**: 3×3 sprite sheet with zero per-frame JavaScript overhead, sub-pixel alignment (`0.00 px` shift on boop), 9 head directions tracking mouse coordinates via `atan2`, and 9 reaction expressions on click/squash.

---

## 6. Anti-Slop Craftsmanship Guidelines

1. **Zero Em Dashes (R-02)**: Use commas, colons, hyphens, or periods. No AI punctuation artifacts.
2. **Real Content (R-17, R-18, R-36, R-38)**: Verifiable projects (ResumeIQ, Fleet Tracking, Jaipur Crafts), real founders, authentic contact details (+91 89497 28810).
3. **Accessible Affordances (R-25, R-32, R-39)**:
   - `cursor: pointer` on all clickable controls.
   - `cursor: not-allowed` on disabled states.
   - Visible `:focus-visible` rings with brand purple outline.
   - Reduced motion CSS media queries honored globally.
4. **Resilient Dual Theme (R-34)**: Both light and dark Neumorphic themes are complete, verified, and toggle seamlessly without style breaks.
