import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { usersService } from '../../services/users/users.service';
import { User } from '../../models/User.model';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('token');

    setAuth(false);
  }

  useEffect(() => {
    const token: string = localStorage.getItem('token') || '';;

    const fetchUser = async () => {
      try {
        const user: User = await usersService.getProfile(token);
        if (user) {
          setAuth(true);
        }
      } catch (error) {
        console.error('Error fetching profile.');
      }
    }

    token ? fetchUser() : setAuth(false);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Tests
          </Typography>
          {auth ? 
          (<Button color="inherit" onClick={handleLogout}>Logout</Button>) :
          (
            <Button color="inherit" component={Link} to="login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Header };
