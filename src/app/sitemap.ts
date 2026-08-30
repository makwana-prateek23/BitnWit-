import type { MetadataRoute } from 'next';
import { posts, projects, services } from '../data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://bitnwit.com';
  const staticRoutes = ['', '/services', '/work', '/clients', '/about', '/blog', '/contact'];
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .8 })),
    ...services.map(({ slug }) => ({ url: `${base}/services/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .8 })),
    ...projects.map(({ slug }) => ({ url: `${base}/work/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .7 })),
    ...posts.map(({ slug }) => ({ url: `${base}/blog/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .6 }))
  ];
}
