import { Outlet } from '@tanstack/react-router';
import { BotIcon, CogIcon, LayoutDashboardIcon, ScreenShareIcon } from 'lucide-react';

import { css } from '@style/css';
import { NavItem } from '@/components/NavItem';

export function Root() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 'full',
        height: 'full',
      })}
    >
      <nav
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRightWidth: 'thin',
          borderRightStyle: 'solid',
          borderRightColor: 'neutral.200',
          background: 'bg.subtle',
          width: '260px',
          height: 'full',
        })}
      >
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
      </nav>
      <main
        className={css({
          px: '4',
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}
