'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen w-full bg-store-canvas text-store-text-primary flex items-center justify-center p-0 lg:p-4">
      {/* Full-Screen Desktop & Mobile Container (1440x1024 Figma Frame) */}
      <main className="w-full auth-desktop-frame flex flex-col lg:flex-row gap-4 p-4 items-stretch justify-center">
        {/* Left Column: Parisian Cafe Lifestyle Image (Desktop) */}
        <div className="relative hidden lg:block flex-1 rounded-3xl overflow-hidden bg-stone-100 shadow-xs">
          <Image
            src="/images/register-hero.png"
            alt="The Unplugged Wear architectural collection"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Register Form Container (712px in Figma) */}
        <div className="auth-form-card bg-store-surface border border-store-border shadow-xs p-6 sm:p-10 lg:p-16 xl:p-20 flex flex-col justify-center">
          <div className="w-full space-y-6">
            {/* Header: Detail */}
            <div className="space-y-2">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-store-text-primary leading-tight">
                Join The Unplugged Wear and Elevate Your Style
              </h1>
              <p className="font-sans text-xs sm:text-sm text-store-text-secondary leading-relaxed">
                Create an account to save your favorite pieces, revisit looks you love, and shop with a smoother, more personalized experience.
              </p>
            </div>

            {/* Error or Success Notices */}
            {error && (
              <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successNotice && (
              <div role="status" className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <label htmlFor="register-username" className="block text-xs font-medium uppercase tracking-wider text-store-text-primary">
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
                  className="w-full h-11 px-3.5 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="register-email" className="block text-xs font-medium uppercase tracking-wider text-store-text-primary">
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
                  className="w-full h-11 px-3.5 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="register-password" className="block text-xs font-medium uppercase tracking-wider text-store-text-primary">
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

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="register-confirm-password" className="block text-xs font-medium uppercase tracking-wider text-store-text-primary">
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
                    className="w-full h-11 pl-3.5 pr-11 rounded-xl border border-store-border bg-store-surface text-sm text-store-text-primary placeholder:text-store-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    className="absolute right-3.5 text-store-text-secondary hover:text-store-text-primary transition-colors focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms Disclaimer */}
              <p className="text-xs text-store-text-secondary leading-relaxed pt-1">
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
                  className="w-full h-12 rounded-xl bg-primary-dark text-white font-medium text-sm tracking-wide hover:bg-black transition-colors flex items-center justify-center disabled:opacity-60 cursor-pointer"
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

            {/* Mobile Hero Image at bottom (Figma Register Page/Mobile) */}
            <div className="relative block lg:hidden w-full h-80 sm:h-96 rounded-2xl overflow-hidden mt-6 bg-stone-100 shadow-xs">
              <Image
                src="/images/register-hero.png"
                alt="The Unplugged Wear architectural collection"
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
