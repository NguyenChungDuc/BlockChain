import React, { useState } from 'react';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import HomePatient from '../HomePatient';
import AddPatient from '../AddPatient';
import ManagePatients from '../ManagePatient';

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
        Patient Page
      </h1>
      <Tabs id="controlled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          <HomePatient />
        </Tab>
        <Tab eventKey="addPatient" title="Add Patient">
          <AddPatient />
        </Tab>
        <Tab eventKey="manage" title="Manage Patients">
          <ManagePatients />
        </Tab>
      </Tabs>
    </div>
  );
}

export default UserManage;
