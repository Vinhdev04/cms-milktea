import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';

export function UserAuth() {
  const { login, signup, isAuthenticated } = useUserAuth();
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
    navigate('/app', { replace: true });
    return null;
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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fff9f5_0%,#fff3f8_52%,#f7f3ff_100%)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_center,rgba(251,146,60,0.1),transparent_40%)]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/70 bg-white/85 shadow-[0_34px_120px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden bg-[linear-gradient(135deg,#7c3aed_0%,#db2777_55%,#fb923c_100%)] p-10 text-white lg:block">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            SMYOU Member App
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

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-md">
            <Link to="/app" className="mb-8 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-pink-500 text-sm font-extrabold text-white">
                SM
              </div>
              <div>
                <div className="font-heading text-lg font-extrabold text-slate-900">SMYOU</div>
                <div className="text-sm text-slate-500">Member access</div>
              </div>
            </Link>

            <div className="mb-6">
              <h2 className="font-heading text-3xl font-extrabold text-slate-900">
                {isLogin ? 'Chào mừng quay lại' : 'Tạo tài khoản mới'}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                {isLogin
                  ? 'Đăng nhập để tiếp tục đặt món, xem ưu đãi và theo dõi đơn hàng.'
                  : 'Đăng ký nhanh để lưu điểm thưởng và nhận khuyến mãi cá nhân hóa.'}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-2xl bg-[#fff6f2] p-1.5">
              <button
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  !isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <Field
                    label="Họ và tên"
                    icon={<User className="h-5 w-5" />}
                    name="name"
                    value={formData.name}
                    placeholder="Nhập họ và tên"
                    onChange={handleInputChange}
                  />
                  <Field
                    label="Số điện thoại"
                    icon={<Phone className="h-5 w-5" />}
                    name="phone"
                    value={formData.phone}
                    placeholder="Nhập số điện thoại"
                    onChange={handleInputChange}
                  />
                </>
              )}

              <Field
                label="Email"
                icon={<Mail className="h-5 w-5" />}
                name="email"
                type="email"
                value={formData.email}
                placeholder="Nhập email"
                onChange={handleInputChange}
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-5 w-5" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    className="h-[52px] w-full rounded-2xl border border-[#efd9ca] bg-[#fffaf7] pl-12 pr-12 text-sm font-medium text-slate-800 outline-none transition-all focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-pink-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <Field
                  label="Xác nhận mật khẩu"
                  icon={<Lock className="h-5 w-5" />}
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  placeholder="Nhập lại mật khẩu"
                  onChange={handleInputChange}
                />
              )}

              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-500 px-5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(217,70,239,0.24)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
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

            <div className="mt-6 text-center text-sm text-slate-500">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
              <button
                onClick={() => {
                  setIsLogin((previous) => !previous);
                  resetForm();
                }}
                className="font-semibold text-pink-600 transition-colors hover:text-pink-700"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
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
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-[52px] w-full rounded-2xl border border-[#efd9ca] bg-[#fffaf7] pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
        />
      </div>
    </div>
  );
}
