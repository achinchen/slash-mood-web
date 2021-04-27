import { FC } from 'react';
import cx from 'clsx';
import styles from './style.module.scss';

type Props = {
  icon: string;
  'aria-label': string;
} & React.ComponentProps<'button'>;

const IconButton: FC<Props> = ({ icon, className, ...props }) => (
  <button className={cx(className, styles.iconButton)} {...props}>
    <img
      className={styles.iconButtonImage}
      src={`/images/icon/${icon}.svg`}
      alt={props['aria-label']}
    />
  </button>
);

export default IconButton;
