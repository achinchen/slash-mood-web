import {
  useState,
  FocusEvent,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react';
import isEmail from 'validator/lib/isEmail';

type ReturnValues = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  emailHelperText: string;
  duplicatedEmailHelper: () => void;
  onBlurEmail: (event: FocusEvent<HTMLInputElement>) => void;
};

function useEmail(initialValue?: string): ReturnValues {
  const [email, setEmail] = useState(initialValue || '');
  const [emailHelperText, setEmailHelperText] = useState('');

  const onBlurEmail = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const { value: email } = event.target;
    if (!email) {
      setEmailHelperText('請填寫 Email');
    } else if (!isEmail(email)) {
      setEmailHelperText('無效的 Email');
    } else {
      setEmailHelperText('');
    }
  }, []);

  const duplicatedEmailHelper = useCallback(() => {
    setEmailHelperText('重複的 Email');
  }, []);

  return {
    email,
    setEmail,
    emailHelperText,
    duplicatedEmailHelper,
    onBlurEmail
  };
}

export default useEmail;
