import fs from 'fs';
import path from 'path';
import {
  AdminUser,
  Lead,
  LeadNote,
  ServiceItem,
  ProjectItem,
  BlogPost,
  TestimonialItem,
  MediaFile,
  TeamMember,
  WebsiteSetting,
  SeoMetadata,
  ActivityLog,
  DatabaseStore,
  LeadStatus,
  LeadSource,
  BlogStatus,
  MediaFolder,
} from './types';
import { hashPassword } from './auth';
import { services, projects, team, posts } from '../../data/content';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'bitnwit-db.json');

let dbCache: DatabaseStore | null = null;

function normalizeLead(l: any): Lead {
  return {
    ...l,
    fullName: l.fullName || l.name || '',
    email: l.email || '',
    phone: l.phone || l.contact || '',
    interestedService: l.interestedService || l.serviceInterest || l.service || 'Web Development',
    serviceInterest: l.serviceInterest || l.interestedService || l.service || 'Web Development',
    projectBudget: l.projectBudget || l.budgetRange || l.budget || 'Flexible',
    budgetRange: l.budgetRange || l.projectBudget || l.budget || 'Flexible',
    dateReceived: l.dateReceived || l.createdAt || new Date().toISOString(),
    assignedTeamMember: l.assignedTeamMember || l.assignedToId || '',
    followUpDate: l.followUpDate || l.followupDate || '',
    notes: Array.isArray(l.notes) ? l.notes : [],
    createdAt: l.createdAt || new Date().toISOString(),
    updatedAt: l.updatedAt || new Date().toISOString(),
  };
}

function normalizeService(s: any): ServiceItem {
  return {
    ...s,
    icon: s.icon || s.iconName || 'code',
    iconName: s.iconName || s.icon || 'code',
    shortDescription: s.shortDescription || s.shortDesc || '',
    shortDesc: s.shortDesc || s.shortDescription || '',
    detailedDescription: s.detailedDescription || s.detailedDesc || '',
    detailedDesc: s.detailedDesc || s.detailedDescription || '',
    coverImageUrl: s.coverImageUrl || '/services/web-development.png',
    deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
    benefits: Array.isArray(s.benefits) ? s.benefits : [],
    techStack: Array.isArray(s.techStack) ? s.techStack : [],
    ctaText: s.ctaText || 'Get Started',
    displayOrder: typeof s.displayOrder === 'number' ? s.displayOrder : 0,
    isPublished: s.isPublished !== undefined ? Boolean(s.isPublished) : true,
    updatedAt: s.updatedAt || new Date().toISOString(),
  };
}

function normalizeProject(p: any): ProjectItem {
  return {
    ...p,
    shortDescription: p.shortDescription || p.summary || '',
    summary: p.summary || p.shortDescription || '',
    detailedDescription: p.detailedDescription || p.solution || p.challenge || '',
    coverImageUrl: p.coverImageUrl || p.coverImage || '/work-resume-iq.png',
    coverImage: p.coverImage || p.coverImageUrl || '/work-resume-iq.png',
    galleryImageUrls: Array.isArray(p.galleryImageUrls) ? p.galleryImageUrls : (p.galleryImages || []),
    galleryImages: Array.isArray(p.galleryImages) ? p.galleryImages : (p.galleryImageUrls || []),
    technologiesUsed: Array.isArray(p.technologiesUsed) ? p.technologiesUsed : (p.servicesTags || ['Next.js']),
    servicesTags: Array.isArray(p.servicesTags) ? p.servicesTags : (p.technologiesUsed || ['Next.js']),
    projectUrl: p.projectUrl || p.liveUrl || '',
    liveUrl: p.liveUrl || p.projectUrl || '',
    completionDate: p.completionDate || new Date().toISOString().slice(0, 10),
    isFeatured: Boolean(p.isFeatured),
    publicationStatus: p.publicationStatus || (p.isPublished === false ? 'DRAFT' : 'PUBLISHED'),
    isPublished: p.isPublished !== undefined ? Boolean(p.isPublished) : true,
    displayOrder: typeof p.displayOrder === 'number' ? p.displayOrder : 0,
  };
}

function normalizeBlogPost(b: any): BlogPost {
  return {
    ...b,
    tags: Array.isArray(b.tags) ? b.tags : ['Engineering'],
    content: b.content || b.contentMarkdown || '',
    contentMarkdown: b.contentMarkdown || b.content || '',
    coverImageUrl: b.coverImageUrl || b.coverImage || '/bitnwit-brand-asset-board.png',
    coverImage: b.coverImage || b.coverImageUrl || '/bitnwit-brand-asset-board.png',
    readingTime: b.readingTime || b.readTime || '5 min read',
    readTime: b.readTime || b.readingTime || '5 min read',
    status: b.status || 'PUBLISHED',
    metaTitle: b.metaTitle || b.title,
    metaDescription: b.metaDescription || b.excerpt,
    publishedAt: b.publishedAt || new Date().toISOString(),
  };
}

