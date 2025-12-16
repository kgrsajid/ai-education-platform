
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}


export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};