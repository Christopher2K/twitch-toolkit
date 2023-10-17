import React from 'react';
import { motion } from 'framer-motion';

import FlexinFaceIcon from '~/components/icons/flexin_face.svg';
import { css } from '~/styled-system/css';
import { vstack, hstack } from '~/styled-system/patterns';

export type AlertItemProps = {};

export function AlertItem({}: AlertItemProps) {
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
          Nouvel abonnement!
        </p>
        <p className={css({ textAlign: 'left', fontSize: 'six' })}>
          Merci la mif! <span>LLCoolChris_</span>
        </p>
      </div>
    </motion.div>
  );
}
