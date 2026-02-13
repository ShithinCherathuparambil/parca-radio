'use client';

import { Show } from '@/types';
import { Play } from 'lucide-react';
import { useAudioStore } from '@/store/useAudioStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ShowCardProps {
    show: Show;
    featured?: boolean;
}

export function ShowCard({ show, featured = false }: ShowCardProps) {
    const { playShow, currentShow, isPlaying } = useAudioStore();
    const isCurrent = currentShow?.id === show.id;

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all hover:border-accent/50",
            featured ? "aspect-[2/1]" : "aspect-square"
        )}>
            <Image
                src={show.coverImage}
                alt={show.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                <h3 className={cn("text-white font-bold truncate", featured ? "text-2xl" : "text-lg")}>{show.title}</h3>
                <p className="text-white/70 text-sm truncate">{show.artistId}</p> {/* TODO: Resolve artist name map */}

                <button
                    onClick={() => playShow(show)}
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0",
                        isCurrent && "opacity-100 translate-y-0 bg-white"
                    )}
                >
                    <Play size={20} fill="currentColor" className="ml-1" />
                </button>
            </div>
        </div>
    );
}
