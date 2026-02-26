import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Droplets, Sparkles, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay for premium feel
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-[#0d93f2]/30 relative overflow-hidden">
      
      {/* Background Image with Slow Zoom Animation */}
      <div className="absolute inset-0 lg:relative lg:flex lg:w-1/2 overflow-hidden bg-[#030712]">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center origin-center"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
          style={{ 
            // High-end car wash / detailing image
            backgroundImage: `url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=2000')`,
            filter: 'brightness(0.5) contrast(1.1)'
          }}
        />
        
        {/* Complex Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent lg:bg-gradient-to-r lg:from-[#030712] lg:via-[#030712]/60 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-transparent to-transparent" />
        
        {/* Desktop Content */}
        <div className="hidden lg:flex relative z-10 flex-col justify-between p-16 w-full h-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <img src="https://i.imgur.com/Bk68hhX.png" alt="CarWash System" className="h-48 w-auto max-w-[300px] object-contain drop-shadow-2xl" />
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-lg"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full border border-[#0d93f2]/30 bg-[#0d93f2]/10 text-[#0d93f2] text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                Sistema Premium
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-light tracking-tight mb-6 leading-[1.1] text-white">
              A arte do <br/>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0d93f2] to-cyan-300">
                detalhamento.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed font-light max-w-md">
              Gestão inteligente e de alta performance para estúdios de estética automotiva e lava-rápidos de luxo.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 text-xs font-medium tracking-widest uppercase text-slate-500"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#0d93f2]" />
              <span>Estética</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-[#0d93f2]" />
              <span>Proteção</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets size={14} className="text-[#0d93f2]" />
              <span>Lavagem</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 relative z-10 min-h-screen lg:min-h-0 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-[#0a0a0a]/80 lg:bg-transparent p-8 sm:p-10 lg:p-0 rounded-[2rem] backdrop-blur-2xl lg:backdrop-blur-none border border-white/5 lg:border-none shadow-2xl lg:shadow-none relative overflow-hidden"
        >
          {/* Subtle glow effect behind form on mobile */}
          <div className="absolute -top-24 -right-24 size-48 bg-[#0d93f2]/20 rounded-full blur-3xl lg:hidden pointer-events-none" />

          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center justify-center gap-4 mb-10 relative z-10">
            <img src="https://i.imgur.com/Bk68hhX.png" alt="CarWash System" className="h-48 w-auto max-w-[250px] object-contain drop-shadow-2xl" />
            <span className="px-3 py-1 rounded-full border border-[#0d93f2]/30 bg-[#0d93f2]/10 text-[#0d93f2] text-[10px] font-bold tracking-widest uppercase">
              Sistema Premium
            </span>
          </div>

          <div className="mb-10 text-center lg:text-left relative z-10">
            <h2 className="text-3xl font-light text-white mb-3 tracking-tight">Acesso ao Portal</h2>
            <p className="text-slate-400 font-light text-sm">Insira suas credenciais para gerenciar a operação.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail corporativo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#0d93f2] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@carwashsystem.com.br"
                  className="w-full pl-11 pr-4 py-4 bg-[#030712]/50 lg:bg-[#0a0a0a] border border-white/10 rounded-2xl focus:ring-2 focus:ring-[#0d93f2]/50 focus:border-[#0d93f2] outline-none text-white placeholder:text-slate-600 transition-all font-light shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Senha de acesso</label>
                <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-[#0d93f2] hover:text-blue-400 transition-colors">Recuperar</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#0d93f2] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 bg-[#030712]/50 lg:bg-[#0a0a0a] border border-white/10 rounded-2xl focus:ring-2 focus:ring-[#0d93f2]/50 focus:border-[#0d93f2] outline-none text-white placeholder:text-slate-600 transition-all font-light shadow-inner"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-4 bg-gradient-to-r from-[#0d93f2] to-blue-600 text-white font-bold tracking-wide rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(13,147,242,0.3)] hover:shadow-[0_0_30px_rgba(13,147,242,0.5)] hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Autenticando...</span>
                  </div>
                ) : (
                  <>
                    <span>Entrar no Sistema</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col items-center gap-4 relative z-10">
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest text-center">
              Acesso restrito e monitorado
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-slate-600 uppercase tracking-widest z-10 font-medium">
          © {new Date().getFullYear()} CarWash System • Gestão Total
        </div>
      </div>
    </div>
  );
}
