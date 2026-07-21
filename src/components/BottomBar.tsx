import Link from 'next/link';
import { Home, BookOpen, Trophy, User } from 'lucide-react';

export default function BottomBar() {
  const navItems = [
    { name: "Aprender", href: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Lições", href: "/lesson", icon: <BookOpen className="w-6 h-6" /> },
    { name: "Ranking", href: "#", icon: <Trophy className="w-6 h-6" /> },
    { name: "Perfil", href: "#", icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-border flex justify-around items-center px-4 z-50">
      {navItems.map((item, idx) => (
        <Link key={idx} href={item.href} className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-primary transition-colors">
          {item.icon}
          <span className="text-xs font-semibold mt-1">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
