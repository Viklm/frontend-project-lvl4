import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { actions as modalSlice } from '../slices/modalSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as currentChannelActions } from '../slices/currentChannelSlice.js';
import ChannelItem from './ChannelItem.jsx';
import socket from '../socket.js';

const Channel = () => {
  const { channels } = useSelector((state) => state.channelsReducer);
  const { currentChannel } = useSelector((state) => state.currentChannelReducer);
  const defaultChannel = channels.find(({ name }) => name === 'general')?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.removeChannel(id));
      if (id === currentChannel) {
        dispatch(currentChannelActions.setCurrentChannel(defaultChannel));
      }
    });
    socket.on('renameChannel', ({ id, name }) => {
      dispatch(channelsActions.renameChannel({ id, name }));
    });
    return () => {
      socket.removeAllListeners('newChannel');
      socket.removeAllListeners('removeChannel');
      socket.removeAllListeners('renameChannel');
    };
  }, [defaultChannel, currentChannel]);

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button onClick={() => dispatch(modalSlice.setShowModal({ type: 'newChannel' }))} type="button" className="btn p-0 btn-group-vertical btn-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <Nav as="ul" className="flex-column px-2" variant="pills" fill>
        {channels.length > 0 && channels.map(({ id, name, removable }) => (
          <ChannelItem key={id} id={id} name={name} removable={removable} />
        ))}
      </Nav>
    </>
  );
};

export default Channel;
