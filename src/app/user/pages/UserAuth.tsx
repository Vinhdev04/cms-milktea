import { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useAuth } from '../../context/AuthContext';

export function UserAuth() {
  const { login, signup, isAuthenticated } = useUserAuth();
  const { login: adminLogin, isAuthenticated: isSystemAuthenticated, user: systemUser } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  if (isSystemAuthenticated && systemUser?.appRole === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setError('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        if (!formData.email.trim() || !formData.password.trim()) {
          setError('Vui lòng nhập đầy đủ email và mật khẩu.');
          setIsLoading(false);
          return;
        }

        // Check for Admin login redirect
        if (formData.email.toLowerCase() === 'admin@chips.vn') {
          const adminResult = await adminLogin(formData.email, formData.password);
          if (adminResult.success) {
            navigate('/admin', { replace: true });
            return;
          } else {
            setError(adminResult.error || 'Đăng nhập Admin thất bại.');
            setIsLoading(false);
            return;
          }
        }

        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate('/app', { replace: true });
        } else {
          setError(result.error || 'Đăng nhập thất bại.');
        }
      } else {
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim()) {
          setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
          setIsLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Mật khẩu xác nhận chưa khớp.');
          setIsLoading(false);
          return;
        }

        const result = await signup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          password: formData.password,
        });

        if (result.success) {
          navigate('/app', { replace: true });
        } else {
          setError(result.error || 'Đăng ký thất bại.');
        }
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (email: string, password: string) => {
    setFormData((prev) => ({ ...prev, email, password }));
    setError('');
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[#FFFAF5] p-4 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,130,32,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(245,130,32,0.08),transparent_30%),radial-gradient(circle_at_center,rgba(245,130,32,0.05),transparent_40%)]" />

      <div className="relative flex h-full max-h-[850px] w-full max-w-6xl overflow-hidden rounded-[36px] border border-[#F0DCC8]/50 bg-white shadow-[0_34px_120px_rgba(93,46,15,0.12)]">
        <div className="hidden flex-1 bg-[linear-gradient(135deg,#F58220_0%,#E07010_100%)] p-10 text-white lg:block">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            Chips Member App
          </div>
          <h1 className="mt-6 font-heading text-5xl font-extrabold leading-tight">
            Đặt món tinh gọn, giao diện rõ ràng và hiện đại hơn.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/85">
            Truy cập nhanh thực đơn, theo dõi điểm thành viên và lưu lại lịch sử đặt món trong cùng một trải nghiệm nhất quán.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'Tối ưu thao tác cho web app và màn hình nhỏ',
              'Theo dõi điểm thưởng và khuyến mãi cá nhân hóa',
              'Đặt lại món yêu thích chỉ trong vài bước',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col overflow-hidden lg:w-[48%]">
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10">
            <div className="mx-auto max-w-md">
              <Link to="/app" className="mb-4 inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden bg-white shadow-[0_4px_12px_rgba(245,130,32,0.2)]">
                  <img src="/chips-logo.png" alt="Chips Logo" className="h-8 w-8 object-contain" />
                </div>
                <div className="font-heading text-lg font-extrabold text-slate-900 leading-none">Chips</div>
              </Link>

              <div className="mb-5">
                <h2 className="font-heading text-2xl font-extrabold text-slate-900">
                  {isLogin ? 'Chào mừng quay lại' : 'Tạo tài khoản mới'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isLogin ? 'Đăng nhập để đặt món & nhận ưu đãi.' : 'Đăng ký nhanh để tích điểm thành viên.'}
                </p>
              </div>

              <div className="mb-5 grid grid-cols-2 rounded-2xl bg-[#FFF3E6] p-1">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    resetForm();
                  }}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                    isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-[#A0845C]'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    resetForm();
                  }}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                    !isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-[#A0845C]'
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {!isLogin && (
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field
                      label="Họ và tên"
                      icon={<User className="h-4.5 w-4.5" />}
                      name="name"
                      value={formData.name}
                      placeholder="Họ và tên"
                      onChange={handleInputChange}
                    />
                    <Field
                      label="Số điện thoại"
                      icon={<Phone className="h-4.5 w-4.5" />}
                      name="phone"
                      value={formData.phone}
                      placeholder="Số điện thoại"
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <Field
                  label="Email"
                  icon={<Mail className="h-4.5 w-4.5" />}
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="Nhập email"
                  onChange={handleInputChange}
                />

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">Mật khẩu</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="h-4.5 w-4.5" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu"
                      className="h-[48px] w-full rounded-2xl border border-[#F0DCC8] bg-[#FFFAF5] pl-11 pr-11 text-sm font-medium text-slate-800 outline-none transition-all focus:border-[#F58220] focus:ring-4 focus:ring-orange-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#F58220]"
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <Field
                    label="Xác nhận mật khẩu"
                    icon={<Lock className="h-4.5 w-4.5" />}
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                    onChange={handleInputChange}
                  />
                )}

                {error && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(245,130,32,0.2)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {isLogin ? 'Đang đăng nhập...' : 'Đang đăng ký...'}
                    </>
                  ) : (
                    <>{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</>
                  )}
                </button>
              </form>



              <div className="mt-5 text-center text-sm text-slate-500 pb-2">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                <button
                  onClick={() => {
                    setIsLogin((previous) => !previous);
                    resetForm();
                  }}
                  className="font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  value: string;
}

function Field({ icon, label, name, onChange, placeholder, type = 'text', value }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-[48px] w-full rounded-2xl border border-[#F0DCC8] bg-[#FFFAF5] pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-[#F58220] focus:ring-4 focus:ring-orange-50/50"
        />
      </div>
    </div>
  );
}
