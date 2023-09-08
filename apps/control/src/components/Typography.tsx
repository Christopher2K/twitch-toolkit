import { type ElementType, type HTMLProps } from 'react';
import { cva, type RecipeVariantProps, cx } from '@style/css';

const typographyStyle = cva({
  base: {},
  variants: {
    tag: {
      h1: {
        fontSize: '3xl',
        fontWeight: 'medium',
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'medium',
      },
      h3: {
        fontSize: 'xl',
      },
      p: {
        fontSize: 'md',
      },
      label: {
        fontSize: 'sm',
      },
    },
  },
  defaultVariants: {
    tag: 'p',
  },
});

type AvailableTags = Exclude<RecipeVariantProps<typeof typographyStyle>, undefined>['tag'];

type TypographyProps<T extends AvailableTags> = {
  tag?: T;
} & HTMLProps<T>;

export function Typography<T extends AvailableTags = 'p'>({
  tag,
  className,
  ...props
}: TypographyProps<T>) {
  const Tag = `${tag ?? 'p'}` as ElementType;
  const elmClassName = cx(typographyStyle({ tag }), className);

  return <Tag className={elmClassName} {...props} />;
}
