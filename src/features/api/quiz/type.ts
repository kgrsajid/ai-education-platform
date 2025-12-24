import type { QuizCategory } from "../quiz-category/type";
import type { PaginationResponse, PaginationType } from "../type";

export const Difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const

export type QuizPayload = PaginationType<{categories?: string, search?: string, difficulty?: string}>;
export type DifficultyEnumType =  typeof Difficulty[keyof typeof Difficulty];
export type TQuiz = {
  id: string;
  title: string;
  description: string;
  categories: QuizCategory[];
  difficulty: DifficultyEnumType;
  numberOfQuestion: number;
  tags?: string[];
}

export type QuizResponse = {
  data: PaginationResponse<TQuiz[]>
}