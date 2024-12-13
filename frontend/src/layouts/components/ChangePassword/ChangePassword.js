import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button, Alert } from '@mui/material';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic để xử lý đổi mật khẩu
        // Reset các trường nhập
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '50px' }}>
            <Box sx={{ padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Đổi mật khẩu
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Mật khẩu đã được thay đổi thành công!</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Mật khẩu hiện tại"
                                type="password"
                                fullWidth
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mật khẩu mới"
                                type="password"
                                fullWidth
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Xác nhận mật khẩu mới"
                                type="password"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" sx={{ fontSize: '1.2rem', padding: '12px' }} color="primary" fullWidth>
                                Đổi mật khẩu
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default ChangePassword;