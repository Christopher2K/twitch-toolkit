import { Heading, Flex } from '@chakra-ui/react'

import { AdminAccount } from './AdminAccount';

export function Settings() {
  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Settings
      </Heading>

      <AdminAccount />
    </Flex>
  );
}
