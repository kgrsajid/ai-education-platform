import type { QuizCategory } from "../quiz-category/type";
import type { PaginationResponse, PaginationType } from "../type";

export const Difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const
export type DifficultyEnumType =  typeof Difficulty[keyof typeof Difficulty];

export type QuizPayload = PaginationType<{categories?: string, search?: string, difficulty?: string}>;
export type TQuiz = {
  id: string;
  title: string;
  description: string;
  categories: QuizCategory[];
  difficulty: DifficultyEnumType;
  numberOfQuestion: number;
  tags?: string[];
}

export type TOption = {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export type TQuestion = {
  question: string;
  options: TOption[];
}

export type QuizResponse = {
  data: PaginationResponse<TQuiz[]>
}

export type TQuizDetails = {
  id: string;
  title: string;
  description: string;
  categories: QuizCategory[];
  difficulty: DifficultyEnumType;
  tags?: string[];
  questions: TQuestion[];
}

export type QuizDetailResponse = {
  test: TQuizDetails
}

export type TQuizResultAddPayload = {
  testId: string;
  score: number;
  maxScore: number;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
}

export type TQuizResultResponse = {
  id: string;
  score: number;
  maxScore: number;
  percentage: number;
  attempt: number;
  createdAt: string;
}

export type TQuizResultGetPayload = {
  testId?: string;
  duration?: string;
}
