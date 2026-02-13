import { ARTISTS } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

export default function ArtistsPage() {
    return (
        <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl font-black mb-8 text-glow">Resident Artists</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ARTISTS.map((artist) => (
                    <Link
                        key={artist.id}
                        href={`/artists/${artist.slug}`}
                        className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 border border-white/10"
                    >
                        <Image
                            src={artist.photoUrl}
                            alt={artist.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                            <span className="block text-accent text-xs font-bold uppercase tracking-wider mb-1">{artist.role}</span>
                            <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{artist.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
