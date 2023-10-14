import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

export type AuthenticationGuardAlertProps = {
  needMainTwitchAccount?: boolean;
  needBotTwitchAccount?: boolean;
};

export function AuthenticationGuardAlert({
  needMainTwitchAccount,
  needBotTwitchAccount,
}: AuthenticationGuardAlertProps) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Authorization required!</AlertTitle>
      <AlertDescription>
        Please login before accessing this screen.
        {needMainTwitchAccount && <> You also need to be logged-in with your Twitch main account</>}
        {needBotTwitchAccount && <>You also need to be logged-in with your Twitch bot account</>}
      </AlertDescription>
    </Alert>
  );
}
