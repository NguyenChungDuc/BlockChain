import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../Assets/image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        'http://localhost:5000/api/user/register',
        {
          name: username,
          email: email,
          phone: phone,
          password: password,
        }
      );
      console.log(result);
      if (result.status === 200) {
        navigate('/');
        alert('Register success');
      } else {
        alert('Số điện thoại hoặc email đã tồn tại');
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };
  return (
    <>
      <img
        src={image}
        alt=""
        style={{ display: 'block', margin: '20px  auto 0 auto', width: '120px' }}
      />
      <h1 className='mt-2' style={{ textAlign: 'center' }}>Đăng kí</h1>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: '50%',
          position: 'absolute',
          top: '33%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          Register
        </Button>
        <Link to='/' className='d-block text-center my-2'>Bạn đã có tài khoản?</Link>
      </Form>
    </>
  );
};

export default RegisterPage;
