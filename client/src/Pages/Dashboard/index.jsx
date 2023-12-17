import React from 'react';
import image from '../../Assets/image.png';
import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);
function Dashboard() {
  return (
    <div className={cx('wrapper')}>
      <img src={image} alt="" className={cx('logo')} />
      <h1>Welcome to Benh Vien Da Nang</h1>
    </div>
  );
}

export default Dashboard;
