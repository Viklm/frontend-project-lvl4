import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Form,
  Container,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const SignSchema = yup.object().shape({
    username: yup.string().required(t('yup.required')).min(3, t('yup.username')).max(20, t('yup.username')),
    password: yup.string().required(t('yup.required')).min(6, t('yup.passwordMin')),
    confirmPassword: yup.string().required(t('yup.required')).oneOf([yup.ref('password')], t('yup.confirmPassword')),
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
            <h1 className="text-center my-4">{t('SignupPage.registration')}</h1>
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
                    actions.setStatus({ signupFailed: t('errors.signupFailed') });
                  }
                }
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit} autoComplete="off">
                  <Form.FloatingLabel className="mb-3" controlId="username" label={t('SignupPage.form.username')}>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder={t('SignupPage.form.username')}
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.username}
                      isInvalid={props.status.signupFailed || props.errors.username}
                      autoComplete="username"
                    />
                    {props.errors.username && <Form.Control.Feedback type="invalid">{props.errors.username}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <Form.FloatingLabel className="mb-4" controlId="password" label={t('SignupPage.form.password')}>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('SignupPage.form.password')}
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.password}
                      isInvalid={props.status.signupFailed || props.errors.password}
                      autoComplete="current-password"
                    />
                    {props.errors.password && <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <Form.FloatingLabel className="mb-4" controlId="confirmPassword" label={t('SignupPage.form.confirmPassword')}>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder={t('SignupPage.form.confirmPassword')}
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      value={props.values.confirmPassword}
                      isInvalid={props.status.signupFailed || props.errors.confirmPassword}
                      autoComplete="current-password"
                    />
                    {props.errors.confirmPassword && <Form.Control.Feedback type="invalid">{props.errors.confirmPassword}</Form.Control.Feedback>}
                    {props.status.signupFailed && <Form.Control.Feedback type="invalid">{props.status.signupFailed}</Form.Control.Feedback>}
                  </Form.FloatingLabel>
                  <button type="submit" disabled={props.isSubmitting} className="w-100 mb-3 btn btn-outline-primary">{t('SignupPage.form.button')}</button>
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
