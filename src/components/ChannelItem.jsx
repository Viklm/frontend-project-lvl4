import React from 'react';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions as currentChannelActions } from '../slices/currentChannelSlice.js';
import { actions as modalSlice } from '../slices/modalSlice.js';

const ChannelItem = ({ id, name, removable }) => {
  const { currentChannel } = useSelector((state) => state.currentChannelReducer);
  const dispatch = useDispatch();
  const btnClasses = cn({
    'w-100 rounded-0 text-start btn': true,
    'btn-secondary': id === currentChannel,
  });

  const handleRemove = () => {
    dispatch(modalSlice.setShowModal({ type: 'removeChannel', item: { id, name } }));
  };

  const handleRename = () => {
    dispatch(modalSlice.setShowModal({ type: 'renameChannel', item: { id, name } }));
  };

  if (!removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <button onClick={() => dispatch(currentChannelActions.setCurrentChannel(id))} type="button" className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <button onClick={() => dispatch(currentChannelActions.setCurrentChannel(id))} type="button" className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </button>

        <Dropdown.Toggle split variant={id === currentChannel ? 'secondary' : ''} />

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename}>
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item onClick={handleRemove}>
            Удалить
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;
