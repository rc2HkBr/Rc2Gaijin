'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Users, Trash2, Edit3, DollarSign, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminProfessoresPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', bio: '', specialty: '', price: 60, mpAccountId: '', imageUrl: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/teachers');
    if (res.ok) {
      const data = await res.json();
      setTeachers(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', bio: '', specialty: '', price: 60, mpAccountId: '', imageUrl: '' });
    fetchTeachers();
  };

  return (
    <div className="min-h-screen bg-[#07030d] text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex items-center gap-4 border-b border-purple-900 pb-4">
          <Link href="/" className="text-cyan-400 hover:text-white transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Users className="text-purple-500" /> Admin: Professores
            </h1>
            <p className="text-sm text-gray-400">Gerencie a equipe de professores e repasses (Marketplace).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Formulário */}
          <div className="md:col-span-1 bg-[#120722] p-6 rounded-2xl border border-purple-600/30 shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-cyan-400"/> Novo Professor</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-400 mb-1">Nome</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Especialidade (ex: N5, Conversação)</label>
                <input required type="text" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Biografia Curta</label>
                <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 h-20" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Mercado Pago Account ID (Split)</label>
                <input required type="text" value={formData.mpAccountId} onChange={e => setFormData({...formData, mpAccountId: e.target.value})} placeholder="ex: 123456789" className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Preço da Aula (R$)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">URL da Imagem</label>
                <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
              </div>
              
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-colors mt-4">
                Cadastrar Professor
              </button>
            </form>
          </div>

          {/* Lista */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4">Equipe Atual ({teachers.length})</h2>
            
            {loading && <p className="text-cyan-400 animate-pulse">Carregando...</p>}
            
            {teachers.map(teacher => (
              <div key={teacher.id} className="bg-gradient-to-r from-[#1a0c30] to-[#120722] border border-purple-500/30 p-5 rounded-2xl flex items-center justify-between shadow-md">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-purple-500 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {teacher.imageUrl ? (
                      <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{teacher.name}</h3>
                    <p className="text-cyan-400 text-sm font-bold">{teacher.specialty}</p>
                    <div className="flex gap-3 mt-1 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-green-400"/> R$ {teacher.price.toFixed(2)}</span>
                      <span>|</span>
                      <span>MP ID: {teacher.mpAccountId || 'Não configurado'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/admin/agenda?teacherId=${teacher.id}`} className="bg-purple-900/60 hover:bg-purple-800 p-2 rounded-lg text-purple-200 transition-colors" title="Gerenciar Agenda">
                    <Edit3 className="w-5 h-5" />
                  </Link>
                  <button className="bg-red-900/40 hover:bg-red-800 p-2 rounded-lg text-red-400 transition-colors" title="Remover">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            {teachers.length === 0 && !loading && (
              <div className="text-center py-10 bg-black/40 rounded-2xl border border-dashed border-gray-700 text-gray-500">
                Nenhum professor cadastrado ainda.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
