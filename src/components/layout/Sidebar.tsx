"use client";

import { Home, Users, Disc, Calendar, Radio } from 'lucide-react';
import { NavLink } from './NavLink';

export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-black/90 backdrop-blur-xl z-40 pt-8 pb-32">
            <div className="px-6 mb-10 flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-full shadow-[0_0_15px_var(--color-accent)] animate-pulse" />
                <h1 className="text-2xl font-bold tracking-tighter text-white">
                    PARCA<span className="text-accent">.</span>RADIO
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <NavLink href="/" icon={Home} label="Home" />
                <NavLink href="/artists" icon={Users} label="Artists" />
                <NavLink href="/archive" icon={Disc} label="Archive" />
                <NavLink href="/schedule" icon={Calendar} label="Schedule" />
            </nav>

            <div className="px-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20">
                    <div className="flex items-center gap-2 mb-2 text-accent">
                        <Radio size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">On Air</span>
                    </div>
                    <p className="text-sm text-white/80 font-medium">Community Driven Underground Radio.</p>
                </div>
            </div>
        </aside>
    );
}
