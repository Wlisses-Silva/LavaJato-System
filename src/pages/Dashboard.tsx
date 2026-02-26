import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Banknote, 
  TrendingUp, 
  CalendarDays,
  Users,
  Clock,
  AlertTriangle,
  Repeat,
  UserMinus,
  Car,
  Bike
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'motion/react';
import { getAppointments } from '../utils/storage';

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const parseCurrency = (val: string) => {
    if (!val) return 0;
    return parseFloat(val.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
  };

  const finalized = appointments.filter(a => a.status === 'Serviço Finalizado');
  const active = appointments.filter(a => a.status === 'Agendado' || a.status === 'Em Andamento');

  const totalRevenue = finalized.reduce((acc, curr) => acc + parseCurrency(curr.value), 0) || 45230; // Fallback to mock if 0 for visual purposes
  
  // Mocked fixed expenses
  const totalExpenses = 17200;
  const netProfit = totalRevenue - totalExpenses;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Mock Data for Charts
  const expensesData = [
    { name: 'Salários', value: 8000 },
    { name: 'Produtos', value: 3500 },
    { name: 'Aluguel', value: 3000 },
    { name: 'Marketing', value: 1500 },
    { name: 'Luz/Água', value: 1200 },
  ];
  const EXPENSES_COLORS = ['#0d93f2', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  const originData = [
    { name: 'Instagram', value: 45 },
    { name: 'Indicação', value: 30 },
    { name: 'Google', value: 15 },
    { name: 'Passagem', value: 10 },
  ];
  const ORIGIN_COLORS = ['#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

  const employeeData = [
    { name: 'Carlos', servicos: 42 },
    { name: 'Roberto', servicos: 38 },
    { name: 'Ana', servicos: 31 },
    { name: 'Marcos', servicos: 25 },
  ];

  const execTimeData = [
    { service: 'Lavagem Simples', time: '35 min', status: 'good' },
    { service: 'Lavagem Completa', time: '1h 15m', status: 'warning' },
    { service: 'Polimento', time: '3h 20m', status: 'good' },
    { service: 'Vitrificação', time: '4h 45m', status: 'good' },
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">Inteligência Estratégica</h1>
          <p className="text-slate-400">Visão analítica e indicadores de performance do seu negócio.</p>
        </div>
      </div>

      {/* 1. Saúde Financeira & Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Banknote className="text-[#0d93f2]" size={20} />
          Saúde Financeira
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-5 hover:border-[#0d93f2]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-[#0d93f2]/10 text-[#0d93f2]">
                <Banknote size={24} />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Receita Total</p>
            <h3 className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</h3>
          </div>
          
          <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <TrendingUp size={24} />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Lucro Líquido</p>
            <h3 className="text-2xl font-bold text-white">{formatCurrency(netProfit)}</h3>
          </div>

          <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-5 hover:border-amber-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Car size={24} />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Ticket Médio (Carro)</p>
            <h3 className="text-2xl font-bold text-white">R$ 145,00</h3>
          </div>

          <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-5 hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <Bike size={24} />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Ticket Médio (Moto)</p>
            <h3 className="text-2xl font-bold text-white">R$ 65,00</h3>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Despesas Fixas vs Variáveis */}
        <motion.div variants={itemVariants} className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-1">Distribuição de Despesas</h3>
          <p className="text-sm text-slate-400 mb-6">Fixas vs Variáveis</p>
          <div className="flex-1 min-h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={EXPENSES_COLORS[index % EXPENSES_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-xs text-slate-400">Total</span>
              <span className="text-lg font-bold text-white">{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {expensesData.slice(0,4).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: EXPENSES_COLORS[i] }} />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. Performance Operacional */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Performance Operacional</h3>
              <p className="text-sm text-slate-400">Serviços por Funcionário</p>
            </div>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" opacity={0.5} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
                />
                <Bar dataKey="servicos" fill="#0d93f2" radius={[0, 4, 4, 0]} barSize={20}>
                  {employeeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0d93f2' : '#3b82f6'} opacity={index === 0 ? 1 : 0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tempo Médio */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Tempo Médio de Execução</h3>
          <div className="space-y-4">
            {execTimeData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/30">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-200">{item.service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{item.time}</span>
                  {item.status === 'warning' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">Acima da meta</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">No prazo</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Taxa de Retorno */}
        <motion.div variants={itemVariants} className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-4">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-4xl font-black text-white mb-2">1.2%</h3>
          <p className="text-sm font-bold text-slate-300 mb-1">Taxa de Retorno (Refazimento)</p>
          <p className="text-xs text-slate-500">Meta: Abaixo de 2%</p>
        </motion.div>

        {/* Recorrência */}
        <motion.div variants={itemVariants} className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
            <Repeat size={32} />
          </div>
          <h3 className="text-4xl font-black text-white mb-2">68%</h3>
          <p className="text-sm font-bold text-slate-300 mb-1">Recorrência (Fidelidade)</p>
          <p className="text-xs text-slate-500">&gt; 2x ao mês</p>
        </motion.div>
      </div>

      {/* 3. Inteligência de Cliente */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <div className="p-4 rounded-full bg-orange-500/10 text-orange-500 mb-4">
            <UserMinus size={32} />
          </div>
          <h3 className="text-4xl font-black text-white mb-2">12%</h3>
          <p className="text-sm font-bold text-slate-300 mb-1">Churn Rate (Abandono)</p>
          <p className="text-xs text-slate-500">Ausentes há &gt; 45 dias</p>
        </div>

        <div className="lg:col-span-2 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-1">Origem do Cliente</h3>
          <p className="text-sm text-slate-400 mb-6">Por onde eles chegam?</p>
          <div className="flex-1 min-h-[200px] w-full flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={originData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {originData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ORIGIN_COLORS[index % ORIGIN_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 pl-4 space-y-3">
              {originData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ORIGIN_COLORS[i] }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
