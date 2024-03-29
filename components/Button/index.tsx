import { FC, ReactNode } from 'react';
import cx from 'clsx';
import styles from './style.module.scss';

type Props = {
  children: string | ReactNode;
  color: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullwidth?: boolean;
} & React.ComponentProps<'button'>;

const Button: FC<Props> = ({
  children,
  className,
  size,
  color,
  fullwidth,
  ...props
}) => (
  <button
    className={cx(
      className,
      styles.button,
      styles[color],
      size && styles[size],
      {
        [styles.fullwidth]: fullwidth
      }
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
