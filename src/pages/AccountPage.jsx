import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import { User, ShoppingBag, Gift, MapPin, Settings as SettingsIcon, LogOut, Loader2, KeyRound } from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation tab state based on URL
  const currentTab = location.pathname.endsWith('/settings') ? 'settings' : 'overview';

  // Profile data state
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  
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

  // Fetch user profile from Supabase profiles table
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
        setName(data?.name || '');
        setPhone(data?.phone || '');
        setAvatarUrl(data?.avatar_url || '');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setErrorMsg('Unable to retrieve profile information.');
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

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
    { id: 'refer', label: 'Refer & Earn', icon: Gift, path: '/account#refer', disabled: true },
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
                        <h3 className="font-serif text-3xl font-bold text-[#C5A15A]">₹0</h3>
                        <p className="font-sans text-[11px] text-[#B8C4C2]">Current available rewards</p>
                      </div>

                      {/* Pending Rewards Card */}
                      <div className="bg-[#102F38] border border-[rgba(243,235,221,0.12)] rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#B8C4C2] uppercase">
                          PENDING
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-[#B8C4C2]">₹0</h3>
                        <p className="font-sans text-[11px] text-[#B8C4C2]">Pending rewards</p>
                      </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.14)] rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F5F1EA] border-b border-[rgba(243,235,221,0.12)] pb-2.5">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          disabled
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#102F38]/60 border border-[rgba(243,235,221,0.12)] text-xs font-bold uppercase text-[#8FA6A3] cursor-not-allowed opacity-60 text-left"
                        >
                          <ShoppingBag className="w-4 h-4 text-[#8FA6A3]" />
                          <span>View Orders (Coming Soon)</span>
                        </button>
                        <button
                          disabled
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#102F38]/60 border border-[rgba(243,235,221,0.12)] text-xs font-bold uppercase text-[#8FA6A3] cursor-not-allowed opacity-60 text-left"
                        >
                          <Gift className="w-4 h-4 text-[#8FA6A3]" />
                          <span>Refer & Earn (Coming Soon)</span>
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
