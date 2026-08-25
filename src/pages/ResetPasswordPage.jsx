import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    <div className="w-full bg-[#163E49] text-[#F5F1EA] min-h-[80vh] flex items-center py-12 sm:py-16">
      <SEO
        title="Reset Password — ÉLAVA Perfumes"
        description="Set a new password for your ÉLAVA customer account."
        canonicalPath="/reset-password"
        ogType="website"
      />

      <MainContainer className="flex justify-center items-center">
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F1EA]">
              SET NEW PASSWORD
            </h1>
            <p className="font-sans text-xs text-[#B8C4C2] uppercase tracking-wider">
              Enter your new credentials below.
            </p>
          </div>

          {error && (
            <div className="bg-[#7A2929]/20 border border-[#7A2929]/50 text-[#F5F1EA] text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-[#102F38] border border-green-500/30 text-green-300 text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="reset-new-password" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
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
                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="reset-confirm-password" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
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
                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-neutral-900 active:bg-neutral-800 text-[#F5F1EA] py-3.5 px-6 rounded-xl font-bold uppercase text-xs tracking-[0.16em] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
            </button>
          </form>
        </div>
      </MainContainer>
    </div>
  );
}
