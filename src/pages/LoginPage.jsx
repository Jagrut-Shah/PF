import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Destination redirect path state (default to '/account')
  const from = location.state?.from?.pathname || '/account';

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase configuration is missing. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    }
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { error: loginErr } = await login(email, password);
      if (loginErr) {
        // Map common Supabase technical error messages to customer-friendly user states
        if (loginErr.status === 400) {
          setError('Invalid login credentials. Please check your email and password.');
        } else if (loginErr.message?.toLowerCase().includes('email not confirmed')) {
          setError('Please confirm your email address before signing in.');
        } else {
          setError(loginErr.message || 'Unable to sign in. Please try again.');
        }
        setLoading(false);
        return;
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError('Authentication failed. Please verify your connection and try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const { error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (oauthErr) throw oauthErr;
    } catch (err) {
      setError('Google authentication failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#163E49] text-[#F5F1EA] min-h-[85vh] flex items-center py-12 sm:py-16">
      <SEO
        title="Sign In — ÉLAVA Perfumes"
        description="Sign in to your premium ÉLAVA customer account."
        canonicalPath="/login"
        ogType="website"
      />

      <MainContainer className="flex justify-center items-center">
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F1EA]">
              WELCOME BACK
            </h1>
            <p className="font-sans text-xs text-[#B8C4C2] uppercase tracking-wider">
              Sign in to your ÉLAVA account.
            </p>
          </div>

          {error && (
            <div className="bg-[#7A2929]/20 border border-[#7A2929]/50 text-[#F5F1EA] text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
              {error}
            </div>
          )}

          {/* Social Sign-In */}
          <div>
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#102F38] hover:bg-[#0c242c] active:bg-[#07191f] text-[#F5F1EA] border border-[rgba(243,235,221,0.15)] rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
            >
              {/* Google SVG Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-[rgba(243,235,221,0.15)] flex-1" />
            <span className="text-[10px] text-[#B8C4C2] font-bold tracking-widest uppercase">OR</span>
            <div className="h-px bg-[rgba(243,235,221,0.15)] flex-1" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="login-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2] hover:text-[#F5F1EA] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-neutral-900 active:bg-neutral-800 text-[#F5F1EA] py-3.5 px-6 rounded-xl font-bold uppercase text-xs tracking-[0.16em] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[rgba(243,235,221,0.10)]">
            <span className="text-xs text-[#B8C4C2]">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-xs font-bold uppercase tracking-wider text-[#F5F1EA] hover:underline"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
