import ky, { HTTPError } from 'ky';
import { toast } from './toast';

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

export async function handleHttpError(
  error: unknown,
  customHandlers?: Record<number, { title: string; description: string }>,
) {
  const defaultOptions = { isClosable: true, status: 'error' as const };
  if (error instanceof HTTPError) {
    const handler = customHandlers?.[error.response.status];

    if (handler) {
      return toast({ title: handler.title, description: handler.description, ...defaultOptions });
    } else {
      const title = `Error [${error.response.status}]`;
      const description = (await error.response.json())?.message ?? 'Something went wrong!';
      return toast({ title, description, ...defaultOptions });
    }
  }

  const title = 'Error';
  const description = error?.toString() ?? 'Something went wrong!';
  return toast({ title, description, ...defaultOptions });
}
