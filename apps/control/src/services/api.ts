import wretch from 'wretch';

import { ScreenConfig, type ScreenConfigId, type ScreenConfigObject } from '@twitchtoolkit/types';

let apiClient = getBaseClient();

function getBaseClient() {
  return wretch(import.meta.env.VITE_API_URL, {
    mode: 'cors',
    credential: 'include',
  }).content('application/json');
}

export function updateApiClient({ token }: { token?: string } = { token: undefined }) {
  if (token) {
    apiClient = getBaseClient().auth(`Bearer ${token}`);
  }
  return getBaseClient();
}

function login(payload: APITypes.LoginRequest) {
  return apiClient.url('/auth/login').post(payload);
}

function logout() {
  return apiClient.url('/auth/logout').post();
}

function me() {
  return apiClient.get('/auth/me');
}

function getScreenConfigurations() {
  return apiClient.get('/screen-config');
}

function updateScreenConfiguration(payload: ScreenConfig) {
  return apiClient.url(`/screen-config/${payload.type}`).put(payload);
}

export const API = {
  login,
  logout,
  me,
  getScreenConfigurations,
  updateScreenConfiguration,
};

export namespace APITypes {
  type Response<T> = {
    data: T;
  };
  export type User = {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };

  export type Token = {
    type: 'bearer';
    token: string;
    expiresAt: string;
  };

  export type LoginResponse = Response<{
    auth: Token;
    user: User;
  }>;

  export type LoginRequest = {
    username: string;
    password: string;
  };

  export type MeResponse = Response<{
    user: User;
  }>;

  type ScreenConfig<T extends ScreenConfigId> = {
    id: T;
    config: ScreenConfigObject[T];
  };

  export type ScreenConfigResponse = Response<Array<ScreenConfig<ScreenConfigId>>>;
  export type UpdateScreenConfigResponse<T extends ScreenConfigId> = Response<ScreenConfig<T>>;
}
