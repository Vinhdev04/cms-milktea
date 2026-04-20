import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth, mockAdminUsers } from "../context/AuthContext";

export function Auth() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    setError("");
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/", { replace: true }), 600);
    } else {
      setError(result.error || "Đăng nhập thất bại.");
    }
  };

  const fillDemo = (u: typeof mockAdminUsers[0]) => {
    setEmail(u.email);
    setPassword(u.password);
    setError("");
  };

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-ken-burns { animation: kenBurns 20s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .input-field {
          width: 100%; padding: 12px 12px 12px 44px;
          border-radius: 14px; border: 1.5px solid #F0DCC8;
          background: white; font-size: 14px; color: #1A1A1A;
          outline: none; transition: all 0.2s;
          font-family: 'Be Vietnam Pro', sans-serif;
        }
        .input-field:focus { border-color: #F58220; box-shadow: 0 0 0 3px rgba(245,130,32,0.12); }
        .input-field::placeholder { color: #9CA3AF; }
      `}</style>

      {/* Left side */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#3D1A00]">
        <div className="absolute inset-0 bg-cover bg-[center_35%] animate-ken-burns opacity-90"
          style={{ backgroundImage: "url('https://file.hstatic.net/200000079049/file/matcha-latte-bia_4309c7c19ae14551a06ac3698d7cd5e2.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1000]/90 via-[#2A1000]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Brand */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" fill="#F58220" />
              <circle cx="16" cy="16" r="6" fill="white" opacity="0.8" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'white', fontWeight: 700, fontSize: '16px' }}>SMYOU</div>
            <div style={{ color: '#F5C088', fontSize: '11px' }}>MilkTea CMS</div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 text-white animate-fade-up delay-300">
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            The Serene Infusion
          </h1>
          <p className="text-lg opacity-80 max-w-md leading-relaxed" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Steeped in Elegance. Quản lý hệ thống trà sữa của bạn một cách thông minh và hiệu quả.
          </p>
          <div className="flex gap-6 mt-8">
            {[{ v: '5', l: 'Chi nhánh' }, { v: '1.2K', l: 'Đơn/ngày' }, { v: '98%', l: 'Hài lòng' }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#F5C088', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.v}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-[420px] animate-fade-up delay-100">

          {/* Logo (mobile) */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F58220' }}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="10" fill="white" />
                <circle cx="16" cy="16" r="5" fill="#F58220" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#5D2E0F', fontWeight: 700, fontSize: '16px' }}>SMYOU</div>
              <div style={{ color: '#A0845C', fontSize: '11px' }}>MilkTea CMS</div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-8" style={{ boxShadow: '0 20px 48px rgba(0,0,0,0.08)' }}>
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#1A1A1A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Chào mừng trở lại 👋
            </h2>
            <p className="mb-7" style={{ fontSize: '14px', color: '#A0845C', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Đăng nhập để quản lý hệ thống SMYOU MilkTea.
            </p>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4"
                style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
                <AlertCircle size={16} style={{ color: '#991B1B', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#991B1B', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4"
                style={{ background: '#FFEDD5', border: '1px solid #FED7AA' }}>
                <CheckCircle2 size={16} style={{ color: '#9A3412', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#9A3412', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Đăng nhập thành công! Đang chuyển hướng...
                </span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: '#5D2E0F', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Email đăng nhập
                </label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#A0845C' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    placeholder="admin@smyou.vn"
                    className="input-field"
                    style={{ paddingLeft: '44px' }}
                    autoComplete="email"
                    disabled={isLoading || success}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold" style={{ color: '#5D2E0F', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Mật khẩu
                  </label>
                  <a href="#" className="text-xs font-medium hover:underline" style={{ color: '#F58220' }}>
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#A0845C' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="Nhập mật khẩu"
                    className="input-field"
                    style={{ paddingLeft: '44px', paddingRight: '44px' }}
                    autoComplete="current-password"
                    disabled={isLoading || success}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1">
                    {showPassword
                      ? <EyeOff size={16} style={{ color: '#A0845C' }} />
                      : <Eye size={16} style={{ color: '#A0845C' }} />
                    }
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={isLoading || success}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 mt-2"
                style={{
                  background: success ? '#FFEDD5' : 'linear-gradient(135deg, #F58220 0%, #E07010 100%)',
                  color: success ? '#9A3412' : 'white',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  opacity: (isLoading || success) ? 0.85 : 1,
                  boxShadow: '0 4px 16px rgba(245,130,32,0.3)',
                }}>
                {isLoading ? <><Loader2 size={16} className="animate-spin" /> Đang xác thực...</>
                  : success ? <><CheckCircle2 size={16} /> Thành công!</>
                  : 'Đăng nhập'}
              </button>
            </form>
          </div>

          {/* Demo accounts */}
          <div className="mt-5 rounded-2xl p-5" style={{ background: '#FFF3E6', border: '1px solid #F0DCC8' }}>
            <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: '#A0845C', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              🔑 Tài khoản demo — click để điền tự động
            </p>
            <div className="space-y-2">
              {mockAdminUsers.map(u => (
                <button key={u.id} onClick={() => fillDemo(u)} disabled={isLoading || success}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white text-left"
                  style={{ border: '1px solid #F0DCC8' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{ background: '#F5C088', color: '#5D2E0F' }}>
                    {u.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A0845C' }}>{u.role} · {u.email}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase"
                    style={{ background: '#F58220', color: 'white', flexShrink: 0, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Dùng
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
