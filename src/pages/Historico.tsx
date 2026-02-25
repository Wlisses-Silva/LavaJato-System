import { useState, useEffect } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { getAppointments, saveAppointments, formatDateBr, getInitials, getServices } from '../utils/storage';

export default function Historico() {
  const [records, setRecords] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [filterService, setFilterService] = useState('Todos os Tipos');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    client: '',
    vehicle: '',
    service: '',
    value: '',
    status: 'Serviço Finalizado'
  });

  useEffect(() => {
    setRecords(getAppointments());
    const loadedServices = getServices();
    setServicesList(loadedServices);
  }, []);

  const updateRecords = (newRecords: any[]) => {
    setRecords(newRecords);
    saveAppointments(newRecords);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = e.target.value;
    const selectedService = servicesList.find(s => s.title === selectedTitle);
    setFormData({
      ...formData,
      service: selectedTitle,
      value: selectedService ? selectedService.price : ''
    });
  };

  const handleOpenModal = (record: any) => {
    setEditingRecord(record);
    setFormData({
      date: record.date,
      time: record.time,
      client: record.client,
      vehicle: record.vehicle,
      service: record.service,
      value: record.value,
      status: record.status
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      const newRecords = records.map(r => r.id === editingRecord.id ? { 
        ...r, 
        ...formData,
        initials: getInitials(formData.client)
      } : r);
      updateRecords(newRecords);
    }
    handleCloseModal();
  };

  const confirmDelete = (id: number) => {
    setRecordToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (recordToDelete !== null) {
      const newRecords = records.filter(r => r.id !== recordToDelete);
      updateRecords(newRecords);
      setIsDeleteModalOpen(false);
      setRecordToDelete(null);
    }
  };

  // Filter records: ONLY show finalized or canceled
  const historyRecords = records.filter(r => r.status === 'Serviço Finalizado' || r.status === 'Cancelado');
  
  const filteredRecords = historyRecords.filter(record => {
    if (filterService !== 'Todos os Tipos' && record.service !== filterService) return false;
    return true;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime(); // Descending for history
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">Histórico de Serviços</h1>
          <p className="text-slate-400">Visualize os serviços finalizados e cancelados</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#1e293b]/30 p-4 rounded-xl border border-[#1e293b]">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tipo de Serviço</label>
          <select 
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="w-full bg-[#1e293b] border border-[#1e293b] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none appearance-none cursor-pointer"
          >
            <option value="Todos os Tipos">Todos os Tipos</option>
            {servicesList.map(service => (
              <option key={service.id} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b]/20 border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e293b]/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-[#1e293b]">
                <th className="px-6 py-4">Data e Hora</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Veículo</th>
                <th className="px-6 py-4">Serviço</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {sortedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-[#1e293b]/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-300 font-medium">{formatDateBr(record.date)}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {record.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#0d93f2]/20 flex items-center justify-center text-[#0d93f2] text-xs font-bold shrink-0">
                        {record.initials}
                      </div>
                      <span className="text-sm font-medium text-white whitespace-nowrap">{record.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{record.vehicle}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{record.service}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white whitespace-nowrap">{record.value}</td>
                  <td className="px-6 py-4 text-center">
                    {record.status === 'Serviço Finalizado' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Serviço Finalizado
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                        Cancelado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(record)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => confirmDelete(record.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">Exibindo {sortedRecords.length} resultados</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#1e293b] border border-slate-700 rounded text-sm text-slate-400 hover:bg-slate-700 transition-colors flex items-center gap-1 opacity-50 cursor-not-allowed">
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
                Editar Registro
              </h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Data</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hora</label>
                  <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cliente</label>
                  <input 
                    type="text" 
                    required
                    value={formData.client}
                    onChange={e => setFormData({...formData, client: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                    placeholder="Nome do cliente"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Veículo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.vehicle}
                    onChange={e => setFormData({...formData, vehicle: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none"
                    placeholder="Ex: Honda Civic (2019)"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Serviço</label>
                  <select 
                    value={formData.service}
                    onChange={handleServiceChange}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none appearance-none"
                  >
                    {servicesList.map(service => (
                      <option key={service.id} value={service.title}>{service.title} - {service.price}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none appearance-none"
                >
                  <option value="Serviço Finalizado">Serviço Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Agendado">Reverter para Agendado</option>
                  <option value="Em Andamento">Reverter para Em Andamento</option>
                </select>
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
            <p className="text-slate-400 mb-6">Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.</p>
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
