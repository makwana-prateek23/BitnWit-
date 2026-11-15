import dns from 'dns';
import { MongoClient } from 'mongodb';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

const uri = "mongodb+srv://BITnWit:BITnWit%401382@cluster0.xnsnrjq.mongodb.net/bitnwit?retryWrites=true&w=majority";

const serviceRows = [
  ['digital-marketing', 'Digital Marketing', 'Growth-first campaigns that turn attention into qualified customers.', '/services/digital-marketing.png', 'Digital marketing campaign planning dashboard', 'Reach the right people', ['Campaign and channel strategy', 'Paid social and search campaigns', 'Content calendars and creative direction', 'Reporting focused on leads and revenue']],
  ['web-development', 'Web Development', 'Fast, polished websites built for performance, discoverability, and conversion.', '/services/web-development-v2.png', 'White Rabbit developing a modern BITnWIT website', 'Make every visit count', ['Responsive design and development', 'SEO-ready page structure', 'CMS and analytics setup', 'Performance and accessibility testing']],
  ['app-development', 'App Development', 'Intuitive web and mobile products designed to launch quickly and scale smoothly.', '/services/app-development-v2.png', 'White Rabbit designing a BITnWIT application across mobile and tablet screens', 'From idea to useful product', ['Product discovery and user flows', 'Interactive prototypes', 'Web and mobile development', 'Launch support and iteration']],
  ['custom-code', 'Custom Code', 'Tailor-made software and integrations shaped around the way your business works.', '/services/custom-code.png', 'Custom software code and interface', 'Software that fits', ['Technical discovery and architecture', 'Internal tools and dashboards', 'API and platform integrations', 'Testing, documentation, and handoff']],
  ['ai-integration', 'AI Integration', 'Practical AI workflows, automation, and product features that save time and improve service.', '/services/ai-integration-v2.png', 'White Rabbit orchestrating AI services, analytics, image generation, and automated workflows', 'Work smarter with AI', ['AI opportunity assessment', 'Assistants and knowledge search', 'Workflow automation', 'Guardrails, testing, and monitoring']],
  ['ui-ux-design', 'UI/UX Design', 'Clear interfaces and thoughtful journeys that make digital products easier to use.', '/services/ui-ux-design.png', 'User interface and experience design boards', 'Designed around real people', ['User journeys and information architecture', 'Wireframes and prototypes', 'Visual interface design', 'Reusable design systems']],
  ['seo-analytics', 'SEO & Analytics', 'Search visibility and reliable measurement that reveal what is driving growth.', '/services/seo-analytics.png', 'SEO performance and analytics dashboard', 'Turn data into direction', ['Technical SEO review', 'Keyword and content strategy', 'Analytics and event tracking', 'Actionable monthly reporting']],
  ['branding-strategy', 'Branding & Strategy', 'Positioning, messaging, and visual systems that make your business unmistakable.', '/services/branding-strategy-v2.png', 'White Rabbit presenting a vivid brand identity and strategy system', 'A brand people remember', ['Brand positioning and audience clarity', 'Voice and messaging system', 'Visual identity direction', 'Practical brand guidelines']]
];

