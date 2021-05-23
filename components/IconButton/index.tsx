import { FC } from 'react';
import cx from 'clsx';
import styles from './style.module.scss';

type Props = {
  icon: string;
  'aria-label': string;
  size?: 'sm' | 'md';
} & React.ComponentProps<'button'>;

const IconButton: FC<Props> = ({ icon, className, size = 'md', ...props }) => (
  <button
    className={cx(className, styles.iconButton, size && styles[size])}
    {...props}
  >
    <img
      className={styles.iconButtonImage}
      src={`/images/icon/${icon}.svg`}
      alt={props['aria-label']}
    />
  </button>
);

export default IconButton;
