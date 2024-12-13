import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Typography, Divider, Avatar, Container, Drawer } from '@mui/material';
import MyCourse from '~/pages/MyCourses';
import ChangePassword from '~/layouts/components/ChangePassword';
import EditProfileForm from '~/layouts/components/EditProfileForm';

const Dashboard = () => {
    const [selectedContent, setSelectedContent] = useState('courses');

    const handleToggle = (event, newContent) => {
        if (newContent !== null) {
            setSelectedContent(newContent);
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
                <Avatar sx={{ width: 80, height: 80, margin: '0 auto' }} />
                <Typography variant="h4" sx={{ marginTop: 2 }}>Quân Lê</Typography>
                <Typography variant="h5" color="textSecondary">
                    Headline
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