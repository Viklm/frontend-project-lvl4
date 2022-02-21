import axios from 'axios';
import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const LoginSchema = yup.object().shape({
  username: yup.string().required('Заполните поле'),
  password: yup.string().required('Заполните поле'),
});

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  // const { t } = useTranslation();
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-12">
          <h1 className="text-center my-4">Войти</h1>
        </Col>
        <Col className="col-xl-4 col-lg-5 col-md-6 col-sm-8">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const res = await axios.post(routes.loginPath(), values);
                logIn(res.data);
                navigate(from, { replace: true });
              } catch (error) {
                if (error.isAxiosError && error.response.status === 401) {
                  setAuthFailed('Неверные имя пользователя или пароль');
                }
              }
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.FloatingLabel className="mb-3" controlId="username" label="Ваш ник">
                  {/* <Form.Label>Ваш ник</Form.Label> не работает label... */}
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Ваш ник"
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    value={props.values.username}
                    isInvalid={props.errors.username}
                    autoComplete="username"
                  />
                  {props.errors.username && <Form.Control.Feedback type="invalid">{props.errors.username}</Form.Control.Feedback>}
                </Form.FloatingLabel>
                <Form.FloatingLabel className="mb-4" controlId="password" label="Пароль">
                  {/* <Form.Label>Пароль</Form.Label> */}
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    value={props.values.password}
                    isInvalid={props.errors.password}
                    autoComplete="current-password"
                  />
                  {props.errors.password && <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>}
                  {authFailed && <Form.Control.Feedback type="invalid">{authFailed}</Form.Control.Feedback>}
                </Form.FloatingLabel>
                <button type="submit" disabled={props.isSubmitting} className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </Form>
            )}
          </Formik>
          <Container className="p-4">
            <p className="text-center">
              <span>Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
