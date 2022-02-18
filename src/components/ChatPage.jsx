import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, batch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currentChannelActions } from '../slices/currentChannelSlice.js';
import routes from '../routes.js';
import Channel from './Channel.jsx';
import Message from './Message.jsx';
import useAuth from '../hooks/useAuth.jsx';

const getAuthorization = (user) => {
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

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
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
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
  );
};

export default ChatPage;
