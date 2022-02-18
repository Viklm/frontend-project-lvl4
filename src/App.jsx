import React, { useContext, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './contexts/authContexts.jsx';
import LoginPage from './components/LoginPage.jsx';
import ErorrPage from './components/ErorrPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import routes from './routes.js';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    user && user.token ? children : <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
          <Container>
            <Link to="/" className="navbar-brand">Hexlet Chat</Link>
          </Container>
        </Navbar>
        <Routes>
          <Route
            path={routes.homePagePath()}
            element={(
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="*" element={<ErorrPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;

// перенести котнейнер на 37, 51 строке в логинпэйдж если слетит верстка
