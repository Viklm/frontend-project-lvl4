import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import {
  Form,
  Container,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const notify = () => toast.error(t('errors.network'));

  const LoginSchema = yup.object().shape({
    username: yup.string().required(t('yup.required')),
    password: yup.string().required(t('yup.required')),
  });

  const from = location.state?.from?.pathname || '/';

  return (
    <>
      <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
        <Container>
          <Link to="/" className="navbar-brand">{t('logo')}</Link>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12">
            <h1 className="text-center my-4">{t('LoginPage.title')}</h1>
          </Col>
          <Col className="col-xl-4 col-lg-5 col-md-6 col-sm-8">
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              initialStatus={{}}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.post(routes.loginPath(), values);
                  logIn(res.data);
                  navigate(from, { replace: true });
                } catch (error) {
                  if (error.isAxiosError || error.response.status === 401) {
                    notify();
                    actions.setStatus({ authFailed: t('errors.authFailed') });
                  }
                }
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Form.FloatingLabel className="mb-3" controlId="username" label={t('LoginPage.form.username')}>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder={t('LoginPage.form.username')}
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.username}
                      isInvalid={props.status.authFailed || props.errors.username}
                      autoComplete="username"
                    />
                    {props.errors.username && <Form.Control.Feedback type="invalid">{props.errors.username}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <Form.FloatingLabel className="mb-4" controlId="password" label={t('LoginPage.form.password')}>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('LoginPage.form.password')}
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.password}
                      isInvalid={props.status.authFailed || props.errors.password}
                      autoComplete="current-password"
                    />
                    {props.errors.password && <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>}
                    {props.status.authFailed && <Form.Control.Feedback type="invalid">{props.status.authFailed}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <button type="submit" disabled={props.isSubmitting} className="w-100 mb-3 btn btn-outline-primary">{t('LoginPage.form.button')}</button>
                </Form>
              )}
            </Formik>
            <Container className="p-4">
              <p className="text-center">
                <span>{t('LoginPage.noAccount')}</span>
                <a href="/signup">{t('LoginPage.registration')}</a>
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
