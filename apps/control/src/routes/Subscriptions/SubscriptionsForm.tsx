import { Box, Flex, Heading, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { TwitchSubscriptionType } from '@twitchtoolkit/types';

export type SubscriptionsFormType = {
  subscriptionsMap: Partial<Record<TwitchSubscriptionType, boolean>>;
  onValueChange: (value: boolean, subType: TwitchSubscriptionType) => unknown;
};

export function SubscriptionsForm({ onValueChange, subscriptionsMap }: SubscriptionsFormType) {
  return (
    <Box>
      <Flex direction="row" justifyContent="center" alignItems="center" w="full" mb="3">
        <Box w="50%">
          <Heading as="h3" size="md">
            Event name
          </Heading>
        </Box>
        <Box flex="1">
          <Heading as="h3" size="md">
            Enabled
          </Heading>
        </Box>
      </Flex>
      <Flex direction="column" gap="2">
        {Object.values(TwitchSubscriptionType).map((item) => {
          return (
            <FormControl key={item} display="flex" alignItems="center" w="full">
              <FormLabel htmlFor="email-alerts" mb="0" w="50%" mr="0">
                {item}
              </FormLabel>
              <Switch
                onChange={(e) => onValueChange(e.target.checked, item)}
                isChecked={subscriptionsMap[item] ?? false}
              />
            </FormControl>
          );
        })}
      </Flex>
    </Box>
  );
}
