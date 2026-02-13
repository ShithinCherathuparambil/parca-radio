'use client';

import { Show } from '@/types';
import { Play } from 'lucide-react';
import { useAudioStore } from '@/store/useAudioStore';
import { motion } from 'framer-motion';

interface HeroProps {
    show: Show;
}

export function Hero({ show }: HeroProps) {
    const { playShow } = useAudioStore();

    return (
        <section className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12">
            <img
                src={show.coverImage}
                alt={show.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest mb-4">
                        FEATURED TRANSMISSION
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 text-glow tracking-tight leading-none">
                        {show.title}
                    </h1>
                    <p className="text-lg text-white/80 mb-8 line-clamp-2">
                        {show.description}
                    </p>

                    <button
                        onClick={() => playShow(show)}
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-accent transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        <Play size={20} fill="currentColor" />
                        LISTEN NOW
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
