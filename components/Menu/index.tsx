import { useState, useEffect, useRef, FC } from 'react';
import cx from 'clsx';
import IconButton from '../IconButton';
import Button from '../Button';
import styles from './style.module.scss';

type Props = {
  id: string;
  menuLabel: string;
  editLabel: string;
  onEdit: () => void;
  deleteLabel: string;
  onDelete: () => void;
  disabled?: boolean;
} & React.ComponentProps<'div'>;

const Menu: FC<Props> = ({
  id,
  menuLabel,
  editLabel,
  onEdit,
  deleteLabel,
  onDelete,
  disabled
}) => {
  const [expanded, setExpanded] = useState(false);
  const self = useRef<HTMLDivElement>(null);
  const onMenu = () => setExpanded((expanded) => !expanded);

  useEffect(() => {
    if (!self.current) return undefined;

    const onClick = (event: MouseEvent) => {
      if (self.current?.contains(event.target as Node)) return;
      if (expanded) setExpanded(false);
    };

    if (expanded) {
      document.addEventListener('click', onClick);
    } else {
      document.removeEventListener('click', onClick);
    }

    return () => document.removeEventListener('click', onClick);
  }, [expanded, self]);

  return (
    <div className={styles.menu}>
      <IconButton
        id={`mood-${id}`}
        className={styles.menuButton}
        aria-haspopup
        aria-label={menuLabel}
        icon="more"
        onClick={onMenu}
      />
      {expanded && (
        <div
          role="menu"
          tabIndex={expanded ? 0 : -1}
          aria-labelledby={`mood-${id}`}
          className={cx(styles.menuOption)}
          ref={self}
        >
          <Button
            className={styles.menuOptionButton}
            color="light"
            role="menuitem"
            aria-label={editLabel}
            fullwidth
            disabled={disabled}
            onClick={onEdit}
          >
            編輯
          </Button>
          <Button
            className={styles.menuOptionButton}
            color="light"
            role="menuitem"
            aria-label={deleteLabel}
            fullwidth
            disabled={disabled}
            onClick={onDelete}
          >
            刪除
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menu;
