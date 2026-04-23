import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { getDefaultRouteForRole, mockAccounts, useAuth } from "../context/AuthContext";
import { useUserAuth } from "../context/UserAuthContext";

export function Auth() {
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const { isAuthenticated: isUserAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate(getDefaultRouteForRole(user?.appRole), { replace: true });
      } else if (isUserAuthenticated) {
        navigate("/app", { replace: true });
      }
    }
  }, [isAuthenticated, isUserAuthenticated, isLoading, navigate, user?.appRole]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Đăng nhập thất bại.");
      return;
    }

    setSuccess(true);
    window.setTimeout(() => {
      navigate(getDefaultRouteForRole(result.user?.appRole), { replace: true });
    }, 500);
  };

  const fillDemo = (account: (typeof mockAccounts)[number]) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#FFFAF5] text-sm font-semibold text-[#F58220]">Đang tải phiên đăng nhập...</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-[#FFFAF5]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-ken-burns { animation: kenBurns 18s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .input-field {
          width: 100%;
          padding: 12px 14px 12px 44px;
          border-radius: 16px;
          border: 1.5px solid #F0DCC8;
          background: white;
          font-size: 14px;
          color: #1A1A1A;
          outline: none;
          transition: all 0.2s;
          font-family: 'Be Vietnam Pro', sans-serif;
        }
        .input-field:focus {
          border-color: #F58220;
          box-shadow: 0 0 0 4px rgba(245,130,32,0.12);
        }
        .input-field::placeholder { color: #9CA3AF; }
      `}</style>

      <div className="relative hidden flex-1 overflow-hidden bg-[#5D2E0F] lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-90"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1727726672422-0fff852450f9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5D2E0F]/90 via-[#5D2E0F]/35 to-transparent" />

        <div className="absolute left-8 top-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm overflow-hidden">
            <img src="/chips-logo.png" alt="Chips Logo" className="h-8 w-8 object-contain" />
          </div>
          <div>
            <div className="text-base font-bold text-white">Chips</div>
            <div className="text-[11px] text-[#F5C088]">MilkTea CMS</div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 text-white animate-fade-up delay-300">
          <h1 className="mb-3 text-4xl font-bold">The Serene Infusion</h1>
          <p className="max-w-md text-lg leading-relaxed text-white/80" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Quản lý hệ thống trà sữa gọn gàng hơn, đồng bộ dữ liệu vận hành và trải nghiệm thành viên trên cùng một nền tảng.
          </p>
          <div className="mt-8 flex gap-6">
            {[
              { value: "5", label: "Chi nhánh" },
              { value: "1.2K", label: "Đơn/ngày" },
              { value: "98%", label: "Hài lòng" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-[#F5C088]">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-y-auto p-6 md:p-12 bg-[#FFFAF5]">
        <div className="w-full max-w-[420px] animate-fade-up delay-100">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white overflow-hidden shadow-[0_4px_12px_rgba(245,130,32,0.2)]">
              <img src="/chips-logo.png" alt="Chips Logo" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <div className="text-base font-bold text-[#5D2E0F]">Chips</div>
              <div className="text-[11px] text-[#A0845C]">MilkTea CMS</div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_48px_rgba(93,46,15,0.08)]">
            <h2 className="mb-1 text-2xl font-bold text-[#1A1A1A]">Chào mừng trở lại 👋</h2>
            <p className="mb-7 text-sm text-[#A0845C]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Đăng nhập để quản lý hệ thống Chips MilkTea.
            </p>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#FECACA] bg-[#FEE2E2] px-4 py-3">
                <AlertCircle size={16} className="shrink-0 text-[#991B1B]" />
                <span className="text-[13px] text-[#991B1B]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#F0DCC8] bg-[#FFEDD5] px-4 py-3">
                <CheckCircle2 size={16} className="shrink-0 text-[#9A3412]" />
                <span className="text-[13px] text-[#9A3412]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Đăng nhập thành công! Đang chuyển hướng...
                </span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#5D2E0F]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Email đăng nhập
                </label>
                <div className="relative">
                  <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0845C]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="admin@chips.vn"
                    className="input-field"
                    autoComplete="email"
                    disabled={isSubmitting || success}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#5D2E0F]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Mật khẩu
                  </label>
                  <button type="button" className="text-xs font-medium text-[#F58220] hover:underline">
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0845C]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Nhập mật khẩu"
                    className="input-field pr-11"
                    autoComplete="current-password"
                    disabled={isSubmitting || success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#A0845C]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || success}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: success ? "#FFEDD5" : "linear-gradient(135deg, #F58220 0%, #E07010 100%)",
                  color: success ? "#9A3412" : "white",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  opacity: isSubmitting || success ? 0.85 : 1,
                  boxShadow: success ? "none" : "0 4px 16px rgba(245,130,32,0.3)",
                }}
              >
                {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Đang xác thực...</> : success ? <><CheckCircle2 size={16} /> Thành công!</> : "Đăng nhập"}
              </button>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}
