import { Heading, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import { useScreenConfigurationStore } from '@/stores/screenConfiguration';

import { GlobalForm, Form as GlobalFormType } from './GlobalForm';
import { ComputerScreenForm, Form as ComputerScreenFormType } from './ComputerScreenForm';
import { GuestsScreensForm, Form as GuestScreensFormType } from './GuestsScreensForm';

export function ScreenConfig() {
  const { request, ready, loading, update, data } = useScreenConfigurationStore();

  function onComputerScreenFormSubmit(data: ComputerScreenFormType) {
    update({
      type: 'computer',
      ...data,
    });
  }

  function onGlobalFormSubmit(data: GlobalFormType) {
    update({
      type: 'global',
      ...data,
    });
  }

  function onGuestsFormSubmit(data: GuestScreensFormType) {
    update({
      type: 'guests',
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
            <Tab>Global</Tab>
            <Tab>Computer</Tab>
            <Tab>Guests</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <GlobalForm onSubmit={onGlobalFormSubmit} initialData={data?.global} />
            </TabPanel>
            <TabPanel>
              <ComputerScreenForm
                onSubmit={onComputerScreenFormSubmit}
                initialData={data?.computer}
              />
            </TabPanel>
            <TabPanel>
              <GuestsScreensForm onSubmit={onGuestsFormSubmit} initialData={data?.guests} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Flex>
  );
}
