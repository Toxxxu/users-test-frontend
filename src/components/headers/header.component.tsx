import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';

const Header: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    setAuth(false);
  }

  useAuth(setAuth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Tests</Link>
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
