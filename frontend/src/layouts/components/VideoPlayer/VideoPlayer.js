import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import courseApi from '~/api/courseApi';

const VideoPlayer = ({ url, lessonId, videoRef, startTime }) => {
  const [hasReported, setHasReported] = useState(false); // Trạng thái để chỉ gửi API một lần
  const [duration, setDuration] = useState(0); // Tổng thời lượng video
  const [isReady, setIsReady] = useState(false); // Trạng thái để đảm bảo video sẵn sàng trước khi nhảy tới startTime

  useEffect(() => {
    if (videoRef?.current && startTime > 0 && isReady) {
      videoRef.current.seekTo(startTime, 'seconds'); // Nhảy tới thời gian startTime
    }
  }, [startTime, isReady, videoRef]);

  const handleProgress = ({ playedSeconds }) => {
    // Kiểm tra nếu đã xem 50% video và chưa báo cáo
    if (!hasReported && playedSeconds >= duration / 2) {
      setHasReported(true); // Đánh dấu đã gửi API
      sendCompletion(); // Gọi API để đánh dấu đã học
    }
  };

  const sendCompletion = async () => {
    try {
      await courseApi.markLessonAsCompleted(lessonId); // Gửi API đánh dấu hoàn thành
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
          onReady={() => setIsReady(true)} // Đặt trạng thái video sẵn sàng
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
  title: PropTypes.string,
  videoRef: PropTypes.object.isRequired,
  startTime: PropTypes.number, // Bổ sung prop startTime
};

VideoPlayer.defaultProps = {
  title: '',
  startTime: 0, // Mặc định startTime là 0
};

export default VideoPlayer;
