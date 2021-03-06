import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { animateScroll as scroll } from 'react-scroll';
import useAuth from '../hooks/useAuth.jsx';
import useSocket from '../hooks/useSocket.jsx';

const Message = () => {
  const { t } = useTranslation();
  const messageRef = useRef();
  const { user } = useAuth();
  const { currentChannel, channels } = useSelector((state) => state.channelsReducer);
  const socket = useSocket();

  const getCurrentChannelName = channels.find(({ id }) => id === currentChannel)?.name;

  const messages = useSelector((state) => {
    const allMessages = state.messagesReducer.messages;
    const currentMessages = allMessages.filter(({ channelId }) => channelId === currentChannel);
    return currentMessages;
  });

  useEffect(() => {
    messageRef.current.focus();
  }, [currentChannel]);

  useEffect(() => {
    scroll.scrollToBottom({
      duration: 0,
      containerId: 'message-box',
    });
  }, [messages]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, actions) => {
      const message = {
        body: filter.clean(values.body),
        channelId: currentChannel,
        username: user.username,
      };
      socket.emit('newMessage', message, () => {
        actions.resetForm();
        messageRef.current.focus();
      });
    },
  });

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${getCurrentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.messagesCount', { count: messages.length })}
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
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
            <InputGroup hasValidation>
              <Form.Control
                name="body"
                aria-label="?????????? ??????????????????"
                className="border-0 p-0 ps-2"
                type="text"
                placeholder="?????????????? ??????????????????..."
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.body}
                ref={messageRef}
              />
              <button type="submit" disabled={!formik.values.body.trim() || formik.isSubmitting} className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">??????????????????</span>
              </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Message;
