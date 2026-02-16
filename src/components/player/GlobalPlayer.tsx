'use client';

import { useAudioStore } from '@/store/useAudioStore';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function GlobalPlayer() {
    useAudioPlayer(); // Initialize audio logic

    const {
        currentShow,
        isPlaying,
        togglePlay,
        volume,
        setVolume,
        isLive,
        isLoading
    } = useAudioStore();



    // Don't render until we have a show or default state (client-side only to avoid hydration mismatch)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Render minimal player even without show? Or hide? 
    // Let's render a "Tune In" state if no show is selected but stream is available.
    // For now, if no currentShow, hide or show placeholder. 
    // Let's assume there's always a "Live" show default or similar logic later.
    // For now, hide if no show.
    if (!currentShow) return null;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
            <div className="mx-auto max-w-7xl">
                <div className="glass rounded-2xl p-4 flex items-center justify-between gap-4 backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 group">
                            {/* Visualizer Placeholder / Cover Art */}
                            {currentShow.coverImage && (
                                <img src={currentShow.coverImage} alt={currentShow.title} className="w-full h-full object-cover" />
                            )}
                            <div className={cn("absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", isLoading && "opacity-100")}>
                                {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            </div>
                        </div>
                        <div className="truncate">
                            <h3 className="text-white font-medium truncate text-glow">{currentShow.title}</h3>
                            <p className="text-white/50 text-sm truncate">{isLive ? 'LIVE NOW' : currentShow.artistId}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => togglePlay()}
                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>
                    </div>

                    {/* Volume / Extra */}
                    <div className="flex-1 flex justify-end items-center gap-4 hidden md:flex">
                        <div className="group flex items-center gap-2">
                            <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
                                {volume === 0 ? <VolumeX size={18} className="text-white/50" /> : <Volume2 size={18} className="text-white/50 group-hover:text-white transition-colors" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            />
                        </div>
                        {isLive && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                LIVE
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
