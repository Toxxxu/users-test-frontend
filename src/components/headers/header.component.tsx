import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';

const Header: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  }

  useAuth(setAuth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Tests
          </Typography>
          {auth ? 
          (<Button color="inherit" onClick={handleLogout} component={Link} to="/">Logout</Button>) :
          (
            <Button color="inherit" component={Link} to="login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Header };
