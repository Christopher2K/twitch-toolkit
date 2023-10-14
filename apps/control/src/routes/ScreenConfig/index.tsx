import { Heading, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';

import { ComputerScreenForm, Form as ComputerScreenFormType } from './ComputerScreenForm';
import { TalkScreenForm, Form as TalkScreenFormType } from './TalkScreenForm';
import { AudioGuestsScreenForm, Form as AudioGuestsScreenFormType } from './AudioGuestsScreenForm';
import { VideoGuestsScreenForm, Form as VideoGuestsScreenFormType } from './VideoGuestsScreenForm';
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
            <Tab>Computer screen</Tab>
            <Tab>Talk screen</Tab>
            <Tab>Audio guest screen</Tab>
            <Tab>Video guest screen</Tab>
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
          </TabPanels>
        </Tabs>
      )}
    </Flex>
  );
}
