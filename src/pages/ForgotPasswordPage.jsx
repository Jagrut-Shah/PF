import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../utils/supabase';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase configuration is missing. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    }
  }, []);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');

      const { error: resetErr } = await resetPassword(email);

      if (resetErr) {
        setError(resetErr.message || 'Unable to send password reset email. Please try again.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Password reset instructions have been sent to your email.');
      setEmail('');
      setLoading(false);
    } catch (err) {
      setError('Request failed. Please verify your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-[80vh] flex items-center py-12 sm:py-16">
      <SEO
        title="Forgot Password — ÉLAVA Perfumes"
        description="Request a password reset link for your ÉLAVA customer account."
        canonicalPath="/forgot-password"
        ogType="website"
      />

      <MainContainer className="flex justify-center items-center">
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-bodoni text-2xl sm:text-3xl font-medium tracking-[-0.015em] text-[#F5F2EE]">
              FORGOT PASSWORD
            </h1>
            <p className="font-manrope text-[14px] text-[#B8B3AF]">
              Enter your email to reset your password.
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

          <form onSubmit={handleResetRequest} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="reset-email" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] py-3.5 px-6 rounded-xl font-manrope font-semibold text-[14px] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 mt-2 btn-interactive"
            >
              {loading ? 'SENDING LINK...' : 'SEND RESET LINK'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/10">
            <span className="font-manrope text-[14px] text-[#B8B3AF]">Back to </span>
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
