import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest { return { name: 'BITnWIT', short_name: 'BITnWIT', description: 'Building Intelligence Through Technology', start_url: '/', display: 'standalone', background_color: '#F7F9FC', theme_color: '#1E90FF', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] }; }
