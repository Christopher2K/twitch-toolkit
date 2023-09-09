import { create } from 'zustand';
import { API, APITypes } from '@/services/api';

type AuthStore = {
  ready: boolean;
  loading: boolean;
  user: null | APITypes.User;
  token: null | string;

  init: () => Promise<void>;
  login: (args: APITypes.LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => {
  return {
    user: null,
    token: null,
    loading: false,
    ready: false,

    init: async () => {
      const maybeToken = localStorage.getItem('token');
      if (!maybeToken) {
        set({ ready: true });
        return;
      }

      await API.me({ token: maybeToken }).json(({ data }: APITypes.MeResponse) => {
        set({
          ready: true,
          user: data.user,
          token: maybeToken,
        });
      });
    },
    login: async (payload) => {
      set({ loading: true });

      await API.login(payload).json(({ data }: APITypes.LoginResponse) => {
        localStorage.setItem('token', data.auth.token);
        set({
          loading: false,
          user: data.user,
          token: data.auth.token,
        });
      });
    },
    logout: async () => {
      const token = get().token;
      if (!token) return;

      localStorage.removeItem('token');
      await API.logout({ token }).res(() => {
        set({ user: null, token: null });
      });
    },
  };
});
