import { useForm } from 'react-hook-form';
import { Flex, FormControl, Button, Checkbox } from '@chakra-ui/react';

import { ComputerScreenConfig, defaultComputerScreenConfig } from '@twitchtoolkit/types';

export type Form = Omit<ComputerScreenConfig, 'type'>;

export type ComputerScreenFormProps = {
  initialData?: Form;
  onSubmit: (data: Form) => void;
};

export function ComputerScreenForm({
  initialData = defaultComputerScreenConfig,
  onSubmit,
}: ComputerScreenFormProps) {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: initialData,
  });

  return (
    <Flex as="form" direction="column" gap="5" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Checkbox {...register('focusMode')}>Focus mode</Checkbox>
      </FormControl>

      <FormControl>
        <Button type="submit" colorScheme="teal">
          Update
        </Button>
      </FormControl>
    </Flex>
  );
}
