import { useState, FocusEvent, Dispatch, SetStateAction } from 'react';
import isStrongPassword from 'validator/lib/isStrongPassword';

type ReturnValues = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordHelperText: string;
  onBlurPassword: (event: FocusEvent<HTMLInputElement>) => void;
};

function usePassword(initialValue?: string): ReturnValues {
  const [password, setPassword] = useState(initialValue || '');
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const onBlurPassword = (event: FocusEvent<HTMLInputElement>) => {
    setPasswordHelperText(
      isStrongPassword(event.target.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0
      })
        ? ''
        : '請填寫 8 個字元以上，至少包含 1 個小寫英文及 1 個數字'
    );
  };

  return { password, setPassword, passwordHelperText, onBlurPassword };
}

export default usePassword;
