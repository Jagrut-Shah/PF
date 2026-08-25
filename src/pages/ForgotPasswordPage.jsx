import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    <div className="w-full bg-[#163E49] text-[#F5F1EA] min-h-[80vh] flex items-center py-12 sm:py-16">
      <SEO
        title="Forgot Password — ÉLAVA Perfumes"
        description="Request a password reset link for your ÉLAVA customer account."
        canonicalPath="/forgot-password"
        ogType="website"
      />

      <MainContainer className="flex justify-center items-center">
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F1EA]">
              FORGOT PASSWORD
            </h1>
            <p className="font-sans text-xs text-[#B8C4C2] uppercase tracking-wider">
              Enter your email to reset your password.
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

          <form onSubmit={handleResetRequest} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="reset-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
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
                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-neutral-900 active:bg-neutral-800 text-[#F5F1EA] py-3.5 px-6 rounded-xl font-bold uppercase text-xs tracking-[0.16em] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'SENDING LINK...' : 'SEND RESET LINK'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[rgba(243,235,221,0.10)]">
            <span className="text-xs text-[#B8C4C2]">Back to </span>
            <Link
              to="/login"
              className="text-xs font-bold uppercase tracking-wider text-[#F5F1EA] hover:underline"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
