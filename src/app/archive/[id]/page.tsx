import { getShowById, getAllShows } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Play, Share2, Clock, Calendar } from 'lucide-react';
import { ShowPlayButton } from '@/components/archive/ShowPlayButton'; // Client component

export async function generateStaticParams() {
    const shows = getAllShows();
    return shows.map((show) => ({
        id: show.id,
    }));
}

export default async function ShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const show = getShowById(id);

    if (!show) {
        notFound();
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative w-full aspect-[2/1] md:aspect-[3/1] rounded-3xl overflow-hidden mb-12 group">
                <Image
                    src={show.coverImage}
                    alt={show.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex gap-2 mb-4">
                                {show.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest backdrop-blur-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 text-glow">{show.title}</h1>
                            <p className="text-xl text-white/80">{show.artistId}</p>
                        </div>

                        <div className="flex gap-4">
                            <ShowPlayButton show={show} /> {/* Client Component for Interactivity */}
                            <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6">About the Transmission</h2>
                    <p className="text-white/70 leading-relaxed text-lg mb-8">
                        {show.description}
                    </p>

                    <h3 className="text-xl font-bold text-white mb-4">Tracklist</h3>
                    <div className="space-y-2">
                        {/* Dummy Tracklist since data model has optional tracklist but mock data doesn't have it filled yet */}
                        {[1, 2, 3, 4, 5].map((track, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <span className="text-white/30 text-sm font-mono w-6">0{track}</span>
                                <div className="flex-1">
                                    <p className="text-white font-medium">Unknown Track {track}</p>
                                    <p className="text-white/50 text-sm">Artist Name</p>
                                </div>
                                <span className="text-white/30 text-sm opacity-0 group-hover:opacity-100 transition-opacity">04:20</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-white font-bold mb-4">Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white/70">
                                <Calendar size={18} />
                                <span>{show.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <Clock size={18} />
                                <span>1hr 00m</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
