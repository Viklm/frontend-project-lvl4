// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import App from './App.jsx';
import store from './slices/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('chat'),
);
