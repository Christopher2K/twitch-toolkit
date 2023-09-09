import type { ComponentPropsWithoutRef } from 'react';
import { ark } from '@ark-ui/react';

import { styled } from '@style/jsx';
import { input, type InputVariantProps } from '@style/recipes';

export type InputProps = InputVariantProps & ComponentPropsWithoutRef<typeof ark.input>;
export const Input = styled(ark.input, input);
