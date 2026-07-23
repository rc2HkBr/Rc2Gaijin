'use client';

import { useState, useEffect, use } from 'react';
import { ChevronLeft, Calendar, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function TeacherBookingPage({ params }: { params: Promise<{ teacherId: string }> }) {
  const { teacherId } = use(params);

  const [teacher, setTeacher] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<any>(null);

  useEffect(() => {
    fetchTeacherAndSchedules();
  }, [teacherId]);

  const fetchTeacherAndSchedules = async () => {
    setLoading(true);
    try {
      // 1. Fetch Teacher info (since we don't have a single teacher endpoint yet, we can filter from all or create one. Wait, let's just use schedules endpoint which includes teacher data)
      const res = await fetch(`/api/admin/schedules?teacherId=${teacherId}`);
      if (res.ok) {
        const data = await res.json();
        setSchedules(data);
        if (data.length > 0) {
          setTeacher(data[0].teacher);
        } else {
          // If no schedules, we still need teacher info. Let's fetch all and find.
          const teachersRes = await fetch('/api/admin/teachers');
          const teachersData = await teachersRes.json();
          setTeacher(teachersData.find((t: any) => t.id === teacherId));
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCheckout = async () => {
    if (!selectedScheduleId) return;
    setIsCheckingOut(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduleId: selectedScheduleId,
          studentId: 'mock-user-123', // In a real app, this comes from auth context
          paymentMethod: 'pix'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCheckoutSuccess(data);
      } else {
        alert('Erro ao processar pagamento: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao checkout.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#07030d] flex items-center justify-center text-cyan-400 font-bold">Carregando...</div>;
  if (!teacher) return <div className="min-h-screen bg-[#07030d] flex items-center justify-center text-red-400 font-bold">Professor não encontrado.</div>;

  return (
    <div className="min-h-screen bg-[#07030d] text-white flex flex-col items-center pb-28">
      
      {/* HEADER */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center px-4 sm:px-8 sticky top-0 z-40 shadow-md">
        <Link href="/aulas-ao-vivo" className="text-cyan-400 hover:text-white transition-colors mr-4">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            {teacher.name}
          </h1>
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
            {teacher.specialty}
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl px-4 mt-8 space-y-8">
        
        {/* Profile Card */}
        <div className="bg-[#120722] border border-purple-600/30 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <img src={teacher.imageUrl || '/images/avatars/default.png'} alt={teacher.name} className="w-32 h-32 rounded-2xl border-4 border-purple-500/50 object-cover" />
          <div className="flex-1">
            <h2 className="text-3xl font-black text-white">{teacher.name}</h2>
            <p className="text-cyan-400 font-bold mb-3">{teacher.specialty}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{teacher.bio}</p>
          </div>
          <div className="bg-green-950 border border-green-500/50 p-4 rounded-2xl text-center self-stretch md:self-auto flex flex-col justify-center">
            <p className="text-xs text-green-400 font-bold uppercase mb-1">Valor da Aula</p>
            <p className="text-2xl font-black text-white flex items-center justify-center gap-1">
              <DollarSign className="w-5 h-5 text-green-400"/> {teacher.price.toFixed(2)}
            </p>
          </div>
        </div>

        {checkoutSuccess ? (
          <div className="bg-green-950/30 border border-green-500 p-8 rounded-2xl text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white">Reserva Confirmada!</h2>
            <p className="text-green-300">
              O pagamento (Split Mercado Pago) foi simulado com sucesso.
            </p>
            <div className="mt-4 p-4 bg-black/50 rounded-xl text-left text-sm text-gray-300 space-y-2 w-full max-w-md">
              <p><strong>Status:</strong> Pago</p>
              <p><strong>Booking ID:</strong> {checkoutSuccess.bookingId}</p>
              <p><strong>Link da Aula:</strong> <a href="#" className="text-cyan-400 underline">meet.google.com/mock-link</a></p>
            </div>
            <Link href="/aulas-ao-vivo" className="mt-4 bg-green-600 hover:bg-green-500 px-8 py-3 rounded-xl font-bold text-white transition-colors">
              Voltar ao Marketplace
            </Link>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-black flex items-center gap-2"><Calendar className="text-purple-400"/> Horários Disponíveis</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {schedules.filter(s => !s.isBooked).map(schedule => {
                const dateObj = new Date(schedule.date);
                const isSelected = selectedScheduleId === schedule.id;

                return (
                  <button 
                    key={schedule.id}
                    onClick={() => setSelectedScheduleId(schedule.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected 
                      ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                      : 'bg-[#160a2b] border-purple-500/30 hover:border-purple-400'
                    }`}
                  >
                    <p className="text-sm text-gray-400 mb-1">{dateObj.toLocaleDateString('pt-BR')}</p>
                    <p className="text-xl font-black text-white flex items-center gap-2">
                      <Clock className={isSelected ? 'text-cyan-400' : 'text-purple-400'} />
                      {dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </button>
                );
              })}

              {schedules.filter(s => !s.isBooked).length === 0 && (
                <div className="col-span-full py-8 text-center bg-black/40 border border-dashed border-gray-700 rounded-2xl text-gray-400">
                  Nenhum horário livre no momento.
                </div>
              )}
            </div>

            {selectedScheduleId && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0e071a] border-t border-cyan-500/50 shadow-[0_-10px_30px_rgba(6,182,212,0.1)] flex justify-center z-50 animate-in slide-in-from-bottom">
                <div className="max-w-3xl w-full flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-400 font-bold">Total a pagar:</p>
                    <p className="text-2xl font-black text-white">R$ {teacher.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
                  >
                    {isCheckingOut ? 'Processando (Mercado Pago)...' : 'Pagar e Reservar'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
