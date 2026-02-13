import { Hero } from '@/components/home/Hero';
import { ShowCard } from '@/components/ui/ShowCard';
import { getFeaturedShows, getAllShows } from '@/lib/data';

export default function Home() {
  const featuredShows = getFeaturedShows();
  const allShows = getAllShows();
  const heroShow = featuredShows[0] || allShows[0];

  return (
    <div className="animate-in fade-in duration-700">
      <Hero show={heroShow} />

      <section className="mb-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Staff Picks</h2>
          <span className="text-sm text-white/50">Curated weekly</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredShows.slice(1, 4).map(show => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Latest Archives</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allShows.map(show => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>
    </div>
  );
}