function normalizeTestimonial(t: any): TestimonialItem {
  return {
    ...t,
    clientDesignation: t.clientDesignation || t.designation || 'Client',
    designation: t.designation || t.clientDesignation || 'Client',
    clientPhotoUrl: t.clientPhotoUrl || t.avatarOrLogo || '/bitty-mascot.png',
    avatarOrLogo: t.avatarOrLogo || t.clientPhotoUrl || '/bitty-mascot.png',
    reviewText: t.reviewText || t.content || '',
    content: t.content || t.reviewText || '',
    serviceProvided: t.serviceProvided || 'Web Development',
    isFeaturedOnHomepage: t.isFeaturedOnHomepage !== undefined ? Boolean(t.isFeaturedOnHomepage) : Boolean(t.isFeatured),
    isFeatured: t.isFeatured !== undefined ? Boolean(t.isFeatured) : Boolean(t.isFeaturedOnHomepage),
    displayStatus: t.displayStatus || (t.isPublished === false ? 'HIDDEN' : 'VISIBLE'),
    isPublished: t.isPublished !== undefined ? Boolean(t.isPublished) : true,
    rating: typeof t.rating === 'number' ? t.rating : 5,
    displayOrder: typeof t.displayOrder === 'number' ? t.displayOrder : 0,
  };
}

function normalizeMediaFile(m: any): MediaFile {
  return {
    ...m,
    name: m.name || m.originalName || m.filename || 'asset.png',
    filename: m.filename || m.name || m.originalName || 'asset.png',
    originalName: m.originalName || m.name || m.filename || 'asset.png',
    url: m.url || m.fileUrl || '/og-image.jpg',
    fileUrl: m.fileUrl || m.url || '/og-image.jpg',
    sizeBytes: typeof m.sizeBytes === 'number' ? m.sizeBytes : (m.fileSizeBytes || 1024),
    fileSizeBytes: typeof m.fileSizeBytes === 'number' ? m.fileSizeBytes : (m.sizeBytes || 1024),
    folder: m.folder || 'BRAND',
    mimeType: m.mimeType || 'image/png',
    uploadedAt: m.uploadedAt || new Date().toISOString(),
  };
}

function normalizeTeamMember(t: any): TeamMember {
  return {
    ...t,
    fullName: t.fullName || t.name,
    name: t.name || t.fullName,
    designation: t.designation || t.role || 'Engineer',
    role: t.role || t.designation || 'Engineer',
    department: t.department || 'Engineering',
    bio: t.bio || '',
    initials: t.initials || (t.name || t.fullName || 'BW').slice(0, 2).toUpperCase(),
    phone: t.phone || '',
    profileImageUrl: t.profileImageUrl || t.avatarUrl || '/bitty-mascot.png',
    avatarUrl: t.avatarUrl || t.profileImageUrl || '/bitty-mascot.png',
    socialLinks: t.socialLinks || {},
    adminAccessRole: t.adminAccessRole || 'NONE',
    displayOrder: typeof t.displayOrder === 'number' ? t.displayOrder : 0,
    isActive: t.isActive !== undefined ? Boolean(t.isActive) : true,
    isVisibleOnWebsite: t.isVisibleOnWebsite !== undefined ? Boolean(t.isVisibleOnWebsite) : true,
  };
}

function normalizeSeo(s: any): SeoMetadata {
  return {
    ...s,
    id: s.id || `seo_${s.pageRoute.replace(/[^a-z0-9]/gi, '_')}`,
    pageRoute: s.pageRoute || '/',
    pageTitle: s.pageTitle || s.metaTitle || 'BITnWit Technologies',
    metaTitle: s.metaTitle || s.pageTitle || 'BITnWit Technologies',
    metaDescription: s.metaDescription || '',
    focusKeywords: Array.isArray(s.focusKeywords) ? s.focusKeywords : ['bitnwit'],
    canonicalUrl: s.canonicalUrl || `https://www.bitnwit.com${s.pageRoute || ''}`,
    ogTitle: s.ogTitle || s.pageTitle || s.metaTitle || 'BITnWit Technologies',
    ogDescription: s.ogDescription || s.metaDescription || '',
    ogImageUrl: s.ogImageUrl || '/og-image.jpg',
    noIndex: Boolean(s.noIndex),
    indexable: s.indexable !== undefined ? Boolean(s.indexable) : true,
    updatedAt: s.updatedAt || new Date().toISOString(),
  };
}

