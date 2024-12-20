import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ url, title, videoRef }) => {
  return (
    <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ReactPlayer   
          // playing={false}
          // onProgress={({ playedSeconds }) => {
          //   setCurrentTime(playedSeconds); // Cập nhật thời gian video
          // }} 
          config={{
            file: {
              forceVideo: true, // Buộc phát dưới dạng video
            },
          }}
          ref={videoRef} 
          url={url} 
          width="100%" height="100%" controls/>
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