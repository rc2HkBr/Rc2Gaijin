'use client';

import { useState } from 'react';
import { Calendar, Video, Clock, DollarSign, Lock, X, CheckCircle, Mail, User, ShieldAlert } from 'lucide-react';
import { createBooking } from '@/actions/aulas';

type Teacher = any; // We can type this properly later, using any for now since it comes from Prisma

export default function AulasClient({ initialTeachers }: { initialTeachers: Teacher[] }) {
  const [teachers] = useState<Teacher[]>(initialTeachers);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpenModal = (schedule: any, teacher: any) => {
    setSelectedSchedule({ ...schedule, teacher });
    setIsModalOpen(true);
    setSuccess(false);
    setErrorMsg('');
    
    // Auto-fill if exists
    const savedEmail = localStorage.getItem('gaijin_student_email');
    const savedName = localStorage.getItem('gaijin_student_name');
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg('Preencha nome e e-mail.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Save to local storage for future use (Profile page will use this)
    localStorage.setItem('gaijin_student_email', email);
    localStorage.setItem('gaijin_student_name', name);

    const res = await createBooking(selectedSchedule.id, email, name);
    
    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      // We don't close modal immediately so they can see success state
      setTimeout(() => {
        handleCloseModal();
        // Option to redirect to profile or Mercado Pago here
        window.location.href = '/perfil';
      }, 2000);
    } else {
      setErrorMsg(res.error || 'Erro desconhecido.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-pixel text-primary uppercase drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]">
          Aulas ao Vivo
        </h1>
        <p className="text-gray-400 font-pixel text-lg">Aprenda japonês diretamente com Senseis ninjas!</p>
        <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded-xl text-left inline-block max-w-2xl mx-auto">
          <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2 font-pixel text-sm uppercase">
            <Video className="w-5 h-5" /> Transmission Protocol
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 font-mono">
            <li>As aulas duram 1 hora via Google Meet.</li>
            <li>Valor fixo: R$ 60,00 por aula.</li>
            <li>Parte do valor apoia a plataforma GAIJIN RC2.</li>
            <li>Pagamento seguro e rápido via Pix ou Cartão.</li>
          </ul>
        </div>
      </header>

      <section className="grid gap-6">
        {teachers.length === 0 && (
          <div className="text-center text-gray-500 font-pixel mt-10">Nenhum sensei encontrado.</div>
        )}
        
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-[#110a18] border border-purple-900/50 rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-[0_0_15px_rgba(128,0,255,0.1)] hover:border-purple-500/50 transition-colors">
            
            {/* Teacher Avatar & Info */}
            <div className="sm:w-1/3 bg-black/50 border-r border-purple-900/30 p-4 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-purple-500 overflow-hidden mb-4 shadow-[0_0_15px_rgba(128,0,255,0.4)] relative z-10 bg-black">
                {teacher.imageUrl ? (
                  <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🥷</div>
                )}
              </div>
              <h2 className="font-pixel text-xl sm:text-2xl text-purple-300 text-center relative z-10">{teacher.name}</h2>
              <span className="text-[10px] text-purple-400 font-mono uppercase bg-purple-900/30 border border-purple-700/50 px-2 py-1 rounded mt-2 relative z-10">
                {teacher.specialty}
              </span>
            </div>
            
            {/* Schedules Area */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between font-mono">
              <div>
                <h3 className="font-bold text-gray-300 mb-4 flex items-center gap-2 text-sm uppercase">
                  <Calendar className="w-4 h-4 text-purple-400" /> Horários Disponíveis
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {teacher.schedules && teacher.schedules.length > 0 ? (
                    teacher.schedules.map((schedule: any) => {
                      const dateObj = new Date(schedule.date);
                      const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                      const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                      
                      return (
                        <button 
                          key={schedule.id}
                          onClick={() => handleOpenModal(schedule, teacher)}
                          className="bg-black border border-purple-700/50 hover:bg-purple-900/40 hover:border-purple-400 px-3 py-2 rounded text-xs sm:text-sm text-purple-200 transition-all flex items-center gap-2 active:scale-95"
                        >
                          <Clock className="w-3 h-3 text-purple-500" /> 
                          {dateStr} às {timeStr}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-gray-600 text-sm italic border border-dashed border-gray-800 p-2 w-full text-center">
                      Sem horários livres no momento.
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-purple-900/30">
                <div className="text-emerald-400 font-bold flex items-center gap-1 text-lg">
                  <DollarSign className="w-5 h-5" /> R$ {teacher.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Cyberpunk Checkout Modal */}
      {isModalOpen && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono">
          <div className="bg-[#050008] border border-purple-500 shadow-[0_0_30px_rgba(128,0,255,0.3)] w-full max-w-md relative overflow-hidden">
            
            {/* CRT overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            {/* Header */}
            <div className="bg-purple-900/40 border-b border-purple-700 p-4 flex justify-between items-center relative z-10">
              <h3 className="font-pixel text-purple-300 uppercase text-sm">Protocolo de Agendamento</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 relative z-10">
              {success ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                  <h2 className="font-pixel text-xl text-emerald-400 uppercase">Reserva Confirmada!</h2>
                  <p className="text-gray-400 text-sm">Redirecionando para o seu Dossiê...</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 bg-black border border-purple-900 p-3 text-sm text-gray-300">
                    <p className="text-purple-400 font-bold mb-1">{selectedSchedule.teacher.name}</p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> 
                      {new Date(selectedSchedule.date).toLocaleDateString('pt-BR')} às {new Date(selectedSchedule.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="flex items-center gap-2 mt-1 text-emerald-400">
                      <DollarSign className="w-4 h-4" /> R$ {selectedSchedule.teacher.price.toFixed(2)}
                    </p>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    {errorMsg && (
                      <div className="bg-red-950/50 border border-red-500 p-2 text-red-400 text-xs flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0" /> {errorMsg}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">Identificação (Nome)</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-black border border-gray-800 text-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                          placeholder="Ex: Shinobi Silva"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">E-mail de Contato (Para o Meet)</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-black border border-gray-800 text-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                          placeholder="ninja@cyber.com"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-purple-700 hover:bg-purple-600 disabled:bg-gray-800 text-white font-pixel text-lg py-3 border border-purple-400 shadow-[0_0_15px_rgba(128,0,255,0.3)] transition-all uppercase tracking-widest active:scale-95"
                      >
                        {isSubmitting ? 'Processando...' : 'Confirmar Reserva'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
