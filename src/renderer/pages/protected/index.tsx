import Login from '../login';

const Protected = ({ children }) => {
  const token = localStorage.getItem('auth-token');

  if (token) return children;

  return <Login />;
};

export default Protected;
