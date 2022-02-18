import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  const authProviderObj = {
    user,
    logIn: (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    },
    logOut: () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login', { replace: true });
    },
  };

  return (
    <AuthContext.Provider value={authProviderObj}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
