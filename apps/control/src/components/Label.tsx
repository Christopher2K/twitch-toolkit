import type { ComponentPropsWithoutRef } from 'react';
import { ark } from '@ark-ui/react';

import { styled } from '@style/jsx';
import { label, type LabelVariantProps } from '@style/recipes';

export type LabelProps = LabelVariantProps & ComponentPropsWithoutRef<typeof ark.label>;
export const Label = styled(ark.label, label);
