import { supabase } from './supabase';

const REFERRAL_STORAGE_KEY = 'elava_referral_code';

/**
 * Capture referral attribution from URL query parameters (e.g. /?ref=ELAVA123)
 * Stores code securely in localStorage to persist across browsing session until checkout.
 */
export function captureReferralAttribution() {
  try {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);
    const rawRef = urlParams.get('ref') || urlParams.get('referral') || urlParams.get('r');

    if (!rawRef) return getStoredReferralCode();

    const code = rawRef.trim().toUpperCase();

    // Basic format validation (must be alphanumeric between 3 and 20 chars)
    if (/^[A-Z0-9]{3,20}$/.test(code)) {
      const data = {
        code,
        capturedAt: new Date().toISOString(),
      };
      localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('referral-updated', { detail: data }));
      return data;
    }
  } catch (err) {
    console.error('Error capturing referral attribution:', err);
  }

  return getStoredReferralCode();
}

/**
 * Get current stored referral attribution code
 */
export function getStoredReferralCode() {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.code ? parsed : null;
  } catch (err) {
    console.error('Error reading stored referral code:', err);
    return null;
  }
}

/**
 * Clear stored referral code after order processing
 */
export function clearReferralAttribution() {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(REFERRAL_STORAGE_KEY);
    window.dispatchEvent(new Event('referral-updated'));
  } catch (err) {
    console.error('Error clearing referral attribution:', err);
  }
}

/**
 * Validate a referral code against Supabase RPC
 */
export async function validateReferralCode(code, currentUserId = null) {
  if (!code) {
    return { is_valid: false, reason: 'empty_code' };
  }

  try {
    const { data, error } = await supabase.rpc('validate_referral_code', {
      p_code: code.trim().toUpperCase(),
      p_user_id: currentUserId || null,
    });

    if (error) {
      console.warn('RPC validate_referral_code failed, trying direct lookup:', error.message);
      // Fallback direct check if RPC is not deployed yet
      const cleanCode = code.trim().toUpperCase();
      const { data: foundCode, error: searchErr } = await supabase
        .from('referral_codes')
        .select('user_id, code')
        .eq('code', cleanCode)
        .maybeSingle();

      if (searchErr || !foundCode) {
        return { is_valid: false, reason: 'invalid_code' };
      }

      if (currentUserId && foundCode.user_id === currentUserId) {
        return { is_valid: false, reason: 'self_referral' };
      }

      return {
        is_valid: true,
        code: cleanCode,
        discount_amount: 200.0,
        referrer_id: foundCode.user_id,
      };
    }

    return data || { is_valid: false, reason: 'invalid_code' };
  } catch (err) {
    console.error('Error validating referral code:', err);
    return { is_valid: false, reason: 'server_error' };
  }
}

/**
 * Fetch referral & reward summary data for an authenticated customer
 */
