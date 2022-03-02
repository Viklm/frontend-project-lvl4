// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Rollbar from '@rollbar/react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import './i18n.js';
import { AuthProvider } from './contexts/authContexts.jsx';
import App from './App.jsx';
import store from './slices/index.js';

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

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <Rollbar.Provider config={rollbarConfig}>
          <Rollbar.ErrorBoundary>
            <App />
          </Rollbar.ErrorBoundary>
        </Rollbar.Provider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('chat'),
);
