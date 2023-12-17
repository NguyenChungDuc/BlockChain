import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const cx = classNames.bind(styles);
const HomeUser = () => {
  const [data, setData] = React.useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      const res = await axios.get('http://localhost:5000/api/user/', {
        headers: {
          Authorization: response.data.newAccessToken
        }
      });
      setData(res?.data.users)
    };
    getUser();
  }, []);
  return (
    <>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default HomeUser;
