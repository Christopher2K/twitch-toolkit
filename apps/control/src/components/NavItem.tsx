import { type PropsWithChildren } from 'react';
import { Link, LinkPropsOptions } from '@tanstack/react-router';

import { cva } from '@style/css';

const navItemStyle = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '3',
    fontWeight: 'normal',
    fontSize: 'xl',
    p: '3',
    w: 'full',
    _hover: {
      background: 'neutral.200',
    },
  },
  variants: {
    active: {
      true: {
        background: 'neutral.300',
        _hover: {
          background: 'neutral.300 !important',
        },
      },
    },
  },
});

type NavLinkProps = PropsWithChildren<LinkPropsOptions> & {
  icon: JSX.Element;
};

export function NavItem({ children, icon, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      className={navItemStyle({ active: false })}
      activeProps={{
        className: navItemStyle({ active: true }),
      }}
    >
      {icon}
      {children}
    </Link>
  );
}
