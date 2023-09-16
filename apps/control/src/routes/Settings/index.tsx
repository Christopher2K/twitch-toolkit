import { Heading, Flex } from '@chakra-ui/react';

import { AdminAccount } from './AdminAccount';
import { TwitchConnect } from './TwitchConnect';

export function Settings() {
  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Settings
      </Heading>
      <Flex direction="column" w="full" gap={10}>
        <AdminAccount />
        <TwitchConnect />
      </Flex>
    </Flex>
  );
}
