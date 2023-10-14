import { Heading, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';

import { ComputerScreenForm, Form as ComputerScreenFormType } from './ComputerScreenForm';
import { TalkScreenForm, Form as TalkScreenFormType } from './TalkScreenForm';
import { AudioGuestsScreenForm, Form as AudioGuestsScreenFormType } from './AudioGuestsScreenForm';
import { VideoGuestsScreenForm, Form as VideoGuestsScreenFormType } from './VideoGuestsScreenForm';
import {
  ComputerGuestsScreenForm,
  Form as ComputerGuestsScreenFormType,
} from './ComputerGuestsScreenForm';
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

  function onAudioGuestsScreenFormSubmit(data: AudioGuestsScreenFormType) {
    update({
      type: 'audioGuests',
      ...data,
    });
  }

  function onVideoGuestsScreenFormSubmit(data: VideoGuestsScreenFormType) {
    update({
      type: 'videoGuests',
      ...data,
    });
  }

  function onComputerGuestsScreenFormSubmit(data: ComputerGuestsScreenFormType) {
    update({
      type: 'computerGuests',
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
        <Tabs isLazy>
          <TabList>
            <Tab>Computer</Tab>
            <Tab>Talk</Tab>
            <Tab>Audio guests</Tab>
            <Tab>Video guests</Tab>
            <Tab>Computer guests</Tab>
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
              <AudioGuestsScreenForm
                onSubmit={onAudioGuestsScreenFormSubmit}
                initialData={data?.audioGuests}
              />
            </TabPanel>
            <TabPanel>
              <VideoGuestsScreenForm
                onSubmit={onVideoGuestsScreenFormSubmit}
                initialData={data?.videoGuests}
              />
            </TabPanel>

            <TabPanel>
              <ComputerGuestsScreenForm
                onSubmit={onComputerGuestsScreenFormSubmit}
                initialData={data?.computerGuests}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Flex>
  );
}
