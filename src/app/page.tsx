import { Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const levels = [
    { id: 1, title: 'Introdução', color: 'bg-success' },
    { id: 2, title: 'Família K (Flashcards)', color: 'bg-primary' },
    { id: 3, title: 'Família S', color: 'bg-secondary' },
    { id: 4, title: 'Família T', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col items-center py-10 w-full max-w-2xl mx-auto px-4">
      <div className="w-full mb-8">
        <h1 className="text-3xl font-bold text-center text-foreground">Sua Jornada</h1>
        <p className="text-gray-500 text-center mt-2">Domine o Hiragana passo a passo.</p>
      </div>

      <div className="relative flex flex-col items-center space-y-12 py-10 w-full">
        <div className="absolute top-0 bottom-0 left-1/2 -ml-0.5 w-1 bg-border z-0"></div>

        {levels.map((level, i) => {
          // Add a slight alternating offset for a zigzag path effect
          const isOffset = i % 2 !== 0;
          return (
          <div key={level.id} className={`relative z-10 group cursor-pointer w-full flex justify-center ${isOffset ? 'ml-24' : '-ml-24'}`}>
            <Link href={level.id === 2 ? "/lesson" : "/lesson"} className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-200">
               <div className="bg-surface border-2 border-border px-4 py-2 rounded-xl mb-3 shadow-sm group-hover:border-primary transition-colors">
                  <p className="font-bold text-foreground text-sm whitespace-nowrap">{level.title}</p>
               </div>
               <div className={`w-20 h-20 rounded-full ${level.color} border-b-[6px] border-black/20 flex items-center justify-center text-white shadow-xl group-hover:-translate-y-1 transition-transform`}>
                 <Star className="w-10 h-10 fill-white/50" />
               </div>
            </Link>
          </div>
          );
        })}
      </div>
    </div>
  );
}
