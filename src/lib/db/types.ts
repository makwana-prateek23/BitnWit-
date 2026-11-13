export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name?: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL_SENT'
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'LOST';

export type LeadSource = 'WEBSITE' | 'WHATSAPP' | 'MANUAL' | 'REFERRAL' | 'OTHER';

export interface LeadNote {
  id: string;
  leadId: string;
  authorId?: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  interestedService?: string;
  serviceInterest?: string;
  projectBudget?: string;
  budgetRange?: string;
  message: string;
  leadSource: LeadSource;
  status: LeadStatus;
  assignedTeamMember?: string;
  assignedToId?: string;
  followUpDate?: string;
  followupDate?: string;
  dateReceived?: string;
  notes?: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  icon?: string;
  iconName?: string;
  shortDescription?: string;
  shortDesc?: string;
  detailedDescription?: string;
  detailedDesc?: string;
  coverImageUrl?: string;
  deliverables: string[];
  benefits?: string[];
  techStack?: string[];
  turnaround?: string;
  targetOutcome?: string;
  ctaText?: string;
  displayOrder: number;
  isPublished: boolean;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: string;
  shortDescription?: string;
  summary?: string;
  detailedDescription?: string;
  coverImageUrl?: string;
  coverImage?: string;
  galleryImageUrls?: string[];
  galleryImages?: string[];
  technologiesUsed?: string[];
  servicesTags?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  projectUrl?: string;
  liveUrl?: string;
  completionDate?: string;
  displayOrder: number;
  isFeatured: boolean;
  publicationStatus?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  isPublished?: boolean;
}

export type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags?: string[];
  excerpt: string;
  content?: string;
  contentMarkdown?: string;
  coverImageUrl?: string;
  coverImage?: string;
  authorName: string;
  authorAvatarUrl?: string;
  readingTime?: string;
  readTime?: string;
  status: BlogStatus;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  companyName: string;
  clientDesignation?: string;
  designation?: string;
  clientPhotoUrl?: string;
  avatarOrLogo?: string;
  reviewText?: string;
  content?: string;
  rating: number; // 1-5
  serviceProvided?: string;
  isFeaturedOnHomepage?: boolean;
  isFeatured?: boolean;
  displayStatus?: 'VISIBLE' | 'HIDDEN';
  isPublished?: boolean;
  displayOrder: number;
}

export type MediaFolder =
  | 'BRAND'
  | 'MASCOT'
  | 'ILLUSTRATIONS'
  | 'PORTFOLIO'
  | 'BLOG'
  | 'SERVICES'
  | 'DOCS';

export interface MediaFile {
  id: string;
  name?: string;
  filename?: string;
  originalName?: string;
  url?: string;
  fileUrl?: string;
  folder: MediaFolder;
  mimeType: string;
  sizeBytes?: number;
  fileSizeBytes?: number;
  uploadedBy?: string;
  uploadedAt: string;
}

export interface TeamMember {
  id: string;
  fullName?: string;
  name: string;
  designation?: string;
  role: string;
  department?: string;
  bio?: string;
  initials?: string;
  phone?: string;
  profileImageUrl?: string;
  avatarUrl?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  specialties?: string[];
  adminAccessRole?: AdminRole | 'NONE';
  displayOrder: number;
  isActive: boolean;
  isVisibleOnWebsite?: boolean;
}

export interface WebsiteSetting {
  key: string;
  value: any;
  category: 'GENERAL' | 'CONTACT' | 'SOCIAL' | 'WEBSITE';
  updatedAt: string;
}

export interface SeoMetadata {
  id?: string;
  pageRoute: string; // e.g. '/', '/services', '/work', '/about', '/contact', '/blog'
  pageTitle?: string;
  metaTitle: string;
  metaDescription: string;
  focusKeywords?: string[];
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl: string;
  noIndex?: boolean;
  indexable?: boolean;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

export interface DatabaseStore {
  adminUsers: AdminUser[];
  leads: Lead[];
  leadNotes: LeadNote[];
  services: ServiceItem[];
  projects: ProjectItem[];
  blogs: BlogPost[];
  testimonials: TestimonialItem[];
  mediaFiles: MediaFile[];
  teamMembers: TeamMember[];
  websiteSettings: Record<string, WebsiteSetting>;
  seoMetadata: Record<string, SeoMetadata>;
  activityLogs: ActivityLog[];
}
