import wretch from 'wretch';

import { type ScreenConfigId, type ScreenConfigObject } from '@twitchtoolkit/types';

const _apiClient = wretch(import.meta.env.VITE_API_URL, {
  mode: 'cors',
  credential: 'include',
}).content('application/json');

function getClient({ token }: { token?: string } = { token: undefined }) {
  if (token) {
    return _apiClient.auth(`Bearer ${token}`);
  }
  return _apiClient;
}

type AuthenticatedArgs<T = undefined> = {
  token: string;
} & (T extends undefined ? {} : { payload: T });

function login(payload: APITypes.LoginRequest) {
  return getClient().url('/auth/login').post(payload);
}

function logout({ token }: AuthenticatedArgs) {
  return getClient({ token }).url('/auth/logout').post();
}

function me({ token }: AuthenticatedArgs) {
  return getClient({ token }).get('/auth/me');
}

function getScreenConfigurations() {
  return getClient().get('/screen-config');
}

function updateScreenConfiguration<T extends ScreenConfigId>({
  token,
  payload,
}: AuthenticatedArgs<ScreenConfigObject[T]>) {
  return getClient({ token }).json(payload).put(`/screen-config/${payload.type}`);
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
}
