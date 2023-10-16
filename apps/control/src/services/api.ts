import * as qs from 'qs';
import { ScreenConfig, type ScreenConfigId, type ScreenConfigObject } from '@twitchtoolkit/types';

import { TwitchAccountType, TwitchSubscriptionType } from '@twitchtoolkit/types';

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

function refresh() {
  return client.post('auth/refresh').json<APITypes.LoginResponse>();
}

function getScreenConfigurations() {
  return client.get('screen-config').json<APITypes.ScreenConfigResponse>();
}

function updateScreenConfiguration(payload: ScreenConfig) {
  return client
    .put(`screen-config/${payload.type}`, { json: payload })
    .json<APITypes.UpdateScreenConfigResponse<typeof payload.type>>();
}

function checkTwitchAccount(accountType: TwitchAccountType) {
  const query = qs.stringify(
    {
      accountType,
    },
    { addQueryPrefix: true },
  );
  return client.get(`auth/twitch/check${query}`, {}).json<APITypes.CheckingTwithAccountResponse>();
}

function getTwitchSubscriptions() {
  return client.get('subscription').json<APITypes.TwitchSubscriptionsResponse>();
}

function createTwitchSubscription(type: TwitchSubscriptionType) {
  return client
    .post('subscription', { json: { type } })
    .json<APITypes.TwitchSubscriptionResponse>();
}

function deleteTwitchSubscription(type: TwitchSubscriptionType) {
  return client.delete(`subscription/${type}`).json<APITypes.TwitchSubscriptionsResponse>();
}

export const API = {
  login,
  logout,
  refresh,
  me,
  getScreenConfigurations,
  updateScreenConfiguration,
  checkTwitchAccount,
  getTwitchSubscriptions,
  createTwitchSubscription,
  deleteTwitchSubscription,
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
    expires_at: string;
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

  export type CheckingTwithAccountResponse = Response<{ id: string }>;

  export type TwitchSubscription = {
    id: string;
    subscriptionId: string;
    subscriptionType: TwitchSubscriptionType;
  };

  export type TwitchSubscriptionsResponse = Response<TwitchSubscription[]>;

  export type TwitchSubscriptionResponse = Response<TwitchSubscription>;
}
