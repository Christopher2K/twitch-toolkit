import { create } from 'zustand';

import { setToken, removeToken } from '@/services/httpClient';
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

      setToken(maybeToken);

      await API.me()
        .then(({ data }) => {
          set({
            ready: true,
            user: data.user,
            token: maybeToken,
          });
        })

        .catch(() => {
          localStorage.removeItem('token');
          removeToken();
          set({ ready: true });
        });
    },
    login: async (payload) => {
      set({ loading: true });

      await API.login(payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.auth.token);
          setToken(data.auth.token);
          set({
            loading: false,
            user: data.user,
            token: data.auth.token,
          });
        })
        .catch(() => {
          set({ loading: false });
          removeToken();
        });
    },
    logout: async () => {
      const token = get().token;
      if (!token) return;

      localStorage.removeItem('token');

      await API.logout().then(() => {
        set({ user: null, token: null });
      });
      removeToken();
    },
  };
});
