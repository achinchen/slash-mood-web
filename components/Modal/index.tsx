import {
  useState,
  useRef,
  HTMLProps,
  cloneElement,
  FC,
  ReactElement
} from 'react';
import ReactDom from 'react-dom';
import cx from 'clsx';
import useESC from 'hooks/useESC';
import useActiveClose from 'hooks/useActiveClose';
import usePortal from 'hooks/usePortal';
import IconButton from 'components/IconButton';
import styles from './style.module.scss';

interface Props extends HTMLProps<HTMLElement> {
  closed?: boolean;
  children: ReactElement;
  withClose?: boolean;
  onClose?: () => void;
  isActiveClose?: boolean;
  className?: string;
  title?: string;
}

const Modal: FC<Props> = ({
  closed = false,
  children,
  withClose,
  onClose,
  isActiveClose,
  title
}) => {
  const [isClosed, seIsClosed] = useState(closed);
  const self = useRef<HTMLDivElement>(null);

  const triggerClose = () => {
    seIsClosed(true);
    onClose?.();
  };

  useESC({ onClose: triggerClose });
  useActiveClose({ onClose: triggerClose, enabled: isActiveClose });
  const target = usePortal({ closed: isClosed });

  return ReactDom.createPortal(
    <div className={cx(styles.dialog)} aria-hidden={isClosed} ref={self}>
      <div id="dialog-scrim" className={styles.dialogScrim} />
      <div
        className={styles.dialogRoot}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
      >
        {title && (
          <h2 className={styles.dialogTitle} id="dialog-title">
            {title}
          </h2>
        )}
        {withClose && (
          <IconButton
            aria-label="關閉"
            className={styles.dialogClose}
            icon="close"
            size="sm"
            onClick={triggerClose}
          />
        )}
        <div className={styles.dialogContent} id="dialog-content">
          {cloneElement(children, { close: triggerClose })}
        </div>
      </div>
    </div>,
    target
  );
};

export default Modal;
