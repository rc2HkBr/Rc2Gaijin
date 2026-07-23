'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Swords, Music, User } from 'lucide-react';

export default function BottomBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", href: "/", icon: Home },
    { name: "SHOP", href: "/shop", icon: ShoppingBag },
    { name: "TRILHA", href: "/trilha", icon: Swords },
    { name: "KARAOKE", href: "/jpop", icon: Music },
    { name: "PERFIL", href: "/perfil", icon: User },
  ];

  return (
    <div className="sm:hidden w-full h-14 bg-surface border-t border-border flex justify-around items-center z-50 shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors ${
              isActive ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-pixel uppercase tracking-wider">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
