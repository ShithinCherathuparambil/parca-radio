import { getAllShows } from '@/lib/data';

export default function SchedulePage() {
    const shows = getAllShows(); // In a real app, this would be a schedule calculation
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
            <h1 className="text-4xl font-black mb-2 text-glow">Schedule</h1>
            <p className="text-white/50 mb-12">Live broadcasts & upcoming sessions.</p>

            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-accent font-bold uppercase tracking-widest text-sm">{today}</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Dummy Schedule Items based on Shows */}
                {shows.map((show, idx) => (
                    <div key={show.id} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all">
                        <div className="min-w-[100px] flex flex-col justify-center">
                            <span className="text-2xl font-bold text-white">{(20 + idx) % 24}:00</span>
                            <span className="text-sm text-white/30">CET</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{show.title}</h3>
                            <p className="text-white/60 mb-2">{show.artistId}</p>
                            <div className="flex gap-2">
                                {show.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-black/30 text-white/50">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center">
                            {idx === 0 ? (
                                <div className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 animate-pulse">
                                    ON AIR
                                </div>
                            ) : (
                                <button className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Remind Me
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
