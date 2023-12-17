import React, { useState } from 'react';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import HomeUser from '../HomeUser';
import ManageUser from '../ManageUser';

function UserManage() {
  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          padding: '15px 0',
          color: '#0d6efd',
        }}
      >
        User Page
      </h1>
      <Tabs id="controlled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          <HomeUser />
        </Tab>
        <Tab eventKey="manage" title="Manage User">
          <ManageUser />
        </Tab>
      </Tabs>
    </div>
  );
}

export default UserManage;
