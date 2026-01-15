import type { QuizCategory } from "../quiz-category/type";
import type { PaginationResponse, PaginationType } from "../type";

export type CardPayload = PaginationType<{categories?: number[], search?: string}>;

export type TCard = {
  id: string;
  title: string;
  description: string;
  categories?: QuizCategory[],
  numberOfQuestions: number;
  tags?: string[]
}

export type TCardResponse = {
  id: string;
  question: string;
  answer: string;
}

export type CardRequest = {
  question: string;
  answer: string;
};

export type TCardDetail = {
  id: string;
  authorId: string;
  title: string;
  description: string;
  tags?: string[];
  categories?: QuizCategory[];
  cards: TCardResponse[];
}


export type CardsCreatePayload = {
  title: string;
  description?: string;
  tags: string[];
  categories: number[];
  cards: CardRequest[];
};


export type CardUpdatePayload = {
  card: CardsCreatePayload,
  cardId: string;
}

export type CardResponse = {
  data: PaginationResponse<TCard[]>
}