'use client';

import { Disc3, ChevronLeft, Play, Music } from 'lucide-react';
import { JPOP_SONGS } from '@/data/jpopData';
import Link from 'next/link';

export default function JPopHubPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-pixel text-primary uppercase mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-sm font-pixel text-secondary uppercase tracking-widest mt-1">
            CYBER JUKEBOX
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center pt-8 w-full max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Hub Banner */}
        <div className="w-full bg-[#1a2332] border-4 border-[#2c3e50] p-8 flex flex-col items-center text-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden mb-12">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <Disc3 className="w-16 h-16 text-[#ff00ff] mb-4 relative z-10 drop-shadow-[0_0_10px_rgba(255,0,255,0.8)] animate-spin-slow" />
          <h2 className="text-4xl sm:text-5xl font-pixel text-white mb-2 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10 leading-none">
            CYBER JUKEBOX
          </h2>
          <p className="text-xl text-secondary font-pixel uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,210,255,0.5)] relative z-10 mb-4">
            SELECT TRACK TO DECRYPT
          </p>
          <p className="text-gray-400 font-sans relative z-10 max-w-xl">
            Bem-vindo aos arquivos de áudio do sistema. Escolha uma faixa abaixo para treinar seu Kanji e expandir seu vocabulário acompanhando a sincronização.
          </p>
        </div>

        {/* Songs Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {JPOP_SONGS.map((song) => (
            <div 
              key={song.id}
              className="bg-surface-dark border-[3px] border-border p-6 shadow-[4px_4px_0_#000] flex flex-col relative group transition-transform hover:-translate-y-1 hover:border-[#ff00ff]"
            >
              {/* Retro Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30 group-hover:border-[#ff00ff]"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30 group-hover:border-[#ff00ff]"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-pixel text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Music className="w-4 h-4 text-secondary" /> FILE_ID: {song.id.toString().padStart(3, '0')}
                  </h3>
                  <h2 className="text-3xl font-pixel text-white leading-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {song.title}
                  </h2>
                  <p className="text-secondary font-pixel text-lg uppercase tracking-wide drop-shadow-[0_0_2px_rgba(0,210,255,0.5)]">
                    {song.artist}
                  </p>
                </div>
                
                <div className="bg-black border-2 border-[#ff00ff] p-2 rotate-12 shadow-[2px_2px_0_rgba(255,0,255,0.5)]">
                  <Disc3 className="w-8 h-8 text-[#ff00ff]" />
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  href={`/jpop/play/${song.id}`}
                  className="w-full py-3 bg-[#111] border-2 border-white text-white font-pixel text-xl uppercase flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0_#000] group-hover:bg-[#ff00ff] group-hover:text-black group-hover:border-[#ff00ff] active:translate-y-1 active:shadow-none"
                >
                  <Play className="w-5 h-5 fill-current" /> EXECUTE TRACK
                </Link>
              </div>
            </div>
          ))}

          {/* Locked / Empty Slots (Just for aesthetic) */}
          <div className="bg-black/50 border-2 border-dashed border-[#333] p-6 flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-[#333] font-pixel text-xl uppercase tracking-widest text-center">
              EMPTY SLOT <br/> [MORE DATA SOON]
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
