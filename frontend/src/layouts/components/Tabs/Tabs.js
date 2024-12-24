import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Tabs.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TabsComponent() {
  const [value, setValue] = useState(-1);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const subjects = ['toan-hoc', 'vat-ly', 'hoa-hoc', 'tieng-anh', 'sinh-hoc', 'tin-hoc'];
    navigate(`/subject/${subjects[newValue]}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
      </Tabs>
    </Box>
  );
}

export default TabsComponent;