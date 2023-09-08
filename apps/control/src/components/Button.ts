import type { ComponentPropsWithoutRef } from 'react';
import { ark } from '@ark-ui/react';

import { styled } from '@style/jsx';
import { button, type ButtonVariantProps } from '@style/recipes';

export type ButtonProps = ButtonVariantProps & ComponentPropsWithoutRef<typeof ark.button>;
export const Button = styled(ark.button, button);
