import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { actions as modalSlice } from '../../slices/modalSlice.js';
import useSocket from '../../hooks/useSocket.jsx';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const socket = useSocket();

  const notify = () => toast.success(t('success.removeChannel'));
  const handleClose = () => dispatch(modalSlice.setHiddenModal());
  const handleRemove = () => {
    socket.emit('removeChannel', modal.item, (res) => {
      if (res.status === 'ok') {
        handleClose();
        notify();
      }
    });
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {t('Modal.removeChannelTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('Modal.removeChannelBody')}
        </p>
        <div className="d-flex justify-content-end">
          <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
            {t('Modal.cancelBtn')}
          </button>
          <button onClick={handleRemove} type="button" className="btn btn-danger">
            {t('Modal.removeBtn')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
