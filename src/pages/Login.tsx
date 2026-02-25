import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#101b22] text-slate-100 font-sans">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a1116] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d93f2]/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="size-48 mb-8 relative">
            {/* Placeholder for the 3D Logo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0d93f2] to-blue-900 rounded-2xl transform rotate-12 opacity-50 blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-[#0d93f2] to-blue-900 rounded-2xl flex items-center justify-center text-6xl font-black text-white shadow-2xl border border-white/10">
              LC
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">LUMER CAR</h1>
          <p className="text-slate-400 text-lg tracking-widest uppercase text-center">Lava rápido e estética automotiva</p>
          <p className="mt-12 text-slate-500 text-sm">O futuro da gestão automotiva de luxo.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
            <p className="text-slate-400">Insira suas credenciais para acessar o CRM</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@empresa.com"
                className="w-full px-4 py-3 bg-[#1e293b] border border-[#1e293b] rounded-lg focus:ring-2 focus:ring-[#0d93f2] focus:border-transparent outline-none text-white placeholder:text-slate-500 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#1e293b] border border-[#1e293b] rounded-lg focus:ring-2 focus:ring-[#0d93f2] focus:border-transparent outline-none text-white placeholder:text-slate-500 transition-all pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="size-4 rounded border border-slate-500 bg-[#1e293b] peer-checked:bg-[#0d93f2] peer-checked:border-[#0d93f2] transition-all"></div>
                  <svg className="absolute inset-0 w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Lembrar de mim</span>
              </label>
              <a href="#" className="text-[#0d93f2] hover:text-blue-400 transition-colors font-medium">Esqueceu a senha?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-[#0d93f2] hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-[#0d93f2]/20 transition-all transform hover:-translate-y-0.5"
            >
              Entrar no Dashboard
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Precisa de assistência técnica? <a href="#" className="text-[#0d93f2] hover:underline">Contatar Suporte</a>
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-slate-600">
          © 2024 Lumer Car CRM. Todos os direitos reservados. Acesso Seguro na Nuvem.
        </div>
      </div>
    </div>
  );
}
