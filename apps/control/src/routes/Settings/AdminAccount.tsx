import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Input, Label, Typography } from '@/components';
import { useAuthStore } from '@/stores/auth';
import { Stack } from '@style/jsx';
import { stack } from '@style/patterns';

type LoginForm = {
  username: string;
  password: string;
};

export function AdminAccount() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login, logout, user, token, loading } = useAuthStore();

  const isLogged = Boolean(user) && Boolean(token);

  async function onSubmit(data: Parameters<SubmitHandler<LoginForm>>[0]) {
    await login(data);
  }

  return (
    <form className={stack({})} onSubmit={handleSubmit(onSubmit)}>
      <Typography tag="h2">Admin account</Typography>
      {!isLogged && (
        <Stack gap="5" width="sm">
          <Stack gap="1" width="sm">
            <Label htmlFor="username">Username</Label>
            <Input type="text" {...register('username')} />
          </Stack>
          <Stack gap="1" width="sm">
            <Label htmlFor="passowrd">Password</Label>
            <Input type="password" {...register('password')} />
          </Stack>
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </Stack>
      )}
      {isLogged && (
        <Stack gap="5" width="sm">
          <Typography tag="p">
            🟢 Connected with: <span>{user?.username}</span>
          </Typography>
          <Button type="button" onClick={logout} disabled={loading}>
            Logout
          </Button>
        </Stack>
      )}
    </form>
  );
}
