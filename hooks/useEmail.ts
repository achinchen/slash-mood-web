import { useState, FocusEvent, Dispatch, SetStateAction } from 'react';
import isEmail from 'validator/lib/isEmail';

type ReturnValues = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  emailHelperText: string;
  onBlurEmail: (event: FocusEvent<HTMLInputElement>) => void;
};

function useEmail(initialValue?: string): ReturnValues {
  const [email, setEmail] = useState(initialValue || '');
  const [emailHelperText, setEmailHelperText] = useState('');

  const onBlurEmail = (event: FocusEvent<HTMLInputElement>) => {
    const { value: email } = event.target;
    if (!email) {
      setEmailHelperText('請需填寫 Email');
    } else if (!isEmail(email)) {
      setEmailHelperText('無效的 Email');
    } else {
      setEmailHelperText('');
    }
  };

  return { email, setEmail, emailHelperText, onBlurEmail };
}

export default useEmail;
