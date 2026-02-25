import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  Calendar, 
  History, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Resumo do Painel', path: '/' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: Wrench, label: 'Serviços', path: '/servicos' },
  { icon: Calendar, label: 'Agenda', path: '/agenda' },
  { icon: History, label: 'Histórico', path: '/historico' },
  { icon: Users, label: 'Funcionários', path: '/funcionarios' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const getPageTitle = () => {
    const item = navItems.find(item => item.path === location.pathname);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#101b22] text-slate-100 font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-[#1e293b] bg-[#101b22] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[#0d93f2]/20 flex items-center justify-center text-[#0d93f2] font-bold text-xl">
              L
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none">Lumer Car</h1>
              <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider mt-1">Portal Admin</p>
            </div>
          </div>
          <button className="lg:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-[#0d93f2] text-white shadow-lg shadow-[#0d93f2]/20" 
                    : "text-slate-400 hover:bg-[#1e293b] hover:text-slate-200"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-400")} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1e293b]">
          <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-[#1e293b]/50">
            <div className="size-10 rounded-full bg-[#0d93f2]/20 flex items-center justify-center text-[#0d93f2] font-bold">
              JD
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">John Doe</p>
              <p className="text-xs text-[#0d93f2] truncate">Gerente</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white p-1">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#101b22]">
        <header className="h-16 border-b border-[#1e293b] bg-[#101b22]/80 flex items-center justify-between px-4 lg:px-8 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-white hidden sm:block">
              {getPageTitle()}
            </h2>
            <div className="hidden md:flex flex-1 max-w-md ml-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar dados..." 
                  className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#0d93f2] text-slate-100 placeholder:text-slate-500 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-slate-400 hover:text-[#0d93f2] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-[#101b22]"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-[#0d93f2] transition-colors hidden sm:block">
              <HelpCircle size={20} />
            </button>
            <div className="h-8 w-px bg-[#1e293b] mx-1 sm:mx-2 hidden sm:block"></div>
            <div className="size-8 rounded-full bg-[#0d93f2]/30 text-[#0d93f2] flex items-center justify-center font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
