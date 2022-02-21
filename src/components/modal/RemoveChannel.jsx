import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalSlice } from '../../slices/modalSlice.js';
import socket from '../../socket.js';

const RemoveChannel = () => {
  const { modal } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalSlice.setHiddenModal());
  const handleRemove = () => {
    socket.emit('removeChannel', modal.item, (res) => {
      if (res.status === 'ok') {
        handleClose();
      }
    });
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          Уверены?
        </p>
        <div className="d-flex justify-content-end">
          <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
            Отменить
          </button>
          <button onClick={handleRemove} type="button" className="btn btn-danger">
            Удалить
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
