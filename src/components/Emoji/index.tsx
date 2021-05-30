import { memo, FC, HTMLProps } from 'react';
import cx from 'clsx';
import styles from './style.module.scss';

type Props = {
  'aria-label': string;
  emoji: string;
} & HTMLProps<HTMLSpanElement>;

const Emoji: FC<Props> = memo(({ emoji, className, ...props }) => {
  return (
    <span {...props} className={cx(styles.emoji, className)} role="img">
      {emoji}
    </span>
  );
});

Emoji.displayName = 'Emoji';

export default Emoji;
