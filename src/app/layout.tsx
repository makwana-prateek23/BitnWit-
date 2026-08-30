import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bitnwit.com'),
  title: { default: 'BITnWIT | Web, App, AI & Digital Growth', template: '%s | BITnWIT' },
  description: 'BITnWIT builds websites, applications, AI workflows, brands, and digital growth systems for clients across India and worldwide.',
  keywords: ['web development India', 'app development company', 'AI integration services', 'UI UX design', 'digital marketing agency India', 'custom software development', 'BITnWIT'],
  authors: [{ name: 'BITnWIT' }], creator: 'BITnWIT', publisher: 'BITnWIT',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'BITnWIT', title: 'BITnWIT | Building Intelligence Through Technology', description: 'Web, app, AI, design, and digital growth services across India and worldwide.', images: [{ url: '/rabbit-mascot.png', width: 1200, height: 1200, alt: 'BITnWIT White Rabbit mascot' }] },
  twitter: { card: 'summary_large_image', title: 'BITnWIT | Web, App, AI & Digital Growth', description: 'Digital products and growth systems for clients across India and worldwide.', images: ['/rabbit-mascot.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  category: 'technology'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'BITnWIT', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bitnwit.com', logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bitnwit.com'}/rabbit-mascot.png`, description: 'Web development, app development, AI integration, UI/UX, digital marketing, SEO, branding, and custom software services.', telephone: '+91 89497 28810', sameAs: ['https://www.instagram.com/bitnwit.in', 'https://www.linkedin.com/in/sandeep-kumar-0766b7249', 'https://github.com/Sandeep1-dev'], areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }], founder: { '@type': 'Person', name: 'Sandeep Kumar' }, employee: { '@type': 'Person', name: 'Prateek Makwana', jobTitle: 'Technical Head' }, knowsAbout: ['Web Development', 'Application Development', 'AI Integration', 'UI/UX Design', 'Digital Marketing', 'SEO', 'Brand Strategy'] }).replace(/</g, '\\u003c') }} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
