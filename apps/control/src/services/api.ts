import wretch from 'wretch';

const _apiClient = wretch('https://api.twitchtoolkit.local', {
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

export const API = {
  login,
  logout,
  me,
};

export namespace APITypes {
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

  export type LoginResponse = {
    data: {
      auth: Token;
      user: User;
    };
  };

  export type LoginRequest = {
    username: string;
    password: string;
  };

  export type MeResponse = {
    data: {
      user: User;
    };
  };
}
