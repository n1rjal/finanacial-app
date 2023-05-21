export interface SignInResponse {
  user: {
    id: string;
  };
  accessToken: string;
  refreshToken?: string;
}
