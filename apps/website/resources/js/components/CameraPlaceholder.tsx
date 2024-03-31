import React from 'react';
import { cx, cva } from '~/styled-system/css';

const cameraPlaceholderStyle = cva({
  base: {
    bg: 'placeholder',
    flexShrink: '0',
  },
  variants: {
    alternateColor: {
      true: {
        bg: 'placeholder-2',
      },
    },
    full: {
      true: {
        width: 'full',
        height: 'full',
      },
    },
  },
});

type CameraPlaceholderProps = {
  full?: boolean;
  className?: string;
};

export function CameraPlaceholder({ className, full = false }: CameraPlaceholderProps) {
  return <div className={cx(cameraPlaceholderStyle({ full }), className)} />;
}
