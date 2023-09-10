import wretch from 'wretch';
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

function updateScreenConfiguration<T extends APITypes.ConfigId>({
  token,
  payload,
}: AuthenticatedArgs<APITypes.ConfigType[T]>) {
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

  export type ConfigType = {
    guest: {
      type: 'guest';
      banner: string;
      title: string;
      guests: {
        name: string
        description: string
      }[]
    };
    talk: {
      type: 'talk';
    };
    computer: {
      type: 'computer';
    };
  };
  export type ConfigId = keyof ConfigType;

  type ScreenConfig<T extends ConfigId> = {
    id: T;
    config: ConfigType[T];
  };

  export type ScreenConfigResponse = Response<Array<ScreenConfig<ConfigId>>>;
}