export async function fetchUserReferralSummary(userId) {
  if (!userId) {
    return {
      code: '',
      successfulReferrals: 0,
      pendingRewards: 0,
      availableRewards: 0,
      referralList: [],
    };
  }

  try {
    const cleanUserId = (userId || '').replace(/-/g, '').toUpperCase();
    const fallbackCode = `ELAVA${cleanUserId.substring(0, 6)}`;
    let code = fallbackCode;

    const { data: rpcCode, error: rpcErr } = await supabase.rpc('get_or_create_referral_code', {
      p_user_id: userId,
    });

    if (!rpcErr && rpcCode) {
      code = rpcCode;
    } else {
      // Fallback lookup / generate directly
      const { data: existing } = await supabase
        .from('referral_codes')
        .select('code')
        .eq('user_id', userId)
        .maybeSingle();

      if (existing?.code) {
        code = existing.code;
      } else {
        code = fallbackCode;
        try {
          await supabase.from('referral_codes').insert({ user_id: userId, code: fallbackCode });
        } catch {
          // ignore duplicate insert errors
        }
      }
    }

    // 2. Fetch referrals list for user
    const { data: referralsData } = await supabase
      .from('referrals')
      .select('id, referral_code, status, created_at, qualifying_at, order_id')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });

    // 3. Fetch rewards ledger for user
    const { data: rewardsData } = await supabase
      .from('rewards')
      .select('id, referral_id, amount, status, type, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // 4. Fetch withdrawal requests for user
    const { data: withdrawalsData } = await supabase
      .from('withdrawal_requests')
      .select('id, amount, payout_method, payout_details, status, created_at, processed_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    const referrals = referralsData || [];
    const rewards = rewardsData || [];
    const withdrawals = withdrawalsData || [];

    const successfulReferrals = referrals.filter(
      (r) => r.status === 'completed' || r.status === 'qualifying'
    ).length;

    const pendingRewards = rewards
      .filter((r) => r.status === 'pending')
      .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

    const totalAvailableRewards = rewards
      .filter((r) => r.status === 'available')
      .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

    const totalReservedWithdrawals = withdrawals
      .filter((w) => w.status === 'pending' || w.status === 'processing' || w.status === 'completed')
      .reduce((sum, w) => sum + (Number(w.amount) || 0), 0);

    const availableToWithdraw = Math.max(0, totalAvailableRewards - totalReservedWithdrawals);

    // Build combined Reward History ledger items (+ ₹100 Reward / - ₹XXX Withdrawal)
    const rewardLedgerItems = rewards.map((r) => ({
      id: `reward-${r.id}`,
      type: 'reward',
      title: 'Referral Reward',
      amount: Number(r.amount),
      isCredit: true,
      status: r.status,
      date: r.created_at,
    }));

    const withdrawalLedgerItems = withdrawals.map((w) => ({
      id: `withdrawal-${w.id}`,
      type: 'withdrawal',
      title: `Withdrawal (${w.payout_method.toUpperCase()})`,
      amount: Number(w.amount),
      isCredit: false,
      status: w.status,
      date: w.created_at,
    }));

    const combinedLedger = [...rewardLedgerItems, ...withdrawalLedgerItems].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return {
      code,
      successfulReferrals,
      pendingRewards,
      availableRewards: totalAvailableRewards,
      availableToWithdraw,
      referralList: referrals.map((ref) => {
        const reward = rewards.find((r) => r.referral_id === ref.id);
        return {
          id: ref.id,
          code: ref.referral_code,
          status: ref.status,
          date: ref.created_at,
          rewardAmount: reward ? Number(reward.amount) : 100,
          rewardStatus: reward ? reward.status : 'pending',
        };
      }),
      rewardHistory: combinedLedger,
      withdrawalList: withdrawals.map((w) => ({
        id: w.id,
        amount: Number(w.amount),
        payoutMethod: w.payout_method,
        payoutDetails: w.payout_details,
        status: w.status,
        date: w.created_at,
        processedAt: w.processed_at,
      })),
    };
  } catch (err) {
    console.error('Error fetching user referral summary:', err);
    return {
      code: `ELAVA${(userId || '').replace(/-/g, '').substring(0, 6).toUpperCase()}`,
      successfulReferrals: 0,
      pendingRewards: 0,
      availableRewards: 0,
      availableToWithdraw: 0,
      referralList: [],
      rewardHistory: [],
      withdrawalList: [],
    };
  }
}

/**
 * Submit a customer cash withdrawal request securely
 */
export async function submitWithdrawalRequest({ amount, payoutMethod, payoutDetails }) {
  if (!amount || amount < 100) {
    return { success: false, reason: 'minimum_threshold_not_met', message: 'Minimum withdrawal amount is ₹100.' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, reason: 'unauthenticated', message: 'Please log in to request a withdrawal.' };
    }

    // Call RPC request_withdrawal
    const { data, error } = await supabase.rpc('request_withdrawal', {
      p_amount: amount,
      p_payout_method: payoutMethod,
      p_payout_details: payoutDetails,
      p_user_id: user.id,
    });

    if (error) {
      console.warn('RPC request_withdrawal failed, fallback to direct insert check:', error.message);
      // Fallback check balance & direct insert
      const summary = await fetchUserReferralSummary(user.id);
      if (amount > summary.availableToWithdraw) {
        return {
          success: false,
          reason: 'insufficient_balance',
          message: `Requested amount exceeds your withdrawable balance (₹${summary.availableToWithdraw}).`,
        };
      }

      const { data: inserted, error: insertErr } = await supabase
        .from('withdrawal_requests')
        .insert({
          user_id: user.id,
          amount,
          payout_method: payoutMethod,
          payout_details: payoutDetails,
          status: 'pending',
        })
        .select()
        .single();

      if (insertErr) {
        return { success: false, reason: 'database_error', message: insertErr.message };
      }

      return { success: true, withdrawal: inserted };
    }

    if (data && data.success === false) {
      if (data.reason === 'insufficient_balance') {
        return {
          success: false,
          reason: 'insufficient_balance',
          message: `Requested amount exceeds available withdrawable balance (₹${data.withdrawable_balance || 0}).`,
        };
      }
      return { success: false, reason: data.reason, message: data.reason || 'Withdrawal request failed.' };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error submitting withdrawal request:', err);
    return { success: false, reason: 'server_error', message: 'Unable to submit request. Please try again.' };
  }
}

