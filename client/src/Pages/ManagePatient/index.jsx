import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

import classNames from 'classnames/bind';
import styles from './ManagePatient.module.scss';

const cx = classNames.bind(styles);

const ManagePatients = () => {
  const [user, setUser] = React.useState([]);
  const [search, setSearch] = React.useState('');
  useEffect(() => {
    const getUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      const res = await axios.get('http://localhost:5000/api/patient/', {
        headers: {
          Authorization: response.data.newAccessToken
        }
      });
      setUser(res.data.users);
    };
    getUser();
  }, []);

  const handleDelete = async (_id, name) => {
    if (window.confirm(`Are you sure you want to delete user ${name} ?`)) {
      const Authorization = localStorage.getItem('accessToken')
      const result = await axios.delete(`http://localhost:5000/api/patient/?_id=${_id}`, {
        headers: {
          Authorization: Authorization
        }
      });
      if (result.status !== 200) {
        alert('Error');
      } else {
        setUser(Array.from(user).filter((x) => x._id !== _id));
      }
    } else {
      return;
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className={cx('search')}>
        <input
          type="text"
          placeholder="Search by name ..."
          style={{ width: '300px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className='text-nowrap'>Name</th>
            <th className='text-nowrap'>Age</th>
            <th className='text-nowrap'>Phone</th>
            <th className='text-nowrap'>Address</th>
            <th className='text-nowrap'>Health Insurance Card Number</th>
            <th className='text-nowrap'>Diagnosis</th>
            <th className='text-nowrap'>Doctor</th>
            <th className='text-nowrap'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <tr key={index}>
                <td className='text-nowrap'>{item.name}</td>
                <td className='text-nowrap'>{item.age}</td>
                <td className='text-nowrap'>{item.phone}</td>
                <td className='text-nowrap'>{item.address}</td>
                <td className='text-nowrap'>{item.card}</td>
                <td className='text-nowrap'>{item.diagnosis}</td>
                <td className='text-nowrap'>{item.doctor}</td>
                <td className={cx('d-flex justify-content-center')} style={{ gap: '10px' }}>
                  <button
                    className={cx('btn')}
                    style={{
                      backgroundColor: 'orange',
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      navigate(`/admin/patientmanage/update/${item._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={cx('btn')}
                    style={{
                      backgroundColor: 'red',
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      handleDelete(item._id, item.name);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ManagePatients;
