import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const loginWithPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/auth/login', { username, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate('/live');
        } catch (error) {
            console.error('Đăng nhập thất bại', error);
        }
    };
    const handleGoogleLoginSuccess = async (response) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/google`, {
                token: response.credential,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate('/live');
        } catch (error) {
            alert('Đăng nhập bằng Google thất bại');
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Đăng nhập bằng Google thất bại', error);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form>
                    <TextField
                        label="Username"
                        type="Text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={loginWithPassword}
                    >
                        Login
                    </Button>
                </form>
                <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
            </Box>
        </Container>
    );
}

export default Login;
