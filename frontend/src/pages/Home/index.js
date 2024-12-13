import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
function Home() {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Vincent
                </Typography>
            </Box>
        </Container>
    );
}

export default Home;
