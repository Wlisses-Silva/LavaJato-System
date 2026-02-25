import { useState } from 'react';
import { Search, Plus, Filter, Download, Edit2, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';

const initialClients = [
  { id: 1, name: 'Alex Rivera', phone: '+1 555-0101', email: 'alex@example.com', visits: 12, status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sarah Chen', phone: '+1 555-0102', email: 'sarah.c@example.com', visits: 5, status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Jordan Smyth', phone: '+1 555-0103', email: 'j.smyth@example.com', visits: 2, status: 'Inativo', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Maria Garcia', phone: '+1 555-0104', email: 'm.garcia@example.com', visits: 28, status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export default function Clientes() {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Ativo',
    visits: 0
  });

  const handleOpenModal = (client?: any) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        phone: client.phone,
        email: client.email,
        status: client.status,
        visits: client.visits
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        phone: '',
        email: '',
        status: 'Ativo',
        visits: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...formData } : c));
    } else {
      const newClient = {
        id: Math.max(0, ...clients.map(c => c.id)) + 1,
        ...formData,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };
      setClients([...clients, newClient]);
    }
    handleCloseModal();
  };

  const confirmDelete = (id: number) => {
    setClientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (clientToDelete !== null) {
      setClients(clients.filter(c => c.id !== clientToDelete));
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Diretório de Clientes</h1>
          <p className="text-slate-400 text-sm">Gerencie seus clientes ativos e potenciais</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar clientes por nome, email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-slate-100 placeholder:text-slate-500 outline-none"
            />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-[#0d93f2] hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shrink-0">
            <Plus size={18} />
            <span className="hidden sm:inline">Novo Cliente</span>
          </button>
          <button className="p-2 bg-[#1e293b] hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
            <Filter size={18} />
          </button>
          <button className="p-2 bg-[#1e293b] hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e293b]/80 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-[#1e293b]">
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Telefone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Visitas</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-[#1e293b]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={client.avatar} alt={client.name} className="size-8 rounded-full object-cover" />
                      <span className="font-medium text-white">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{client.phone}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{client.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{client.visits}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === 'Ativo' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(client)} className="p-1.5 text-slate-400 hover:text-[#0d93f2] hover:bg-[#0d93f2]/10 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => confirmDelete(client.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">Exibindo {filteredClients.length} clientes</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#1e293b] border border-slate-700 rounded text-sm text-slate-400 hover:bg-slate-700 transition-colors flex items-center gap-1">
              <ChevronLeft size={16} /> Anterior
            </button>
            <button className="px-3 py-1 bg-[#0d93f2] text-white rounded text-sm font-medium">1</button>
            <button className="px-3 py-1 bg-[#1e293b] border border-slate-700 rounded text-sm text-slate-400 hover:bg-slate-700 transition-colors flex items-center gap-1">
              Próximo <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101b22] border border-[#1e293b] rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-bold text-white">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nome</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Telefone</label>
                <input 
                  type="text" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none appearance-none"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Visitas</label>
                  <input 
                    type="number" 
                    min="0"
                    value={formData.visits}
                    onChange={e => setFormData({...formData, visits: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                  />
                </div>
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
            <p className="text-slate-400 mb-6">Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.</p>
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
