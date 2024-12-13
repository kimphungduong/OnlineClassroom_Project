import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ url, title }) => {
  return (
    <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ReactPlayer url={url} width="100%" height="100%" />
      </Box>
    </Box>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoPlayer;