import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../../asserts/gmailer-Logo.png';
import User from './pages/user';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const tabs = [
  {
    id: 1,
    name: 'User',
    path: '/dashboard/users',
    component: User,
    icon: 'line-md:account',
  },
  {
    id: 2,
    name: 'Analytics',
    path: '/dashboard/analytics',
    component: User,
    icon: 'material-symbols:analytics-outline-sharp',
  },
];

const Dashboard = () => {
  const location = useLocation();
  const currentTab = tabs.find((tab) => tab.path === location.pathname);
  const [selectedId, setSelectedId] = useState(currentTab?.id || 1);

  return (
    <div className="row">
      <div
        style={{
          color: 'white',
          height: '100vh',
          background:
            'linear-gradient(180deg, #250E42 0%, #3C1B64 25%, #532886 50%)',
        }}
        className="col-sm-3 p-5"
      >
        <img width="100%" src={logo} alt="logo" />
        <ul className="mt-3 px-2" style={{ listStyle: 'none' }}>
          {tabs.map((tab) => (
            <li
              style={{
                boxSizing: 'border-box',
                color: 'white',
                background:
                  selectedId === tab.id
                    ? 'linear-gradient(180deg, #250E42 100%, #3C1B64 100%, #532886 80%)'
                    : 'transparent',
                padding: '1rem',
                borderLeft: selectedId === tab.id ? '2px solid' : '',
                marginLeft: selectedId === tab.id ? '0px' : '2px',
              }}
              className="mb-1"
              key={tab.id}
              onClick={() => setSelectedId(tab.id)}
            >
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}
                className="d-flex align-items-center gap-2"
                to={tab.path}
              >
                <Icon icon={tab.icon || ''} width="24" height="24" />
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-sm-9 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
