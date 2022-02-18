import React from 'react';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions as currentChannelActions } from '../slices/currentChannelSlice.js';

const Channel = () => {
  const { channels } = useSelector((state) => state.channelsReducer);
  const { currentChannel } = useSelector((state) => state.currentChannelReducer);
  const dispatch = useDispatch();
  // padding-left: 1.5rem; padding-right: 0.5rem; не работают (ps-4, pe-2) на строке 10
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="btn p-0 btn-group-vertical btn-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <Nav as="ul" className="flex-column px-2" variant="pills" fill>
        {channels.length > 0 && channels.map((channel) => {
          const btnClasses = cn({
            'w-100 rounded-0 text-start btn': true,
            'btn-secondary': channel.id === currentChannel,
          });

          if (!channel.removable) {
            return (
              <Nav.Item as="li" className="w-100" key={channel.id}>
                <button onClick={() => dispatch(currentChannelActions.setCurrentChannel(channel.id))} type="button" className={btnClasses}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              </Nav.Item>
            );
          }

          return (
            <Nav.Item as="li" className="w-100" key={channel.id}>
              <Dropdown className="d-flex" as={ButtonGroup}>
                <button onClick={() => dispatch(currentChannelActions.setCurrentChannel(channel.id))} type="button" className={btnClasses}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>

                <Dropdown.Toggle split variant={channel.id === currentChannel ? 'secondary' : ''} />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => console.log('Переименовать')}>
                    Переименовать
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => console.log('Удалить')}>
                    Удалить
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default Channel;
