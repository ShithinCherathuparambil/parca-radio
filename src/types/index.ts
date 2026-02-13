export interface SocialLink {
    platform: 'instagram' | 'twitter' | 'website' | 'soundcloud' | 'spotify';
    url: string;
}

export interface Artist {
    id: string;
    name: string;
    slug: string;
    bio: string;
    photoUrl: string;
    role: 'Resident' | 'Guest' | 'Staff';
    socials: SocialLink[];
}

export interface Track {
    title: string;
    artist: string;
    timestamp?: string; // MM:SS
}

export interface Show {
    id: string;
    title: string;
    artistId: string; // Links to Artist
    description: string;
    date: string; // ISO Date
    tags: string[];
    coverImage: string;
    audioUrl: string; // MP3 or HLS stream URL
    tracklist?: Track[];
    featured?: boolean;
}

export interface PlayerState {
    isPlaying: boolean;
    isLoading: boolean;
    volume: number;
    isLive: boolean;
    currentShow: Show | null;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    playShow: (show: Show, isLive?: boolean) => void;
    setIsLoading: (loading: boolean) => void;
}
