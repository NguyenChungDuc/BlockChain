import React, { useState } from 'react';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faTasks,
  faChartLine,
  faUser,
  faNewspaper,
  faCog,
  faSuitcaseRolling,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function AdminLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('refreshToken')
    navigate('/')
  }
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('form-dashboard')}>
          <Navbar bg="primary" data-bs-theme="dark" className='d-none d-xl-block'>
            <Container
              className='d-flex justify-content-center align-items-center'
            >
              <FontAwesomeIcon
                style={{ fontSize: '25px', marginRight: '10px', color: '#fff' }}
                icon={faTasks}
              />
              <Navbar.Brand>
                Admin Panel
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar
            style={{ background: '#4B527E' }}
            data-bs-theme="dark"
          >
            <Container
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: '30px', color: '#5CD2E6' }}
              />
              <Navbar.Brand className='d-none d-lg-block'>
                Admin
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Link to='/admin/dashboard' className='text-decoration-none'>
            <Navbar data-bs-theme="dark">
              <Container
                className={cx('navbar justify-content-lg-start justify-content-center px-lg-5 py-lg-3 px-2 py-2')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  className={cx('icon-navbar')}
                />
                <Navbar.Brand
                  className='d-none d-lg-block fs-6'
                >
                  Dashboard
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Link>
          <Link to="/admin/usermanage" className='text-decoration-none'>
            <Navbar data-bs-theme="dark">
              <Container
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                className='justify-content-lg-start justify-content-center px-lg-5 py-lg-3 px-2 py-2'
              >
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className={cx('icon-navbar')}
                />
                <Navbar.Brand
                  className='d-none d-lg-block fs-6'
                >
                  Users
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Link>
          <Link to='/admin/patientmanage' className='text-decoration-none'>
            <Navbar data-bs-theme="dark">
              <Container
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                className='justify-content-lg-start justify-content-center px-lg-5 py-lg-3 px-2 py-2'
              >
                <FontAwesomeIcon icon={faUser} className={cx('icon-navbar')} />
                <Navbar.Brand
                  className='d-none d-lg-block fs-6'
                >
                  Patient
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Link>
        </div>
        <div className={cx('children')}>
          <Outlet />
          <button className={cx('form-logout')} onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className={cx('icon-logout')}
            />
            <span className='d-sm-inline d-none'>LogOut</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
