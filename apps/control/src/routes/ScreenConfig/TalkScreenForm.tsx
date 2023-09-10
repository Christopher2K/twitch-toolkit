import { Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export function TalkScreenForm() {
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
        <Button type="submit" colorScheme="teal">
          Update
        </Button>
      </FormControl>
    </Flex>
  );
}
