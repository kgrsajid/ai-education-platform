export interface SessionResponse {
  sessions: TSession[]
}

export type TSession = {
  id: number;
  title: string;
}

export const StatusEnum = {
  Success :"success",
  Error: "error",
  Pending: "pending",
} as const;
export type StatusEnumType =  typeof StatusEnum[keyof typeof StatusEnum];

export interface ChatResponse {
  chat: TChat[];
  session_id: string;
  id: string;
  session_title: string;
}

export type TChat = {
  id: string;
  content: string;
  role: string;
  status: StatusEnumType;
}
