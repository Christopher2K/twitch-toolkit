import { Fragment } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MinusIcon } from 'lucide-react';
import { Box, Flex, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';

import { GuestsScreensConfig, defaultGuestsScreensConfig } from '@twitchtoolkit/types';

export type Form = Omit<GuestsScreensConfig, 'type'>;

export type GuestsScreensForm = {
  initialData?: Form;
  onSubmit: (data: Form) => void;
};

export function GuestsScreensForm({
  initialData = defaultGuestsScreensConfig,
  onSubmit,
}: GuestsScreensForm) {
  const { control, register, handleSubmit } = useForm<Form>({
    defaultValues: initialData,
  });
  const { append, remove, fields } = useFieldArray({ control, name: 'guests' });

  return (
    <Flex as="form" direction="column" gap="5" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Flex direction="column" gap="3" pl="5" borderLeftStyle="solid" borderLeftWidth="thick">
            <Flex direction="row" alignItems="center" gap="3">
              <Heading as="p" size="md">
                Guest #{index + 1}
              </Heading>

              <Button onClick={() => remove(index)} size="sm" colorScheme="blue">
                <MinusIcon size={12} />
              </Button>
            </Flex>
            <FormControl>
              <FormLabel htmlFor={`name-${index}`}>Name #{index + 1}</FormLabel>
              <Input type="text" {...register(`guests.${index}.name`)} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor={`description-${index}`}>Description #{index + 1}</FormLabel>
              <Input type="text" {...register(`guests.${index}.description`)} />
            </FormControl>
          </Flex>
        </Fragment>
      ))}

      <Box pl="5" borderLeftStyle="solid" borderLeftWidth="thick" borderColor="transparent">
        <Button onClick={() => append({ name: '', description: '' })} size="sm" colorScheme="blue">
          Add a guest
        </Button>
      </Box>

      <FormControl>
        <Button type="submit" colorScheme="teal">
          Update
        </Button>
      </FormControl>
    </Flex>
  );
}
