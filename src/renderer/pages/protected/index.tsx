import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  if (token) {
    return children;
  }

  return null;
};

export default Protected;