const projectsData = [
  { slug: 'resume-iq', title: 'ResumeIQ — intelligent resume workspace', category: 'AI product development', year: '2026', summary: 'A complete resume workspace that helps job seekers analyze, improve, edit, and export an ATS-ready resume for a target role.', coverImage: '/work-resume-iq.png', challenge: 'Job seekers often maintain disconnected resume drafts and receive vague advice without knowing how well their experience matches a specific job description.', solution: 'We built a guided web application with PDF and DOCX upload, resume extraction, job-description analysis, technical match feedback, ATS and recruiter-readiness scoring, an editable live resume builder, and PDF or Word export.', results: ['One workflow from upload to targeted resume', 'Actionable ATS and role-match feedback', 'Editable live preview with PDF and Word export'], servicesTags: ['Product strategy', 'Frontend development', 'Application development', 'AI integration'], liveUrl: 'https://resume-iq-nine-ruby.vercel.app/' },
  { slug: 'service-website', title: 'Launch-ready service website', category: 'Web development', year: '2026', summary: 'A modern marketing site built to turn complex services into a simple, confident customer journey.', coverImage: '/services/web-development-v2.png', challenge: 'The business had strong expertise but no clear digital path from first visit to qualified enquiry.', solution: 'We simplified the message, created conversion-led page templates, and built a responsive system the team could maintain.', results: ['A clearer path from landing page to enquiry', 'Reusable sections for faster content updates', 'Performance, SEO, and analytics foundations'], servicesTags: ['Strategy', 'UI/UX design', 'Web development', 'Analytics'] },
  { slug: 'app-concept', title: 'App concept MVP', category: 'Product design', year: '2026', summary: 'A mobile-first prototype designed to test a product idea with real users before a full engineering investment.', coverImage: '/services/app-development-v2.png', challenge: 'The founding team needed to validate its central workflow without spending months building every planned feature.', solution: 'We mapped the key journey, designed a focused interface, and produced a launchable MVP plan around the riskiest assumptions.', results: ['A testable end-to-end customer journey', 'A prioritized roadmap for the next release', 'A shared product language for design and engineering'], servicesTags: ['Product strategy', 'Prototyping', 'UI/UX design', 'MVP planning'] },
  { slug: 'ai-support-workflow', title: 'AI-assisted customer workflow', category: 'AI integration', year: '2026', summary: 'A practical support workflow that helps teams answer repetitive questions while keeping people in control.', coverImage: '/services/ai-integration-v2.png', challenge: 'Manual responses were slowing the team down and creating inconsistent customer experiences.', solution: 'We structured the knowledge base, designed escalation rules, and connected an AI assistant to the existing workflow.', results: ['Faster first responses', 'Consistent answers across common requests', 'Clear handoff points for human support'], servicesTags: ['AI strategy', 'Workflow design', 'Integration', 'Quality testing'] },
  { slug: 'growth-campaign-system', title: 'Multi-channel growth system', category: 'Digital marketing', year: '2026', summary: 'A connected campaign and measurement system designed to turn marketing activity into clearer decisions.', coverImage: '/services/digital-marketing.png', challenge: 'Campaigns ran across multiple channels, but reporting did not show which activity generated valuable leads.', solution: 'We aligned messaging, campaign structure, landing pages, and conversion tracking around a single growth plan.', results: ['Clearer attribution across channels', 'A repeatable campaign workflow', 'Reporting tied to meaningful actions'], servicesTags: ['Campaign strategy', 'Creative direction', 'Landing pages', 'Analytics'] },
  { slug: 'brand-launch-system', title: 'Brand launch system', category: 'Brand strategy', year: '2026', summary: 'A flexible identity and messaging toolkit built to give a growing company a confident market presence.', coverImage: '/services/branding-strategy-v2.png', challenge: 'The company had a strong offer but inconsistent messaging and visuals across its customer touchpoints.', solution: 'We clarified positioning, created a focused identity system, and translated it into reusable digital assets.', results: ['A consistent voice and visual language', 'Faster creation of campaign assets', 'A stronger foundation for future growth'], servicesTags: ['Positioning', 'Messaging', 'Visual direction', 'Brand toolkit'] },
  { slug: 'operations-dashboard', title: 'Custom operations dashboard', category: 'Custom software', year: '2026', summary: 'A focused internal dashboard that brings scattered operational information into one usable workspace.', coverImage: '/services/custom-code.png', challenge: 'Important information lived across spreadsheets and disconnected tools, making daily decisions slow and error-prone.', solution: 'We mapped the core workflow, connected the required data, and built a role-based dashboard around everyday tasks.', results: ['One source of truth for the team', 'Less repetitive manual work', 'A scalable base for new workflows'], servicesTags: ['Discovery', 'UX design', 'Custom development', 'Integrations'] }
];

const teamData = [
  { id: 'team_01', name: 'Sandeep Kumar', role: 'Founder', designation: 'Founder', specialties: ['Frontend development', 'Application development'], phone: '+91 89497 28810', initials: 'SK', avatarUrl: '/bitty-mascot.png', displayOrder: 1, isActive: true, isVisibleOnWebsite: true },
  { id: 'team_02', name: 'Prateek Makwana', role: 'Technical Head', designation: 'Technical Head', specialties: ['Software development', 'Technical leadership'], phone: '+91 9680437434', initials: 'PM', avatarUrl: '/bitty-mascot.png', displayOrder: 2, isActive: true, isVisibleOnWebsite: true }
];

