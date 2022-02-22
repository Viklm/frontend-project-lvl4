import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider } from './contexts/authContexts.jsx';
import LoginPage from './components/LoginPage.jsx';
import ErorrPage from './components/ErorrPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import SignupPage from './components/SignupPage.jsx';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    user && user.token ? children : <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route
          path="/"
          element={(
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<ErorrPage />} />
      </Routes>
    </div>
  </AuthProvider>
);

export default App;
