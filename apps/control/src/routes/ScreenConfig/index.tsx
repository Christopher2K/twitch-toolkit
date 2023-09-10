import {
  Heading,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import { ComputerScreenForm } from './ComputerScreenForm';
import { TalkScreenForm } from './TalkScreenForm';
import { GuestScreenForm } from './GuestScreenForm';

export function ScreenConfig() {
  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Screen configuration
      </Heading>

      <Tabs>
        <TabList>
          <Tab>Computer screen</Tab>
          <Tab>Talk screen</Tab>
          <Tab>Guest screen</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ComputerScreenForm />
          </TabPanel>
          <TabPanel>
            <TalkScreenForm />
          </TabPanel>
          <TabPanel>
            <GuestScreenForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
