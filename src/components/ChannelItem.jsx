import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalSlice } from '../slices/modalSlice.js';

const ChannelItem = ({ id, name, removable }) => {
  const { t } = useTranslation();
  const { currentChannel } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();
  const btnClasses = cn({
    'w-100 rounded-0 text-start text-truncate btn': true,
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
        <button onClick={() => dispatch(channelsActions.setCurrentChannel(id))} type="button" className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <button onClick={() => dispatch(channelsActions.setCurrentChannel(id))} type="button" className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </button>

        <Dropdown.Toggle split variant={id === currentChannel ? 'secondary' : ''}>
          <span className="visually-hidden">{t('ChannelItem.dropdownName')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename}>
            {t('ChannelItem.dropdownRename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleRemove}>
            {t('ChannelItem.dropdownRemove')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;
