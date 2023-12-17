import React from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
const cx = classNames.bind(styles);
const Contact = () => {
  return (
    <div
      style={{
        margin: '0 10px',
        textAlign: 'center',
        color: '#ffffff',
        marginTop: '70px',
      }}
    >
      <div
        style={{
          margin: '30px 10px',
          textAlign: 'center',
          background: '#AFC8AD',
          padding: '40px 100px',
          display: 'inline-block',
          borderRadius: '20px',
        }}
      >
        <h1 style={{ borderBottom: '1px solid #fff' }}>Contact Us</h1>
        <h2 style={{ marginTop: '50px' }}>Address</h2>
        <p>124 Hải Phòng, Thạch Thang, Hải Châu, Đà Nẵng</p>
        <h2>Phone</h2>
        <p>(123) 456-7890</p>
        <h2>Email</h2>
        <p>
          <a href="mailto:" style={{ color: '#ffffff' }}>
            http://benhviendanang.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
