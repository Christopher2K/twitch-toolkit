import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from '@chakra-ui/react';

export function ComputerScreenForm() {
  return (
    <Flex as="form" direction="column" gap="5">
      <FormControl>
        <FormLabel htmlFor="banner">Banner</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input type="text" />
      </FormControl>

      <FormControl>
        <Checkbox defaultChecked>Focus mode</Checkbox>
      </FormControl>

      <FormControl>
        <Button type="submit" colorScheme="teal">
          Update
        </Button>
      </FormControl>
    </Flex>
  );
}
