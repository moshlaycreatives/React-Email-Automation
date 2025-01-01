import { useState } from 'react';
import logo from '../../asserts/gmailer-Logo.png';
import { useNavigate } from 'react-router-dom';
import { userServices } from '../../services/userService';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
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
      setFormData({ UserName: '', Email: '', Password: '' });
      navigate('/login', { state: response?.data });
      toast('Register Successfully', { type: 'success' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing up');
      toast('Signup Failed', { type: 'error' });
      console.log(error);
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
              <label htmlFor="UserName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                id="UserName"
                name="UserName"
                className="form-control"
                value={formData.UserName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="Email"
                id="Email"
                name="Email"
                className="form-control"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="Password"
                id="Password"
                name="Password"
                className="form-control"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
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
