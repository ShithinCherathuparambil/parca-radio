import { Artist, Show } from '@/types';

export const ARTISTS: Artist[] = [
    {
        id: '1',
        name: 'Elena Void',
        slug: 'elena-void',
        bio: 'Elena Void explores the depths of ambient and experimental techno, creating soundscapes that bridge the gap between organic and synthetic worlds.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop',
        role: 'Resident',
        socials: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'soundcloud', url: 'https://soundcloud.com' }
        ]
    },
    {
        id: '2',
        name: 'Nexus Rythm',
        slug: 'nexus-rythm',
        bio: 'High-energy breakbeat and jungle curator from the underground scenes of London.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop',
        role: 'Resident',
        socials: [
            { platform: 'spotify', url: 'https://spotify.com' }
        ]
    },
    {
        id: '3',
        name: 'Sarah Pollo',
        slug: 'sarah-pollo',
        bio: 'Eclectic selections ranging from disco edits to acid house benchmarks.',
        photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2187&auto=format&fit=crop',
        role: 'Guest',
        socials: []
    }
];

export const SHOWS: Show[] = [
    {
        id: 's1',
        title: 'Midnight Transmission 001',
        artistId: '1',
        description: 'The inaugural broadcast featuring unreleased dubplates and atmospheric pads.',
        date: '2023-10-15',
        tags: ['Techno', 'Ambient', 'Dub'],
        coverImage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Dummy MP3
        featured: true,
    },
    {
        id: 's2',
        title: 'Break the Loop',
        artistId: '2',
        description: 'A journey through the history of the Amen break.',
        date: '2023-10-20',
        tags: ['Jungle', 'Drum & Bass'],
        coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        featured: true,
    },
    {
        id: 's3',
        title: 'Deep Space Echoes',
        artistId: '1',
        description: 'Returning to the void with cleaner textures.',
        date: '2023-11-01',
        tags: ['Ambient', 'Experimental'],
        coverImage: 'https://images.unsplash.com/photo-1482686119632-c6041ef1960b?q=80&w=2070&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
        id: 's4',
        title: 'Sunday Morning Disco',
        artistId: '3',
        description: 'Light and groovy tunes for the morning after.',
        date: '2023-11-05',
        tags: ['Disco', 'House'],
        coverImage: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    }
];

export function getArtistById(id: string): Artist | undefined {
    return ARTISTS.find(a => a.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
    return ARTISTS.find(a => a.slug === slug);
}

export function getShowsByArtist(artistId: string): Show[] {
    return SHOWS.filter(s => s.artistId === artistId);
}

export function getFeaturedShows(): Show[] {
    return SHOWS.filter(s => s.featured);
}

export function getShowById(id: string): Show | undefined {
    return SHOWS.find(s => s.id === id);
}

export function getAllShows(): Show[] {
    return SHOWS;
}
