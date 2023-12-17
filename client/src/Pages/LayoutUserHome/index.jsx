import React from 'react';
import image from '../../Assets/image.png';
const LayoutUserHome = () => {
  return (
    <div>
      <img
        src={image}
        alt=""
        style={{
          display: 'block',
          margin: '100px auto 0 auto',
        }}
      />
      <h1
        style={{
          textAlign: 'center',
          color: '#000',
          marginTop: '10px',
        }}
      >
        Welcome to Hospital Da Nang
      </h1>
      <h3
        style={{
          display: 'block',
          textAlign: 'center',
          color: '#000',
          padding: '10px 0',
        }}
      >
        Địa chỉ: 124 Hải Phòng, Thạch Thang, Hải Châu, Đà Nẵng{' '}
      </h3>
      <h4
        style={{
          display: 'block',
          textAlign: 'center',
          color: '#000',
        }}
      >
        Số điện thoại: <a href="tel:0236 3821 118">0236 3821 118</a>
      </h4>
    </div>
  );
};

export default LayoutUserHome;
