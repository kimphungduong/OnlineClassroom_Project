import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import settingApi from '~/api/settingApi'; // Đường dẫn đến API

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Kiểm tra điều kiện mật khẩu mới và xác nhận mật khẩu mới
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }

        if (newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }

        try {
            setLoading(true);
            // Gọi API đổi mật khẩu
            await settingApi.changePassword(currentPassword, newPassword, confirmPassword);
            setSuccess('Mật khẩu đã được thay đổi thành công!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('Failed to change password:', err);
            setError('Không thể đổi mật khẩu. Vui lòng kiểm tra lại thông tin!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '50px' }}>
            <Box sx={{ padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Đổi mật khẩu
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Mật khẩu hiện tại"
                                type={showCurrentPassword ? 'text' : 'password'}
                                fullWidth
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                variant="outlined"
                                required
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                edge="end"
                                            >
                                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mật khẩu mới"
                                type={showNewPassword ? 'text' : 'password'}
                                fullWidth
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                variant="outlined"
                                required
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Xác nhận mật khẩu mới"
                                type={showConfirmPassword ? 'text' : 'password'}
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                variant="outlined"
                                required
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ fontSize: '1.2rem', padding: '12px' }}
                                color="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default ChangePassword;
