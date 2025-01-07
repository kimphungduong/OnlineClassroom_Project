import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getAllNotification, setRead } from "~/services/notificationService";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5; // Number of items per page

  React.useEffect(() => {
    getAllNotification().then((data) => {
      setNotifications(data);
    });
  }, []);

  // Calculate the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemClick = (link, notificationId) => {
    navigate(link);
    setRead(notificationId);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMarkAllAsRead = () => {
    // Update the API and state
    notifications.forEach((notification) => {
      if (!notification.is_read) {
        setRead(notification._id); // API call to mark as read
      }
    });
    // Update state to mark all as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Thông báo
          </Typography>
          {notifications.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleMarkAllAsRead}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </Box>
        {notifications.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Không có thông báo.
          </Typography>
        ) : (
          <>
            <List>
              {currentNotifications.map((notification) => (
                <ListItem
                  key={notification._id}
                  button
                  onClick={() => handleItemClick(notification.link, notification._id)}
                  sx={{
                    backgroundColor: notification.is_read ? "#f9f9f9" : "#e3f2fd",
                    mb: 1,
                    borderRadius: 1,
                    padding: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={notification.avatar} alt={notification.sender} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<ReactMarkdown>{notification.title}</ReactMarkdown>}
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        {notification.createdAt}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(notifications.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default NotificationPage;
