'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import TuwEmblem from '@/components/layout/TuwEmblem';

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
    <div className="w-screen h-screen min-h-screen bg-store-surface text-store-text-primary flex flex-col lg:flex-row overflow-hidden">
      {/* Left Column: Full-Bleed Editorial Lifestyle Hero (Desktop) */}
      <div className="relative hidden lg:flex flex-col justify-between w-1/2 h-full overflow-hidden bg-stone-100 select-none">
        <Image
          src="/images/login-hero.png"
          alt="The Unplugged Wear lifestyle collection"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

        {/* Top Brand Crest Overlay */}
        <div className="relative z-10 p-8 xl:p-12 flex items-center gap-3">
          <TuwEmblem className="h-8 w-auto text-white drop-shadow-md" />
          <span className="font-heading uppercase tracking-luxury text-sm font-semibold text-white drop-shadow-sm">
            The Unplugged Wear
          </span>
        </div>

        {/* Bottom Slow-Living Atelier Editorial Caption */}
        <div className="relative z-10 p-8 xl:p-12 space-y-1">
          <p className="font-heading uppercase tracking-wider text-xs text-white/90 drop-shadow-sm">
            Slow Living Atelier
          </p>
          <p className="font-sans text-xs text-white/80 drop-shadow-sm leading-relaxed max-w-md">
            Heavyweight 500 GSM French terry and combed jersey. Intentional permanence, printed on-demand with zero deadstock.
          </p>
        </div>
      </div>

      {/* Right Column: Full-Height Form Container with 80px desktop padding matching Figma */}
      <div className="w-full lg:w-1/2 h-full bg-store-surface flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-8 lg:py-12 overflow-y-auto">
        {/* Top Navigation & Brand Chrome */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 lg:invisible">
            <TuwEmblem className="h-7 w-auto text-store-text-primary" />
            <span className="font-heading uppercase tracking-luxury text-xs font-semibold text-store-text-primary">
              The Unplugged Wear
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-store-text-secondary hover:text-store-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Return to store</span>
          </Link>
        </div>

        {/* Centered Main Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-1 space-y-3 sm:space-y-3.5">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl uppercase tracking-wider text-store-text-primary leading-tight">
              Welcome to The Unplugged Wear
            </h1>
            <p className="font-sans text-xs sm:text-sm text-store-text-secondary leading-snug">
              Login to access your account, save favorite pieces, and continue shopping with your personal style preferences.
            </p>
          </div>

          {/* Error or Demo Notices */}
          {error && (
            <div role="alert" className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {demoNotice && (
            <div role="status" className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800 flex items-center gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-sky-600" />
              <span>{demoNotice}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-3.5">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="login-email" className="block text-2xs font-medium uppercase tracking-wider text-store-text-primary">
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
                className="w-full h-11 px-4 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="login-password" className="block text-2xs font-medium uppercase tracking-wider text-store-text-primary">
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
                  className="w-full h-11 pl-4 pr-11 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 text-store-text-secondary hover:text-store-text-primary transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Account Registration & Remember/Forgot Row */}
            <div className="space-y-1.5 pt-0.5 text-xs">
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
                    className="rounded border-store-border text-primary-dark focus:ring-primary-dark h-3.5 w-3.5"
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
                className="w-full h-12 rounded-xl bg-primary-dark text-white font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-black transition-colors flex items-center justify-center disabled:opacity-60 cursor-pointer shadow-xs"
              >
                {isLoading ? 'Signing in...' : 'Log in to your account'}
              </button>
            </div>
          </form>

          {/* Divider with 24px vertical spacing matching Figma Node 233:11587 */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-store-border" />
            <span className="absolute px-4 bg-store-surface text-2xs text-store-text-secondary uppercase tracking-widest font-medium">
              Or
            </span>
          </div>

          {/* Social Buttons with exact 24px spacing below to container boundary */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialSignIn('Google')}
              className="w-full h-11 px-4 rounded-xl border border-store-border bg-store-surface hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-store-text-primary cursor-pointer shadow-2xs"
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
              className="w-full h-11 px-4 rounded-xl border border-store-border bg-store-surface hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-store-text-primary cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.95 2.77 1.01.08 2.05-.53 2.67-1.28" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-2xs text-store-text-secondary border-t border-store-border/40">
          <span>The Unplugged Wear © 2026</span>
          <div className="flex items-center gap-4">
            <Link href="/policies/privacy" className="hover:underline">Privacy</Link>
            <Link href="/policies/terms" className="hover:underline">Terms</Link>
            <Link href="/faq" className="hover:underline">Atelier Help</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
