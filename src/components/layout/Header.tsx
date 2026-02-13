"use client";

import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { Home, Users, Disc, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-md lg:hidden">
                <div className="flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-accent rounded-full shadow-[0_0_10px_var(--color-accent)]" />
                        <span className="text-xl font-bold text-white">PARCA</span>
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl lg:hidden flex flex-col p-6"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-2xl font-bold text-white">Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white/50 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4" onClick={() => setIsMobileMenuOpen(false)}>
                            <NavLink href="/" icon={Home} label="Home" />
                            <NavLink href="/artists" icon={Users} label="Artists" />
                            <NavLink href="/archive" icon={Disc} label="Archive" />
                            <NavLink href="/schedule" icon={Calendar} label="Schedule" />
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
