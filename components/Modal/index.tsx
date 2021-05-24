import { useState, HTMLProps, FC, ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import cx from 'clsx';
import useESC from 'hooks/useESC';
import useActiveClose from 'hooks/useActiveClose';
import IconButton from 'components/IconButton';
import styles from './style.module.scss';
import { PORTAL_ID } from 'pages/_app';

interface Props extends HTMLProps<HTMLElement> {
  closed?: boolean;
  children: ReactElement;
  withClose?: boolean;
  onClose?: () => void;
  isActiveClose?: boolean;
  className?: string;
  title?: string;
}

const getPortalDom = () => {
  const dialogDom = document.getElementById(PORTAL_ID) as HTMLElement;
  if (dialogDom?.childElementCount) ReactDOM.unmountComponentAtNode(dialogDom);
  return dialogDom;
};

const Modal: FC<Props> = ({
  closed = false,
  children,
  withClose,
  onClose,
  isActiveClose,
  title
}) => {
  const [isClosed, seIsClosed] = useState(closed);
  const [self, setSelf] = useState<HTMLElement>();

  const triggerClose = () => {
    seIsClosed(true);
    onClose?.();
  };

  useESC({ onClose: triggerClose });
  useActiveClose({ onClose: triggerClose, enabled: isActiveClose });
  useEffect(() => {
    setSelf(getPortalDom());
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--overflow',
      closed ? 'scroll' : 'hidden'
    );
  }, [closed]);

  if (!self) return null;

  return ReactDOM.createPortal(
    <div className={cx(styles.dialog)} aria-hidden={isClosed}>
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
          {children}
        </div>
      </div>
    </div>,
    self
  );
};

export default Modal;
