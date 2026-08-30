export type Service = { slug: string; title: string; description: string; image: string; imageAlt: string; eyebrow: string; deliverables: string[]; process: { title: string; description: string }[] };

const serviceRows: [string, string, string, string, string, string, string[]][] = [
  ['digital-marketing', 'Digital Marketing', 'Growth-first campaigns that turn attention into qualified customers.', '/services/digital-marketing.png', 'Digital marketing campaign planning dashboard', 'Reach the right people', ['Campaign and channel strategy', 'Paid social and search campaigns', 'Content calendars and creative direction', 'Reporting focused on leads and revenue']],
  ['web-development', 'Web Development', 'Fast, polished websites built for performance, discoverability, and conversion.', '/services/web-development.png', 'Website design and development workspace', 'Make every visit count', ['Responsive design and development', 'SEO-ready page structure', 'CMS and analytics setup', 'Performance and accessibility testing']],
  ['app-development', 'App Development', 'Intuitive web and mobile products designed to launch quickly and scale smoothly.', '/services/app-development.png', 'Mobile application interface screens', 'From idea to useful product', ['Product discovery and user flows', 'Interactive prototypes', 'Web and mobile development', 'Launch support and iteration']],
  ['custom-code', 'Custom Code', 'Tailor-made software and integrations shaped around the way your business works.', '/services/custom-code.png', 'Custom software code and interface', 'Software that fits', ['Technical discovery and architecture', 'Internal tools and dashboards', 'API and platform integrations', 'Testing, documentation, and handoff']],
  ['ai-integration', 'AI Integration', 'Practical AI workflows, automation, and product features that save time and improve service.', '/services/ai-integration.png', 'AI automation and integration workflow', 'Work smarter with AI', ['AI opportunity assessment', 'Assistants and knowledge search', 'Workflow automation', 'Guardrails, testing, and monitoring']],
  ['ui-ux-design', 'UI/UX Design', 'Clear interfaces and thoughtful journeys that make digital products easier to use.', '/services/ui-ux-design.png', 'User interface and experience design boards', 'Designed around real people', ['User journeys and information architecture', 'Wireframes and prototypes', 'Visual interface design', 'Reusable design systems']],
  ['seo-analytics', 'SEO & Analytics', 'Search visibility and reliable measurement that reveal what is driving growth.', '/services/seo-analytics.png', 'SEO performance and analytics dashboard', 'Turn data into direction', ['Technical SEO review', 'Keyword and content strategy', 'Analytics and event tracking', 'Actionable monthly reporting']],
  ['branding-strategy', 'Branding & Strategy', 'Positioning, messaging, and visual systems that make your business unmistakable.', '/services/branding-strategy-v2.png', 'White Rabbit presenting a vivid brand identity and strategy system', 'A brand people remember', ['Brand positioning and audience clarity', 'Voice and messaging system', 'Visual identity direction', 'Practical brand guidelines']]
];

export const services: Service[] = serviceRows.map(([slug, title, description, image, imageAlt, eyebrow, deliverables]) => ({ slug, title, description, image, imageAlt, eyebrow, deliverables, process: [
  { title: 'Discover', description: 'We align on goals, audience, constraints, and what success should look like.' },
  { title: 'Create', description: 'We design and build in focused stages, sharing progress as the work develops.' },
  { title: 'Launch & grow', description: 'We ship, measure the result, and prioritize the next best improvements.' }
] }));

export const projects = [
  { slug: 'service-website', title: 'Launch-ready service website', category: 'Web development', year: '2026', summary: 'A modern marketing site built to turn complex services into a simple, confident customer journey.', image: '/services/web-development.png', imageAlt: 'Modern service website shown beside development tools', challenge: 'The business had strong expertise but no clear digital path from first visit to qualified enquiry.', solution: 'We simplified the message, created conversion-led page templates, and built a responsive system the team could maintain.', results: ['A clearer path from landing page to enquiry', 'Reusable sections for faster content updates', 'Performance, SEO, and analytics foundations'], services: ['Strategy', 'UI/UX design', 'Web development', 'Analytics'] },
  { slug: 'app-concept', title: 'App concept MVP', category: 'Product design', year: '2026', summary: 'A mobile-first prototype designed to test a product idea with real users before a full engineering investment.', image: '/services/app-development.png', imageAlt: 'Mobile application concept and interface screens', challenge: 'The founding team needed to validate its central workflow without spending months building every planned feature.', solution: 'We mapped the key journey, designed a focused interface, and produced a launchable MVP plan around the riskiest assumptions.', results: ['A testable end-to-end customer journey', 'A prioritized roadmap for the next release', 'A shared product language for design and engineering'], services: ['Product strategy', 'Prototyping', 'UI/UX design', 'MVP planning'] }
];

export const posts = [
  { slug: 'ai-first-websites', title: 'Why AI-first websites matter in 2026', category: 'AI & strategy', date: 'August 18, 2026', readTime: '5 min read', excerpt: 'AI can make a website more helpful, but only when it is attached to a clear customer journey.', image: '/services/ai-integration.png', imageAlt: 'AI assistant connected to a digital workflow', sections: [
    { heading: 'Useful beats impressive', body: 'The best AI experiences solve a specific visitor problem: finding the right service, understanding a complex offer, or getting a quick answer before making contact. A flashy assistant without a job simply adds friction.' },
    { heading: 'Start with the journey', body: 'Map the questions customers ask before they buy. Then decide where AI can shorten that journey, which information it may use, and when it should hand the conversation to a person.' },
    { heading: 'Measure the outcome', body: 'Track completed conversations, qualified enquiries, and time saved—not just chat volume. Those signals show whether the experience is creating genuine business value.' }
  ] },
  { slug: 'lean-branding', title: 'Building a lean digital brand with BITnWIT', category: 'Branding', date: 'August 6, 2026', readTime: '4 min read', excerpt: 'A focused brand system creates consistency without slowing a small team down.', image: '/services/branding-strategy-v2.png', imageAlt: 'White Rabbit presenting a vivid brand identity and strategy system', sections: [
    { heading: 'Build the smallest useful system', body: 'A growing brand needs a clear voice, a purposeful visual direction, and a handful of reusable patterns. It does not need a hundred-page manual that nobody opens.' },
    { heading: 'Consistency creates trust', body: 'When the same promise, tone, colors, and interaction patterns appear across every touchpoint, customers spend less energy interpreting the business and more energy considering the offer.' },
    { heading: 'Let the system grow with you', body: 'Document decisions as real needs appear. This keeps the brand flexible today while giving future teammates and partners enough structure to create confidently.' }
  ] }
];

export const findService = (slug: string) => services.find((item) => item.slug === slug);
export const findProject = (slug: string) => projects.find((item) => item.slug === slug);
export const findPost = (slug: string) => posts.find((item) => item.slug === slug);
