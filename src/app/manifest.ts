import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/parca-radio' : '';

    return {
        name: 'Parca Radio',
        short_name: 'Parca',
        description: 'Midnight Tech Radio - Live & Archived',
        start_url: `${basePath}/`,
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#00f3ff',
        icons: [
            {
                src: `${basePath}/icon.png`,
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: `${basePath}/icon.png`,
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
