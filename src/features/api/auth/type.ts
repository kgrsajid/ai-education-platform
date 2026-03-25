export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse
}


export type UserResponse = {
  name: string;
  email: string;
  password?: string;
  role: string;
  id: string;
  grade?: number;
  school?: string;
  avatar?: string;
  language?: string;
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
  grade?: number;
  school?: string;
  language?: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type VerifyCodePayload = {
  email: string;
  code: string;
};

export type ResetPasswordPayload = {
  token: string;
  new_password: string;
};
