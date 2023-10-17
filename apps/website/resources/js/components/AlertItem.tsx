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
      return 'Nouveau sub!!';
    default:
      return 'Nouvel event: ' + event.__type;
  }
}

function getEventUser(event: TwitchEvent) {
  switch (event.__type) {
    case TwitchSubscriptionType.ChannelSubscribe:
      return event.user_name;
    default:
      return '';
  }
}

function getEventAcknowledgement(event: TwitchEvent) {
  switch (event.__type) {
    case TwitchSubscriptionType.ChannelSubscribe:
      return 'Merci la mif!!!';
    default:
      return '';
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
        w: 'fit-content',
        h: 'fit-content',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'accent',
        gap: '5',
        px: '5',
        py: '2',
        rounded: 'md',
        borderColor: 'white',
        borderWidth: 'thick',
      })}
    >
      <FlexinFaceIcon className={css({ width: '40px', h: 'auto' })} />
      <div className={vstack({ gap: 0, alignItems: 'flex-start' })}>
        <p
          className={css({
            fontSize: 'seven',
            textAlign: 'left',
          })}
        >
          {getEventTitle(event)}
        </p>
        <p className={css({ textAlign: 'left', fontSize: 'six' })}>
          {getEventAcknowledgement(event)} <span>{getEventUser(event)}</span>
        </p>
      </div>
    </motion.div>
  );
}
