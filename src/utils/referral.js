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
    // 1. Get or generate user's referral code
    let code = '';
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
        // Simple client fallback code format if database trigger pending
        code = `ELAVA${userId.substring(0, 6).toUpperCase()}`;
        try {
          await supabase.from('referral_codes').insert({ user_id: userId, code });
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
      .eq('user_id', userId);

    const referrals = referralsData || [];
    const rewards = rewardsData || [];

    const successfulReferrals = referrals.filter(
      (r) => r.status === 'completed' || r.status === 'qualifying'
    ).length;

    const pendingRewards = rewards
      .filter((r) => r.status === 'pending')
      .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

    const availableRewards = rewards
      .filter((r) => r.status === 'available')
      .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

    return {
      code,
      successfulReferrals,
      pendingRewards,
      availableRewards,
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
    };
  } catch (err) {
    console.error('Error fetching user referral summary:', err);
    return {
      code: `ELAVA${userId.substring(0, 6).toUpperCase()}`,
      successfulReferrals: 0,
      pendingRewards: 0,
      availableRewards: 0,
      referralList: [],
    };
  }
}
