import { useRef, useState } from 'react';

import { Button, Heading, Flex, Text } from '@chakra-ui/react';
import { WebviewWindow } from '@tauri-apps/api/window';
import { BotIcon, UserIcon } from 'lucide-react';
import { useTwitchAuthStore } from '@/stores/twitchAuth';

export function TwitchConnect() {
  const [waitingForMainWindowToClose, setWaitingForMainWindowToClose] = useState(false);
  const [waitingForBotWindowToClose, setWaitingForBotWindowToClose] = useState(false);
  const { checkAccounts, checkingMainAccount, checkingBotAccount, mainAccount, botAccount } =
    useTwitchAuthStore();

  const mainAccountTwitchWindowRef = useRef<WebviewWindow | null>(null);
  const botAccountTwitchWindowRef = useRef<WebviewWindow | null>(null);

  const connectToMainAccount = async () => {
    mainAccountTwitchWindowRef.current = new WebviewWindow('twitchLoginMain', {
      url: `${import.meta.env.VITE_API_URL}/auth/twitch/login?accountType=main`,
      focus: true,
    });

    setWaitingForMainWindowToClose(true);

    const unlisten = await mainAccountTwitchWindowRef.current.onCloseRequested(() => {
      mainAccountTwitchWindowRef.current = null;
      setWaitingForMainWindowToClose(false);
      checkAccounts();
      unlisten();
    });
  };

  const connectToBotAccount = async () => {
    botAccountTwitchWindowRef.current = new WebviewWindow('twitchLoginBot', {
      url: `${import.meta.env.VITE_API_URL}/auth/twitch/login?accountType=bot`,
      focus: true,
    });

    setWaitingForBotWindowToClose(true);

    const unlisten = await botAccountTwitchWindowRef.current.onCloseRequested(() => {
      botAccountTwitchWindowRef.current = null;
      setWaitingForBotWindowToClose(false);
      checkAccounts();
      unlisten();
    });
  };

  return (
    <Flex direction="column" gap="5">
      <Heading as="h2" size="lg">
        Twitch link
      </Heading>
      <Flex
        direction="column"
        flexBasis="0"
        gap="4"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Heading as="h3" size="md">
          Main account
        </Heading>

        {mainAccount ? (
          <>
            <Text>
              🟢 Twitch main account: <span>{mainAccount}</span>
            </Text>
            {/* <Button colorScheme="red">Disconnect</Button> */}
          </>
        ) : (
          <Button
            onClick={connectToMainAccount}
            colorScheme="teal"
            leftIcon={<UserIcon />}
            loadingText="Authenticating..."
            isLoading={waitingForMainWindowToClose || checkingMainAccount}
          >
            Connect to Twitch main account
          </Button>
        )}
      </Flex>

      <Flex
        direction="column"
        flexBasis="0"
        gap="4"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Heading as="h3" size="md">
          Bot account
        </Heading>

        {botAccount ? (
          <>
            <Text>
              🟢 Twitch bot account: <span>{botAccount}</span>
            </Text>
            {/* <Button colorScheme="red">Disconnect</Button> */}
          </>
        ) : (
          <Button
            onClick={connectToBotAccount}
            colorScheme="teal"
            leftIcon={<BotIcon />}
            loadingText="Authenticating..."
            isLoading={waitingForBotWindowToClose || checkingBotAccount}
          >
            Connect to Twitch bot account
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
