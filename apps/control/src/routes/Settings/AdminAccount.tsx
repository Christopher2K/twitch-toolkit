import { Button, Input, Label, Typography } from '@/components';
import { Stack } from '@style/jsx';

export function AdminAccount() {
  return (
    <Stack>
      <Typography tag="h2">Admin account</Typography>

      <Stack gap="5" width="sm">
        <Stack gap="1" width="sm">
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" />
        </Stack>
        <Stack gap="1" width="sm">
          <Label htmlFor="passowrd">Password</Label>
          <Input name="password" type="password" />
        </Stack>
        <Button type="submit">Connect</Button>
      </Stack>
    </Stack>
  );
}
