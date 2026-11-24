import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest { return { name: 'BITnWIT', short_name: 'BITnWIT', description: 'Innovate. Build. Solve.', start_url: '/', display: 'standalone', background_color: '#FCEBE5', theme_color: '#1E3C65', icons: [{ src: '/icon.png', sizes: '1024x1024', type: 'image/png' }] }; }
