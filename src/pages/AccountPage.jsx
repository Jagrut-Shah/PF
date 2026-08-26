import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { fetchUserReferralSummary, submitWithdrawalRequest } from '../utils/referral';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import { User, ShoppingBag, Gift, MapPin, Settings as SettingsIcon, LogOut, Loader2, KeyRound, Copy, Share2, Check, Wallet, ArrowUpRight, Clock, X, AlertCircle } from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation tab state based on URL
  const getTabFromLocation = () => {
    if (location.pathname.endsWith('/settings')) return 'settings';
    if (location.pathname.endsWith('/refer') || location.pathname.includes('/refer-and-earn')) return 'refer';
    return 'overview';
  };

  const currentTab = getTabFromLocation();

  // Profile data state
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  // Referral summary state
  const [referralSummary, setReferralSummary] = useState({
    code: '',
    successfulReferrals: 0,
    pendingRewards: 0,
    availableRewards: 0,
    availableToWithdraw: 0,
    referralList: [],
    rewardHistory: [],
    withdrawalList: [],
  });
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);

  // Withdrawal modal states
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('upi'); // 'upi' or 'bank'
  const [upiId, setUpiId] = useState('');
  const [bankHolder, setBankHolder] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawMsg, setWithdrawMsg] = useState('');
  const [withdrawErr, setWithdrawErr] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Messages
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [pwdErrorMsg, setPwdErrorMsg] = useState('');
  const [pwdSuccessMsg, setPwdSuccessMsg] = useState('');

  // Load profile and referral summary data
  const loadAccountData = async () => {
    if (!user) return;
    try {
      setProfileLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setName(data.name || '');
        setPhone(data.phone || '');
        setAvatarUrl(data.avatar_url || '');
      }

      // Fetch real referral & reward summary
      const summary = await fetchUserReferralSummary(user.id);
      setReferralSummary(summary);
      if (summary.availableToWithdraw > 0) {
        setWithdrawAmount(summary.availableToWithdraw.toString());
      }
    } catch (err) {
      console.error('Error fetching account data:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, [user]);

  // Handle Withdrawal Request submission
  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);

    if (!amountNum || amountNum < 100) {
      setWithdrawErr('Minimum withdrawal amount is ₹100.');
      return;
    }
    if (amountNum > referralSummary.availableToWithdraw) {
      setWithdrawErr(`Requested amount exceeds available withdrawable balance (₹${referralSummary.availableToWithdraw}).`);
      return;
    }

    let payoutDetails = {};
    if (payoutMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setWithdrawErr('Please enter a valid UPI ID (e.g., username@upi).');
        return;
      }
      payoutDetails = { upi_id: upiId.trim() };
    } else {
      if (!bankHolder.trim() || !bankAccount.trim() || !bankIfsc.trim()) {
        setWithdrawErr('Please fill in all bank transfer details.');
        return;
      }
      payoutDetails = {
        account_holder: bankHolder.trim(),
        account_number: bankAccount.trim(),
        ifsc_code: bankIfsc.trim().toUpperCase(),
      };
    }

    try {
      setWithdrawLoading(true);
      setWithdrawErr('');
      setWithdrawMsg('');

      const res = await submitWithdrawalRequest({
        amount: amountNum,
        payoutMethod,
        payoutDetails,
      });

      if (!res.success) {
        setWithdrawErr(res.message || 'Unable to process withdrawal request.');
      } else {
        setWithdrawMsg('Your withdrawal request has been submitted and reserved successfully.');
        await loadAccountData();
        setTimeout(() => {
          setIsWithdrawModalOpen(false);
          setWithdrawMsg('');
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting withdrawal:', err);
      setWithdrawErr(err.message || 'Submission failed. Please try again.');
    } finally {
      setWithdrawLoading(false);
    }
  };

  // Handle Copy Code
  const handleCopyCode = async () => {
    if (!referralSummary.code) return;
    try {
      await navigator.clipboard.writeText(referralSummary.code);
      setCopyCodeSuccess(true);
      setTimeout(() => setCopyCodeSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Handle Share / Copy Link
  const getReferralUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pf-indol-alpha.vercel.app';
    return `${origin}/?ref=${referralSummary.code}`;
  };

  const handleCopyLink = async () => {
    const url = getReferralUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopyLinkSuccess(true);
      setTimeout(() => setCopyLinkSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = async () => {
    const url = getReferralUrl();
    const shareData = {
      title: 'ÉLAVA — ₹200 Off Referral',
      text: `Use my referral code ${referralSummary.code} to get ₹200 off your luxury fragrance order at ÉLAVA!`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  // Handle personal information updates
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          phone: phone.trim(),
          avatar_url: avatarUrl.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      setSuccessMsg('Your personal profile has been updated.');
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMsg(err.message || 'Unable to update profile. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setPwdErrorMsg('Please fill in all security fields.');
      return;
    }
    if (password !== confirmPassword) {
      setPwdErrorMsg('Passwords do not match. Please verify your entries.');
      return;
    }
    if (password.length < 6) {
      setPwdErrorMsg('Password is too weak. It must be at least 6 characters long.');
      return;
    }

    try {
      setPwdLoading(true);
      setPwdErrorMsg('');
      setPwdSuccessMsg('');

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setPwdSuccessMsg('Your security password has been updated.');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setPwdErrorMsg(err.message || 'Unable to update password. Please try again.');
    } finally {
      setPwdLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: User, path: '/account' },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, path: '/account#orders', disabled: true },
    { id: 'refer', label: 'Refer & Earn', icon: Gift, path: '/account/refer', disabled: false },
    { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/account#addresses', disabled: true },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/account/settings' }
  ];

  return (
    <div className="w-full bg-[#163E49] text-[#F5F1EA] min-h-screen py-10 sm:py-16">
      <SEO
        title="My Account — ÉLAVA Perfumes"
        description="Manage your ÉLAVA client account profile, orders, and rewards settings."
        canonicalPath="/account"
        ogType="website"
      />

      <MainContainer>
        {/* Profile Loader */}
        {profileLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 text-[#C5A15A] animate-spin" />
            <p className="font-sans text-xs tracking-wider text-[#B8C4C2] uppercase">Loading your ÉLAVA workspace...</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-6xl mx-auto">
            
            {/* Header / Account Card */}
            <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A15A]/[0.02] rounded-full blur-2xl pointer-events-none" />
              
              {/* User Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#102F38] border border-[rgba(243,235,221,0.18)] flex items-center justify-center text-[#C5A15A] font-serif text-3xl font-bold uppercase shrink-0 select-none overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile?.name || user?.email} className="w-full h-full object-cover" />
                ) : (
                  (profile?.name || user?.email || 'E').slice(0, 1)
                )}
              </div>

              {/* User Identity Details */}
              <div className="text-center sm:text-left space-y-1">
                <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#C5A15A]">
                  MY ÉLAVA
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F1EA]">
                  {profile?.name || 'Valued Fragrance Patron'}
                </h1>
                <p className="font-sans text-xs text-[#B8C4C2]">
                  {user?.email}
                </p>
              </div>

              {/* Quick Logout Button */}
              <button
                onClick={handleLogout}
                className="sm:ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-[#102F38] hover:bg-[#0d262d] text-xs font-bold uppercase tracking-wider text-[#B8C4C2] hover:text-white border border-[rgba(243,235,221,0.12)] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Dashboard Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              
              {/* Sidebar Account Navigation */}
              <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible no-scrollbar shadow-md">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (!item.disabled) {
                          navigate(item.path);
                        }
                      }}
                      disabled={item.disabled}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
                        item.disabled
                          ? 'opacity-40 cursor-not-allowed text-[#8FA6A3]'
                          : isActive
                          ? 'bg-[#102F38] text-white border-l-2 border-[#C5A15A]'
                          : 'text-[#B8C4C2] hover:text-white hover:bg-[rgba(243,235,221,0.04)] cursor-pointer'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A15A]' : 'text-[#B8C4C2]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Content Area */}
              <div className="md:col-span-3 space-y-6">
                
                {/* ── TAB 1: OVERVIEW ── */}
                {currentTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Welcome banner */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 shadow-sm">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase text-[#F5F1EA] tracking-wide mb-1">
                        WELCOME BACK, {profile?.name || 'PATRON'}
                      </h2>
                      <p className="font-sans text-xs text-[#B8C4C2]">
                        Welcome to your ÉLAVA workspace. Manage your orders, rewards, and personal details.
                      </p>
                    </div>

                    {/* Stats Blocks */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Orders Stat Card */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                          ORDERS
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-[#F5F1EA]">0</h3>
                        <p className="font-sans text-[11px] text-[#B8C4C2]">Total number of orders</p>
                      </div>

                      {/* Available Rewards Card */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                          REWARDS
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-[#C5A15A]">₹{referralSummary.availableRewards}</h3>
                        <p className="font-sans text-[11px] text-[#B8C4C2]">Current available rewards</p>
                      </div>

                      {/* Pending Rewards Card */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                          PENDING
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-[#B8C4C2]">₹{referralSummary.pendingRewards}</h3>
                        <p className="font-sans text-[11px] text-[#B8C4C2]">Pending rewards</p>
                      </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border-b border-[rgba(243,235,221,0.12)] pb-2.5">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          disabled
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#102F38]/60 border border-[rgba(243,235,221,0.12)] text-xs font-bold uppercase text-[#8FA6A3] cursor-not-allowed opacity-60 text-left"
                        >
                          <ShoppingBag className="w-4 h-4 text-[#8FA6A3]" />
                          <span>View Orders (Soon)</span>
                        </button>
                        <button
                          onClick={() => navigate('/account/refer')}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#102F38] hover:bg-[#0d262d] border border-[rgba(243,235,221,0.12)] text-xs font-bold uppercase text-[#F5F1EA] hover:text-white transition-colors text-left cursor-pointer"
                        >
                          <Gift className="w-4 h-4 text-[#C5A15A]" />
                          <span>Refer & Earn</span>
                        </button>
                        <button
                          onClick={() => navigate('/account/settings')}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#102F38] hover:bg-[#0d262d] border border-[rgba(243,235,221,0.12)] text-xs font-bold uppercase text-[#F5F1EA] hover:text-white transition-colors text-left cursor-pointer"
                        >
                          <SettingsIcon className="w-4 h-4 text-[#C5A15A]" />
                          <span>Account Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 2: REFER & EARN ── */}
                {currentTab === 'refer' && (
                  <div className="space-y-6">
                    {/* Header Banner */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 shadow-sm space-y-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-36 h-36 bg-[#C5A15A]/[0.03] rounded-full blur-3xl pointer-events-none" />
                      <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#C5A15A]">
                        EXCLUSIVE REWARDS PROGRAM
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#F5F1EA] tracking-wide">
                        GIVE ₹200. EARN ₹100 CASH.
                      </h2>
                      <p className="font-sans text-xs text-[#B8C4C2] max-w-xl leading-relaxed">
                        Share your personal referral code with friends. They receive <strong className="text-white font-semibold">₹200 OFF</strong> their first ÉLAVA order, and you earn <strong className="text-[#C5A15A] font-semibold">₹100 CASH</strong> reward in your wallet for every qualifying purchase.
                      </p>
                    </div>

                    {/* Code & Link Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Referral Code Box */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.14)] rounded-2xl p-5 space-y-3">
                        <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                          YOUR UNIQUE REFERRAL CODE
                        </span>
                        <div className="flex items-center justify-between bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-3">
                          <span className="font-mono text-lg font-bold tracking-wider text-[#C5A15A] select-all">
                            {referralSummary.code || 'ELAVA...'}
                          </span>
                          <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#102F38] hover:bg-[#0a2027] text-xs font-bold uppercase text-[#F5F1EA] border border-[rgba(243,235,221,0.1)] transition-colors cursor-pointer"
                          >
                            {copyCodeSuccess ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-green-400">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#C5A15A]" />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Referral Link & Share Box */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.14)] rounded-2xl p-5 space-y-3">
                        <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                          SHARE DIRECT REFERRAL LINK
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCopyLink}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1C4A55] hover:bg-[#18424c] text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border border-[rgba(243,235,221,0.12)] transition-colors cursor-pointer"
                          >
                            {copyLinkSuccess ? (
                              <>
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-green-400">LINK COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-[#C5A15A]" />
                                <span>COPY LINK</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black hover:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-[#F5F1EA] transition-colors cursor-pointer"
                          >
                            <Share2 className="w-4 h-4 text-[#C5A15A]" />
                            <span>SHARE</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Wallet Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Available to Withdraw */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.14)] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#C5A15A] uppercase">
                            AVAILABLE TO WITHDRAW
                          </span>
                          <h3 className="font-serif text-3xl font-bold text-[#C5A15A]">
                            ₹{referralSummary.availableToWithdraw.toLocaleString()}
                          </h3>
                          <p className="font-sans text-[11px] text-[#B8C4C2]">Ready to cash out</p>
                        </div>
                        <button
                          onClick={() => {
                            setWithdrawErr('');
                            setWithdrawMsg('');
                            setIsWithdrawModalOpen(true);
                          }}
                          disabled={referralSummary.availableToWithdraw < 100}
                          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                            referralSummary.availableToWithdraw >= 100
                              ? 'bg-[#C5A15A] hover:bg-[#D4B26B] text-[#102F38] cursor-pointer shadow-md'
                              : 'bg-[#1C4A55] text-[#8FA6A3] cursor-not-allowed border border-[rgba(243,235,221,0.1)]'
                          }`}
                        >
                          <Wallet className="w-3.5 h-3.5" />
                          <span>WITHDRAW CASH</span>
                        </button>
                      </div>

                      {/* Pending Rewards */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-2xl p-5 space-y-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                            PENDING REWARDS
                          </span>
                          <h3 className="font-serif text-3xl font-bold text-[#B8C4C2]">
                            ₹{referralSummary.pendingRewards.toLocaleString()}
                          </h3>
                          <p className="font-sans text-[11px] text-[#B8C4C2]">Awaiting order fulfillment</p>
                        </div>
                        <div className="text-[10px] text-[#8FA6A3] italic pt-2 border-t border-[rgba(243,235,221,0.08)]">
                          Unlocks upon order completion
                        </div>
                      </div>

                      {/* Successful Referrals */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-2xl p-5 space-y-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                            SUCCESSFUL REFERRALS
                          </span>
                          <h3 className="font-serif text-3xl font-bold text-[#F5F1EA]">
                            {referralSummary.successfulReferrals}
                          </h3>
                          <p className="font-sans text-[11px] text-[#B8C4C2]">Friends who ordered</p>
                        </div>
                        <div className="text-[10px] text-[#8FA6A3] italic pt-2 border-t border-[rgba(243,235,221,0.08)]">
                          ₹100 reward per qualifying order
                        </div>
                      </div>
                    </div>

                    {/* Reward Ledger History */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 space-y-4">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border-b border-[rgba(243,235,221,0.12)] pb-2.5">
                        REWARD HISTORY LEDGER
                      </h3>

                      {!referralSummary.rewardHistory || referralSummary.rewardHistory.length === 0 ? (
                        <div className="text-center py-8 space-y-2">
                          <p className="font-serif text-base text-[#F5F1EA]">No transactions recorded yet</p>
                          <p className="font-sans text-xs text-[#B8C4C2] max-w-md mx-auto">
                            Share your referral code <strong className="text-[#C5A15A] font-mono">{referralSummary.code}</strong> with your friends to earn ₹100 cash for every completed purchase.
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-[rgba(243,235,221,0.08)]">
                          {referralSummary.rewardHistory.map((item) => (
                            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className={`font-bold ${item.isCredit ? 'text-[#C5A15A]' : 'text-red-400'}`}>
                                    {item.isCredit ? '+ ₹' : '- ₹'}{item.amount.toLocaleString()}
                                  </span>
                                  <span className="text-[#F5F1EA] font-medium">{item.title}</span>
                                </div>
                                <p className="text-[10px] text-[#B8C4C2]">
                                  {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className={`text-[9.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                                  item.status === 'available' || item.status === 'completed'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                    : item.status === 'pending'
                                    ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                                    : item.status === 'processing'
                                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Withdrawal History Section */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 space-y-4">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border-b border-[rgba(243,235,221,0.12)] pb-2.5">
                        WITHDRAWAL HISTORY
                      </h3>

                      {!referralSummary.withdrawalList || referralSummary.withdrawalList.length === 0 ? (
                        <div className="text-center py-6 text-xs text-[#B8C4C2]">
                          No cash withdrawal requests submitted yet.
                        </div>
                      ) : (
                        <div className="divide-y divide-[rgba(243,235,221,0.08)]">
                          {referralSummary.withdrawalList.map((w) => (
                            <div key={w.id} className="py-3 flex items-center justify-between text-xs">
                              <div className="space-y-0.5">
                                <div className="font-bold text-[#F5F1EA]">
                                  ₹{w.amount.toLocaleString()} ({w.payoutMethod.toUpperCase()})
                                </div>
                                <p className="text-[10px] text-[#B8C4C2]">
                                  Submitted: {new Date(w.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className={`text-[9.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                                  w.status === 'completed'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                    : w.status === 'pending'
                                    ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                                    : w.status === 'processing'
                                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                                }`}>
                                  {w.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── WITHDRAW CASH MODAL ── */}
                {isWithdrawModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
                    <div className="bg-[#163E49] border border-[rgba(243,235,221,0.2)] rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-5 text-[#F5F1EA]">
                      <div className="flex items-center justify-between border-b border-[rgba(243,235,221,0.12)] pb-3">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-[#C5A15A]" />
                          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#F5F1EA]">
                            WITHDRAW CASH
                          </h3>
                        </div>
                        <button
                          onClick={() => setIsWithdrawModalOpen(false)}
                          className="text-[#B8C4C2] hover:text-[#F5F1EA] p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {withdrawErr && (
                        <div className="bg-[#7A2929]/20 border border-[#7A2929]/50 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                          <span>{withdrawErr}</span>
                        </div>
                      )}

                      {withdrawMsg && (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-300 text-xs p-3 rounded-xl flex items-center gap-2">
                          <Check className="w-4 h-4 shrink-0 text-green-400" />
                          <span>{withdrawMsg}</span>
                        </div>
                      )}

                      <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                        {/* Amount Field */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#B8C4C2]">
                              WITHDRAWAL AMOUNT (₹)
                            </label>
                            <span className="text-[10px] text-[#C5A15A]">
                              Max: ₹{referralSummary.availableToWithdraw}
                            </span>
                          </div>
                          <input
                            type="number"
                            min="100"
                            max={referralSummary.availableToWithdraw}
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="Enter amount (min ₹100)"
                            className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-xl px-4 py-2.5 text-sm text-[#F5F1EA] placeholder-[#8FA6A3] focus:outline-none focus:border-[#C5A15A]"
                            required
                          />
                        </div>

                        {/* Payout Method Toggle */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#B8C4C2]">
                            PAYOUT METHOD
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setPayoutMethod('upi')}
                              className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                                payoutMethod === 'upi'
                                  ? 'bg-[#C5A15A] text-[#102F38] shadow-sm'
                                  : 'bg-[#102F38] text-[#B8C4C2] border border-[rgba(243,235,221,0.1)]'
                              }`}
                            >
                              UPI ID
                            </button>
                            <button
                              type="button"
                              onClick={() => setPayoutMethod('bank')}
                              className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                                payoutMethod === 'bank'
                                  ? 'bg-[#C5A15A] text-[#102F38] shadow-sm'
                                  : 'bg-[#102F38] text-[#B8C4C2] border border-[rgba(243,235,221,0.1)]'
                              }`}
                            >
                              BANK TRANSFER
                            </button>
                          </div>
                        </div>

                        {/* Method Specific Fields */}
                        {payoutMethod === 'upi' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#B8C4C2]">
                              UPI ID (GPay / PhonePe / Paytm)
                            </label>
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="e.g. name@upi or 9876543210@paytm"
                              className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-xl px-4 py-2.5 text-sm text-[#F5F1EA] placeholder-[#8FA6A3] focus:outline-none focus:border-[#C5A15A]"
                              required
                            />
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-[#B8C4C2]">Account Holder Name</label>
                              <input
                                type="text"
                                value={bankHolder}
                                onChange={(e) => setBankHolder(e.target.value)}
                                placeholder="Full Name as in Bank"
                                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-xl px-3 py-2 text-xs text-[#F5F1EA]"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-[#B8C4C2]">Account Number</label>
                              <input
                                type="text"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                                placeholder="Bank Account Number"
                                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-xl px-3 py-2 text-xs text-[#F5F1EA]"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-[#B8C4C2]">IFSC Code</label>
                              <input
                                type="text"
                                value={bankIfsc}
                                onChange={(e) => setBankIfsc(e.target.value)}
                                placeholder="e.g. SBIN0001234"
                                className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.18)] rounded-xl px-3 py-2 text-xs text-[#F5F1EA] uppercase"
                                required
                              />
                            </div>
                          </div>
                        )}

                        <div className="bg-[#102F38] border border-[rgba(243,235,221,0.1)] p-3 rounded-xl text-[11px] text-[#B8C4C2] leading-relaxed">
                          ℹ️ Your withdrawal request will be reviewed and processed manually by ÉLAVA within 24-48 hours. The amount is immediately reserved from your wallet balance.
                        </div>

                        <button
                          type="submit"
                          disabled={withdrawLoading}
                          className="w-full bg-[#C5A15A] hover:bg-[#D4B26B] text-[#102F38] py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          {withdrawLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#102F38]" />
                              <span>SUBMITTING REQUEST...</span>
                            </>
                          ) : (
                            <span>SUBMIT WITHDRAWAL REQUEST →</span>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* ── TAB 2: SETTINGS ── */}
                {currentTab === 'settings' && (
                  <div className="space-y-6">
                    {/* Feedback Alerts */}
                    {errorMsg && (
                      <div className="bg-[#7A2929]/20 border border-[#7A2929]/50 text-[#F5F1EA] text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="bg-[#102F38] border border-green-500/30 text-green-300 text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
                        {successMsg}
                      </div>
                    )}

                    {/* Section: Personal Information */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border-b border-[rgba(243,235,221,0.12)] pb-2.5">
                        PERSONAL INFORMATION
                      </h3>

                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name Input */}
                          <div className="space-y-1.5">
                            <label htmlFor="settings-name" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                              Name
                            </label>
                            <input
                              id="settings-name"
                              type="text"
                              required
                              disabled={updateLoading}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
                            />
                          </div>

                          {/* Phone Input */}
                          <div className="space-y-1.5">
                            <label htmlFor="settings-phone" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                              Phone
                            </label>
                            <input
                              id="settings-phone"
                              type="tel"
                              disabled={updateLoading}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Your phone number"
                              className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
                            />
                          </div>
                        </div>

                        {/* Email Input (ReadOnly indicator) */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                            Email Address (Primary Account Credentials)
                          </label>
                          <input
                            type="email"
                            readOnly
                            disabled
                            value={user?.email || ''}
                            className="w-full bg-[#102F38]/50 border border-[rgba(243,235,221,0.08)] text-[#8FA6A3] rounded-xl px-4 py-3 focus:outline-none text-sm select-all cursor-not-allowed"
                          />
                        </div>

                        {/* Avatar URL Input */}
                        <div className="space-y-1.5">
                          <label htmlFor="settings-avatar" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                            Avatar URL
                          </label>
                          <input
                            id="settings-avatar"
                            type="url"
                            disabled={updateLoading}
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="Link to your profile image"
                            className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={updateLoading}
                          className="bg-black hover:bg-neutral-900 active:bg-neutral-800 text-[#F5F1EA] py-3.5 px-6 rounded-xl font-bold uppercase text-[10px] tracking-[0.16em] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                        >
                          {updateLoading ? 'SAVING CHANGES...' : 'SAVE CHANGES'}
                        </button>
                      </form>
                    </div>

                    {/* Section: Security / Password Change */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border-b border-[rgba(243,235,221,0.12)] pb-2.5">
                        SECURITY & ACCESS
                      </h3>

                      {pwdErrorMsg && (
                        <div className="bg-[#7A2929]/20 border border-[#7A2929]/50 text-[#F5F1EA] text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
                          {pwdErrorMsg}
                        </div>
                      )}
                      {pwdSuccessMsg && (
                        <div className="bg-[#102F38] border border-green-500/30 text-green-300 text-xs px-4 py-3 rounded-lg text-center font-medium leading-relaxed">
                          {pwdSuccessMsg}
                        </div>
                      )}

                      <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* New Password Input */}
                          <div className="space-y-1.5">
                            <label htmlFor="settings-pwd" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                              New Password
                            </label>
                            <input
                              id="settings-pwd"
                              type="password"
                              required
                              disabled={pwdLoading}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Create a new password"
                              className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
                            />
                          </div>

                          {/* Confirm Password Input */}
                          <div className="space-y-1.5">
                            <label htmlFor="settings-confirm-pwd" className="block text-[10px] font-bold uppercase tracking-wider text-[#B8C4C2]">
                              Confirm Password
                            </label>
                            <input
                              id="settings-confirm-pwd"
                              type="password"
                              required
                              disabled={pwdLoading}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                              className="w-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#F5F1EA] rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-sm transition-colors"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={pwdLoading}
                          className="bg-black hover:bg-neutral-900 active:bg-neutral-800 text-[#F5F1EA] py-3.5 px-6 rounded-xl font-bold uppercase text-[10px] tracking-[0.16em] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                        >
                          {pwdLoading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                        </button>
                      </form>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>
        )}
      </MainContainer>
    </div>
  );
}
