import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Parca Radio',
        short_name: 'Parca',
        description: 'Midnight Tech Radio - Live & Archived',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#00f3ff',
        icons: [
            {
                src: '/icon.png', // We typically need to generate these, but defining them is step 1
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
