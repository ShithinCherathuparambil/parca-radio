'use client';

import { Show } from '@/types';
import { useAudioStore } from '@/store/useAudioStore';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ShowPlayButton({ show }: { show: Show }) {
    const { playShow, currentShow, isPlaying, togglePlay } = useAudioStore();
    const isCurrent = currentShow?.id === show.id;

    const handleClick = () => {
        if (isCurrent) {
            togglePlay();
        } else {
            playShow(show);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl",
                isCurrent && isPlaying
                    ? "bg-accent/20 text-accent border border-accent/50"
                    : "bg-white text-black hover:bg-accent"
            )}
        >
            {isCurrent && isPlaying ? (
                <>
                    <Pause size={20} fill="currentColor" />
                    PAUSE
                </>
            ) : (
                <>
                    <Play size={20} fill="currentColor" />
                    PLAY EPISODE
                </>
            )}
        </button>
    );
}
