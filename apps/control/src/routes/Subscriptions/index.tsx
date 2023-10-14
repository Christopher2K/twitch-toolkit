import { useEffect } from 'react';
import { Heading, Flex, Box, Switch, FormControl, FormLabel } from '@chakra-ui/react';

import { TwitchSubscriptionType } from '@twitchtoolkit/types';

import { AuthenticationGuardAlert } from '@/components';
import { useAuthStore } from '@/stores/auth';
// import { useTwitchAuthStore } from '@/stores/twitchAuth';

export function Subscriptions() {
  const isLoggedIn = useAuthStore((state) => state.user !== null);
  // const twitchMainAccountLoggedIn = useTwitchAuthStore((state) => state.mainAccount !== null);

  useEffect(() => {}, []);

  if (!isLoggedIn) return <AuthenticationGuardAlert needMainTwitchAccount />;

  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Subscriptions
      </Heading>
      <Flex direction="row" justifyContent="center" alignItems="center" w="full" mb="3">
        <Box w="50%">
          <Heading as="h3" size="md">
            Event name
          </Heading>
        </Box>
        <Box flex="1">
          <Heading as="h3" size="md">
            Enabled
          </Heading>
        </Box>
      </Flex>
      <Flex direction="column" gap="2">
        {Object.values(TwitchSubscriptionType).map((item) => {
          return (
            <FormControl key={item} display="flex" alignItems="center" w="full">
              <FormLabel htmlFor="email-alerts" mb="0" w="50%" mr="0">
                {item}
              </FormLabel>
              <Switch id="email-alerts" />
            </FormControl>
          );
        })}
      </Flex>
    </Flex>
  );
}
