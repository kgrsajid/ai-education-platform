
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
  password: string;
  role: string;
  id: string;
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};