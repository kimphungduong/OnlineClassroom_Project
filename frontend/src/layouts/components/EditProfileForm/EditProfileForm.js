import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import settingApi from '~/api/settingApi'; // Đường dẫn API

const EditProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    headline: '',
    phone: '',
    email: '',
    facebook: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Lấy thông tin hồ sơ hiện tại
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await settingApi.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setSnackbar({
          open: true,
          message: 'Không thể tải thông tin hồ sơ.',
          severity: 'error',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await settingApi.updateProfile(profile);
      setSnackbar({
        open: true,
        message: 'Cập nhật hồ sơ thành công!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSnackbar({
        open: true,
        message: 'Đã xảy ra lỗi khi cập nhật hồ sơ.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Box sx={{ padding: 3, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontSize: '2rem' }}>
          Thông tin cá nhân
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}>
          Hãy thêm thông tin về bản thân
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: '1.75rem' }}>
            Thông tin cơ bản:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tên học viên"
                variant="outlined"
                fullWidth
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Giới tính"
                variant="outlined"
                fullWidth
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Headline"
                variant="outlined"
                fullWidth
                name="headline"
                value={profile.headline}
                onChange={handleInputChange}
                inputProps={{ maxLength: 60 }}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontSize: '1.75rem' }}>
            Thông tin liên hệ:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Facebook"
                variant="outlined"
                fullWidth
                name="facebook"
                value={profile.facebook}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ fontSize: '1.2rem', padding: '12px' }}
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </Box>
        </form>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditProfileForm;
