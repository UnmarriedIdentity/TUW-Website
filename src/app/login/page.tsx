'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem('tuw_website_v2_auth', JSON.stringify({ email, loggedIn: true }));
      } catch {
        // ignore
      }
      router.push('/account');
    }, 600);
  };

  const handleSocialSignIn = (provider: string) => {
    setDemoNotice(`Demo authentication sandbox: ${provider} sign-in is simulated.`);
    setTimeout(() => {
      try {
        localStorage.setItem(
          'tuw_website_v2_auth',
          JSON.stringify({ email: `user@${provider.toLowerCase()}.demo`, loggedIn: true })
        );
      } catch {
        // ignore
      }
      router.push('/account');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-store-canvas text-store-text-primary flex items-center justify-center p-0 lg:p-4">
      {/* Full-Screen Desktop & Mobile Container (1440x1024 Figma Frame) */}
      <main className="w-full auth-desktop-frame flex flex-col lg:flex-row gap-4 p-4 items-stretch justify-center">
        {/* Left Column: Editorial Lifestyle Image (Desktop) */}
        <div className="relative hidden lg:block flex-1 rounded-3xl overflow-hidden bg-stone-100 shadow-xs">
          <Image
            src="/images/login-hero.png"
            alt="The Unplugged Wear lifestyle collection"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Form Container (712px in Figma) */}
        <div className="auth-form-card bg-store-surface border border-store-border shadow-xs p-6 sm:p-10 lg:p-16 xl:p-20 flex flex-col justify-center">
          <div className="w-full space-y-6">
            {/* Header: Detail */}
            <div className="space-y-2">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-store-text-primary leading-tight">
                Welcome to The Unplugged Wear
              </h1>
              <p className="font-sans text-xs sm:text-sm text-store-text-secondary leading-relaxed">
                Login to access your account, save favorite pieces, and continue shopping with your personal style preferences.
              </p>
            </div>

            {/* Error or Demo Notices */}
            {error && (
              <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {demoNotice && (
              <div role="status" className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800 flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-sky-600" />
                <span>{demoNotice}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="block text-xs font-medium uppercase tracking-wider text-store-text-primary">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="login-password" className="block text-xs font-medium uppercase tracking-wider text-store-text-primary">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-11 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 text-store-text-secondary hover:text-store-text-primary transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Account Registration & Remember/Forgot Row */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="text-store-text-secondary">
                  <span>New to The Unplugged Wear? </span>
                  <Link href="/register" className="font-semibold text-primary-dark hover:underline">
                    Create an Account
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-store-text-secondary">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-store-border text-primary-dark focus:ring-primary-dark h-4 w-4"
                    />
                    <span>Remember me</span>
                  </label>

                  <Link href="/forgot-password" className="text-store-text-secondary hover:text-primary-dark hover:underline transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-primary-dark text-white font-medium text-sm tracking-wide hover:bg-black transition-colors flex items-center justify-center disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? 'Signing in...' : 'Login to your account'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-store-border" />
              <span className="absolute px-3 bg-store-surface text-xs text-store-text-secondary uppercase">
                Or
              </span>
            </div>

            {/* Social Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSocialSignIn('Google')}
                className="w-full h-11 px-4 rounded-xl border border-store-border bg-store-surface hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-store-text-primary cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    className="svg-google-blue"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    className="svg-google-green"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    className="svg-google-yellow"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    className="svg-google-red"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn('Apple')}
                className="w-full h-11 px-4 rounded-xl border border-store-border bg-store-surface hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-store-text-primary cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.95 2.77 1.01.08 2.05-.53 2.67-1.28" />
                </svg>
                <span>Sign in with Apple</span>
              </button>

              {/* Mobile Facebook Button from Figma Mobile Frame */}
              <button
                type="button"
                onClick={() => handleSocialSignIn('Facebook')}
                className="w-full h-11 px-4 rounded-xl border border-store-border bg-store-surface hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-store-text-primary lg:hidden cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 fill-blue-600" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Sign in with Facebook</span>
              </button>
            </div>

            {/* Mobile Hero Image at bottom (Figma Login Page/Mobile) */}
            <div className="relative block lg:hidden w-full h-80 sm:h-96 rounded-2xl overflow-hidden mt-6 bg-stone-100 shadow-xs">
              <Image
                src="/images/login-hero.png"
                alt="The Unplugged Wear lifestyle collection"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
