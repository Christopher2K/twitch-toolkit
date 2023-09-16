import { Box, Button, Heading } from '@chakra-ui/react';
import { open } from '@tauri-apps/api/shell';

export function TwitchConnect() {
  const openTwitchLink = () => open('https://twitchtoolkit.local/api/auth/twitch/login');

  return (
    <Box>
      <Heading as="h2" size="lg" mb="5">
        Twitch link
      </Heading>
      <Button onClick={openTwitchLink}>Connect to Twitch</Button>
    </Box>
  );
}
