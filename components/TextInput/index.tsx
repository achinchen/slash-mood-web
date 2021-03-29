import { useState, FC, HTMLProps, ChangeEvent, FocusEvent } from 'react';
import cx from 'clsx';
import styles from './style.module.scss';

type Props = {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  label?: string;
  helperText?: string;
} & HTMLProps<HTMLInputElement>;

const TextInput: FC<Props> = ({
  className = '',
  onChange,
  onValueChange,
  onBlur,
  placeholder = ' ',
  label,
  value,
  helperText,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const onFocus = () => setFocus((focus) => !focus);
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onFocus();
    onBlur?.(event);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
    onChange?.(event);
  };

  return (
    <label className={cx(styles.field, className)}>
      {label && (
        <span
          className={cx(styles.fieldLabel, {
            [styles.focus]: focus || !!value
          })}
        >
          {label}
        </span>
      )}
      <input
        value={value}
        className={cx(styles.fieldInput, {
          [styles.invalid]: !!helperText
        })}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        {...props}
      />
      {helperText && (
        <span className={styles.fieldHelperText}>{helperText}</span>
      )}
    </label>
  );
};

export default TextInput;
