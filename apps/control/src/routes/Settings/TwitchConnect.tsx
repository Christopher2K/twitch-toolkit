import { useRef, useState } from 'react';

import { Box, Button, Heading, Flex } from '@chakra-ui/react';
import { WebviewWindow } from '@tauri-apps/api/window';
import { BotIcon, UserIcon } from 'lucide-react';
import { useTwitchAuthStore } from '@/stores/twitchAuth';

export function TwitchConnect() {
  const [waitingForMainWindowToClose, setWaitingForMainWindowToClose] = useState(false);
  const [waitingForBotWindowToClose, setWaitingForBotWindowToClose] = useState(false);
  const { checkAccount, checkingMainAccount, checkingBotAccount, mainAccount, botAccount } =
    useTwitchAuthStore();

  const mainAccountTwitchWindowRef = useRef<WebviewWindow | null>(null);
  const botAccountTwitchWindowRef = useRef<WebviewWindow | null>(null);

  const connectToMainAccount = () => {
    mainAccountTwitchWindowRef.current = new WebviewWindow('twitchLoginMain', {
      url: `${import.meta.env.VITE_API_URL}/auth/twitch/login?accountType=main`,
      focus: true,
    });

    setWaitingForMainWindowToClose(true);

    mainAccountTwitchWindowRef.current.onCloseRequested(() => {
      mainAccountTwitchWindowRef.current = null;
      setWaitingForMainWindowToClose(false);
      checkAccount('main');
    });
  };

  const connectToBotAccount = () => {
    botAccountTwitchWindowRef.current = new WebviewWindow('twitchLoginBot', {
      url: `${import.meta.env.VITE_API_URL}/auth/twitch/login?accountType=bot`,
      focus: true,
    });

    setWaitingForBotWindowToClose(true);

    botAccountTwitchWindowRef.current.onCloseRequested(() => {
      botAccountTwitchWindowRef.current = null;
      setWaitingForBotWindowToClose(false);
      checkAccount('bot');
    });
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb="5">
        Twitch link
      </Heading>
      <Flex
        direction="column"
        flexBasis="0"
        gap="4"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Button
          onClick={connectToMainAccount}
          colorScheme="teal"
          leftIcon={<UserIcon />}
          loadingText="Authenticating..."
          isLoading={waitingForMainWindowToClose || checkingMainAccount}
        >
          Connect to Twitch main account
        </Button>
        <Button
          onClick={connectToBotAccount}
          colorScheme="purple"
          leftIcon={<BotIcon />}
          loadingText="Authenticating..."
          isLoading={waitingForBotWindowToClose || checkingBotAccount}
        >
          Connect to Twitch Bot account
        </Button>
      </Flex>
    </Box>
  );
}
