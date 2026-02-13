'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export function NavLink({ href, icon: Icon, label }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                    ? "bg-accent/10 text-accent shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive && "fill-accent/20")} />
            <span className="font-medium tracking-wide">{label}</span>
        </Link>
    );
}
