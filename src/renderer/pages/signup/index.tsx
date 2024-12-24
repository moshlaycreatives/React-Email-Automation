import { useState } from 'react';
import { axiosJson } from '../../utils/http';
import logo from '../../asserts/gmailer-Logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userServices } from '../../services/userService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userServices.signup(formData);
      setMessage(response.data.message);
      setFormData({ username: '', email: '', password: '' });
      navigate('/login', { state: response?.data });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div
      className="d-flex align-items-center py-2 justify-content-center"
      style={{
        display: 'flex',
        height: '100vh',
        color: 'white',
        background:
          'linear-gradient(180deg, #250E42 0%, #3C1B64 25%, #532886 50%)',
      }}
    >
      <div className="w-50 sm-w-25">
        <img
          src={logo}
          alt="Gmailer Logo"
          className="img-fluid mx-auto d-block mb-2"
          style={{ height: 100 }}
        />
        <div
          className="container px-4 py-4"
          style={{
            border: '3px solid white',
            borderRadius: 25,
            background: '#FFFFFF1A',
          }}
        >
          <h1 className="text-center">Sign Up</h1>
          {message && (
            <div className="alert alert-info text-center">{message}</div>
          )}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="EmailTemplates" className="form-label">
                Email Templates
              </label>
              <input
                type="file"
                id="EmailTemplates"
                name="EmailTemplates"
                className="form-control"
                value={formData?.EmailTemplates}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="EmailLists" className="form-label">
                Email Lists
              </label>
              <input
                type="file"
                id="EmailLists"
                name="EmailLists"
                className="form-control"
                value={formData?.EmailTemplates}
                onChange={handleChange}
                required
              />
            </div> */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                backgroundColor: '#FAAF43',
                color: 'white',
                borderRadius: '15px',
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
