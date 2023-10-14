import { useEffect, useState } from 'react';
import { Heading, Flex, Spinner } from '@chakra-ui/react';

import { TwitchSubscriptionType } from '@twitchtoolkit/types';

import { AuthenticationGuardAlert } from '@/components';
import { useAuthStore } from '@/stores/auth';
import { useTwitchSubscriptionsStore } from '@/stores/twitchSubscriptions';

import { SubscriptionsForm } from './SubscriptionsForm';

export function Subscriptions() {
  const [optimisticSubcriptionsState, setOptimisticSubscriptionState] = useState<
    Partial<Record<TwitchSubscriptionType, boolean>>
  >({});

  const isLoggedIn = useAuthStore((state) => state.user !== null);
  const subscriptions = useTwitchSubscriptionsStore((state) => state.subscriptions);
  const isReady = useTwitchSubscriptionsStore((state) => state.ready);
  const { getSubscriptions, createSubscription, deleteSubscription } = useTwitchSubscriptionsStore(
    (state) => ({
      getSubscriptions: state.request,
      createSubscription: state.create,
      deleteSubscription: state.delete,
    }),
  );

  function onFormValueChanged(value: boolean, type: TwitchSubscriptionType) {
    setOptimisticSubscriptionState((state) => ({ ...state, [type]: value }));
    const operation = value ? createSubscription : deleteSubscription;

    operation(type).then((isDone) => {
      if (!isDone) {
        setOptimisticSubscriptionState((state) => ({ ...state, [type]: !value }));
      }
    });
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  useEffect(() => {
    setOptimisticSubscriptionState(
      subscriptions.reduce<Partial<Record<TwitchSubscriptionType, boolean>>>(
        (acc, subscription) => {
          return {
            ...acc,
            [subscription.subscriptionType]: true,
          };
        },
        {},
      ),
    );
  }, [subscriptions]);

  if (!isReady) return <Spinner />;

  if (!isLoggedIn) return <AuthenticationGuardAlert needMainTwitchAccount />;

  return (
    <Flex direction="column" width="full">
      <Heading as="h1" mb="5">
        Subscriptions
      </Heading>
      <SubscriptionsForm
        onValueChange={onFormValueChanged}
        subscriptionsMap={optimisticSubcriptionsState}
      />
    </Flex>
  );
}
