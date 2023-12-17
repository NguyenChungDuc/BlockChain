import AdminLayout from '../Components/AdminLayout';
import Dashboard from '../Pages/Dashboard';
import PatientManage from '../Pages/Patient';
import UpdatePatient from '../Pages/UpdatePatient';
import UserManage from '../Pages/Users';
import Login from '../Pages/Login';
import RegisterPage from '../Pages/Register';
import UserLayout from '../Components/UserLayout';
import LayoutUserHome from '../Pages/LayoutUserHome';
import MedicalRecord from '../Pages/MedicalRecord';
import Contact from '../Pages/Contact';

const InitRouters = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    requiredRole: 'admin',
    children: [
      {
        path: '/admin/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/admin/patientmanage',
        element: <PatientManage />,
      },
      {
        path: '/admin/usermanage',
        element: <UserManage />,
      },
      {
        path: '/admin/patientmanage/update/:id',
        element: <UpdatePatient />,
      },
    ],
  },
  {
    path: '/user',
    element: <UserLayout />,
    requiredRole: 'user',
    children: [
      {
        path: '/user',
        element: <LayoutUserHome />,
      },
      {
        path: '/user/medicalrecord',
        element: <MedicalRecord />,
      },
      {
        path: '/user/contact',
        element: <Contact />,
      },
    ],
  },
];

export default InitRouters;
