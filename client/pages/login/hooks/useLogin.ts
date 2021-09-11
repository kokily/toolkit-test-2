import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../../libs/modules/auth';
import { RootState } from '../../../libs/modules';

export default function useLogin() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
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
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace('/');

      try {
        localStorage.setItem('dnkdream_admin', JSON.stringify(user));
      } catch (err) {
        console.log('Localstorage is not working');
      }
    }
  }, [router, user]);

  return {
    password,
    onChange,
    onLogin,
  };
}
