import React from 'react';
import Header from '~/layouts/components/Header';
import TabsComponent from '~/layouts/components/Tabs';
import classNames from 'classnames/bind';
import styles from './HeaderTabsLayout.module.scss';

const cx = classNames.bind(styles);

function HeaderTabs({ children }) {
    return (
        <>
            <Header />
            <div className={cx('tabsContainer')}>
                <TabsComponent />
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default HeaderTabs;
