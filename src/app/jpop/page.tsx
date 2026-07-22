'use client';

import { Music, PlayCircle } from 'lucide-react';
import { JPOP_SONGS } from '@/data/jpopData';
import Link from 'next/link';

export default function JPopHubPage() {
  return (
    <div className="flex flex-col items-center pb-24 pt-6 w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="w-full mb-10 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 font-bold text-xs uppercase tracking-wider">
          <Music className="w-4 h-4" /> J-Pop Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Biblioteca Musical</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Aprenda Japonês cantando suas músicas favoritas. Selecione um clipe e entre no modo Karaoke Interativo!
        </p>
      </div>

      {/* Grid de Músicas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {JPOP_SONGS.map((song) => (
          <Link 
            key={song.id} 
            href={`/jpop/${song.id}`}
            className="group flex flex-col bg-surface border-2 border-border rounded-3xl overflow-hidden hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
          >
            {/* Thumbnail Placeholder (Using Cover Emoji + Gradient for now) */}
            <div className="w-full aspect-video bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex flex-col items-center justify-center relative border-b-2 border-border">
              <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-500">{song.coverEmoji}</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Song Info */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {song.titleRomaji}
                </h3>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-4 line-clamp-1">{song.artist}</p>
              
              <div className="mt-auto flex justify-between items-center">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                  song.difficulty === 'Iniciante' ? 'bg-emerald-500/10 text-emerald-500' :
                  song.difficulty === 'Intermediário' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {song.difficulty}
                </span>
                <span className="text-xs font-bold text-gray-400">{song.lyrics.length} Versos</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
