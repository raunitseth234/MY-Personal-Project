import { http } from '@/lib/api/http';
import type { TokenResponse, User } from '@/lib/api/types';

export const authApi = {
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    http.post<TokenResponse>('/auth/register', data, { auth: false }),

  login: (data: { identifier: string; password: string }) =>
    http.post<TokenResponse>('/auth/login', data, { auth: false }),

  logout: (refreshToken: string) =>
    http.post<{ message: string }>('/auth/logout', { refresh_token: refreshToken }, { auth: false }),

  me: () => http.get<User>('/auth/me'),

  sendOtp: (phone: string) => http.post<{ message: string }>('/auth/send-otp', { phone }, { auth: false }),

  verifyOtp: (phone: string, otp: string) =>
    http.post<{ message: string }>('/auth/verify-otp', { phone, otp }, { auth: false }),
};
