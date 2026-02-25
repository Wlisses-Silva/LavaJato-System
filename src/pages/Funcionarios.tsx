import { useState } from 'react';
import { Users, Zap, CheckSquare, UserPlus, MoreVertical, ChevronLeft, ChevronRight, Edit2, Trash2, X } from 'lucide-react';

const initialEmployees = [
  { id: 1, name: 'Alex Rivera', role: 'Mecânico Sênior', phone: '(555) 123-4567', services: '1,240', status: 'ATIVO', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 2, name: 'Sarah Chen', role: 'Especialista em Diagnóstico', phone: '(555) 987-6543', services: '892', status: 'EM INTERVALO', avatar: 'https://i.pravatar.cc/150?u=12' },
  { id: 3, name: 'Marcus Thorne', role: 'Líder de Detalhamento', phone: '(555) 456-7890', services: '2,105', status: 'ATIVO', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 4, name: 'Jordan Smith', role: 'Técnico Júnior', phone: '(555) 222-3333', services: '432', status: 'FORA DE SERVIÇO', avatar: null, initials: 'JS' },
  { id: 5, name: 'Liam Park', role: 'Especialista em Pneus', phone: '(555) 345-6789', services: '1,023', status: 'ATIVO', avatar: 'https://i.pravatar.cc/150?u=15' },
];

export default function Funcionarios() {
  const [employees, setEmployees] = useState(initialEmployees);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    status: 'ATIVO',
    services: '0'
  });

  const handleOpenModal = (emp?: any) => {
    if (emp) {
      setEditingEmployee(emp);
      setFormData({
        name: emp.name,
        role: emp.role,
        phone: emp.phone,
        status: emp.status,
        services: emp.services
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '',
        role: '',
        phone: '',
        status: 'ATIVO',
        services: '0'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...formData } : emp));
    } else {
      const newEmp = {
        id: Math.max(0, ...employees.map(e => e.id)) + 1,
        ...formData,
        initials: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
        avatar: null
      };
      setEmployees([...employees, newEmp]);
    }
    handleCloseModal();
  };

  const confirmDelete = (id: number) => {
    setEmployeeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (employeeToDelete !== null) {
      setEmployees(employees.filter(emp => emp.id !== employeeToDelete));
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const activeCount = employees.filter(e => e.status === 'ATIVO').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">Diretório de Funcionários</h1>
          <p className="text-slate-400">Gerencie e monitore o desempenho da sua equipe</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-2.5 bg-[#0d93f2] hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-[#0d93f2]/20 shrink-0">
          <UserPlus size={18} />
          <span>Cadastrar Funcionário</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1e293b]/40 border border-[#1e293b] p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0d93f2]/10 rounded-lg text-[#0d93f2]">
              <Users size={20} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Total de Funcionários</p>
          <p className="text-3xl font-bold text-white mt-1">{employees.length}</p>
        </div>
        <div className="bg-[#1e293b]/40 border border-[#1e293b] p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0d93f2]/10 rounded-lg text-[#0d93f2]">
              <Zap size={20} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Ativos Agora</p>
          <p className="text-3xl font-bold text-white mt-1">{activeCount}</p>
        </div>
        <div className="bg-[#1e293b]/40 border border-[#1e293b] p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0d93f2]/10 rounded-lg text-[#0d93f2]">
              <CheckSquare size={20} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Serviços Hoje</p>
          <p className="text-3xl font-bold text-white mt-1">156</p>
        </div>
      </div>

      <div className="bg-[#1e293b]/40 border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e293b]/60 border-b border-[#1e293b]">
                <th className="px-6 py-4 text-sm font-semibold text-slate-200">Nome</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-200">Cargo</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-200">Telefone</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-200 text-center">Serviços Realizados</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-200">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-200 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#1e293b]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {emp.avatar ? (
                        <img src={emp.avatar} alt={emp.name} className="size-8 rounded-full object-cover border border-[#1e293b]" />
                      ) : (
                        <div className="size-8 rounded-full bg-[#0d93f2]/20 flex items-center justify-center text-[#0d93f2] font-bold text-xs border border-[#0d93f2]/30">
                          {emp.initials}
                        </div>
                      )}
                      <span className="font-medium text-white">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{emp.role}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{emp.phone}</td>
                  <td className="px-6 py-4 text-sm text-white text-center font-semibold">{emp.services}</td>
                  <td className="px-6 py-4">
                    {emp.status === 'ATIVO' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#0d93f2]/20 text-[#0d93f2] border border-[#0d93f2]/30 shadow-[0_0_8px_rgba(13,147,242,0.4)]">
                        <span className="size-1.5 rounded-full bg-[#0d93f2]"></span>
                        ATIVO
                      </span>
                    )}
                    {emp.status === 'EM INTERVALO' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30">
                        <span className="size-1.5 rounded-full bg-amber-500"></span>
                        EM INTERVALO
                      </span>
                    )}
                    {emp.status === 'FORA DE SERVIÇO' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/30">
                        <span className="size-1.5 rounded-full bg-slate-500"></span>
                        FORA DE SERVIÇO
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(emp)} className="p-1.5 text-slate-400 hover:text-[#0d93f2] hover:bg-[#0d93f2]/10 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => confirmDelete(emp.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">Mostrando {employees.length} funcionários</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[#1e293b] text-slate-300 hover:bg-[#1e293b] transition-colors">
              Anterior
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[#0d93f2] text-white shadow-md shadow-[#0d93f2]/20 hover:bg-blue-500 transition-colors">
              Próximo
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
                {editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
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
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cargo</label>
                <input 
                  type="text" 
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-white outline-none appearance-none"
                  >
                    <option value="ATIVO">ATIVO</option>
                    <option value="EM INTERVALO">EM INTERVALO</option>
                    <option value="FORA DE SERVIÇO">FORA DE SERVIÇO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Serviços</label>
                  <input 
                    type="text" 
                    value={formData.services}
                    onChange={e => setFormData({...formData, services: e.target.value})}
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
            <p className="text-slate-400 mb-6">Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.</p>
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
