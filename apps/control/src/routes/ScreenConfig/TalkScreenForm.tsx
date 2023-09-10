import { useForm } from 'react-hook-form';
import { Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { TalkScreenConfig } from '@twitchtoolkit/types';

type Form = Omit<TalkScreenConfig, 'type'>;

export type TalkScreenFormProps = {
  initialData?: Form;
  onSubmit: (data: Form) => void;
};

export function TalkScreenForm({ initialData, onSubmit }: TalkScreenFormProps) {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: initialData,
  });

  return (
    <Flex as="form" direction="column" gap="5" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="banner">Banner</FormLabel>
        <Input type="text" {...register('banner')} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input type="text" {...register('title')} />
      </FormControl>

      <FormControl>
        <Button type="submit" colorScheme="teal">
          Update
        </Button>
      </FormControl>
    </Flex>
  );
}
