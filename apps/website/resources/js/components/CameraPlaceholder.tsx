import React from 'react';
import { cx, cva } from '~/styled-system/css';

const cameraPlaceholderStyle = cva({
  base: {
    bg: 'placeholder',
    borderWidth: '4px',
    borderColor: 'desktop-light',
    rounded: 'md',
    flexShrink: '0',
  },
  variants: {
    alternateColor: {
      true: {
        bg: 'placeholder-2',
      },
    },
    cameraType: {
      portrait: {
        aspectRatio: 'portrait',
      },
      landscape: {
        aspectRatio: 'landscape',
      },
    },
  },
});

type CameraPlaceholderProps = {
  cameraType: 'portrait' | 'landscape';
  alternateColor?: boolean;
  className?: string;
};

export function CameraPlaceholder({
  className,
  alternateColor = false,
  cameraType = 'landscape',
}: CameraPlaceholderProps) {
  return <div className={cx(cameraPlaceholderStyle({ alternateColor, cameraType }), className)} />;
}
