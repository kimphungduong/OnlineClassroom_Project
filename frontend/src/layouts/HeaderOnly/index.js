import Header from '~/layouts/components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnlyLayout.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;
