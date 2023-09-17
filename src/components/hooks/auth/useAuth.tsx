import { useEffect, useState } from 'react';
import { usersService } from '../../../services/users/users.service';

const useAuth = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token: string = localStorage.getItem('token') || '';

    const fetchUser = async () => {
      try {
        const user = await usersService.getProfile(token);
        if (user) {
          setAuth(true);
        }
      } catch (error) {
        console.error('Error fetching profile.');
      }
    }

    token ? fetchUser() : setAuth(false);
  }, []);

  return auth;
}

export default useAuth;
