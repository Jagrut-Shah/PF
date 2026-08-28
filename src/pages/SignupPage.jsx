import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase configuration is missing. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all input fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }

    if (password.length < 6) {
      setError('Password is too weak. It must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');

      // Sign up using custom metadata for user's full name
      const { data, error: signupErr } = await signup(email, password, {
        data: { name },
      });

      if (signupErr) {
        if (signupErr.message?.toLowerCase().includes('user already exists') || signupErr.status === 400) {
          setError('An account with this email address already exists.');
        } else {
          setError(signupErr.message || 'Unable to create account. Please try again.');
        }
        setLoading(false);
        return;
      }

      // If email confirmation is required (Supabase checks auto-confirmation settings)
      if (data?.session) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => navigate('/account'), 1500);
      } else {
        setSuccessMsg('Verification email sent! Please check your inbox to confirm your account.');
        setLoading(false);
      }
    } catch (err) {
      setError('Registration failed. Please verify your connection and try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-[85vh] flex items-center py-12 sm:py-16">
      <SEO
        title="Create Account — ÉLAVA Perfumes"
        description="Register a new ÉLAVA customer account."
        canonicalPath="/signup"
        ogType="website"
      />

      <MainContainer className="flex justify-center items-center">
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-sora text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#F5F2EE]">
              CREATE YOUR ÉLAVA ACCOUNT
            </h1>
            <p className="font-manrope text-[14px] text-[#B8B3AF]">
              Experience personalized fragrance curation.
            </p>
          </div>

          {error && (
            <div className="bg-[#8F1018]/20 border border-[#B4171E]/50 text-[#F5F2EE] font-manrope text-[13px] px-4 py-3 rounded-xl text-center font-medium leading-relaxed">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-[#121212] border border-green-500/30 text-green-300 font-manrope text-[13px] px-4 py-3 rounded-xl text-center font-medium leading-relaxed">
              {successMsg}
            </div>
          )}

          {/* Email Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="signup-name" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup-email" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup-password" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup-confirm-password" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] py-3.5 px-6 rounded-xl font-manrope font-semibold text-[14px] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 mt-2 btn-interactive"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="font-manrope text-[12px] text-[#B8B3AF] font-semibold uppercase">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Social Sign-In */}
          <div>
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-[#080808] hover:bg-[#1a1a1a] active:scale-[0.98] text-[#F5F2EE] border border-white/15 rounded-xl py-3 px-4 font-manrope text-[14px] font-semibold transition-colors disabled:opacity-50 cursor-pointer btn-interactive"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="text-center pt-2 border-t border-white/10">
            <span className="font-manrope text-[14px] text-[#B8B3AF]">Already have an account? </span>
            <Link
              to="/login"
              className="font-manrope text-[14px] font-semibold text-[#F5F2EE] hover:text-[#B4171E] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
