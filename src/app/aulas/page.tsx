import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar, Video, Clock, DollarSign } from 'lucide-react';

export default async function AulasPage() {
  // Buscar os professores
  const teachers = await prisma.teacher.findMany({
    include: {
      schedules: {
        where: { isBooked: false, date: { gt: new Date() } },
        orderBy: { date: 'asc' },
        take: 3,
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#0a0510] text-foreground p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-pixel text-primary uppercase drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]">Aulas ao Vivo</h1>
          <p className="text-gray-400 font-pixel text-lg">Aprenda japonês diretamente com Senseis ninjas!</p>
          <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded-xl text-left inline-block max-w-2xl mx-auto">
            <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2"><Video className="w-5 h-5"/> Como funciona?</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>As aulas duram 1 hora via Google Meet.</li>
              <li>Valor fixo: R$ 60,00 por aula.</li>
              <li>Parte do valor apoia a plataforma GAIJIN RC2.</li>
              <li>Pagamento seguro e rápido via Pix ou Cartão.</li>
            </ul>
          </div>
        </header>

        <section className="grid gap-6">
          {teachers.length === 0 && (
            <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-700 rounded-xl">
              Nenhum mestre disponível no momento.
            </div>
          )}

          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-lg">
              <div className="sm:w-1/3 bg-black border-r border-border p-4 flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden mb-4 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
                  {teacher.imageUrl ? (
                    <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl">🥷</div>
                  )}
                </div>
                <h2 className="font-pixel text-2xl text-secondary text-center">{teacher.name}</h2>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-2">{teacher.specialty}</span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" /> Horários Disponíveis
                  </h3>
                  
                  {teacher.schedules.length > 0 ? (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {teacher.schedules.map((schedule) => (
                        <button key={schedule.id} className="bg-background border border-border hover:border-primary px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-primary transition-colors flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(schedule.date).toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mb-6">Sem horários abertos para este mestre.</p>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                  <div className="text-gold font-bold flex items-center gap-1 text-lg">
                    <DollarSign className="w-5 h-5" /> R$ {teacher.price.toFixed(2)}
                  </div>
                  <Link href={`/aulas/${teacher.id}`} className="bg-primary text-black font-bold font-pixel px-6 py-2 rounded-lg hover:bg-orange-400 transition-colors">
                    AGENDAR AULA
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
