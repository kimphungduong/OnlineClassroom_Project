import classNames from 'classnames/bind';
import styles from './NoneLayout.module.scss';

const cx = classNames.bind(styles);

function NoneLayout({ children }) {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default NoneLayout;
