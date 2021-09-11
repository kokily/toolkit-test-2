import { useDispatch } from 'react-redux';
import { logoutRequest } from '../modules/auth';

export default function useLogout() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutRequest());
    localStorage.removeItem('dnkdream_admin');
  };

  return { onLogout };
}
