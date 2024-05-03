import React from 'react';
import { motion } from 'framer-motion';

import { TwitchEvent, TwitchSubscriptionType } from '@twitchtoolkit/types';

import FlexinFaceIcon from '~/components/icons/flexin_face.svg';
import { css } from '~/styled-system/css';
import { vstack, hstack } from '~/styled-system/patterns';

export type AlertItemProps = {
  event: TwitchEvent;
};

function getEventTitle(event: TwitchEvent) {
  switch (event.__type) {
    case TwitchSubscriptionType.ChannelSubscribe:
    case TwitchSubscriptionType.ChannelSubscriptionMessage:
      return 'Nouveau sub!!';
    case TwitchSubscriptionType.ChannelFollow:
      return 'Nouveau follow!!';
    case TwitchSubscriptionType.ChannelSubscriptionGift:
    case TwitchSubscriptionType.ChannelCheer:
      return 'Un cadeau!!';
    case TwitchSubscriptionType.ChannelRaid:
      return 'RAID!!';
  }
}

function getEventUser(event: TwitchEvent) {
  switch (event.__type) {
    case TwitchSubscriptionType.ChannelSubscribe:
    case TwitchSubscriptionType.ChannelCheer:
    case TwitchSubscriptionType.ChannelFollow:
    case TwitchSubscriptionType.ChannelSubscriptionMessage:
      return event.user_name;
    case TwitchSubscriptionType.ChannelSubscriptionGift:
      return event.is_anonymous ? '[HUMAIN MYSTÈRE]' : event.user_name;
    case TwitchSubscriptionType.ChannelRaid:
      return event.from_broadcaster_user_name;
  }
}

function getEventAcknowledgement(event: TwitchEvent) {
  switch (event.__type) {
    case TwitchSubscriptionType.ChannelFollow:
      return 'Bienvenue boss!';
    case TwitchSubscriptionType.ChannelSubscribe:
    case TwitchSubscriptionType.ChannelSubscriptionMessage:
    case TwitchSubscriptionType.ChannelCheer:
      return 'Merci la mif!';
    case TwitchSubscriptionType.ChannelSubscriptionGift:
      return `Merci pour les ${event.total} subs!`;
    case TwitchSubscriptionType.ChannelRaid:
      return `${event.viewers} nouveaux nerds!!!`;
  }
}

export function AlertItem({ event }: AlertItemProps) {
  return (
    <motion.div
      key="alert"
      initial={{
        transform: 'translateX(calc(-100% - 50px))',
        opacity: 0,
      }}
      animate={{
        transform: 'translateX(0)',
        opacity: 1,
      }}
      exit={{
        transform: 'translateX(calc(-100% - 50px))',
        opacity: 0,
      }}
      className={hstack({
        layerStyle: 'card',
        w: 'fit-content',
        h: 'fit-content',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'desktop',
        gap: '5',
        px: '5',
        py: '2',
      })}
    >
      <FlexinFaceIcon className={css({ width: '40px', h: 'auto' })} />
      <div className={vstack({ gap: 0, alignItems: 'flex-start' })}>
        <p
          className={css({
            textStyle: 'xl',
            textAlign: 'left',
          })}
        >
          {getEventTitle(event)}
        </p>
        <p className={css({ textAlign: 'left', textStyle: '3xl' })}>
          {getEventAcknowledgement(event)}{' '}
          <span
            className={css({
              color: 'accent',
            })}
          >
            {getEventUser(event)}
          </span>
        </p>
      </div>
    </motion.div>
  );
}
