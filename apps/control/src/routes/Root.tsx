import { Outlet } from '@tanstack/react-router';

import { css } from '@style/css';

export function Root() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        background: 'bg.subtle',
        width: 'full',
        height: 'full',
      })}
    >
      <nav
        className={css({
          borderRightWidth: 'thin',
          borderRightStyle: 'solid',
          borderRightColor: 'neutral.200',
          width: '240px',
          height: 'full',
          px: '2',
          py: '4',
        })}
      >
        Navigation
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
