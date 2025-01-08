import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import courseApi from '~/api/courseApi';

const VideoPlayer = ({ url, lessonId, videoRef }) => {
  const [hasReported, setHasReported] = useState(false); // Trạng thái để chỉ gửi API một lần
  const [duration, setDuration] = useState(0); // Tổng thời lượng video

  const handleProgress = ({ playedSeconds }) => {
    // Kiểm tra nếu đã xem 50% video và chưa báo cáo
    if (!hasReported && playedSeconds >= duration / 2) {
      setHasReported(true); // Đánh dấu đã gửi API
      sendCompletion(); // Gọi API để đánh dấu đã học
    }
  };

  const sendCompletion = async () => {
    try {
      courseApi.markLessonAsCompleted(lessonId); // Gửi API đánh dấu hoàn thành
      console.log('Đã gửi API đánh dấu hoàn thành');
    } catch (error) {
      console.error('Lỗi khi gửi API:', error);
    }
  };

  return (
    <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ReactPlayer
          ref={videoRef}
          url={url}
          width="100%"
          height="100%"
          controls
          onProgress={handleProgress} // Theo dõi tiến trình phát
          onDuration={setDuration} // Lấy tổng thời lượng video
          config={{
            file: {
              forceVideo: true, // Buộc phát dưới dạng video
            },
          }}
        />
      </Box>
    </Box>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default VideoPlayer;
