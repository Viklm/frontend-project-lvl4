import React, { useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth.jsx';

const Message = () => {
  const messageRef = useRef();
  const { user } = useAuth();
  const socket = io();
  const { messages } = useSelector((state) => state.messagesReducer);
  console.log(messages, 'message load');

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">
            {messages.length}
            {' сообщений'}
          </span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
          {messages.length > 0 && messages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{
              body: '',
            }}
            onSubmit={(values, actions) => {
              const message = {
                body: values.body,
                // channelId: currentChannelId,
                username: user.username,
              };
              socket.emit('newMessage', message, () => {
                actions.resetForm();
                messageRef.current.focus();
              });
              console.log(message, 'message send');
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} className="py-1 border rounded-2" noValidate>
                <InputGroup hasValidation>
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    className="border-0 p-0 ps-2"
                    type="text"
                    placeholder="Введите сообщение..."
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    value={props.values.body}
                    ref={messageRef}
                  />
                  <button type="submit" disabled={!props.values.body.trim() || props.isSubmitting} className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                    <span hidden>Отправить</span>
                  </button>
                </InputGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Message;
