import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { me } from '../modules/auth';

export default function useLoggedIn() {
  const dispatch = useDispatch();

  const fetch = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:4000';
      axios.defaults.withCredentials = true;
      const response = await axios.get('/api/auth/me');

      return response.data;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetch()
      .then((res) => {
        const admin = res;

        dispatch(me(admin));
      })
      .catch((err) => console.log(err));
  }, []);
}
