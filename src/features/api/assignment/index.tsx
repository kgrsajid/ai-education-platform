import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082';

export interface Assignment {
  id: number;
  teacher_id: number;
  title: string;
  question: string;
  rubric: string;
  subject: string;
  grade_min: number;
  grade_max: number;
  is_published: boolean;
  teacher_name: string;
  created_at: string;
}

export interface Submission {
  id: number;
  assignment_id: number;
  answer: string;
  score: number;
  max_score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  grade_level: string;
  is_evaluated: boolean;
  student_name: string;
  title: string;
  created_at: string;
}

export interface StudentStats {
  total_submitted: number;
  average_score: number;
}

export interface CreateAssignmentPayload {
  title: string;
  question: string;
  rubric?: string;
  subject?: string;
  grade_min: number;
  grade_max: number;
  is_published: boolean;
}

export const assignmentApi = createApi({
  reducerPath: 'assignmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Assignments', 'Submissions'],
  endpoints: (builder) => ({
    // Student: get published assignments
    getAssignments: builder.query<Assignment[], { grade?: number; page?: number; limit?: number }>({
      query: (params) => {
        const search = new URLSearchParams();
        if (params.grade) search.set('grade', String(params.grade));
        if (params.page) search.set('page', String(params.page));
        if (params.limit) search.set('limit', String(params.limit));
        return `/assignment?${search.toString()}`;
      },
      transformResponse: (res: { data: Assignment[] }) => res.data,
      providesTags: ['Assignments'],
    }),

    // Teacher: get my assignments
    getMyAssignments: builder.query<Assignment[], { page?: number; limit?: number }>({
      query: (params) => {
        const search = new URLSearchParams();
        if (params.page) search.set('page', String(params.page));
        if (params.limit) search.set('limit', String(params.limit));
        return `/assignment/my?${search.toString()}`;
      },
      transformResponse: (res: { data: Assignment[] }) => res.data,
      providesTags: ['Assignments'],
    }),

    // Get single assignment
    getAssignmentById: builder.query<Assignment, string>({
      query: (id) => `/assignment/${id}`,
      transformResponse: (res: { data: Assignment }) => res.data,
    }),

    // Create assignment
    createAssignment: builder.mutation<Assignment, CreateAssignmentPayload>({
      query: (body) => ({
        url: '/assignment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assignments'],
    }),

    // Update assignment
    updateAssignment: builder.mutation<Assignment, { id: string; data: CreateAssignmentPayload }>({
      query: ({ id, data }) => ({
        url: `/assignment/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Assignments'],
    }),

    // Delete assignment
    deleteAssignment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/assignment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assignments'],
    }),

    // Submit answer
    submitAnswer: builder.mutation<Submission, { assignmentId: string; answer: string }>({
      query: ({ assignmentId, answer }) => ({
        url: `/assignment/${assignmentId}/submit`,
        method: 'POST',
        body: { answer },
      }),
      invalidatesTags: ['Submissions'],
    }),

    // Get my submissions (student)
    getMySubmissions: builder.query<Submission[], { page?: number; limit?: number }>({
      query: (params) => {
        const search = new URLSearchParams();
        if (params.page) search.set('page', String(params.page));
        if (params.limit) search.set('limit', String(params.limit));
        return `/assignment/submissions/my?${search.toString()}`;
      },
      transformResponse: (res: { data: Submission[] }) => res.data,
      providesTags: ['Submissions'],
    }),

    // Get assignment submissions (teacher)
    getAssignmentSubmissions: builder.query<Submission[], { id: string; page?: number }>({
      query: ({ id, page }) => {
        const search = new URLSearchParams();
        if (page) search.set('page', String(page));
        return `/assignment/${id}/submissions?${search.toString()}`;
      },
      transformResponse: (res: { data: Submission[] }) => res.data,
      providesTags: ['Submissions'],
    }),

    // Get student stats
    getStudentStats: builder.query<StudentStats, void>({
      query: () => '/assignment/stats/my',
      transformResponse: (res: { data: StudentStats }) => res.data,
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetMyAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useSubmitAnswerMutation,
  useGetMySubmissionsQuery,
  useGetAssignmentSubmissionsQuery,
  useGetStudentStatsQuery,
} = assignmentApi;
