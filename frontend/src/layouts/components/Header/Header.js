
import React, { useState } from 'react';
import { Grid2 as Grid, IconButton, Drawer, List, ListItem, ListItemText, Box, Container, Popover,Typography, } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faShoppingCart,
    faBell,
    faMessage,
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
import {store} from '~/store'; // Import Redux store
import initializeSocket from '~/services/socketService';
import eventBus from '~/utils/eventBus';


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
    console.log("Header render");
    const currentUser = store.getState().auth.accessToken !==null; // Get current user from Redux store
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false); // State to control search visibility
    const [socket, setSocket] = useState(null); // State to store socket instance
    const [totalNotification, setTotalNotification] = useState(0); // State to store total notification
    const [totalMessage, setTotalMessage] = useState(0); // State to store total message

    // Check screen size using useMediaQuery

    const [searchValue, setSearchValue] = useState(''); // State quản lý từ khóa tìm kiếm
    const navigate = useNavigate(); // Sử dụng điều hướng
    const isMobile = useMediaQuery('(max-width:768px)');


    React.useEffect(() => {
        const socketInstance = initializeSocket();
        setSocket(socketInstance);

        socketInstance.on('lenNotification', (len) => {
            setTotalNotification(len);
        });

        socketInstance.on('lenMessage', (len) => {
            setTotalMessage(len);
        });

        socketInstance.emit('getLenMessage');

        socketInstance.emit('getLenNotification');

        socketInstance.on('getLenNotification', (len) => {
            setTotalNotification(len);
        })

        const handleSetLen = (len) => {
            setTotalMessage(len);
        }

        eventBus.on('lenMessage', handleSetLen)

        return () => {
            socketInstance.disconnect(); // Ngắt kết nối khi rời phòng
            eventBus.off('lenMessage', handleSetLen);
        };
    },[]);

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
        { icon: <FontAwesomeIcon icon={faUser} />, title: 'Hồ sơ của tôi', to: '/dashboard' },
        { icon: <FontAwesomeIcon icon={faGear} />, title: 'Cài đặt', to: '/settings' },
        ...MENU_ITEMS,
        { icon: <FontAwesomeIcon icon={faSignOut} />, title: 'Đăng xuất', to: '/logout', separate: true },
    ];

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleSearch = () => {
        if (searchValue.trim().length > 30) {
            alert('Từ khóa tìm kiếm quá dài, vui lòng nhập lại với tối đa 30 ký tự.');
            setSearchValue(''); // Làm trống ô tìm kiếm nếu quá dài
            return;
        }
        if (searchValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
            setSearchValue(''); // Làm trống ô tìm kiếm sau khi tìm kiếm thành công
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const avatar = store.getState().auth.avatar; // Get avatar from Redux store


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
                                            <Link className={cx('action-btn')} to="/my-course">
                                                Khóa học của tôi
                                            </Link>
                                        </Tippy>
                                        <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                                            <Link className={cx('action-btn')} to="/cart">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </Link>
                                        </Tippy>
                                        <Tippy delay={[0, 50]} content="Nhắn tin" placement="bottom">
                                        <IconButton
                                            className={cx('action-btn')}
                                            onClick={()=> navigate('/message') }     
                                        >
                                            <FontAwesomeIcon icon={faMessage} />
                                            {totalMessage > 0 && (<span className={cx('badge')}>{totalMessage}</span>)}
                                        </IconButton>

                                        </Tippy>
                                        <Tippy delay={[0, 50]} content="Thông báo" placement="bottom">
                                        <IconButton
                                            className={cx('action-btn')}
                                            onClick={()=> navigate('/notification') }     
                                        >
                                            <FontAwesomeIcon icon={faBell} />
                                            {totalNotification > 0 && (<span className={cx('badge')}>{totalNotification}</span>)}
                                        </IconButton>

                                        </Tippy>
                                    </>
                                ) : (
                                    <>
                                        <Button text to="/register">Đăng ký</Button>
                                        <Button primary to="/login">
                                            Đăng nhập
                                        </Button>
                                    </>
                                )}
                                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                                    {currentUser ? (
                                        <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            marginLeft: 2,
                                            cursor: 'pointer'
                                        }}
                                            src={avatar}
                                            // sx={{ width: 80, height: 80, margin: '0 auto', cursor: 'pointer' }}
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
