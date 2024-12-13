import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Divider,
  IconButton,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

const EditProfileForm = () => {
  // State lưu trữ thông tin
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState({
    website: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  });

  // Hàm xử lý khi các trường nhập thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  // Hàm xử lý khi người dùng nhấn nút Lưu
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      headline,
      description,
      ...links,
    });
    alert('Thông tin cá nhân đã được lưu!');
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
                label="Họ người dùng"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tên người dùng"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                inputProps={{ maxLength: 60 }}
                helperText={`${headline.length}/60`}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5rem' }}>
                Giới thiệu bản thân:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <IconButton>
                  <FormatBoldIcon />
                </IconButton>
                <IconButton>
                  <FormatItalicIcon />
                </IconButton>
              </Box>
              <TextField
                label="Mô tả thêm về bạn"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontSize: '1.75rem' }}>
            Liên kết:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Website (http://...)"
                variant="outlined"
                fullWidth
                name="website"
                value={links.website}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Twitter Profile"
                variant="outlined"
                fullWidth
                name="twitter"
                value={links.twitter}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Facebook Profile"
                variant="outlined"
                fullWidth
                name="facebook"
                value={links.facebook}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LinkedIn Profile"
                variant="outlined"
                fullWidth
                name="linkedin"
                value={links.linkedin}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="YouTube Profile"
                variant="outlined"
                fullWidth
                name="youtube"
                value={links.youtube}
                onChange={handleInputChange}
                sx={{ fontSize: '1.2rem' }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Button variant="contained" color="primary" type="submit" sx={{ fontSize: '1.2rem', padding: '12px' }}>
              Lưu
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default EditProfileForm;