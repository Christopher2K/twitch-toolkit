import { Heading, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { Accounts } from './Accounts';

export function Settings() {
  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Settings
      </Heading>
      <Tabs isLazy>
        <TabList>
          <Tab>Accounts</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Accounts />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
