import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './AddPatient.module.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
const cx = classNames.bind(styles);

const AddPatient = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleSubmit = async (e) => {
    const data = {
      name,
      age,
      phone,
      address,
      card,
      diagnosis,
      doctor,
    };
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      const res = await axios.post(
        'http://localhost:5000/api/patient',
        data,
        {
          headers: {
            Authorization: response.data.newAccessToken
          },
        }
      );
      if (res) {
        toast.success('Create new patient successfully');
      }
    } catch (err) {
      toast.error('Something went wrong, Please fill in complete patient information');
    }
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 3000,
              theme: {
                primary: 'red',
                secondary: 'black',
              },
            },
          }}
        />
        <h1>Add New Patient</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className={cx('form-group')}>
            <label htmlFor="name">Name Patient</label>
            <input
              id='name'
              type="text"
              className={cx('form-control')}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor='age'>Age</label>
            <input
              id='age'
              type="number"
              className={cx('form-control')}
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="phone">Phone</label>
            <input
              id='phone'
              type="text"
              className={cx('form-control')}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="address">Address</label>
            <input
              id='address'
              type="text"
              className={cx('form-control')}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="card">Number Of Health Insurance Card</label>
            <input
              id='card'
              type="text"
              className={cx('form-control')}
              value={card}
              onChange={(e) => {
                setCard(e.target.value);
              }}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor='diagnosis'>Diagnosis</label>
            <input
              id='diagnosis'
              type="text"
              className={cx('form-control')}
              value={diagnosis}
              onChange={(e) => {
                setDiagnosis(e.target.value);
              }}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor='doctor'>Doctor</label>
            <input
              id='doctor'
              type="text"
              className={cx('form-control')}
              value={doctor}
              onChange={(e) => {
                setDoctor(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className={cx('btn')}>
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPatient;
