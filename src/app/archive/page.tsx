import { getAllShows } from '@/lib/data';
import ArchiveView from '@/components/archive/ArchiveView';

export default function ArchivePage() {
    const shows = getAllShows();
    return <ArchiveView initialShows={shows} />;
}
