import { 
  Banknote, 
  ShoppingCart, 
  TrendingUp, 
  ClipboardList,
  Car,
  CircleDot
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const summaryData = [
  { title: 'Receita', value: 'R$ 45.230', trend: '+12.5%', icon: Banknote, color: 'text-[#0d93f2]', bg: 'bg-[#0d93f2]/10', isPositive: true },
  { title: 'Despesas', value: 'R$ 12.840', trend: '-4.2%', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-500/10', isPositive: false },
  { title: 'Lucro', value: 'R$ 32.390', trend: '+18.3%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', isPositive: true },
  { title: 'Total de Serviços', value: '1.240', trend: '+5.7%', icon: ClipboardList, color: 'text-blue-400', bg: 'bg-blue-400/10', isPositive: true },
];

const chartData = [
  { name: 'Seg', Carros: 40, Motos: 24 },
  { name: 'Ter', Carros: 30, Motos: 13 },
  { name: 'Qua', Carros: 20, Motos: 38 },
  { name: 'Qui', Carros: 27, Motos: 39 },
  { name: 'Sex', Carros: 18, Motos: 48 },
  { name: 'Sáb', Carros: 23, Motos: 38 },
  { name: 'Dom', Carros: 34, Motos: 43 },
];

const recentActivity = [
  { id: 1, car: 'Tesla Model 3 - ...', service: 'Marvin McKinney', time: '2 horas atrás', price: 'R$ 120', icon: Car },
  { id: 2, car: 'Honda CBR - Lubr...', service: 'Esther Howard', time: '5 horas atrás', price: 'R$ 45', icon: CircleDot },
  { id: 3, car: 'Toyota Camry - T...', service: 'Jerome Bell', time: '1 dia atrás', price: 'R$ 85', icon: Car },
  { id: 4, car: 'BMW M4 - Troc...', service: 'Eleanor Pena', time: '1 dia atrás', price: 'R$ 450', icon: Car },
  { id: 5, car: 'Ducati Panigale ...', service: 'Guy Hawkins', time: '2 dias atrás', price: 'R$ 290', icon: CircleDot },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Resumo do Painel</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-5 hover:border-[#0d93f2]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {item.trend}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{item.title}</p>
            <h3 className="text-2xl font-bold text-white">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Comparativo de Serviços</h3>
              <p className="text-sm text-slate-400">Carros vs Motos (Semanal)</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Bar dataKey="Carros" fill="#0d93f2" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="Motos" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1e293b]/50 border border-[#1e293b] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Atividade Recente</h3>
            <button className="text-sm text-[#0d93f2] hover:text-blue-400 font-medium">Ver tudo</button>
          </div>
          <div className="space-y-5">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#0d93f2]/10 flex items-center justify-center text-[#0d93f2] group-hover:bg-[#0d93f2] group-hover:text-white transition-colors">
                    <activity.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{activity.car}</p>
                    <p className="text-xs text-slate-400">{activity.service} • {activity.time}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#0d93f2]">{activity.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
