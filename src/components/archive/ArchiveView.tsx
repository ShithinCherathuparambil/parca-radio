'use client';

import { useState, useMemo } from 'react';
import { Show } from '@/types';
import { ShowCard } from '@/components/ui/ShowCard';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchiveViewProps {
    initialShows: Show[];
}

export default function ArchiveView({ initialShows }: ArchiveViewProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        initialShows.forEach(show => show.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [initialShows]);

    const filteredShows = useMemo(() => {
        return initialShows.filter(show => {
            const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                show.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag ? show.tags.includes(selectedTag) : true;
            return matchesSearch && matchesTag;
        });
    }, [initialShows, searchQuery, selectedTag]);

    return (
        <div className="animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white text-glow mb-2">Archive</h1>
                    <p className="text-white/50">Explore past transmissions.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search shows, genres..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                </div>
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2 mb-12">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                        selectedTag === null
                            ? "bg-accent text-black border-accent"
                            : "bg-transparent text-white/50 border-white/5 hover:border-white/20 hover:text-white"
                    )}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                            selectedTag === tag
                                ? "bg-accent text-black border-accent"
                                : "bg-transparent text-white/50 border-white/5 hover:border-white/20 hover:text-white"
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredShows.map((show) => (
                        <motion.div
                            key={show.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                        >
                            <ShowCard show={show} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredShows.length === 0 && (
                <div className="text-center py-24 text-white/30">
                    <Filter className="mx-auto mb-4 opacity-50" size={48} />
                    <p>No transmissions found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