function createInitialDatabase(): DatabaseStore {
  const defaultAdminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'BitnWit@2026!';
  const { hash, salt } = hashPassword(defaultAdminPassword);

  const initialSuperAdmin: AdminUser = {
    id: 'usr_superadmin_01',
    email: 'admin@bitnwit.com',
    passwordHash: hash,
    salt,
    name: 'Prateek Makwana',
    fullName: 'Prateek Makwana',
    role: 'SUPER_ADMIN',
    avatarUrl: '/bitty-mascot.png',
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  const initialServices: ServiceItem[] = services.map((s, index) =>
    normalizeService({
      id: `srv_${s.slug.replace(/[^a-z0-9]/gi, '_')}`,
      slug: s.slug,
      title: s.title,
      iconName: s.slug.includes('web') ? 'code' : 'layers',
      shortDesc: s.description,
      detailedDesc: s.description,
      deliverables: s.deliverables,
      techStack: s.process.map((p) => p.title),
      turnaround: '2-4 weeks',
      targetOutcome: 'High performance scalable digital solution',
      displayOrder: index + 1,
      isPublished: true,
      updatedAt: new Date().toISOString(),
    })
  );

  const initialProjects: ProjectItem[] = projects.map((p, index) =>
    normalizeProject({
      id: `prj_${p.slug.replace(/[^a-z0-9]/gi, '_')}`,
      slug: p.slug,
      title: p.title,
      clientName: 'Client Partner',
      category: p.category,
      summary: p.summary,
      coverImage: p.image,
      challenge: p.challenge,
      solution: p.solution,
      results: p.results,
      servicesTags: p.services,
      liveUrl: p.liveUrl,
      displayOrder: index + 1,
      isFeatured: index < 3,
      isPublished: true,
    })
  );

  const initialTeam: TeamMember[] = team.map((t, index) =>
    normalizeTeamMember({
      id: `team_${index + 1}`,
      name: t.name,
      role: t.role,
      initials: t.initials,
      phone: t.phone,
      avatarUrl: '/bitty-mascot.png',
      specialties: t.specialties,
      displayOrder: index + 1,
      isActive: true,
    })
  );

  const initialBlogs: BlogPost[] = posts.map((post) =>
    normalizeBlogPost({
      id: `blg_${post.slug.replace(/[^a-z0-9]/gi, '_')}`,
      slug: post.slug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      contentMarkdown: post.sections
        .map((s) => `## ${s.heading}\n\n${s.body}`)
        .join('\n\n'),
      coverImage: post.image,
      authorName: 'BITnWit Engineering Team',
      readTime: post.readTime,
      status: 'PUBLISHED',
      metaTitle: `${post.title} | BITnWit Insights`,
      metaDescription: post.excerpt,
      publishedAt: new Date(post.date).toISOString() || new Date().toISOString(),
    })
  );

  const initialTestimonials: TestimonialItem[] = [
    normalizeTestimonial({
      id: 'tst_01',
      clientName: 'Aarav Mehta',
      companyName: 'ScaleFlow Logistics',
      designation: 'VP of Product',
      avatarOrLogo: '/favicon-192.png',
      content:
        'BITnWit delivered our internal operations dashboard 2 weeks ahead of schedule. The code quality and responsive speed were exceptional.',
      rating: 5,
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    }),
    normalizeTestimonial({
      id: 'tst_02',
      clientName: 'Elena Rostova',
      companyName: 'FinPulse Systems',
      designation: 'Founder & CEO',
      avatarOrLogo: '/favicon-192.png',
      content:
        'The White Rabbit AI assistant workflow automated 60% of our tier-1 support tickets on day one. Highly recommend their engineering team.',
      rating: 5,
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    }),
    normalizeTestimonial({
      id: 'tst_03',
      clientName: 'Devendra Rathore',
      companyName: 'Jaipur Crafts Collective',
      designation: 'Managing Director',
      avatarOrLogo: '/favicon-192.png',
      content:
        'Our new e-commerce and inventory platform doubled our monthly online order conversions. Clean aesthetics and rock-solid architecture.',
      rating: 5,
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    }),
  ];

  const initialMedia: MediaFile[] = [
    normalizeMediaFile({
      id: 'med_01',
      filename: 'bitty-mascot.png',
      originalName: 'bitty-mascot.png',
      fileUrl: '/bitty-mascot.png',
      folder: 'MASCOT',
      mimeType: 'image/png',
      fileSizeBytes: 420500,
      uploadedAt: new Date().toISOString(),
    }),
    normalizeMediaFile({
      id: 'med_02',
      filename: 'bitnwit-logo.png',
      originalName: 'bitnwit-logo.png',
      fileUrl: '/bitnwit-logo.png',
      folder: 'BRAND',
      mimeType: 'image/png',
      fileSizeBytes: 152300,
      uploadedAt: new Date().toISOString(),
    }),
    normalizeMediaFile({
      id: 'med_03',
      filename: 'og-image.jpg',
      originalName: 'og-image.jpg',
      fileUrl: '/og-image.jpg',
      folder: 'BRAND',
      mimeType: 'image/jpeg',
      fileSizeBytes: 180200,
      uploadedAt: new Date().toISOString(),
    }),
  ];

  const initialSettings: Record<string, WebsiteSetting> = {
    site_name: {
      key: 'site_name',
      value: 'BITnWit Technologies Pvt. Ltd.',
      category: 'GENERAL',
      updatedAt: new Date().toISOString(),
    },
    tagline: {
      key: 'tagline',
      value: 'INNOVATE • BUILD • SOLVE',
      category: 'GENERAL',
      updatedAt: new Date().toISOString(),
    },
    contact_email: {
      key: 'contact_email',
      value: 'contact@bitnwit.com',
      category: 'CONTACT',
      updatedAt: new Date().toISOString(),
    },
    contact_phone: {
      key: 'contact_phone',
      value: '+91 89497 28810',
      category: 'CONTACT',
      updatedAt: new Date().toISOString(),
    },
    whatsapp_number: {
      key: 'whatsapp_number',
      value: '918949728810',
      category: 'CONTACT',
      updatedAt: new Date().toISOString(),
    },
    working_hours: {
      key: 'working_hours',
      value: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
      category: 'CONTACT',
      updatedAt: new Date().toISOString(),
    },
    office_address: {
      key: 'office_address',
      value: 'BITnWit Technologies Pvt. Ltd., India — Remote-First & Worldwide',
      category: 'CONTACT',
      updatedAt: new Date().toISOString(),
    },
    copyright_text: {
      key: 'copyright_text',
      value: '© 2026 BITnWit Technologies Pvt. Ltd. All rights reserved.',
      category: 'GENERAL',
      updatedAt: new Date().toISOString(),
    },
    social_linkedin: {
      key: 'social_linkedin',
      value: 'https://www.linkedin.com/company/bitnwit',
      category: 'SOCIAL',
      updatedAt: new Date().toISOString(),
    },
    social_instagram: {
      key: 'social_instagram',
      value: 'https://www.instagram.com/bitnwit.in',
      category: 'SOCIAL',
      updatedAt: new Date().toISOString(),
    },
    social_twitter: {
      key: 'social_twitter',
      value: 'https://twitter.com/bitnwit',
      category: 'SOCIAL',
      updatedAt: new Date().toISOString(),
    },
    social_github: {
      key: 'social_github',
      value: 'https://github.com/makwana-prateek23',
      category: 'SOCIAL',
      updatedAt: new Date().toISOString(),
    },
  };

  const initialSeo: Record<string, SeoMetadata> = {
    '/': normalizeSeo({
      pageRoute: '/',
      metaTitle: 'BITnWIT | Web, App, AI & Digital Growth',
      metaDescription:
        'BITnWIT builds websites, applications, AI workflows, brands, and digital growth systems for clients across India and worldwide.',
      ogImageUrl: '/og-image.jpg',
      canonicalUrl: 'https://www.bitnwit.com/',
      indexable: true,
      updatedAt: new Date().toISOString(),
    }),
    '/services': normalizeSeo({
      pageRoute: '/services',
      metaTitle: 'Digital Engineering & Creative Agency Services | BITnWIT',
      metaDescription:
        'Explore BITnWIT digital engineering, AI integration, web & mobile app development, UI/UX design, custom software, digital marketing, and brand strategy.',
      ogImageUrl: '/og-image.jpg',
      canonicalUrl: 'https://www.bitnwit.com/services',
      indexable: true,
      updatedAt: new Date().toISOString(),
    }),
    '/work': normalizeSeo({
      pageRoute: '/work',
      metaTitle: 'Our Work & Case Studies | BITnWIT',
      metaDescription:
        'Explore BITnWIT case studies across web, mobile applications, AI, marketing, branding, and custom software.',
      ogImageUrl: '/og-image.jpg',
      canonicalUrl: 'https://www.bitnwit.com/work',
      indexable: true,
      updatedAt: new Date().toISOString(),
    }),
    '/about': normalizeSeo({
      pageRoute: '/about',
      metaTitle: 'About Us | BITnWIT',
      metaDescription:
        'Meet BITnWIT, our leadership, approach, and remote-first process for delivering digital projects across India and worldwide.',
      ogImageUrl: '/og-image.jpg',
      canonicalUrl: 'https://www.bitnwit.com/about',
      indexable: true,
      updatedAt: new Date().toISOString(),
    }),
    '/contact': normalizeSeo({
      pageRoute: '/contact',
      metaTitle: 'Contact Us | Start a Project with BITnWIT',
      metaDescription:
        'Reach our team to discuss project requirements, timelines, budget, and free technical discovery sessions.',
      ogImageUrl: '/og-image.jpg',
      canonicalUrl: 'https://www.bitnwit.com/contact',
      indexable: true,
      updatedAt: new Date().toISOString(),
    }),
    '/blog': normalizeSeo({
      pageRoute: '/blog',
      metaTitle: 'Insights & Technical Articles | BITnWIT',
      metaDescription:
        'Engineering articles, architectural breakdowns, AI case studies, and digital growth insights by BITnWIT experts.',
      ogImageUrl: '/og-image.jpg',
      canonicalUrl: 'https://www.bitnwit.com/blog',
      indexable: true,
      updatedAt: new Date().toISOString(),
    }),
  };

  const initialLeads: Lead[] = [
    normalizeLead({
      id: 'lead_seed_01',
      fullName: 'Vikramaditya Singhania',
      email: 'vikram@singhaniagroup.com',
      phone: '+91 98290 12345',
      companyName: 'Singhania Enterprise',
      serviceInterest: 'Custom Code',
      budgetRange: '₹3,00,000 - ₹5,00,000',
      message:
        'We need an internal automated ERP connector between our legacy inventory database and a real-time Next.js web application for 50 branch managers.',
      leadSource: 'WEBSITE',
      status: 'QUALIFIED',
      assignedTeamMember: 'Prateek Makwana',
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      dateReceived: new Date(Date.now() - 86400000 * 1).toISOString(),
      notes: [
        {
          id: 'note_seed_01',
          leadId: 'lead_seed_01',
          authorName: 'Prateek Makwana',
          content: 'Discussed scope via introductory call. Client sending API schema for review.',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
      ],
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    normalizeLead({
      id: 'lead_seed_02',
      fullName: 'Dr. Ananya Roy',
      email: 'ananya@medpulse-health.org',
      phone: '+91 94140 88765',
      companyName: 'MedPulse Diagnostics',
      serviceInterest: 'App Development',
      budgetRange: '₹1,50,000 - ₹3,00,000',
      message:
        'Looking for an Android and iOS application for diagnostic appointment booking and report delivery with secure SMS/WhatsApp verification.',
      leadSource: 'WEBSITE',
      status: 'NEW',
      dateReceived: new Date(Date.now() - 3600000 * 4).toISOString(),
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    normalizeLead({
      id: 'lead_seed_03',
      fullName: 'Kunal Deshmukh',
      email: 'kunal@deshmukhindustries.in',
      phone: '+91 91660 33445',
      companyName: 'Deshmukh Precision Tools',
      serviceInterest: 'Web Development',
      budgetRange: '₹75,000 - ₹1,50,000',
      message:
        'Need modern redesign of our industrial manufacturing catalogue website with fast page speeds and export enquiry forms.',
      leadSource: 'WHATSAPP',
      status: 'CONTACTED',
      dateReceived: new Date(Date.now() - 86400000 * 3).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  ];

  return {
    adminUsers: [initialSuperAdmin],
    leads: initialLeads,
    leadNotes: [],
    services: initialServices,
    projects: initialProjects,
    blogs: initialBlogs,
    testimonials: initialTestimonials,
    mediaFiles: initialMedia,
    teamMembers: initialTeam,
    websiteSettings: initialSettings,
    seoMetadata: initialSeo,
    activityLogs: [
      {
        id: 'act_init_01',
        adminId: initialSuperAdmin.id,
        adminName: initialSuperAdmin.fullName,
        action: 'SYSTEM_INIT',
        entityType: 'SYSTEM',
        details: 'BITnWit Enterprise Admin Panel database initialized and seeded',
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

export function getDb(): DatabaseStore {
  if (dbCache) return dbCache;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialDb = createInitialDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
      dbCache = initialDb;
      return initialDb;
    }

    const data = fs.readFileSync(DB_FILE, 'utf8');
    dbCache = JSON.parse(data) as DatabaseStore;
    return dbCache;
  } catch (error) {
    console.error('Failed to load database store, using fallback:', error);
    dbCache = createInitialDatabase();
    return dbCache;
  }
}

export function saveDb(database: DatabaseStore): void {
  dbCache = database;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(database, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (error) {
    console.error('Failed to persist database file:', error);
  }
}

// ------------------------------------------------------------------
// REPOSITORIES
// ------------------------------------------------------------------

// Admin Users
export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const db = getDb();
  const found = db.adminUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );
  if (!found) return null;
  return { ...found, name: found.name || found.fullName };
}

export async function getAdminUser(id: string): Promise<AdminUser | null> {
  const db = getDb();
  const found = db.adminUsers.find((u) => u.id === id);
  if (!found) return null;
  return { ...found, name: found.name || found.fullName };
}

export async function updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
  const db = getDb();
  const index = db.adminUsers.findIndex((u) => u.id === id);
  if (index === -1) return null;

  db.adminUsers[index] = {
    ...db.adminUsers[index],
    ...updates,
    name: (updates.name || updates.fullName || db.adminUsers[index].fullName),
    fullName: (updates.fullName || updates.name || db.adminUsers[index].fullName),
  };
  saveDb(db);
  return db.adminUsers[index];
}

// Leads
export async function getLeads(options?: {
  status?: LeadStatus;
  service?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ items: Lead[]; totalCount: number; page: number; limit: number; totalPages: number }> {
  const db = getDb();
  let list = db.leads.map(normalizeLead);

  if (options?.status) {
    list = list.filter((l) => l.status === options.status);
  }
  if (options?.service && options.service !== 'All Services') {
    list = list.filter((l) => l.interestedService === options.service);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (l) =>
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.companyName && l.companyName.toLowerCase().includes(q))
    );
  }

  const totalCount = list.length;
  const page = Math.max(1, options?.page || 1);
  const limit = options?.limit || 20;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const startIndex = (page - 1) * limit;
  const items = list.slice(startIndex, startIndex + limit);

  return { items, totalCount, page, limit, totalPages };
}

export async function getLead(id: string): Promise<Lead | null> {
  const db = getDb();
  const lead = db.leads.find((l) => l.id === id);
  return lead ? normalizeLead(lead) : null;
}

export async function createLead(data: Partial<Lead>): Promise<Lead> {
  const db = getDb();
  const newLead = normalizeLead({
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dateReceived: new Date().toISOString(),
  });
  db.leads.unshift(newLead);
  saveDb(db);
  return newLead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const db = getDb();
  const index = db.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  db.leads[index] = normalizeLead({
    ...db.leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  });
  saveDb(db);
  return db.leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  saveDb(db);
  return db.leads.length < initialLen;
}

export async function addLeadNote(
  leadId: string,
  authorId: string,
  authorName: string,
  content: string
): Promise<LeadNote | null> {
  const db = getDb();
  const lead = db.leads.find((l) => l.id === leadId);
  if (!lead) return null;

  const note: LeadNote = {
    id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    leadId,
    authorId,
    authorName,
    content,
    createdAt: new Date().toISOString(),
  };

  if (!lead.notes) lead.notes = [];
  lead.notes.push(note);
  lead.updatedAt = new Date().toISOString();
  saveDb(db);
  return note;
}

// Services
export async function getServices(options?: { publishedOnly?: boolean }): Promise<ServiceItem[]> {
  const db = getDb();
  let list = db.services.map(normalizeService);
  if (options?.publishedOnly) {
    list = list.filter((s) => s.isPublished);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getService(id: string): Promise<ServiceItem | null> {
  const db = getDb();
  const s = db.services.find((x) => x.id === id || x.slug === id);
  return s ? normalizeService(s) : null;
}

export async function createService(data: Partial<ServiceItem>): Promise<ServiceItem> {
  const db = getDb();
  const s = normalizeService({
    ...data,
    id: `srv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    updatedAt: new Date().toISOString(),
  });
  db.services.push(s);
  saveDb(db);
  return s;
}

export async function updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> {
  const db = getDb();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) return null;

  db.services[index] = normalizeService({
    ...db.services[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  });
  saveDb(db);
  return db.services[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  saveDb(db);
  return db.services.length < initialLen;
}

// Projects
export async function getProjects(options?: {
  category?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<{ items: ProjectItem[]; totalCount: number }> {
  const db = getDb();
  let list = db.projects.map(normalizeProject);
  if (options?.category && options.category !== 'ALL') {
    list = list.filter((p) => p.category === options.category);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.isFeatured);
  }
  const totalCount = list.length;
  list.sort((a, b) => a.displayOrder - b.displayOrder);
  if (options?.limit) list = list.slice(0, options.limit);
  return { items: list, totalCount };
}

export async function getProject(id: string): Promise<ProjectItem | null> {
  const db = getDb();
  const p = db.projects.find((x) => x.id === id || x.slug === id);
  return p ? normalizeProject(p) : null;
}

export async function createProject(data: Partial<ProjectItem>): Promise<ProjectItem> {
  const db = getDb();
  const p = normalizeProject({
    ...data,
    id: `prj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  });
  db.projects.push(p);
  saveDb(db);
  return p;
}

export async function updateProject(id: string, updates: Partial<ProjectItem>): Promise<ProjectItem | null> {
  const db = getDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.projects[index] = normalizeProject({ ...db.projects[index], ...updates });
  saveDb(db);
  return db.projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  saveDb(db);
  return db.projects.length < initialLen;
}

// Blogs
export async function getBlogPosts(options?: {
  status?: BlogStatus;
  search?: string;
}): Promise<{ items: BlogPost[]; totalCount: number }> {
  const db = getDb();
  let list = db.blogs.map(normalizeBlogPost);
  if (options?.status) {
    list = list.filter((b) => b.status === options.status);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter((b) => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
  }
  return { items: list, totalCount: list.length };
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const db = getDb();
  const b = db.blogs.find((x) => x.id === id || x.slug === id);
  return b ? normalizeBlogPost(b) : null;
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const db = getDb();
  const b = normalizeBlogPost({
    ...data,
    id: `blg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    publishedAt: data.publishedAt || new Date().toISOString(),
  });
  db.blogs.unshift(b);
  saveDb(db);
  return b;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const db = getDb();
  const index = db.blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;

  db.blogs[index] = normalizeBlogPost({ ...db.blogs[index], ...updates });
  saveDb(db);
  return db.blogs[index];
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.blogs.length;
  db.blogs = db.blogs.filter((b) => b.id !== id);
  saveDb(db);
  return db.blogs.length < initialLen;
}

// Testimonials
export async function getTestimonials(options?: { featuredOnly?: boolean }): Promise<TestimonialItem[]> {
  const db = getDb();
  let list = db.testimonials.map(normalizeTestimonial);
  if (options?.featuredOnly) {
    list = list.filter((t) => t.isFeaturedOnHomepage);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getTestimonial(id: string): Promise<TestimonialItem | null> {
  const db = getDb();
  const t = db.testimonials.find((x) => x.id === id);
  return t ? normalizeTestimonial(t) : null;
}

export async function createTestimonial(data: Partial<TestimonialItem>): Promise<TestimonialItem> {
  const db = getDb();
  const t = normalizeTestimonial({
    ...data,
    id: `tst_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  });
  db.testimonials.push(t);
  saveDb(db);
  return t;
}

export async function updateTestimonial(id: string, updates: Partial<TestimonialItem>): Promise<TestimonialItem | null> {
  const db = getDb();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.testimonials[index] = normalizeTestimonial({ ...db.testimonials[index], ...updates });
  saveDb(db);
  return db.testimonials[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveDb(db);
  return db.testimonials.length < initialLen;
}

// Media
export async function getMediaFiles(options?: { folder?: MediaFolder; search?: string }): Promise<MediaFile[]> {
  const db = getDb();
  let list = db.mediaFiles.map(normalizeMediaFile);
  if (options?.folder) {
    list = list.filter((m) => m.folder === options.folder);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter((m) => m.filename?.toLowerCase().includes(q) || m.name?.toLowerCase().includes(q));
  }
  return list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export async function getMediaFile(id: string): Promise<MediaFile | null> {
  const db = getDb();
  const m = db.mediaFiles.find((x) => x.id === id);
  return m ? normalizeMediaFile(m) : null;
}

export async function registerMediaFile(data: Partial<MediaFile>): Promise<MediaFile> {
  const db = getDb();
  const m = normalizeMediaFile({
    ...data,
    id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    uploadedAt: new Date().toISOString(),
  });
  db.mediaFiles.unshift(m);
  saveDb(db);
  return m;
}

export async function deleteMediaFile(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.mediaFiles.length;
  db.mediaFiles = db.mediaFiles.filter((m) => m.id !== id);
  saveDb(db);
  return db.mediaFiles.length < initialLen;
}

// Team
export async function getTeamMembers(options?: { department?: string; activeOnly?: boolean }): Promise<TeamMember[]> {
  const db = getDb();
  let list = db.teamMembers.map(normalizeTeamMember);
  if (options?.department) {
    list = list.filter((t) => t.department === options.department);
  }
  if (options?.activeOnly) {
    list = list.filter((t) => t.isActive);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const db = getDb();
  const t = db.teamMembers.find((x) => x.id === id);
  return t ? normalizeTeamMember(t) : null;
}

export async function createTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
  const db = getDb();
  const t = normalizeTeamMember({
    ...data,
    id: `team_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  });
  db.teamMembers.push(t);
  saveDb(db);
  return t;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
  const db = getDb();
  const index = db.teamMembers.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.teamMembers[index] = normalizeTeamMember({ ...db.teamMembers[index], ...updates });
  saveDb(db);
  return db.teamMembers[index];
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const db = getDb();
  const initialLen = db.teamMembers.length;
  db.teamMembers = db.teamMembers.filter((t) => t.id !== id);
  saveDb(db);
  return db.teamMembers.length < initialLen;
}

// Settings
export async function getAllSettings(): Promise<Record<string, string>> {
  const db = getDb();
  const result: Record<string, string> = {};
  for (const [key, item] of Object.entries(db.websiteSettings)) {
    result[key] = String(item.value);
  }
  return result;
}

export async function getSetting(key: string): Promise<string | null> {
  const db = getDb();
  return db.websiteSettings[key] ? String(db.websiteSettings[key].value) : null;
}

export async function setSetting(key: string, value: string): Promise<WebsiteSetting> {
  const db = getDb();
  const setting: WebsiteSetting = {
    key,
    value,
    category: key.startsWith('social_') ? 'SOCIAL' : key.includes('email') || key.includes('phone') || key.includes('address') ? 'CONTACT' : 'GENERAL',
    updatedAt: new Date().toISOString(),
  };
  db.websiteSettings[key] = setting;
  saveDb(db);
  return setting;
}

// SEO
export async function getAllSeo(): Promise<SeoMetadata[]> {
  const db = getDb();
  return Object.values(db.seoMetadata).map(normalizeSeo);
}

export async function getSeo(pageRoute: string): Promise<SeoMetadata | null> {
  const db = getDb();
  const seo = db.seoMetadata[pageRoute];
  return seo ? normalizeSeo(seo) : null;
}

export async function upsertSeo(data: Partial<SeoMetadata> & { pageRoute: string }): Promise<SeoMetadata> {
  const db = getDb();
  const existing = db.seoMetadata[data.pageRoute] || { pageRoute: data.pageRoute };
  const updated = normalizeSeo({
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  });
  db.seoMetadata[data.pageRoute] = updated;
  saveDb(db);
  return updated;
}

// Activity Logs
export async function getActivityLogs(limit = 50): Promise<ActivityLog[]> {
  const db = getDb();
  return [...db.activityLogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function logActivity(
  adminId: string,
  adminName: string,
  action: string,
  entityType: string,
  entityId?: string,
  details = '',
  ipAddress?: string
): Promise<ActivityLog> {
  const db = getDb();
  const log: ActivityLog = {
    id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    adminId,
    adminName,
    action,
    entityType,
    entityId,
    details,
    ipAddress,
    createdAt: new Date().toISOString(),
  };
  db.activityLogs.unshift(log);
  if (db.activityLogs.length > 500) {
    db.activityLogs = db.activityLogs.slice(0, 500);
  }
  saveDb(db);
  return log;
}

// Overview Telemetry
export async function getOverviewStats() {
  const db = getDb();
  const leads = db.leads.map(normalizeLead);
  const projectsList = db.projects.map(normalizeProject);
  const blogsList = db.blogs.map(normalizeBlogPost);
  const servicesList = db.services.map(normalizeService);

  return {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'NEW').length,
    activeProjects: projectsList.filter((p) => p.publicationStatus === 'PUBLISHED').length,
    completedProjects: projectsList.length,
    publishedBlogs: blogsList.filter((b) => b.status === 'PUBLISHED').length,
    totalServices: servicesList.filter((s) => s.isPublished).length,
  };
}

// Unified Store Object Export
export const store = {
  findAdminByEmail,
  getAdminUser,
  updateAdminUser,
  getOverviewStats,
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  addLeadNote,
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getMediaFiles,
  getMediaFile,
  registerMediaFile,
  deleteMediaFile,
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAllSettings,
  getSetting,
  setSetting,
  getAllSeo,
  getSeo,
  upsertSeo,
  getActivityLogs,
  logActivity,
};
