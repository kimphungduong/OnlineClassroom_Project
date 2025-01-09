import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Typography, Divider, Avatar, Container, Drawer } from '@mui/material';
import MyCourse from '~/pages/MyCourses';
import ChangePassword from '~/layouts/components/ChangePassword';
import EditProfileForm from '~/layouts/components/EditProfileForm';
import {store} from '~/store';
import { PhotoCamera } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import settingApi from '~/api/settingApi';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '~/store/slices/authSlice';

const Dashboard = () => {
    const [selectedContent, setSelectedContent] = useState('courses');
    const [avatarUrl, setAvatarUrl] = useState(store.getState().auth.avatar); // Lấy avatar từ store
    const dispatch = useDispatch();

    const handleToggle = (event, newContent) => {
        if (newContent !== null) {
            setSelectedContent(newContent);
        }
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                // Gọi API để upload ảnh
                const response = await settingApi.updateAvatar(formData);

                // Cập nhật avatar URL từ response
                if (response) {
                    setAvatarUrl(response);
                    dispatch(updateAvatar(response));
                    console.log('Avatar updated successfully:', response);
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        }
    };
    return (
        <Container maxWidth="false" sx={{ display: 'flex', padding: '0px !important',height:'670px' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: '20%',
                    p:1,
                    textAlign: 'center',
                    overflowY: 'auto',
                    borderRight: '1px solid #cccc',
                    height: '100%', // Bóng đổ bên phải 
                }}
            >
                {/* <Avatar sx={{ width: 80, height: 80, margin: '0 auto' }} /> */}
                <Box sx={{ position: 'relative', display: 'inline-block', marginBottom: 2 }}>
                    <Avatar
                        src={avatarUrl}
                        sx={{ width: 80, height: 80, margin: '0 auto', cursor: 'pointer' }}
                    />
                    <IconButton
                        component="label"
                        sx={{ position: 'absolute', bottom: 0, right: 'calc(50% - 20px)' }}
                    >
                        <PhotoCamera />
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarChange}
                        />
                    </IconButton>
                </Box>
                <Typography variant="h5" sx={{ marginTop: 2 }}>{store.getState().auth.name}</Typography>
                <Typography variant="h6" color="textSecondary">
                    {store.getState().auth.role === 'student' ? 'Học viên' : 'Giáo viên'}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <ToggleButtonGroup
                    orientation="vertical"
                    value={selectedContent}
                    exclusive
                    onChange={handleToggle}
                    sx={{ width: '100%' }}
                >
                    <ToggleButton value="courses" sx={{ justifyContent: 'flex-start', border: 'none', fontSize: '1.2rem'   }}>
                        Khóa học đã tham gia
                    </ToggleButton>
                    <ToggleButton value="edit-info" sx={{ justifyContent: 'flex-start', border: 'none', fontSize: '1.2rem'   }}>
                        Chỉnh sửa thông tin
                    </ToggleButton>
                    <ToggleButton value="account-security" sx={{ justifyContent: 'flex-start', border: 'none', fontSize: '1.2rem'   }}>
                        Bảo mật tài khoản
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ flexGrow: 1,
                overflowY: 'auto', 
                height: '100%',
            }}>
                {selectedContent === 'courses' && <MyCourse />}
                {selectedContent === 'edit-info' && <EditProfileForm />}
                {selectedContent === 'account-security' && <ChangePassword/>}
            </Box>
        </Container>
    );
};

export default Dashboard;