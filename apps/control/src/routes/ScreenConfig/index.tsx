import { Heading, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';

import { ComputerScreenForm, Form as ComputerScreenFormType } from './ComputerScreenForm';
import { TalkScreenForm, Form as TalkScreenFormType } from './TalkScreenForm';
import { GuestScreenForm, Form as GuestScreenFormType } from './GuestScreenForm';
import { useScreenConfigurationStore } from '@/stores/screenConfiguration';

export function ScreenConfig() {
  const { request, ready, loading, update, data } = useScreenConfigurationStore();

  function onComputerScreenFormSubmit(data: ComputerScreenFormType) {
    update({
      type: 'computer',
      ...data,
    });
  }

  function onTalkScreenFormSubmit(data: TalkScreenFormType) {
    update({
      type: 'talk',
      ...data,
    });
  }

  function onGuestScreenFormSubmit(data: GuestScreenFormType) {
    update({
      type: 'guest',
      ...data,
    });
  }

  if (!ready && !loading) {
    request();
  }

  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Screen configuration
      </Heading>
      {!ready && <Spinner />}
      {ready && (
        <Tabs>
          <TabList>
            <Tab>Computer screen</Tab>
            <Tab>Talk screen</Tab>
            <Tab>Guest screen</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ComputerScreenForm
                onSubmit={onComputerScreenFormSubmit}
                initialData={data?.computer}
              />
            </TabPanel>
            <TabPanel>
              <TalkScreenForm onSubmit={onTalkScreenFormSubmit} initialData={data?.talk} />
            </TabPanel>
            <TabPanel>
              <GuestScreenForm onSubmit={onGuestScreenFormSubmit} initialData={data?.guest} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Flex>
  );
}
