import React, { FC, useEffect, useState } from 'react';
import logo from '../../asserts/gmailer-Logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userServices } from '../../services/userService';
import { toast } from 'react-toastify';

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const data = location?.state?.data;

  useEffect(() => {
    setEmail(data?.email);
  }, [data?.email]);

  console.log(location);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      // TODO: Handle form submission, e.g., send data to backend
      await userServices.login({ email, password });
      debugger;
      navigate('/settings');
    } catch (error) {
      toast('Login Failed', { type: 'error' });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          'linear-gradient(180deg, #250E42 0%, #3C1B64 25%, #532886 50%)',
      }}
    >
      <div className="container">
        <img
          src={logo}
          alt="Gmailer Logo"
          className="img-fluid mx-auto d-block mb-2"
          style={{ height: 100 }}
        />
        <div className="row justify-content-center">
          <div className="col-11 col-sm-12 col-md-8 col-lg-5">
            <div
              className="card p-5"
              style={{
                border: '3px solid white',
                borderRadius: 25,
                background: '#FFFFFF1A',
              }}
            >
              <div className="">
                <h3 className="text-center text-white fs-1">Login</h3>
              </div>
              <div className="card-body p-0">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <a href="#" className="text-decoration-none text-white">
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: '#FAAF43',
                      color: 'white',
                      borderRadius: '15px',
                    }}
                  >
                    Sign In
                  </button>
                </form>
                <div className="w-100 d-flex justify-content-between mt-3">
                  <p className="text-center text-white">
                    Don't have an account yet?
                  </p>
                  <Link
                    to="/signup"
                    className="text-decoration-none text-white"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
