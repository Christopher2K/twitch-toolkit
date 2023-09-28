import { Outlet } from '@tanstack/react-router';
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Flex,
} from '@chakra-ui/react';
import {
  BotIcon,
  CogIcon,
  LayoutDashboardIcon,
  ScreenShareIcon,
  RefreshCwIcon,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { NavItem } from '@/components/NavItem';
import { useAuthStore } from '@/stores/auth';

export function Root() {
  const isLogged = useAuthStore((state) => state.user !== null);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="full"
      height="100%"
      bg="gray.50"
    >
      <Box
        as="nav"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        borderRightWidth="thin"
        borderRightStyle="solid"
        borderRightColor="gray.200"
        background="gray.100"
        width="280px"
        height="full"
        pt="40px"
      >
        <Heading px="4" mb="5">
          Twitch Toolkit
        </Heading>
        {!isLogged && (
          <Alert flexDir="column" justifyContent="flex-start" alignItems="flex-start">
            <Flex flexDir="row">
              <AlertIcon />
              <AlertTitle mr={2}>Read only!</AlertTitle>
            </Flex>
            <AlertDescription>
              <Text as={Link} to="/settings" textDecoration="underline">
                Login
              </Text>
              &nbsp;to enable editing.
            </AlertDescription>
          </Alert>
        )}
        <NavItem to="/" icon={<LayoutDashboardIcon />}>
          Dashboard
        </NavItem>
        <NavItem to="/commands" icon={<BotIcon />}>
          Commands
        </NavItem>
        <NavItem to="/screen-config" icon={<ScreenShareIcon />}>
          Screen configuration
        </NavItem>
        <NavItem to="/subscriptions" icon={<RefreshCwIcon />}>
          Subscriptions
        </NavItem>
        <NavItem to="/settings" icon={<CogIcon />}>
          Settings
        </NavItem>
      </Box>
      <Box as="main" px="4" pt="9" height="full" flex="1" overflowY="auto">
        <Outlet />
      </Box>
    </Box>
  );
}
