'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, CalendarPlus, Clock, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AdminAgendaPage() {
  const searchParams = useSearchParams();
  const initialTeacherId = searchParams.get('teacherId') || '';

  const [teachers, setTeachers] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState(initialTeacherId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      fetchSchedules(selectedTeacher);
    } else {
      setSchedules([]);
    }
  }, [selectedTeacher]);

  const fetchTeachers = async () => {
    const res = await fetch('/api/admin/teachers');
    if (res.ok) setTeachers(await res.json());
  };

  const fetchSchedules = async (teacherId: string) => {
    const res = await fetch(`/api/admin/schedules?teacherId=${teacherId}`);
    if (res.ok) setSchedules(await res.json());
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher || !date || !time) return;

    // Build ISO datetime
    const dateTime = new Date(`${date}T${time}:00`).toISOString();

    await fetch('/api/admin/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacherId: selectedTeacher, date: dateTime })
    });

    setDate('');
    setTime('');
    fetchSchedules(selectedTeacher);
  };

  return (
    <div className="min-h-screen bg-[#07030d] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center gap-4 border-b border-purple-900 pb-4">
          <Link href="/admin/professores" className="text-cyan-400 hover:text-white transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Calendar className="text-cyan-500" /> Admin: Agenda
            </h1>
            <p className="text-sm text-gray-400">Abra vagas de horários para os alunos reservarem.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Adicionar Vaga */}
          <div className="md:col-span-1 bg-[#120722] p-6 rounded-2xl border border-purple-600/30 shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CalendarPlus className="w-5 h-5 text-cyan-400"/> Nova Vaga</h2>
            <form onSubmit={handleAddSchedule} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-400 mb-1">Professor</label>
                <select 
                  value={selectedTeacher} 
                  onChange={e => setSelectedTeacher(e.target.value)}
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                >
                  <option value="" disabled>Selecione o professor...</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Data</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                  required
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Horário</label>
                <input 
                  type="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  required
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" 
                />
              </div>

              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-colors mt-4">
                Abrir Vaga
              </button>
            </form>
          </div>

          {/* Vagas Existentes */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-purple-400" /> Agenda do Professor
            </h2>
            
            {!selectedTeacher ? (
              <div className="text-center py-10 bg-black/40 rounded-2xl border border-dashed border-gray-700 text-gray-500">
                Selecione um professor à esquerda para ver a agenda.
              </div>
            ) : schedules.length === 0 ? (
              <div className="text-center py-10 bg-black/40 rounded-2xl border border-dashed border-gray-700 text-gray-500">
                Nenhum horário aberto para este professor.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {schedules.map(schedule => (
                  <div key={schedule.id} className="bg-gradient-to-br from-[#1a0c30] to-[#120722] border border-purple-500/30 p-4 rounded-xl shadow-md">
                    <p className="text-lg font-black text-white">
                      {new Date(schedule.date).toLocaleDateString('pt-BR')} 
                      <span className="text-cyan-400 ml-2">{new Date(schedule.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                    <div className="mt-2">
                      {schedule.isBooked ? (
                        <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded border border-green-500/50 font-bold uppercase">Reservado</span>
                      ) : (
                        <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded border border-purple-500/50 font-bold uppercase">Livre</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
