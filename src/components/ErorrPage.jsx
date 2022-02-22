import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ErrorsFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
        <Container>
          <Link to="/" className="navbar-brand">{t('logo')}</Link>
        </Container>
      </Navbar>
      <Container className="text-center">
        <h1 className="my-5">{t('ErrorPage.title')}</h1>
        <Link to="/">{t('ErrorPage.homeLink')}</Link>
      </Container>
    </>
  );
};

export default ErrorsFound;
