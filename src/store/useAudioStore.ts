import { create } from 'zustand';
import { PlayerState, Show } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AudioStore extends PlayerState {
    // Additional internal state if needed
}

export const useAudioStore = create<AudioStore>((set) => ({
    isPlaying: false,
    isLoading: false,
    volume: 0.8,
    isLive: false,
    currentShow: null,

    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setVolume: (volume) => set({ volume }),

    playShow: (show: Show, isLive = false) => set({
        currentShow: show,
        isLive,
        isPlaying: true,
        isLoading: true
    }),

    setIsLoading: (isLoading) => set({ isLoading }),
}));
