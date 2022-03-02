import ReactDOM from 'react-dom';
import socket from './socket.js';
import init from './init.jsx';

const app = async () => {
  const vdom = await init(socket);
  const chat = document.getElementById('chat');
  ReactDOM.render(vdom, chat);
};

app();
