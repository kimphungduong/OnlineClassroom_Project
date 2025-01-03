import React, { useState } from 'react';
import { Grid, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faShoppingCart,
    faBell,
    faUser,
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Search from '../Search'; // Assuming your existing Search component is here
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { type: 'language', code: 'en', title: 'English' },
                { type: 'language', code: 'vi', title: 'Tiếng Việt' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và góp ý',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Bản phím',
    },
];

function Header() {
    const currentUser = true;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(''); // State quản lý từ khóa tìm kiếm
    const navigate = useNavigate(); // Sử dụng điều hướng
    const isMobile = useMediaQuery('(max-width:768px)');

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle language change
                break;
            default:
                break;
        }
    };

    const userMenu = [
        { icon: <FontAwesomeIcon icon={faUser} />, title: 'Hồ sơ của tôi', to: '/@hoaa' },
        { icon: <FontAwesomeIcon icon={faGear} />, title: 'Cài đặt', to: '/settings' },
        ...MENU_ITEMS,
        { icon: <FontAwesomeIcon icon={faSignOut} />, title: 'Đăng xuất', to: '/logout', separate: true },
    ];

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Vincent" />
                </Link>

                {/* Search Bar */}
                {!isMobile && (
                    <div
                        className={cx('search-bar')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            borderRadius: '20px',
                            padding: '5px 10px',
                            backgroundColor: '#f6f6f6',
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontSize: '16px',
                                padding: '5px',
                            }}
                        />
                        <IconButton
                            onClick={handleSearch}
                            style={{
                                padding: '5px',
                                color: '#888',
                            }}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </IconButton>
                    </div>
                )}

                <div className={cx('actions')}>
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        {!isMobile && (
                            <div className={cx('actions')}>
                                {currentUser ? (
                                    <>
                                        <Tippy delay={[0, 50]} content="Khóa học của tôi" placement="bottom">
                                            <Link className={cx('action-btn')} to="/my-courses">
                                                Khóa học của tôi
                                            </Link>
                                        </Tippy>
                                        <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                                            <button className={cx('action-btn')}>
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </button>
                                        </Tippy>
                                        <Tippy delay={[0, 50]} content="Thông báo" placement="bottom">
                                            <button className={cx('action-btn')}>
                                                <FontAwesomeIcon icon={faBell} />
                                                <span className={cx('badge')}>12</span>
                                            </button>
                                        </Tippy>
                                    </>
                                ) : (
                                    <>
                                        <Button text>Đăng ký</Button>
                                        <Button primary to="/login">
                                            Đăng nhập
                                        </Button>
                                    </>
                                )}
                                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                                    {currentUser ? (
                                        <Image
                                            className={cx('user-avatar')}
                                            src={images.avatar}
                                            alt="Nguyen Van A"
                                        />
                                    ) : (
                                        <button className={cx('more-btn')}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </button>
                                    )}
                                </Menu>
                            </div>
                        )}

                        {/* For Mobile */}
                        {isMobile && (
                            <Grid item>
                                <IconButton onClick={() => toggleDrawer(true)}>
                                    <FontAwesomeIcon icon={faBars} />
                                </IconButton>
                                <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                                    <List>
                                        <ListItem>
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm khóa học"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                style={{
                                                    flex: 1,
                                                    border: 'none',
                                                    outline: 'none',
                                                    backgroundColor: '#f6f6f6',
                                                    fontSize: '16px',
                                                    padding: '5px',
                                                }}
                                            />
                                            <IconButton onClick={handleSearch}>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </IconButton>
                                        </ListItem>
                                        {userMenu.map((item, index) => (
                                            <ListItem
                                                button
                                                key={index}
                                                component={Link}
                                                to={item.to}
                                                onClick={() => toggleDrawer(false)}
                                            >
                                                {item.icon}
                                                <ListItemText primary={item.title} sx={{ ml: 1 }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Drawer>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </div>
        </header>
    );
}

export default Header;
