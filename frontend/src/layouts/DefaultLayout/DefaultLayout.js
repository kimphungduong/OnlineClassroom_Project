import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Footer from '~/layouts/components/Footer'; 
import styles from './DefaultLayout.module.scss';
import { AppBar, Toolbar } from '@mui/material';
import { Container } from '@mui/material';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
                  {/* Header */}
        <AppBar
            position="fixed"
            sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1, // Đặt header lên trên sidebar
            }}
        >
             {/* Header */}
             <Header />
        </AppBar>
            

            {/* Main Content */}
            <div className={cx('container')}>
                <Sidebar />
                {/* <div className={cx('content')}>{children}</div> */}
                {/* Main Content */}
                <Container
                    component="main"
                    sx={{
                    margin: '0',
                    padding: '0 !important',
                    flexGrow: 1, // Để content chiếm hết không gian còn lại
                    minHeight: '100vh', // Đảm bảo toàn màn hình
                    }}
                >
                    <Container maxWidth="lg"
                    sx={{
                        p: 3, // padding
                    }}
                    >
                    
                        {children}
                    </Container>
                    <Footer />   
                </Container>

            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
