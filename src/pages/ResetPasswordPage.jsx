import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all input fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');

      const { error: updateErr } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateErr) {
        setError(updateErr.message || 'Unable to update password. Please try again.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Your password has been successfully updated.');
      setLoading(false);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (err) {
      setError('Unable to reset password. Please request a new link.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-[80vh] flex items-center py-12 sm:py-16">
      <SEO
        title="Reset Password — ÉLAVA Perfumes"
        description="Set a new password for your ÉLAVA customer account."
        canonicalPath="/reset-password"
        ogType="website"
      />

      <MainContainer className="flex justify-center items-center">
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-bodoni text-2xl sm:text-3xl font-medium tracking-[-0.015em] text-[#F5F2EE]">
              SET NEW PASSWORD
            </h1>
            <p className="font-manrope text-[14px] text-[#B8B3AF]">
              Enter your new credentials below.
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

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="reset-new-password" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                New Password
              </label>
              <input
                id="reset-new-password"
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a new password"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reset-confirm-password" className="block font-manrope text-[14px] font-medium text-[#F5F2EE]">
                Confirm New Password
              </label>
              <input
                id="reset-confirm-password"
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full bg-[#080808] border border-white/15 text-[#F5F2EE] rounded-xl px-4 py-3 font-manrope text-[15px] focus:outline-none focus:border-[#B4171E] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] py-3.5 px-6 rounded-xl font-manrope font-semibold text-[14px] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 mt-2 btn-interactive"
            >
              {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
            </button>
          </form>
        </div>
      </MainContainer>
    </div>
  );
}
