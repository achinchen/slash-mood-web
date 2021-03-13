import { FC } from 'react';
import styles from './style.module.scss';

type Props = {
  children: string;
} & React.ComponentProps<'button'>;

const Button: FC<Props> = ({ children }) => (
  <button className={styles.button}>{children}</button>
);

export default Button;
