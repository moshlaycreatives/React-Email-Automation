import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';
import Tabs from './components/tabs';
import Setting from './pages/setting';
import Spintax from './pages/Spintax';
import GmailAccounts from './pages/gmail-accounts';
import EmailLists from './pages/email-lists';
import Campaign from './pages/campaign';
import Login from './pages/login';
import logo from './asserts/gmailer-Logo.png';
import AddNewSpintax from './pages/Spintax/add-new';

export const tabs = [
  { id: 1, name: 'Settings', path: '/settings', component: Setting },
  { id: 2, name: 'Spintax', path: '/spintax', component: Spintax },
  {
    id: 3,
    name: 'Accounts',
    path: '/gmail-accounts',
    component: GmailAccounts,
  },
  {
    id: 4,
    name: 'Email lists',
    path: '/email-lists',
    component: EmailLists,
  },
  { id: 5, name: 'Campaign', path: '/campaign', component: Campaign },
  // { id: 6, name: 'Login', path: '/login', component: Login },
];
export function Home() {
  return (
    <div
      style={{
        height: '100vh',
        background:
          'linear-gradient(180deg, #250E42 0%, #3C1B64 25%, #532886 50%)',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-4 my-5">
            <img
              width="80%"
              src={logo}
              alt="Gmailer Logo"
              className="img-fluid mx-auto d-block mb-2"
              style={{ height: 100 }}
            />
            <div
              style={{
                width: '100%',
              }}
              className="row justify-content-center flex-wrap text-break"
            >
              <div
                className="bg-white col-sm-8 mt-5 p-4 fw-bold"
                style={{
                  border: '2px',
                  borderRadius: '25px',
                  borderStyle: 'solid',
                  borderColor: 'rgb(250, 175, 67)',
                }}
              >
                <div>
                  <span
                    style={{
                      color: 'rgba(60, 27, 100,0.8)',
                    }}
                  >
                    Name: {'  '}
                  </span>
                  Adam
                </div>
                <div>
                  <span
                    style={{
                      color: 'rgba(60, 27, 100,0.8)',
                    }}
                  >
                    Email: {'  '}
                  </span>{' '}
                  hellow@gmail.com
                </div>
                <div>
                  <span
                    style={{
                      color: 'rgba(60, 27, 100,0.8)',
                    }}
                  >
                    License:{'  '}
                  </span>
                  Ultimate
                </div>
                <div>
                  <span
                    style={{
                      color: 'rgba(60, 27, 100,0.8)',
                    }}
                  >
                    Activation Left:{'  '}
                  </span>
                  Lifetime
                </div>
              </div>
            </div>
            <div>
              <button
                style={{
                  border: '0px',
                  borderRadius: '15px',
                  marginTop: '300px',
                  marginLeft: '55px',
                }}
                className="bg-danger px-4 py-3 text-white fw-bold fs-4"
              >
                Deactivate
              </button>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="row justify-content-end">
              <div
                className="bg-white col-sm-5 mt-5 p-4 fw-bold"
                style={{
                  border: '2px',
                  borderRadius: '25px',
                  borderStyle: 'solid',
                  borderColor: 'rgb(250, 175, 67)',
                  boxShadow: 'rgb(250, 175, 67) 0px 4px 0px',
                }}
              >
                <div>
                  <span
                    style={{
                      color: 'rgba(60, 27, 100,0.8)',
                    }}
                  >
                    Support: {'  '}
                  </span>
                  hellow@gmail.com
                </div>
                <div>
                  <span
                    style={{
                      color: 'rgba(60, 27, 100,0.8)',
                    }}
                  >
                    Documentation
                  </span>
                </div>
              </div>
            </div>
            <Tabs items={tabs} />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* {tabs.map((tab) => (
          <Route key={tab.id} path={tab.path} element={tab.component} />
        ))} */}
        <Route path="/spintax-addnew" element={<AddNewSpintax />} />
        <Route path="/" element={<Home />}>
          <Route path="/settings" element={<Setting />} />
          <Route path="/spintax" element={<Spintax />} />
          <Route path="/gmail-accounts" element={<GmailAccounts />} />
          <Route path="/email-lists" element={<EmailLists />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
