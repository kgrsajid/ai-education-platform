import { baseApi } from '..';

export interface ProgressionResponse {
  data: {
    total_points: number;
    available_points: number;
    current_level: number;
    total_xp: number;
    current_streak: number;
    longest_streak: number;
    level_name: string;
    currency_icon: string;
    currency_label: string;
    next_level_xp: number;
    progress_percent: number;
  };
}

export interface StreakResponse {
  data: {
    current_streak: number;
    longest_streak: number;
    last_active_at: string | null;
  };
}

export interface ClaimBonusResponse {
  data: {
    points_earned: number;
    xp_earned: number;
    streak_bonus: number;
    current_streak: number;
    longest_streak: number;
  };
}

export interface PointTransaction {
  id: number;
  user_id: number;
  amount: number;
  source: string;
  reference_id: string;
  description: string;
  created_at: string;
}

export interface TransactionsResponse {
  data: {
    transactions: PointTransaction[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface Reward {
  id: number;
  title: string;
  title_kz: string;
  title_ru: string;
  description: string;
  partner_name: string;
  category: string;
  point_cost: number;
  image_url: string;
  is_active: boolean;
  total_stock: number;
  min_grade: number;
  max_grade: number;
  expires_at: string | null;
}

export interface RewardsResponse {
  data: {
    rewards: Reward[];
  };
}

export interface Redemption {
  id: number;
  user_id: number;
  reward_id: number;
  points_spent: number;
  coupon_code: string;
  is_used: boolean;
  used_at: string | null;
  created_at: string;
  reward: Reward;
}

export interface RedemptionsResponse {
  data: {
    redemptions: Redemption[];
  };
}

export interface Subject {
  id: number;
  name: string;
  name_kz: string;
  name_ru: string;
  icon: string;
  color: string;
  min_grade: number;
  max_grade: number;
  is_core: boolean;
  sort_order: number;
}

export interface SubjectsResponse {
  data: {
    subjects: Subject[];
  };
}

const progressionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgression: builder.query<ProgressionResponse, void>({
      query: () => '/progression',
    }),
    getStreak: builder.query<StreakResponse, void>({
      query: () => '/progression/streak',
    }),
    claimDailyBonus: builder.mutation<ClaimBonusResponse, void>({
      query: () => ({
        url: '/progression/streak/claim',
        method: 'POST',
      }),
    }),
    getTransactions: builder.query<TransactionsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => `/progression/transactions?page=${page}&limit=${limit}`,
    }),
    getRewards: builder.query<RewardsResponse, void>({
      query: () => '/rewards',
    }),
    redeemReward: builder.mutation<{ data: Redemption }, number>({
      query: (rewardId) => ({
        url: `/rewards/${rewardId}/redeem`,
        method: 'POST',
      }),
    }),
    getMyRedemptions: builder.query<RedemptionsResponse, void>({
      query: () => '/rewards/my',
    }),
    getSubjects: builder.query<SubjectsResponse, void>({
      query: () => '/subjects',
    }),
  }),
});

export const {
  useGetProgressionQuery,
  useGetStreakQuery,
  useClaimDailyBonusMutation,
  useGetTransactionsQuery,
  useGetRewardsQuery,
  useRedeemRewardMutation,
  useGetMyRedemptionsQuery,
  useGetSubjectsQuery,
} = progressionApi;
