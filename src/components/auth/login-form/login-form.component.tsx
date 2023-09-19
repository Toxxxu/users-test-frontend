import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import { authService } from "../../../services/auth/auth.service";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameErrored, setUsernameErrored] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [passwordErrored, setPasswordErrored] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username) {
      setUsernameErrored(true);
    } else {
      setUsernameErrored(false);
    }
    if (!password) {
      setPasswordErrored(true);
    } else {
      setPasswordErrored(false);
    }
    try {
      const response = await authService.login({ username, password });
      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px' }}>
      <Typography variant="h3">Login User</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <TextField
          label="Username"
          sx={{ width: '320px' }}
          type="username"
          required
          helperText={usernameErrored && "Please enter a valid Email."}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={usernameErrored}
        />
        <TextField
          label="Password"
          type="password"
          sx={{ width: '320px' }}
          required
          helperText={passwordErrored && "Password may not be empty"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordErrored}
        />
        <Link to="/signup" style={{ alignSelf: 'start', marginTop: '8px' }}>
          Sign Up
        </Link>
      </div>
      <Button variant="contained" sx={{ width: '320px' }} onClick={handleSignup}>
        <span style={{ padding: '8px' }}>Login</span>
      </Button>
    </div>
  )
}

export { LoginForm }