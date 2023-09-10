import { useForm, SubmitHandler } from 'react-hook-form';
import { FormLabel, FormControl, Input, Button, Box, Heading, Flex, Text } from '@chakra-ui/react';

import { useAuthStore } from '@/stores/auth';

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
    <Box>
      <Heading as="h2" size="lg" mb="5">
        Admin account
      </Heading>

      {!isLogged && (
        <Flex as="form" onSubmit={handleSubmit(onSubmit)} direction="column" gap="5">
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input type="text" autoComplete="off" {...register('username')} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" {...register('password')} />
          </FormControl>

          <FormControl>
            <Button type="submit" colorScheme="teal" isLoading={loading} disabled={loading}>
              Login
            </Button>
          </FormControl>
        </Flex>
      )}

      {isLogged && (
        <Flex direction="column" justifyContent="flex-start" alignItems="flex-start" gap="5">
          <Text>
            🟢 Connected with: <span>{user?.username}</span>
          </Text>

          <Button
            type="button"
            onClick={logout}
            colorScheme="teal"
            isLoading={loading}
            disabled={loading}
          >
            Logout
          </Button>
        </Flex>
      )}
    </Box>
  );
}
