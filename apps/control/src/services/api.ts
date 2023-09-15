import { ScreenConfig, type ScreenConfigId, type ScreenConfigObject } from '@twitchtoolkit/types';

import { client } from './httpClient';

function login(payload: APITypes.LoginRequest) {
  return client.post('auth/login', { json: payload }).json<APITypes.LoginResponse>();
}

function logout() {
  return client.post('auth/logout');
}

function me() {
  return client.get('auth/me').json<APITypes.MeResponse>();
}

function getScreenConfigurations() {
  return client.get('screen-config').json<APITypes.ScreenConfigResponse>();
}

function updateScreenConfiguration(payload: ScreenConfig) {
  return client
    .put(`screen-config/${payload.type}`, { json: payload })
    .json<APITypes.UpdateScreenConfigResponse<typeof payload.type>>();
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
  export type UpdateScreenConfigResponse<T extends ScreenConfigId = ScreenConfigId> = Response<
    ScreenConfig<T>
  >;
}
