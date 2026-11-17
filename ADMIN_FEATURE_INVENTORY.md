# BITnWIT Technologies — Admin Feature & Module Inventory
**Date:** November 17, 2026  
**Auditor:** Full-Stack Lead & Security Specialist  

---

## 1. Module Overview & Role-Based Permissions

The BITnWIT Admin Console (`/admin`) provides full operations, CRM, content management, and systems governance. Access is secured by role-based authorization:
* **`SUPER_ADMIN`** — Full access to all 12 modules, user provisioning, database settings, and credential rotation.
* **`ADMIN`** — Access to leads, content, services, portfolio, media, and SEO. Cannot alter security secrets or delete super-admin users.
* **`EDITOR`** — Access to blogs, portfolio drafts, and testimonials. Read-only for leads and settings.

---

## 2. Inventory of the 12 Administrative Modules

### 1. Executive Overview (`/admin`)
* **Live Statistics:** 6 raised metric cards displaying actual counts:
  * Total Leads
  * New Inquiries (uncontacted)
  * Active Projects
  * Completed Deliverables
  * Published Blog Posts
  * Core Services
* **Inquiry Status Distribution:** Visual breakdown of leads pipeline (New, Contacted, Qualified, Proposal Sent, Negotiation, Converted, Lost).
* **Monthly Leads Trend:** 6-month bar chart reflecting real inquiry velocity.
* **Recent Activity Stream:** Chronological feed of administrative changes with timestamps.
* **Quick Actions:** Instant buttons to Add Project, Add Service, Create Article, and View Inquiries.

### 2. Leads & Inquiries CRM (`/admin/leads`)
* **CRM Table:** Full-text search by lead name, email, company, and phone.
* **Filter Bars:** Multi-status filters (`ALL`, `NEW`, `CONTACTED`, `QUALIFIED`, `CONVERTED`, etc.) and service filters.
* **Lead Drawer / Detail View:** Complete lead dossier including budget, project timeline, message, and contact channel.
* **Follow-up Management:** Next contact date selector and team member assignment.
* **Internal Team Notes:** Timeline-based notes thread attached to the lead.
* **CSV Export:** 1-click export of filtered leads dataset for external reporting.

### 3. Services Management (`/admin/services`)
* **Catalog Grid & List:** Visual service cards with icon preview, deliverables count, and publish state.
* **Service Editor Modal:**
  * Title, slug, and icon selector (`web`, `app`, `ai`, `marketing`, `design`, `seo`, `code`, `branding`).
  * Short summary and detailed service description.
  * Reorderable deliverables list.
  * Turnaround time (e.g., "2-4 weeks") and target outcome.
  * Publication toggle.

### 4. Portfolio & Project Management (`/admin/projects`)
* **Case Study Cards:** Visual cards with cover image preview, client partner name, and category badge.
* **Project Editor:**
  * Title, client, category, live URL, and completion year.
  * Structured case study inputs: Challenge, Solution, and Measurable Results.
  * Technology stack tags.
  * Cover image URL and gallery image manager.
  * Featured flag (controls homepage showcase) and Publication status.

### 5. Blog CMS (`/admin/blogs`)
* **Article Catalog:** Listing articles with author, category, published date, and read time.
* **Distraction-Free Blog Editor:**
  * Post title, auto-slug generator, category selector.
  * Reading time estimator.
  * Excerpt and full markdown body editor.
  * Tags manager.
  * SEO Meta title and description override.
  * Draft vs Published toggle.

### 6. Testimonials (`/admin/testimonials`)
* **Customer Review Cards:** Star rating display (1 to 5 stars), client quote, author name, company, and designation.
* **Testimonial Editor:** Add genuine verified reviews, upload client avatar, mark as featured on homepage.

### 7. Media Library (`/admin/media`)
* **Central Asset Manager:** Grid view of uploaded brand assets, mascot variations, portfolio graphics, and service visuals.
* **Folder Structure:** Organized by `BRAND`, `MASCOT`, `SERVICES`, `PORTFOLIO`, `BLOG`, and `DOCUMENTS`.
* **Upload Utility:** Drag-and-drop file uploader with size validation (up to 10MB) and WebP/PNG optimization.
* **Asset Tools:** 1-click Copy URL to clipboard, preview modal, and safe file deletion.

### 8. Team Management (`/admin/team`)
* **Leadership & Engineers Directory:** Displays public profiles of founders, engineers, and specialists.
* **Profile Editor:** Name, role/designation, specialties tags, contact phone, avatar, and website visibility toggle.

### 9. Website Settings (`/admin/settings`)
* **Tabbed Configuration:**
  * *General:* Company legal name, tagline ("INNOVATE • BUILD • SOLVE"), branding.
  * *Contact:* Official support email, primary contact number, WhatsApp business number, corporate address.
  * *Social Media:* Instagram, LinkedIn, GitHub, YouTube profile URLs.
  * *Theme & Preferences:* Default color schemes and telemetry hooks.

### 10. SEO Management (`/admin/seo`)
* **Route Metadata Directory:** Manages meta tags for `/`, `/about`, `/services`, `/work`, `/clients`, `/blog`, `/contact`.
* **SEO Editor:** Focus keywords, Meta Title, Meta Description, Canonical URL, OpenGraph Banner URL, and Indexable (`noindex`) flag.

### 11. Web Analytics (`/admin/analytics`)
* **Telemetry Hub:** Integrated Google Analytics 4 (GA4) configuration.
* **Metrics:** Unique visitors, top visited pages, device breakdown, conversion rate tracking from `/contact` submissions.
* **Fallback Setup:** If `NEXT_PUBLIC_GA_ID` is unconfigured, displays clear setup instructions rather than falsified charts.

### 12. Profile & Security Governance (`/admin/profile`)
* **Session Details:** Admin role, member since, and active session status.
* **Credential Rotation:** Secure password change requiring current password verification with client & server-side validation.
