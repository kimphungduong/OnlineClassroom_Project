import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/store/slices/authSlice';
import { Container, Box, Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>{error?.message || 'Login failed'}</p>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;