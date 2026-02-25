import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Clock, Droplet, Sparkles, Layers, Shield, Wind, X } from 'lucide-react';
import { getServices, saveServices } from '../utils/storage';

export default function Servicos() {
  const [services, setServices] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration: '',
    desc: '',
    image: ''
  });

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('simples')) return Droplet;
    if (lowerTitle.includes('completa')) return Sparkles;
    if (lowerTitle.includes('polimento')) return Layers;
    if (lowerTitle.includes('vitrificação')) return Shield;
    if (lowerTitle.includes('higienização')) return Wind;
    return Sparkles;
  };

  useEffect(() => {
    setServices(getServices());
  }, []);

  const updateServices = (newServices: any[]) => {
    setServices(newServices);
    saveServices(newServices);
  };

  const handleOpenModal = (service?: any) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        price: service.price,
        duration: service.duration,
        desc: service.desc,
        image: service.image
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        price: '',
        duration: '',
        desc: '',
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&auto=format&fit=crop&q=60'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      const newServices = services.map(s => s.id === editingService.id ? { 
        ...s, 
        ...formData,
        image: formData.image || 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&auto=format&fit=crop&q=60'
      } : s);
      updateServices(newServices);
    } else {
      const newService = {
        id: Math.max(0, ...services.map(s => s.id)) + 1,
        ...formData,
        image: formData.image || 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&auto=format&fit=crop&q=60'
      };
      updateServices([...services, newService]);
    }
    handleCloseModal();
  };

  const confirmDelete = (id: number) => {
    setServiceToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (serviceToDelete !== null) {
      const newServices = services.filter(s => s.id !== serviceToDelete);
      updateServices(newServices);
      setIsDeleteModalOpen(false);
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white">Gestão de Serviços</h1>
          <p className="text-slate-400 max-w-xl text-sm">Configure e mantenha seu catálogo de lavagem e estética automotiva. Atualize preços, durações e descrições para seus clientes.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-2.5 bg-[#0d93f2] text-white font-bold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-[#0d93f2]/20 shrink-0">
          <Plus size={18} />
          <span>Adicionar Novo Serviço</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {services.map((service) => (
          <div key={service.id} className="group bg-[#1e293b]/40 border border-[#1e293b] rounded-xl overflow-hidden hover:border-[#0d93f2]/50 transition-all flex flex-col h-full">
            <div className="h-32 w-full relative overflow-hidden shrink-0">
              <div 
                className="absolute inset-0 bg-slate-800 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center" 
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              <div className="absolute top-2 right-2 flex gap-1.5">
                <button onClick={() => handleOpenModal(service)} className="size-7 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#0d93f2] transition-colors">
                  <Edit2 size={12} />
                </button>
                <button onClick={() => confirmDelete(service.id)} className="size-7 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-col gap-1.5 mb-2">
                <h3 className="font-bold text-sm text-white leading-tight line-clamp-2">{service.title}</h3>
                <span className="inline-block w-fit px-2 py-0.5 bg-[#0d93f2]/10 text-[#0d93f2] text-xs font-bold rounded shrink-0">{service.price}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-2">
                <Clock size={12} />
                <span>{service.duration}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-3 mt-auto leading-relaxed">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Visão Geral de Detalhes</h2>
        <div className="bg-[#1e293b]/20 border border-[#1e293b] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1e293b]/50 border-b border-[#1e293b]">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Nome do Serviço</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Descrição</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Duração</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Preço</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]">
                {services.map((service) => {
                  const Icon = getIcon(service.title);
                  return (
                  <tr key={service.id} className="hover:bg-[#1e293b]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-[#0d93f2]/20 flex items-center justify-center text-[#0d93f2] shrink-0">
                          <Icon size={16} />
                        </div>
                        <span className="font-medium text-slate-100">{service.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 max-w-xs">
                      <p className="truncate">{service.desc}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{service.duration}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#0d93f2] whitespace-nowrap">{service.price}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(service)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => confirmDelete(service.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      Nenhum serviço cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101b22] border border-[#1e293b] rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-bold text-white">
                {editingService ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nome do Serviço</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                  placeholder="Ex: Lavagem Simples"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Preço</label>
                  <input 
                    type="text" 
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                    placeholder="Ex: R$ 40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duração</label>
                  <input 
                    type="text" 
                    required
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                    placeholder="Ex: 30 min"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Descrição</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.desc}
                  onChange={e => setFormData({...formData, desc: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none resize-none"
                  placeholder="Descreva os detalhes do serviço..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">URL da Imagem (Opcional)</label>
                <input 
                  type="url" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#0d93f2] text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-[#0d93f2]/20"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101b22] border border-[#1e293b] rounded-xl w-full max-w-sm overflow-hidden shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Confirmar Exclusão</h3>
            <p className="text-slate-400 mb-6">Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
