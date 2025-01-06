import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const TeacherSidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/teacher/dashboard' },
    { text: 'Quản lý khóa học', icon: <SchoolIcon />, link: '/teacher/courses' },
    { text: 'Thông báo', icon: <NotificationsIcon />, link: '/teacher/notifications' },
    { text: 'Hồ sơ cá nhân', icon: <AccountCircleIcon />, link: '/teacher/profile' },
    { text: 'Trợ giúp', icon: <HelpIcon />, link: '/teacher/help' },
    { text: 'Đăng xuất', icon: <ExitToAppIcon />, link: '/logout' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" component="div" align="center" gutterBottom>
          Giáo Viên
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => (window.location.href = item.link)}
            sx={{
              '&:hover': {
                backgroundColor: '#e0f7fa',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default TeacherSidebar;
