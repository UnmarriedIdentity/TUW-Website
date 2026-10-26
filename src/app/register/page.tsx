'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import TuwEmblem from '@/components/layout/TuwEmblem';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem(
          'tuw_website_v2_auth',
          JSON.stringify({ username, email, loggedIn: true })
        );
      } catch {
        // ignore
      }
      setSuccessNotice('Account created successfully. Redirecting to your sanctuary...');
      setTimeout(() => {
        router.push('/account');
      }, 700);
    }, 600);
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-store-surface text-store-text-primary flex flex-col lg:flex-row overflow-hidden">
      {/* Left Column: Full-Bleed Editorial Lifestyle Hero (Desktop) */}
      <div className="relative hidden lg:flex flex-col justify-between w-1/2 h-full overflow-hidden bg-stone-100 select-none">
        <Image
          src="/images/register-hero.png"
          alt="The Unplugged Wear architectural collection"
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
            Join The Unplugged Wear Atelier
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
        <div className="w-full max-w-md mx-auto my-auto py-3 space-y-3 sm:space-y-3.5">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl uppercase tracking-wider text-store-text-primary leading-tight">
              Join The Unplugged Wear and Elevate Your Style
            </h1>
            <p className="font-sans text-xs sm:text-sm text-store-text-secondary leading-snug">
              Create an account to save your favorite pieces, revisit looks you love, and shop with a smoother, more personalized experience.
            </p>
          </div>

          {/* Error or Success Notices */}
          {error && (
            <div role="alert" className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successNotice && (
            <div role="status" className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-2 sm:space-y-2.5">
            {/* Username */}
            <div className="space-y-1">
              <label htmlFor="register-username" className="block text-2xs font-medium uppercase tracking-wider text-store-text-primary">
                Username
              </label>
              <input
                id="register-username"
                type="text"
                autoComplete="username"
                required
                placeholder="Input username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 sm:h-11 px-4 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="register-email" className="block text-2xs font-medium uppercase tracking-wider text-store-text-primary">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                required
                placeholder="Input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 sm:h-11 px-4 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="register-password" className="block text-2xs font-medium uppercase tracking-wider text-store-text-primary">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 sm:h-11 pl-4 pr-11 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
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

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="register-confirm-password" className="block text-2xs font-medium uppercase tracking-wider text-store-text-primary">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-10 sm:h-11 pl-4 pr-11 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute right-3.5 text-store-text-secondary hover:text-store-text-primary transition-colors focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms Disclaimer */}
            <p className="text-2xs text-store-text-secondary leading-relaxed pt-0.5">
              By creating an account, you agree to our{' '}
              <Link href="/policies/terms" className="underline font-medium text-primary-dark hover:text-black">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/policies/privacy" className="underline font-medium text-primary-dark hover:text-black">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-primary-dark text-white font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-black transition-colors flex items-center justify-center disabled:opacity-60 cursor-pointer shadow-xs"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>

            {/* Already have an account row */}
            <div className="text-center text-xs text-store-text-secondary pt-2">
              <span>Already have an account? </span>
              <Link href="/login" className="font-semibold text-primary-dark hover:underline">
                Log in
              </Link>
            </div>
          </form>
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
