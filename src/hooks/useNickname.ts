import { useState, FocusEvent, Dispatch, SetStateAction } from 'react';
import isLength from 'validator/lib/isLength';

type ReturnValues = {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  nicknameHelperText: string;
  onBlurNickname: (event: FocusEvent<HTMLInputElement>) => void;
};

function useNickname(initialValue?: string): ReturnValues {
  const [nickname, setNickname] = useState(initialValue || '');
  const [nicknameHelperText, setNicknameHelperText] = useState('');

  const onBlurNickname = (event: FocusEvent<HTMLInputElement>) => {
    setNicknameHelperText(
      isLength(event.target.value, {
        min: 2,
        max: 20
      })
        ? ''
        : '請填寫 2 - 20 個字元'
    );
  };

  return { nickname, setNickname, nicknameHelperText, onBlurNickname };
}

export default useNickname;
