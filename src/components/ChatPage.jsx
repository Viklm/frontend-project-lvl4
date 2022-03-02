import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, batch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currentChannelActions } from '../slices/currentChannelSlice.js';

import routes from '../routes.js';
import Channel from './Channel.jsx';
import Message from './Message.jsx';
import useAuth from '../hooks/useAuth.jsx';
import getModal from './modal/index.js';

const getAuthorization = (user) => {
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const renderModal = (modal) => {
  if (!modal.type) {
    return null;
  }

  const Modal = getModal(modal.type);
  return <Modal />;
};

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, logOut } = useAuth();
  const { modal } = useSelector((state) => state.modalReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthorization(user) });
        batch(() => {
          dispatch(channelsActions.setChannels(data.channels));
          dispatch(messagesActions.setMessages(data.messages));
          dispatch(currentChannelActions.setCurrentChannel(data.currentChannelId));
        });
      } catch (error) {
        console.error(error, '1');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
        <Container>
          <Link to="/" className="navbar-brand">{t('logo')}</Link>
          <button onClick={logOut} type="button" className="btn btn-primary">{t('logOutBtn')}</button>
        </Container>
      </Navbar>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Col className="border-end pt-5 px-0 bg-light" xs={4} md={2}>
            <Channel />
          </Col>
          <Col className="h-100 p-0">
            <Message />
          </Col>
        </Row>
      </Container>
      {renderModal(modal)}
    </>
  );
};

export default ChatPage;
