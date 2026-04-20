import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function Auth() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

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
        .animate-ken-burns {
          animation: kenBurns 20s ease-out forwards;
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Left side - Background Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#1A2E24]">
        <div className="absolute inset-0 bg-cover bg-[center_35%] animate-ken-burns opacity-90"
        style={{ backgroundImage: "url('https://file.hstatic.net/200000079049/file/matcha-latte-bia_4309c7c19ae14551a06ac3698d7cd5e2.jpeg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12]/90 via-[#0A1A12]/30 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white animate-fade-up delay-300">
          <h1 className="text-4xl font-bold mb-3">The Serene Infusion</h1>
          <p className="text-lg opacity-90 max-w-md leading-relaxed" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Steeped in Elegance. Discover the pure, restorative power of ceremonial grade botanicals.
          </p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-[420px] bg-white rounded-[32px] p-8 sm:p-10 animate-fade-up delay-100"
          style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.06)' }}>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-8 border-b" style={{ borderColor: '#F0F0F0' }}>
            <button
              onClick={() => setActiveTab('signin')}
              className="pb-3 text-sm font-semibold transition-all relative"
              style={{ color: activeTab === 'signin' ? '#2D6A4F' : '#9CA3AF' }}
            >
              Sign In
              {activeTab === 'signin' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ background: '#2D6A4F' }}></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className="pb-3 text-sm font-semibold transition-all relative"
              style={{ color: activeTab === 'signup' ? '#2D6A4F' : '#9CA3AF' }}
            >
              Create Account
              {activeTab === 'signup' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ background: '#2D6A4F' }}></div>
              )}
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
            {activeTab === 'signin' ? 'Welcome back' : 'Create an account'}
          </h2>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#6B7280' }}>
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4" style={{ color: '#6B7280' }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none transition-all"
                  style={{ background: '#F3F4F6', color: '#1A1A1A', fontSize: '14px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium" style={{ color: '#6B7280' }}>
                  Password
                </label>
                {activeTab === 'signin' && (
                  <a href="#" className="text-xs font-medium transition-colors hover:underline" style={{ color: '#2D6A4F' }}>
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4" style={{ color: '#6B7280' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl outline-none transition-all"
                  style={{ background: '#F3F4F6', color: '#1A1A1A', fontSize: '14px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4"
                >
                  {showPassword ? (
                    <EyeOff size={18} style={{ color: '#6B7280' }} />
                  ) : (
                    <Eye size={18} style={{ color: '#6B7280' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90 mt-2"
              style={{ background: '#A8D5BA', color: '#1B4332', fontSize: '15px' }}
            >
              {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: '#F3F4F6' }}></div>
            <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Or continue with</span>
            <div className="flex-1 h-px" style={{ background: '#F3F4F6' }}></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-colors hover:bg-gray-200"
              style={{ background: '#F3F4F6' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#1A1A1A" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#1A1A1A" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#1A1A1A" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#1A1A1A" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-colors hover:bg-gray-200"
              style={{ background: '#F3F4F6' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.93 3.78 2.04-3.18 1.9-2.65 6.33.6 7.62-.75 1.49-1.54 2.87-3.03 3.35zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#1A1A1A' }}>Apple</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
