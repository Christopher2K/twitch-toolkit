import { Outlet } from '@tanstack/react-router';
import { Box, Heading } from '@chakra-ui/react'
import { BotIcon, CogIcon, LayoutDashboardIcon, ScreenShareIcon } from 'lucide-react';

import { NavItem } from '@/components/NavItem';

export function Root() {
  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      width='full'
      height='100%'
      bg="gray.50"
    >
      <Box
        as='nav'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        borderRightWidth='thin'
        borderRightStyle='solid'
        borderRightColor='gray.200'
        background='gray.100'
        width='280px'
        height='full'
        pt="40px"
      >
        <Heading px="4" mb="5">Twitch Toolkit</Heading>
        <NavItem to="/" icon={<LayoutDashboardIcon />}>
          Dashboard
        </NavItem>
        <NavItem to="/commands" icon={<BotIcon />}>
          Commands
        </NavItem>
        <NavItem to="/screen-config" icon={<ScreenShareIcon />}>
          Screen configuration
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
