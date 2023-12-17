import React, { useState, useEffect } from 'react';
import image from '../../Assets/image.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post('http://localhost:5000/api/user/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      });
      if (result.status === 200) {
        if (result.data.role === 'admin') {
          navigate('/admin/dashboard');
        }
        else {
          navigate('/user')
        }
        localStorage.setItem('refreshToken', result.data.refreshToken);
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Email or password is wrong');
    }
  };
  return (
    <>
      <img
        src={image}
        alt=""
        style={{ display: 'block', margin: '50px  auto 0 auto', width: '150px' }}
      />
      <h1 className='mt-2' style={{ textAlign: 'center' }}>Đăng nhập</h1>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: '50%',
          position: 'absolute',
          top: '65%',
          left: '50%',
          transform: 'translate(-50% ,-50%)',
        }}
      >
        <Form.Group className="mb-3 mt-5" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ display: 'block', margin: '0 auto' }}
        >
          Login
        </Button>
        <Link to='/register' className='d-block text-center mt-2'>Bạn chưa có tài khoản?</Link>
      </Form>
    </>
  );
};
export default LoginPage;
