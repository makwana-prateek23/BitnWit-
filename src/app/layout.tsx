import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bitnwit.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'BITnWIT | Web, App, AI & Digital Growth', template: '%s | BITnWIT' },
  description: 'BITnWIT builds websites, applications, AI workflows, brands, and digital growth systems for clients across India and worldwide.',
  keywords: ['web development India', 'app development company', 'AI integration services', 'UI UX design', 'digital marketing agency India', 'custom software development', 'BITnWIT'],
  authors: [{ name: 'BITnWIT' }], creator: 'BITnWIT', publisher: 'BITnWIT',
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/icon.png', type: 'image/png' }], apple: [{ url: '/icon.png', type: 'image/png' }] },
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'BITnWIT', title: 'BITnWIT | Innovate, Build, Solve', description: 'Web, app, AI, design, and digital growth services across India and worldwide.', images: [{ url: '/bitnwit-logo.png', width: 2048, height: 1024, alt: 'BITnWIT logo' }] },
  twitter: { card: 'summary_large_image', title: 'BITnWIT | Web, App, AI & Digital Growth', description: 'Digital products and growth systems for clients across India and worldwide.', images: ['/bitnwit-logo.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  category: 'technology'
};

const businessJsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'BITnWIT', url: siteUrl, logo: `${siteUrl}/bitnwit-logo.png`, description: 'Web development, app development, AI integration, UI/UX, digital marketing, SEO, branding, and custom software services.', telephone: '+91 89497 28810', sameAs: ['https://www.instagram.com/bitnwit.in', 'https://www.linkedin.com/in/sandeep-kumar-0766b7249', 'https://github.com/Sandeep1-dev'], areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }], founder: { '@type': 'Person', name: 'Sandeep Kumar' }, employee: { '@type': 'Person', name: 'Prateek Makwana', jobTitle: 'Technical Head' }, knowsAbout: ['Web Development', 'Application Development', 'AI Integration', 'UI/UX Design', 'Digital Marketing', 'SEO', 'Brand Strategy'] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${jakarta.variable} ${inter.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, '\\u003c') }} /><Header />{children}<Footer /></body></html>;
}
