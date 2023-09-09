import { Button, Input, Label, Typography } from '@/components';
import { css } from '@style/css';
import { Flex } from '@style/jsx';

import { AdminAccount } from './AdminAccount';

export function Settings() {
  return (
    <Flex direction="column" width="full">
      <Typography tag="h1" className={css({ mb: '4' })}>
        Settings
      </Typography>

      <AdminAccount />
    </Flex>
  );
}
