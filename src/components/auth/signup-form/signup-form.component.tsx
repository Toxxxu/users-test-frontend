import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersService } from "../../../services/users/users.service";
import { TextField, Typography, Button } from "@mui/material";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameErrored, setUsernameErrored] = useState(false);

  const [password, setPassword] = useState("");
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
      await usersService.createUser({ username, password });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px' }}>
      <Typography variant="h3">Sign Up User</Typography>
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
        <Link to="/login" style={{ alignSelf: 'start', marginTop: '8px' }}>
          Login
        </Link>
      </div>
      <Button variant="contained" sx={{ width: '320px' }} onClick={handleSignup}>
        <span style={{ padding: '8px' }}>Sign Up</span>
      </Button>
    </div>
  )
}

export { SignupForm }