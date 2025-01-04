import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid2 as Grid, IconButton, Drawer, List, ListItem, ListItemText, Box, Container, Popover,Typography, } from '@mui/material';
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
import Search from '../Search';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery
import {store} from '~/store'; // Import Redux store
import initializeSocket from '~/services/socketService';

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
    const navigate = useNavigate();
    const currentUser = store.getState().auth.accessToken !==null; // Get current user from Redux store
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false); // State to control search visibility
    const [socket, setSocket] = useState(null); // State to store socket instance
    const [totalNotification, setTotalNotification] = useState(0); // State to store total notification

    // Check screen size using useMediaQuery
    const isMobile = useMediaQuery('(max-width:768px)'); // Screen size smaller than 768px

    React.useEffect(() => {
        const socketInstance = initializeSocket();
        setSocket(socketInstance);

        socketInstance.on('lenNotification', (len) => {
            setTotalNotification(len);
        });

        socketInstance.emit('getLenNotification');

        socketInstance.on('getLenNotification', (len) => {
            setTotalNotification(len);
        })

        return () => {
            socketInstance.disconnect(); // Ngắt kết nối khi rời phòng
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
        { icon: <FontAwesomeIcon icon={faUser} />, title: 'Hồ sơ của tôi', to: '/@hoaa' },
        { icon: <FontAwesomeIcon icon={faGear} />, title: 'Cài đặt', to: '/settings' },
        ...MENU_ITEMS,
        { icon: <FontAwesomeIcon icon={faSignOut} />, title: 'Đăng xuất', to: '/logout', separate: true },
    ];

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const toggleSearchVisibility = () => {
        setSearchVisible(!searchVisible);
    };




    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Vincent" />
                </Link>

                {/* Search Bar */}
                {isMobile ? (
                    <></>
                ) : (
                    <div className={`${cx('search')} ${isMobile && !searchVisible ? cx('search-input-hidden') : ''}`}>
                        <Search />
                    </div>
                )}

                <div className={cx('actions')}>
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* For Desktop */}
                        {!isMobile && (
                            <div className={cx('actions')}>
                                {currentUser ? (
                                    <>
                                        <Tippy delay={[0, 50]} content="Khóa học của tôi" placement="bottom">
                                            <a className={cx('action-btn')} to="/">
                                                Khóa học của tôi
                                            </a>
                                        </Tippy>
                                        <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                                            <button className={cx('action-btn')}>
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </button>
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
                                        <Button text>Đăng ký</Button>
                                        <Button primary to="/login">
                                            Đăng nhập
                                        </Button>
                                    </>
                                )}
                                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                                    {currentUser ? (
                                        <Image className={cx('user-avatar')} src={images.avatar} alt="Nguyen Van A" />
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
                                    <List sx={{fontSize: '1.6em'}}>
                                        {/* Search input inside Drawer */}
                                        {currentUser ? (
                                            <ListItem>
                                                <Image
                                                    className={cx('user-avatar')}
                                                    src={images.avatar}
                                                    alt="Nguyen Van A"
                                                />
                                                <ListItemText primary="Nguyen Van A" sx={{ ml: 2 }} />
                                            </ListItem>
                                        ) : (
                                            <></>
                                        )}
                                        <ListItem>
                                            <ListItemText>
                                                <div className={cx('search-wrapper')}>
                                                    {/* Show icon or input based on search visibility */}
                                                    {!searchVisible && isMobile ? (
                                                        <IconButton onClick={toggleSearchVisibility}>
                                                            <FontAwesomeIcon icon={faSearch} />
                                                        </IconButton>
                                                    ) : (
                                                        <Search /> // Assuming you have the Search component here
                                                    )}
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem
                                                        button
                                                        component={Link}
                                                        to="/login"
                                                        onClick={() => toggleDrawer(false)}
                                                    >
                                                        <FontAwesomeIcon icon={faShoppingCart} size="xs" />
                                                        <ListItemText primary="Khóa học của tôi" sx={{ ml: 1 }} />
                                                </ListItem>
                                                <ListItem
                                                        button
                                                        component={Link}
                                                        to="/login"
                                                        onClick={() => toggleDrawer(false)}
                                                    >
                                                        <FontAwesomeIcon icon={faBell} size="xs" />
                                                        <ListItemText primary="Thông báo" sx={{ ml: 1 }} />
                                                </ListItem>
                                        {currentUser ? (
                                            <div>
                                                
                                                {userMenu.map((sec, index) => (
                                                    <ListItem
                                                        button
                                                        key={index}
                                                        component={Link}
                                                        to={sec.to}
                                                        onClick={() => toggleDrawer(false)}
                                                    >
                                                        {sec.icon}
                                                        <ListItemText primary={sec.title} sx={{ ml: 1 }} />
                                                    </ListItem>
                                                ))}
                                                
                                            </div>
                                        ) : (
                                            <>
                                                <ListItem button component={Link} to="/login">
                                                    <ListItemText primary="Đăng nhập" />
                                                </ListItem>
                                                <ListItem button component={Link} to="/signup">
                                                    <ListItemText primary="Đăng ký" />
                                                </ListItem>
                                            </>
                                        )}
                                        
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
