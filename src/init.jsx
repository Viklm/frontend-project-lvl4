// @ts-check
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Rollbar from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'react-toastify/scss/main.scss';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { AuthProvider } from './contexts/authContexts.jsx';
import SocketContext from './contexts/socketContext.jsx';
import App from './App.jsx';
import store from './slices/index.js';
import ru from './locales/ru.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: process.env.ROLLBAR,
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

  filter.loadDictionary();
  filter.add(filter.getDictionary('ru'));

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessages(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.renameChannel({ id, name }));
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
