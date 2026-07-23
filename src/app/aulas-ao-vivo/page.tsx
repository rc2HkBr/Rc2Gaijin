'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, GraduationCap, ArrowRight, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AulasAoVivoPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#07030d] text-white flex flex-col items-center pb-28">
      
      {/* HEADER */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center px-4 sm:px-8 sticky top-0 z-40 shadow-md">
        <Link href="/" className="text-cyan-400 hover:text-white transition-colors mr-4">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" /> AULAS AO VIVO
          </h1>
          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
            Marketplace de Professores Nativos & Senseis
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 mt-8 space-y-6">
        
        <div className="bg-gradient-to-r from-[#160a2b] to-[#0c0417] border border-cyan-500/30 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full blur-2xl"></div>
          <h2 className="text-2xl font-black mb-2 text-cyan-300">Escolha o seu Sensei</h2>
          <p className="text-gray-400 text-sm">
            Agende uma aula particular ao vivo. O pagamento é seguro e repassado diretamente para o professor via Mercado Pago.
          </p>
        </div>

        {loading && <p className="text-center text-cyan-400 font-bold animate-pulse py-10">Carregando senseis...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teachers.map(teacher => (
            <Link href={`/aulas-ao-vivo/${teacher.id}`} key={teacher.id}>
              <div className="group bg-[#120722] border border-purple-600/30 hover:border-cyan-400/80 rounded-2xl p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <div className="flex items-center gap-4">
                  <img 
                    src={teacher.imageUrl || '/images/avatars/default.png'} 
                    alt={teacher.name} 
                    className="w-16 h-16 rounded-full border-2 border-purple-500 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{teacher.name}</h3>
                    <p className="text-sm font-bold text-purple-400">{teacher.specialty}</p>
                    <p className="text-xs text-green-400 font-black flex items-center gap-1 mt-1">
                      <DollarSign className="w-3 h-3" /> R$ {teacher.price.toFixed(2)} / hora
                    </p>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-gray-400 line-clamp-2">
                  {teacher.bio || 'Sem biografia fornecida.'}
                </p>

                <div className="mt-4 flex items-center justify-end text-cyan-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  Ver Agenda <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {teachers.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhum professor disponível no momento.</p>
          </div>
        )}

      </div>
    </div>
  );
}
