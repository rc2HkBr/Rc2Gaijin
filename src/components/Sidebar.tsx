import Link from 'next/link';
import { Home, BookOpen, Trophy, User, Settings } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: "Aprender", href: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Lições", href: "/lesson", icon: <BookOpen className="w-6 h-6" /> },
    { name: "Ranking", href: "#", icon: <Trophy className="w-6 h-6" /> },
    { name: "Perfil", href: "#", icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className="hidden sm:flex flex-col w-64 border-r border-border bg-surface p-4 h-full">
      <div className="text-2xl font-bold text-primary mb-8 px-4 mt-4">
        Nihongo<span className="text-secondary">App</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item, idx) => (
          <Link key={idx} href={item.href} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-border/50 text-foreground font-bold text-lg transition-colors group">
            <span className="text-gray-400 group-hover:text-primary transition-colors">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-border/50 text-foreground font-bold text-lg transition-colors group">
          <span className="text-gray-400 group-hover:text-primary transition-colors"><Settings className="w-6 h-6" /></span>
          Configurações
        </Link>
      </div>
    </div>
  );
}
