import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ErrorsFound = () => (
  <Container className="container text-center">
    <h1 className="my-5">Страница не найдена</h1>
    <Link to="/">Вернуться</Link>
  </Container>
);

export default ErrorsFound;
