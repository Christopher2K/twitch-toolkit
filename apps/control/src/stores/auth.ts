import { create } from 'zustand';

import { API, APITypes } from '@/services/api';
import { setToken, removeToken, handleHttpError } from '@/services/httpClient';

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

      API.refresh()
        .then(({ data }) => {
          set({
            ready: true,
            user: data.user,
            token: data.auth.token,
          });

          localStorage.setItem('token', data.auth.token);
          setToken(data.auth.token);
        })
        .catch((error) => {
          localStorage.removeItem('token');
          removeToken();
          return handleHttpError(error, {
            401: {
              title: 'Unauthorized',
              description: 'Your session has expired. Please log in again.',
            },
          });
        })
        .finally(() => {
          set({ ready: true });
        });
    },
    login: async (payload) => {
      set({ loading: true });

      return API.login(payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.auth.token);
          setToken(data.auth.token);
          set({
            loading: false,
            user: data.user,
            token: data.auth.token,
          });
        })
        .catch((error) => {
          removeToken();
          handleHttpError(error);
        })
        .finally(() => {
          set({ loading: false });
        });
    },
    logout: async () => {
      const token = get().token;
      if (!token) return;

      localStorage.removeItem('token');

      API.logout()
        .then(() => {
          set({ user: null, token: null });
        })
        .catch((error) => handleHttpError(error))
        .finally(() => removeToken());
    },
  };
});
