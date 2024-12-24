import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const token = localStorage.getItem('auth-token');
  const navigate = useNavigate();
  debugger;
  if (token) {
    return children;
  }

  useEffect(() => {
    // Redirect to login if no token
    navigate('/login');
  }, []);

  return null;
};

export default Protected;
