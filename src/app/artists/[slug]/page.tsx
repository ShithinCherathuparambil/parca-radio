import { getArtistBySlug, getShowsByArtist, ARTISTS } from '@/lib/data';
import { ShowCard } from '@/components/ui/ShowCard';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Instagram, Globe, Music } from 'lucide-react';

export async function generateStaticParams() {
    return ARTISTS.map((artist) => ({
        slug: artist.slug,
    }));
}

export default async function ArtistProfile({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const artist = getArtistBySlug(slug);

    if (!artist) {
        notFound();
    }

    const artistShows = getShowsByArtist(artist.id);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Profile */}
            <div className="flex flex-col md:flex-row gap-8 mb-16">
                <div className="relative w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src={artist.photoUrl}
                        alt={artist.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold tracking-widest w-fit mb-4">
                        {artist.role}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 text-glow tracking-tight">{artist.name}</h1>
                    <p className="text-xl text-white/80 max-w-2xl mb-8 leading-relaxed">
                        {artist.bio}
                    </p>

                    <div className="flex gap-4">
                        {artist.socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all"
                            >
                                {social.platform === 'instagram' && <Instagram size={20} />}
                                {social.platform === 'website' && <Globe size={20} />}
                                {social.platform === 'soundcloud' && <Music size={20} />}
                                {/* Default fallback icon logic could be added here */}
                                {!['instagram', 'website', 'soundcloud'].includes(social.platform) && <Globe size={20} />}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Linked Shows */}
            <section>
                <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
                    Transmission Archive
                </h2>

                {artistShows.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artistShows.map(show => (
                            <ShowCard key={show.id} show={show} />
                        ))}
                    </div>
                ) : (
                    <p className="text-white/50 italic">No transmissions found for this curator.</p>
                )}
            </section>

        </div>
    );
}
