import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginRequest } from '../../../libs/modules/auth';

export default function useLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, setPassword] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onLogin = async (e: React.MouseEvent) => {
    if (password === '') {
      alert('비밀번호를 입력하세요');
      return;
    }

    try {
      dispatch(loginRequest({ password }));

      router.push('/');
    } catch (err) {
      alert(err);
    }
  };

  return {
    password,
    onChange,
    onLogin,
  };
}
