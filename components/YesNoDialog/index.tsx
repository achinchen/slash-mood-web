import { useState, useEffect, HTMLProps, FC } from 'react';
import ReactDOM from 'react-dom';
import cx from 'clsx';
import useESC from 'hooks/useESC';
import useActiveClose from 'hooks/useActiveClose';
import IconButton from 'components/IconButton';
import Button from 'components/Button';
import styles from './style.module.scss';
import { PORTAL_ID } from 'pages/_app';

const getPortalDom = () => {
  const dialogDom = document.getElementById(PORTAL_ID) as HTMLElement;
  if (dialogDom?.childElementCount) ReactDOM.unmountComponentAtNode(dialogDom);
  return dialogDom;
};

interface Props extends HTMLProps<HTMLElement> {
  closed?: boolean;
  children: string;
  onConfirm?: () => void;
  withCancel?: boolean;
  onCancel?: () => void;
  withClose?: boolean;
  onClose?: () => void;
  isActiveClose?: boolean;
  className?: string;
  title?: string;
}

const YesNoDialog: FC<Props> = ({
  closed = false,
  children,
  withCancel,
  onCancel,
  withClose,
  onClose,
  onConfirm,
  isActiveClose,
  title
}) => {
  const [isClosed, seIsClosed] = useState(closed);
  const [self, setSelf] = useState<HTMLElement>();

  const triggerClose = () => {
    seIsClosed(true);
    onClose?.();
  };

  const onClick = (buttonType: 'cancel' | 'confirm') => () => {
    if (buttonType === 'confirm') {
      if (onConfirm) onConfirm();
    } else {
      if (onCancel) onCancel();
    }
    triggerClose();
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
        <div className={styles.dialogButton}>
          {withCancel && (
            <Button
              color="light"
              size="xs"
              className={styles.dialogButtonItem}
              onClick={onClick('cancel')}
            >
              取消
            </Button>
          )}
          <Button
            color="dark"
            size="xs"
            className={styles.dialogButtonItem}
            onClick={onClick('confirm')}
          >
            確認
          </Button>
        </div>
      </div>
    </div>,
    self
  );
};

export default YesNoDialog;
