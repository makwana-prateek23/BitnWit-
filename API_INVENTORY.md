# BITnWIT Technologies — Complete Backend API Inventory
**Date:** November 17, 2026  
**Auditor:** Senior Backend & Security Architect  
**Architecture:** Next.js Route Handlers (`src/app/api/`)  

---

## 1. Public API Endpoints

### `POST /api/contact`
* **File:** `src/app/api/contact/route.ts`
* **Access:** Public (No authentication required)
* **Rate Limiting:** IP-level throttling & timestamp validation
* **Payload:**
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 98765 43210",
    "companyName": "Acme Corp",
    "serviceInterest": "Web Development",
    "budgetRange": "₹1,50,000 - ₹3,00,000",
    "message": "Project description...",
    "leadSource": "WEBSITE"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "leadId": "lead_1731800000_abcd",
    "message": "Thank you! We have received your inquiry."
  }
  ```
* **Database Action:** Inserts a new document into `leads` collection with status `NEW` and logs activity.

---

## 2. Administrative Authentication & Overview

### `POST /api/admin/auth/login`
* **File:** `src/app/api/admin/auth/login/route.ts`
* **Access:** Public
* **Payload:** `{ "email": "admin@bitnwit.com", "password": "...", "rememberMe": true }`
* **Security:** Verifies salted password hash via `hashPassword()`. Generates signed JWT session token. Sets `bitnwit_admin_session` cookie (`HttpOnly`, `Path=/`, `SameSite=Lax`, `Secure` in production). Max age 30 days if rememberMe, otherwise 24 hours.

### `POST /api/admin/auth/logout`
* **File:** `src/app/api/admin/auth/logout/route.ts`
* **Access:** Authenticated
* **Security:** Clears `bitnwit_admin_session` cookie (`Max-Age=0`).

### `GET /api/admin/auth/me`
* **File:** `src/app/api/admin/auth/me/route.ts`
* **Access:** Authenticated
* **Response:** `{ "authenticated": true, "user": { "id": "...", "name": "...", "email": "...", "role": "SUPER_ADMIN" } }`

### `GET /api/admin/overview`
* **File:** `src/app/api/admin/overview/route.ts`
* **Access:** Authenticated
* **Response:** Aggregates live database metrics:
  * `stats`: `totalLeads`, `newLeads`, `activeProjects`, `completedProjects`, `publishedBlogs`, `totalServices`
  * `statusDistribution`: Count by status (NEW, CONTACTED, QUALIFIED, PROPOSAL_SENT, NEGOTIATION, CONVERTED, LOST)
  * `monthlyLeads`: Array of 6 months lead generation volume
  * `recentLeads`: Last 5 leads
  * `recentProjects`: Last 4 projects
  * `recentActivity`: Last 8 audit logs

### `GET /api/admin/profile` & `PUT /api/admin/profile`
* **File:** `src/app/api/admin/profile/route.ts`
* **Access:** Authenticated
* **GET:** Fetches current admin user details.
* **PUT:** Updates name, avatar, or rotates password (requires `currentPassword` verification).

---

## 3. Resource Management Endpoints (CRUD)

### Leads Management
* **`GET /api/admin/leads`** — Query parameters: `status`, `search`, `service`, `limit`, `page`. Returns `{ leads: Lead[], totalCount: number }`.
* **`POST /api/admin/leads`** — Creates a lead manually.
* **`GET /api/admin/leads/[id]`** — Fetches single lead with internal notes and status history.
* **`PUT /api/admin/leads/[id]`** — Updates status, assigned member, follow-up date, or appends notes.
* **`DELETE /api/admin/leads/[id]`** — Deletes lead record with activity audit trail.

### Services Management
* **`GET /api/admin/services`** — Fetches all services sorted by `displayOrder`.
* **`POST /api/admin/services`** — Creates a new service offering.
* **`GET /api/admin/services/[id]`** — Fetches single service details.
* **`PUT /api/admin/services/[id]`** — Updates title, slug, descriptions, deliverables, benefits, tech stack, isPublished.
* **`DELETE /api/admin/services/[id]`** — Removes service.

### Portfolio & Projects
* **`GET /api/admin/projects`** — Fetches all portfolio items.
* **`POST /api/admin/projects`** — Adds new project with cover image, category, challenge, solution, and results.
* **`GET /api/admin/projects/[id]`** — Fetches single project.
* **`PUT /api/admin/projects/[id]`** — Updates project details, featured toggle, live URL.
* **`DELETE /api/admin/projects/[id]`** — Deletes project.

### Blog Management
* **`GET /api/admin/blogs`** — Lists all articles (published and drafts).
* **`POST /api/admin/blogs`** — Creates article with title, slug, markdown body, tags, meta tags.
* **`GET /api/admin/blogs/[id]`** — Fetches single article for editor.
* **`PUT /api/admin/blogs/[id]`** — Updates article or changes publication status.
* **`DELETE /api/admin/blogs/[id]`** — Deletes blog.

### Testimonials
* **`GET /api/admin/testimonials`** — Lists client testimonials.
* **`POST /api/admin/testimonials`** — Adds review with rating and client details.
* **`PUT /api/admin/testimonials/[id]`** — Updates or toggles featured status.
* **`DELETE /api/admin/testimonials/[id]`** — Deletes testimonial.

### Media Library
* **`GET /api/admin/media`** — Lists media assets; supports `folder` and `search` filters.
* **`POST /api/admin/media`** — Handles multipart file upload (PNG, JPG, WebP, SVG, PDF up to 10MB) to `/public/uploads/` and records metadata.
* **`DELETE /api/admin/media/[id]`** — Deletes asset record and disk file.

### Team Management
* **`GET /api/admin/team`** — Lists public team members and roles.
* **`POST /api/admin/team`** — Adds team member.
* **`PUT /api/admin/team/[id]`** — Updates profile, title, specialties, visibility.
* **`DELETE /api/admin/team/[id]`** — Deletes team record.

### Settings & SEO
* **`GET /api/admin/settings`** & **`POST /api/admin/settings`** — Retrieves and updates global company details, official email, phone, social links.
* **`GET /api/admin/seo`** & **`POST /api/admin/seo`** — Retrieves and updates route-based SEO metadata (`/`, `/services`, `/work`, etc.).

### Analytics & Users
* **`GET /api/admin/analytics`** — Aggregates traffic telemetry, conversion metrics, and GA4 status.
* **`GET /api/admin/users`** & **`POST /api/admin/users`** — Super Admin management of admin user accounts and access roles.
