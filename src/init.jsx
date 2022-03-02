// @ts-check
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Rollbar from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'react-toastify/scss/main.scss';
import { AuthProvider } from './contexts/authContexts.jsx';
import SocketContext from './contexts/socketContext.jsx';
import App from './App.jsx';
import store from './slices/index.js';
import ru from './locales/ru.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: 'da06b579b28144309b31221765a5502c',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

export default async (socket) => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    });

  return (
    <Rollbar.Provider config={rollbarConfig}>
      <Rollbar.ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <SocketContext.Provider value={socket}>
                <App />
              </SocketContext.Provider>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </Rollbar.ErrorBoundary>
    </Rollbar.Provider>
  );
};
