import axios from 'axios';
import React from 'react';
import { Formik } from 'formik';
import {
  Form,
  Container,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const SignSchema = yup.object().shape({
  username: yup.string().required('Заполните поле').min(3, 'от 3 до 20 символов').max(20, 'от 3 до 20 символов'),
  password: yup.string().required('Заполните поле').min(6, 'минимально 6 символов'),
  confirmPassword: yup.string().required('Заполните поле').oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

const SignupPage = () => {
  // const { t } = useTranslation();
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  return (
    <>
      <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
        <Container>
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12">
            <h1 className="text-center my-4">Регистрация</h1>
          </Col>
          <Col className="col-xl-4 col-lg-5 col-md-6 col-sm-8">
            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
              initialStatus={{}}
              validationSchema={SignSchema}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.post(routes.signupPath(), values);
                  logIn(res.data);
                  navigate(from, { replace: true });
                } catch (error) {
                  if (error.isAxiosError && error.response.status === 409) {
                    actions.setStatus({ signupFailed: 'Такой пользователь уже существует' });
                  }
                }
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit} autoComplete="off">
                  <Form.FloatingLabel className="mb-3" controlId="username" label="Ваш ник">
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Ваш ник"
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.username}
                      isInvalid={props.status.signupFailed || props.errors.username}
                      autoComplete="username"
                    />
                    {props.errors.username && <Form.Control.Feedback type="invalid">{props.errors.username}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <Form.FloatingLabel className="mb-4" controlId="password" label="Пароль">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.password}
                      isInvalid={props.status.signupFailed || props.errors.password}
                      autoComplete="current-password"
                    />
                    {props.errors.password && <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <Form.FloatingLabel className="mb-4" controlId="confirmPassword" label="Подтвердите пароль">
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder="Подтвердите пароль"
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.confirmPassword}
                      isInvalid={props.status.signupFailed || props.errors.confirmPassword}
                      autoComplete="current-password"
                    />
                    {props.errors.confirmPassword && <Form.Control.Feedback type="invalid">{props.errors.confirmPassword}</Form.Control.Feedback>}
                    {props.status.signupFailed && <Form.Control.Feedback type="invalid">{props.status.signupFailed}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <button type="submit" disabled={props.isSubmitting} className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
