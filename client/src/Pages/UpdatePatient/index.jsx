import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UpdatePatient.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const cx = classNames.bind(styles);
const UpdatePatient = () => {
  const { id } = useParams();
  const [userUpdate, setUserUpdate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      const res = await axios.get(`http://localhost:5000/api/patient/profile/${id}`, {
        headers: {
          Authorization: response.data.newAccessToken
        }
      });
      console.log(res.data.rs);
      setUserUpdate(res.data.rs);
    };
    getUserById();
  }, [id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      await axios.put(`http://localhost:5000/api/patient/${id}`, userUpdate, {
        headers: {
          Authorization: response.data.newAccessToken
        }
      });
      toast.success('Updated Patient');
      navigate('/admin/patientmanage')
    } catch (error) {
      toast.error('Something went wrong')
    }

  };

  return (
    <div className={cx('wrapper')}>
      <h1>Update Patient</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className={cx('form-group')}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={cx('form-control')}
            defaultValue={userUpdate?.name}
            onChange={(e) => {
              setUserUpdate({ ...userUpdate, name: e.target.value });
            }}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            className={cx('form-control')}
            defaultValue={userUpdate?.age}
            onChange={(e) => {
              setUserUpdate({ ...userUpdate, age: e.target.value });
            }}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            className={cx('form-control')}
            defaultValue={userUpdate?.phone}
            onChange={(e) => {
              setUserUpdate({ ...userUpdate, phone: e.target.value });
            }}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className={cx('form-control')}
            defaultValue={userUpdate?.address}
            onChange={(e) => {
              setUserUpdate({ ...userUpdate, address: e.target.value });
            }}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="card">Number Of Health Insurance Card</label>
          <input
            id="card"
            type="text"
            className={cx('form-control')}
            defaultValue={userUpdate?.card}
            onChange={(e) => {
              setUserUpdate({
                ...userUpdate,
                card: e.target.value,
              });
            }}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="diagnosis">Diagnosis</label>
          <input
            id="diagnosis"
            type="text"
            className={cx('form-control')}
            defaultValue={userUpdate?.diagnosis}
            onChange={(e) => {
              setUserUpdate({ ...userUpdate, diagnosis: e.target.value });
            }}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="doctor">Doctor</label>
          <input
            id="doctor"
            type="text"
            className={cx('form-control')}
            defaultValue={userUpdate?.doctor}
            onChange={(e) => {
              setUserUpdate({ ...userUpdate, doctor: e.target.value });
            }}
          />
        </div>
        <button type="submit" className={cx('btn')}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