const postsData = [
  {
    id: 'post_01',
    slug: 'ai-first-websites',
    title: 'Why AI-first websites matter in 2026',
    category: 'AI & strategy',
    publishedAt: '2026-08-18T10:00:00.000Z',
    readTime: '5 min read',
    readingTime: '5 min read',
    excerpt: 'AI can make a website more helpful, but only when it is attached to a clear customer journey.',
    coverImage: '/services/ai-integration-v2.png',
    coverImageUrl: '/services/ai-integration-v2.png',
    content: 'The best AI experiences solve a specific visitor problem: finding the right service, understanding a complex offer, or getting a quick answer before making contact. A flashy assistant without a job simply adds friction.\n\nMap the questions customers ask before they buy. Then decide where AI can shorten that journey, which information it may use, and when it should hand the conversation to a person.',
    status: 'PUBLISHED',
    metaTitle: 'Why AI-first websites matter in 2026 | BITnWit',
    metaDescription: 'AI can make a website more helpful, but only when it is attached to a clear customer journey.',
    tags: ['AI', 'Strategy', 'Web']
  },
  {
    id: 'post_02',
    slug: 'lean-branding',
    title: 'Building a lean digital brand with BITnWIT',
    category: 'Branding',
    publishedAt: '2026-08-06T10:00:00.000Z',
    readTime: '4 min read',
    readingTime: '4 min read',
    excerpt: 'A focused brand system creates consistency without slowing a small team down.',
    coverImage: '/services/branding-strategy-v2.png',
    coverImageUrl: '/services/branding-strategy-v2.png',
    content: 'A growing brand needs a clear voice, a purposeful visual direction, and a handful of reusable patterns. It does not need a hundred-page manual that nobody opens.\n\nWhen the same promise, tone, colors, and interaction patterns appear across every touchpoint, customers spend less energy interpreting the business and more energy considering the offer.',
    status: 'PUBLISHED',
    metaTitle: 'Building a lean digital brand with BITnWIT',
    metaDescription: 'A focused brand system creates consistency without slowing a small team down.',
    tags: ['Branding', 'Design', 'Growth']
  }
];

const testimonialsData = [
  {
    id: 'tst_01',
    clientName: 'Aarav Mehta',
    companyName: 'NexGen Mobility',
    designation: 'VP of Product',
    avatarOrLogo: '/favicon-192.png',
    clientPhotoUrl: '/favicon-192.png',
    reviewText: 'BITnWit completely transformed our fleet tracking dashboard into a responsive, high-speed Next.js application. Our team velocity doubled within 3 weeks.',
    content: 'BITnWit completely transformed our fleet tracking dashboard into a responsive, high-speed Next.js application. Our team velocity doubled within 3 weeks.',
    rating: 5,
    isFeatured: true,
    isPublished: true,
    displayOrder: 1
  },
  {
    id: 'tst_02',
    clientName: 'Elena Rostova',
    companyName: 'FinPulse Systems',
    designation: 'Founder & CEO',
    avatarOrLogo: '/favicon-192.png',
    clientPhotoUrl: '/favicon-192.png',
    reviewText: 'The White Rabbit AI assistant workflow automated 60% of our tier-1 support tickets on day one. Highly recommend their engineering team.',
    content: 'The White Rabbit AI assistant workflow automated 60% of our tier-1 support tickets on day one. Highly recommend their engineering team.',
    rating: 5,
    isFeatured: true,
    isPublished: true,
    displayOrder: 2
  }
];

const settingsData = [
  { key: 'site_name', value: 'BITnWit Technologies Pvt. Ltd.', category: 'GENERAL', updatedAt: new Date().toISOString() },
  { key: 'tagline', value: 'INNOVATE • BUILD • SOLVE', category: 'GENERAL', updatedAt: new Date().toISOString() },
  { key: 'contact_email', value: 'contact@bitnwit.com', category: 'CONTACT', updatedAt: new Date().toISOString() },
  { key: 'contact_phone', value: '+91 89497 28810', category: 'CONTACT', updatedAt: new Date().toISOString() },
  { key: 'whatsapp_number', value: '918949728810', category: 'CONTACT', updatedAt: new Date().toISOString() },
  { key: 'address', value: 'BITnWit Tech Hub, Rajasthan, India', category: 'CONTACT', updatedAt: new Date().toISOString() },
  { key: 'instagram_url', value: 'https://instagram.com/bitnwit', category: 'SOCIAL', updatedAt: new Date().toISOString() },
  { key: 'linkedin_url', value: 'https://linkedin.com/company/bitnwit', category: 'SOCIAL', updatedAt: new Date().toISOString() },
  { key: 'facebook_url', value: 'https://facebook.com/bitnwit', category: 'SOCIAL', updatedAt: new Date().toISOString() }
];

