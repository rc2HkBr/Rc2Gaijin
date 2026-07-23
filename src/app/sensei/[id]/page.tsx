import { getTeacherBookings } from '@/actions/aulas';
import Link from 'next/link';
import { Calendar, Users, Clock, CheckCircle, Video, Terminal } from 'lucide-react';

export const dynamic = 'force-dynamic';

/* ── CRT Overlay ── */
const CRTEffect = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(128,0,255,0.08) 2px, rgba(128,0,255,0.08) 4px)',
    }} />
  </div>
);

export default async function SenseiDashboardPage({ params }: { params: { id: string } }) {
  const res = await getTeacherBookings(params.id);
  
  if (!res.success || !res.data) {
    return (
      <div className="min-h-screen bg-[#050008] text-red-500 font-pixel flex items-center justify-center">
        <h1>{res.error || 'Erro ao carregar.'}</h1>
      </div>
    );
  }

  const { teacher, bookings } = res.data;

  return (
    <div className="min-h-screen bg-[#050008] text-foreground p-6 font-mono relative overflow-hidden">
      <CRTEffect />
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-end justify-between border-b border-purple-900/50 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-black rounded-lg border-2 border-purple-600 overflow-hidden">
              {teacher.imageUrl ? (
                <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🥷</div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-pixel text-purple-400 uppercase tracking-widest">{teacher.name}</h1>
              <p className="text-xs text-purple-600 uppercase tracking-widest flex items-center gap-2 mt-1">
                <Terminal className="w-4 h-4" /> SENSEI DASHBOARD_VER 1.0
              </p>
            </div>
          </div>
          
          <Link href="/aulas" className="text-xs text-gray-500 hover:text-white uppercase font-pixel tracking-wider">
            {'< Return to Marketplace'}
          </Link>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/50 border border-purple-900/40 p-4 flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-purple-500 mb-2" />
            <span className="text-2xl font-pixel text-white">{bookings.length}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Alunos</span>
          </div>
          <div className="bg-black/50 border border-purple-900/40 p-4 flex flex-col items-center justify-center text-center">
            <Calendar className="w-6 h-6 text-emerald-500 mb-2" />
            <span className="text-2xl font-pixel text-white">R$ {(bookings.length * 40).toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Receita Estimada (R$ 40/aula)</span>
          </div>
          <div className="bg-black/50 border border-purple-900/40 p-4 flex flex-col items-center justify-center text-center">
            <Video className="w-6 h-6 text-cyan-500 mb-2" />
            <span className="text-sm font-pixel text-white mt-1">G-MEET</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Plataforma</span>
          </div>
        </div>

        {/* Bookings List */}
        <div>
          <h2 className="font-pixel text-xl text-purple-300 uppercase mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Aulas Agendadas
          </h2>
          
          {bookings.length === 0 ? (
            <div className="bg-black/80 border border-dashed border-purple-900/50 p-10 text-center text-gray-500 text-sm">
              Nenhuma aula agendada ainda.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking: any) => {
                const dateObj = new Date(booking.schedule.date);
                const isConfirmed = booking.status === 'CONFIRMED';
                
                return (
                  <div key={booking.id} className="bg-[#0c0514] border border-purple-900/30 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-purple-600/50 transition-colors">
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-white font-bold text-sm">
                          {dateObj.toLocaleDateString('pt-BR')} às {dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        <span className={`text-[10px] px-2 py-0.5 ml-2 font-pixel tracking-wider ${isConfirmed ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs">
                        Aluno (E-mail): <span className="text-cyan-400">{booking.studentId}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                      {isConfirmed ? (
                        <a href={booking.meetLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-xs px-4 py-2 flex items-center gap-2 hover:bg-emerald-800 transition-colors w-full sm:w-auto justify-center">
                          <Video className="w-4 h-4" /> Entrar na Aula
                        </a>
                      ) : (
                        <span className="text-[10px] text-gray-500 uppercase border border-gray-800 px-3 py-1 flex items-center gap-1 w-full sm:w-auto justify-center">
                          <Clock className="w-3 h-3" /> Aguardando Pgto
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
