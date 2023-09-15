import ky from 'ky';

export let client = ky.create({
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  prefixUrl: import.meta.env.VITE_API_URL,
});

export function setToken(token: string) {
  client = client.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeToken() {
  client = client.extend({
    headers: {
      Authorization: undefined,
    },
  });
}
