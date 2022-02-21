import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

const ErrorsFound = () => (
  <>
    <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
      <Container>
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
      </Container>
    </Navbar>
    <Container className="text-center">
      <h1 className="my-5">Страница не найдена</h1>
      <Link to="/">Вернуться</Link>
    </Container>
  </>
);

export default ErrorsFound;
