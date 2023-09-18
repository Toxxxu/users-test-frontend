import { useEffect } from 'react';
import { usersService } from '../../../services/users/users.service';

const useAuth = (setAuth: React.Dispatch<React.SetStateAction<boolean>>) => {
  useEffect(() => {
    const token: string = localStorage.getItem('token') || '';

    const fetchUser = async () => {
      try {
        const user = await usersService.getProfile(token);
        if (user) {
          localStorage.setItem('username', user.username);
          setAuth(true);
        }
      } catch (error) {
        console.error('Error fetching profile.');
      }
    }

    token ? fetchUser() : setAuth(false);
  });

  return;
}

export { useAuth };
