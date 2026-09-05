import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest { return { name: 'BITnWIT', short_name: 'BITnWIT', description: 'Innovate. Build. Solve.', start_url: '/', display: 'standalone', background_color: '#FAF9FC', theme_color: '#6D1FA2', icons: [{ src: '/icon.png', sizes: '1024x1024', type: 'image/png' }] }; }
