import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import styles from './Tabs.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// Custom TabPanel component to display the content based on the selected tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function TabsComponent() {
  const [value, setValue] = useState(-1); // Set initial value to -1

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs container */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="subjects tabs"
        centered
        className={cx('tabsContainer')}
      >
        <Tab label="Toán học" className={cx('tab')} />
        <Tab label="Vật lý" className={cx('tab')} />
        <Tab label="Hóa học" className={cx('tab')} />
        <Tab label="Tiếng Anh" className={cx('tab')} />
        <Tab label="Sinh học" className={cx('tab')} />
        <Tab label="Tin học" className={cx('tab')} />
        <Tab label="Lịch sử" className={cx('tab')} />
        <Tab label="GDCD" className={cx('tab')} />
        <Tab label="Địa lý" className={cx('tab')} />
      </Tabs>

      {/* Tab panels */}
      <CustomTabPanel value={value} index={0}>
        Nội dung môn Toán học
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Nội dung môn Vật lý
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Nội dung môn Hóa học
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Nội dung môn Tiếng Anh
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Nội dung môn Sinh học
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Nội dung môn Tin học
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Nội dung môn Lịch sử
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        Nội dung môn GDCD
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        Nội dung môn Địa lý
      </CustomTabPanel>
    </Box>
  );
}

export default TabsComponent;