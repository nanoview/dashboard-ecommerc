import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token and redirect to login
    localStorage.removeItem('token');
    setToken('');
    navigate('/admin');
  }, [setToken, navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default LogoutComponent;
