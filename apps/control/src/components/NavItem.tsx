import { type PropsWithChildren } from 'react';
import { Box, useToken } from '@chakra-ui/react';
import { Link, LinkPropsOptions } from '@tanstack/react-router';

type NavLinkProps = PropsWithChildren<LinkPropsOptions> & {
  icon: JSX.Element;
};

export function NavItem({ children, icon, ...props }: NavLinkProps) {
  const [gray300] = useToken('colors', ['gray.300']);
  return (
    <Box
      {...props}
      as={Link}
      display="inline-flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap="3"
      fontWeight="normal"
      fontSize="lg"
      p="3"
      w="full"
      _hover={{
        background: 'gray.200',
      }}
      activeProps={{
        style: {
          background: gray300,
        },
      }}
    >
      {icon}
      {children}
    </Box>
  );
}
