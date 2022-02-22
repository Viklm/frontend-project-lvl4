import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { actions as modalSlice } from '../../slices/modalSlice.js';
import socket from '../../socket.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalSlice.setHiddenModal());

  const { modal: { item } } = useSelector((state) => state.modalReducer);

  const namesOfChannels = useSelector((state) => state.channelsReducer.channels
    .map(({ name }) => name));

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(t('yup.required')).notOneOf(namesOfChannels, t('yup.notOneOf')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        id: item.id,
      };

      socket.emit('renameChannel', data, (res) => {
        if (res.status === 'ok') {
          dispatch(modalSlice.setHiddenModal());
        }
      });
    },
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {t('Modal.renameChannelTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Group className="form-group" controlId="newChannel">
            <Form.Label visuallyHidden>Имя канала</Form.Label>
            <Form.Control
              ref={inputRef}
              isInvalid={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-2"
              name="name"
              type="text"
            />
            {formik.errors.name && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
              {t('Modal.cancelBtn')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('Modal.button')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
