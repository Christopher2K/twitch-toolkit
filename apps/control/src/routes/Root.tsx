import { Outlet } from '@tanstack/react-router';

import { css } from '@style/css';
import { NavItem } from '@/components/NavItem';
import { BotIcon, CogIcon, ScreenShareIcon } from 'lucide-react';

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
        <NavItem to="/" icon={<BotIcon />}>
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
          px: '2',
          py: '4',
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}
