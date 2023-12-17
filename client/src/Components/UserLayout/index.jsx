import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('refreshToken');
    navigate('/');
  };
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Form>
            <Navbar.Brand href="#home">Hospital Da Nang</Navbar.Brand>
          </Form>
          <Form>
            <Nav className="me-auto">
              <Nav.Link href="/user">Home</Nav.Link>
              <Nav.Link href="/user/medicalrecord">Medical Record</Nav.Link>
              <Nav.Link href="/user/contact">Contact</Nav.Link>
            </Nav>
          </Form>
          <button className={cx('form-logout')} onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className={cx('icon-logout')}
            />
            <span className="d-sm-inline d-none">LogOut</span>
          </button>
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