const seoData = [
  { id: 'seo_home', pageRoute: '/', metaTitle: 'BITnWIT | Web, App, AI & Digital Growth', metaDescription: 'BITnWIT builds websites, applications, AI workflows, brands, and digital growth systems for clients across India and worldwide.', ogImageUrl: '/og-image.jpg', canonicalUrl: 'https://www.bitnwit.com/', indexable: true },
  { id: 'seo_services', pageRoute: '/services', metaTitle: 'Digital Engineering & Creative Agency Services | BITnWIT', metaDescription: 'Explore BITnWIT digital engineering, AI integration, web & mobile app development, UI/UX design, custom software, digital marketing, and brand strategy.', ogImageUrl: '/og-image.jpg', canonicalUrl: 'https://www.bitnwit.com/services', indexable: true },
  { id: 'seo_work', pageRoute: '/work', metaTitle: 'Our Work & Case Studies | BITnWIT', metaDescription: 'Explore BITnWIT case studies across web, mobile applications, AI, marketing, branding, and custom software.', ogImageUrl: '/og-image.jpg', canonicalUrl: 'https://www.bitnwit.com/work', indexable: true },
  { id: 'seo_about', pageRoute: '/about', metaTitle: 'About Us | BITnWIT', metaDescription: 'Meet BITnWIT, our leadership, approach, and remote-first process for delivering digital projects across India and worldwide.', ogImageUrl: '/og-image.jpg', canonicalUrl: 'https://www.bitnwit.com/about', indexable: true },
  { id: 'seo_contact', pageRoute: '/contact', metaTitle: 'Contact Us | Start a Project with BITnWIT', metaDescription: 'Reach our team to discuss project requirements, timelines, budget, and free technical discovery sessions.', ogImageUrl: '/og-image.jpg', canonicalUrl: 'https://www.bitnwit.com/contact', indexable: true },
  { id: 'seo_blog', pageRoute: '/blog', metaTitle: 'Insights & Technical Articles | BITnWIT', metaDescription: 'Engineering articles, architectural breakdowns, AI case studies, and digital growth insights by BITnWIT experts.', ogImageUrl: '/og-image.jpg', canonicalUrl: 'https://www.bitnwit.com/blog', indexable: true }
];

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('bitnwit');

  // Services
  const servicesCol = db.collection('services');
  for (let i = 0; i < serviceRows.length; i++) {
    const [slug, title, desc, img, imgAlt, eyebrow, deliverables] = serviceRows[i];
    const doc = {
      id: `srv_${slug.replace(/-/g, '_')}`,
      slug,
      title,
      iconName: slug.includes('web') ? 'code' : slug.includes('ai') ? 'cpu' : slug.includes('app') ? 'smartphone' : 'layers',
      shortDesc: desc,
      shortDescription: desc,
      detailedDesc: desc,
      detailedDescription: desc,
      coverImageUrl: img,
      deliverables,
      benefits: ['Fast delivery', 'Modern tech stack', 'Scalable architecture'],
      techStack: ['Next.js', 'React', 'Node.js', 'TypeScript'],
      turnaround: '2-4 weeks',
      targetOutcome: 'High performance scalable digital solution',
      displayOrder: i + 1,
      isPublished: true,
      updatedAt: new Date().toISOString()
    };
    await servicesCol.updateOne({ slug }, { $set: doc }, { upsert: true });
  }
  console.log(`✓ Seeded ${serviceRows.length} services`);

  // Projects
  const projectsCol = db.collection('projects');
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    const doc = {
      id: `prj_${p.slug.replace(/-/g, '_')}`,
      ...p,
      shortDescription: p.summary,
      detailedDescription: p.solution,
      coverImageUrl: p.coverImage,
      displayOrder: i + 1,
      isFeatured: i < 3,
      isPublished: true,
      publicationStatus: 'PUBLISHED',
      updatedAt: new Date().toISOString()
    };
    await projectsCol.updateOne({ slug: p.slug }, { $set: doc }, { upsert: true });
  }
  console.log(`✓ Seeded ${projectsData.length} projects`);

  // Team
  const teamCol = db.collection('team_members');
  for (const t of teamData) {
    await teamCol.updateOne({ name: t.name }, { $set: t }, { upsert: true });
  }
  console.log(`✓ Seeded ${teamData.length} team members`);

  // Blogs
  const blogsCol = db.collection('blogs');
  for (const b of postsData) {
    await blogsCol.updateOne({ slug: b.slug }, { $set: b }, { upsert: true });
  }
  console.log(`✓ Seeded ${postsData.length} blog posts`);

  // Testimonials
  const tstCol = db.collection('testimonials');
  for (const t of testimonialsData) {
    await tstCol.updateOne({ id: t.id }, { $set: t }, { upsert: true });
  }
  console.log(`✓ Seeded ${testimonialsData.length} testimonials`);

  // Website Settings
  const settingsCol = db.collection('website_settings');
  for (const s of settingsData) {
    await settingsCol.updateOne({ key: s.key }, { $set: s }, { upsert: true });
  }
  console.log(`✓ Seeded ${settingsData.length} website settings`);

  // SEO Metadata
  const seoCol = db.collection('seo_metadata');
  for (const s of seoData) {
    await seoCol.updateOne({ pageRoute: s.pageRoute }, { $set: s }, { upsert: true });
  }
  console.log(`✓ Seeded ${seoData.length} SEO metadata records`);

  await client.close();
  console.log('\n🎉 ALL COLLECTIONS SEEDED IN MONGODB ATLAS!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
