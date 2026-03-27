import { baseApi } from '..';

interface TrainerProfile {
  robot_name: string;
  robot_color: string;
  robot_level: number;
  current_level: number;
  stage_name: string;
  total_xp: number;
  grade: number;
  stats: {
    robot_name: string;
    robot_level: number;
    robot_color: string;
    current_level: number;
    stage_name: string;
    total_xp: number;
    current_level_xp: number;
    next_level_xp: number;
    progress_percent: number;
    quizzes_completed: number;
    flashcards_studied: number;
    assignments_completed: number;
    current_streak: number;
    longest_streak: number;
    joined_at: string;
  };
  created_at: string;
}

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  name: string;
  email: string;
  grade: number;
  current_level: number;
  total_xp: number;
  total_points: number;
  longest_streak: number;
  robot_name: string;
  robot_color: string;
  created_at: string;
  is_current_user?: boolean;
}

interface TimelineEntry {
  id: number;
  user_id: number;
  amount: number;
  source: string;
  reference_id: string;
  description: string;
  created_at: string;
}

const trainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainerProfile: builder.query<{ data: TrainerProfile }, void>({
      query: () => '/trainer/profile',
      providesTags: ['Trainer'],
    }),
    updateTrainerProfile: builder.mutation<{ data: { robot_name: string; robot_color: string } }, { name?: string; color?: string }>({
      query: (body) => ({
        url: '/trainer/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Trainer'],
    }),
    getTrainerTimeline: builder.query<{ data: { timeline: TimelineEntry[] } }, { limit?: number }>({
      query: ({ limit = 20 }) => `/trainer/timeline?limit=${limit}`,
    }),
    getLeaderboard: builder.query<
      { data: { leaderboard: LeaderboardEntry[]; total: number; page: number; limit: number; sort: string } },
      { sort?: string; page?: number; limit?: number; grade?: number }
    >({
      query: ({ sort = 'level', page = 1, limit = 20, grade }) => {
        let url = `/leaderboard?sort=${sort}&page=${page}&limit=${limit}`;
        if (grade !== undefined) url += `&grade=${grade}`;
        return url;
      },
      providesTags: ['Leaderboard'],
    }),
  }),
});

export const {
  useGetTrainerProfileQuery,
  useUpdateTrainerProfileMutation,
  useGetTrainerTimelineQuery,
  useGetLeaderboardQuery,
} = trainerApi;
