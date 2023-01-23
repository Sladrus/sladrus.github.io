import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import {
  LOGIN_ROUTE, MONITORING_ROUTE, REGISTRATION_ROUTE
} from '../utils/consts';

const Auth = observer(() => {
  const { userStore } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      if (isLogin) {
        await userStore.login(email, password);
      } else {
        await userStore.registration(email, password);
      }
      navigate(MONITORING_ROUTE);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 550 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            palceholder="Введите email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            palceholder="Введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3">
            <Col xs={12} md={8}>
              {isLogin ? (
                <div className="d-flex flex-column justify-content-between">
                  Нет аккаунта?
                  <NavLink to={REGISTRATION_ROUTE} style={{ color: '#198754' }}>
                    Зарегистрируйся!
                  </NavLink>
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-between">
                  Есть аккаунт?
                  <NavLink to={LOGIN_ROUTE} style={{ color: '#198754' }}>
                    Войдите!
                  </NavLink>
                </div>
              )}
            </Col>
            <Col md="auto" xs="auto">
              <Button
                className={'align-self-end'}
                variant={'outline-success'}
                onClick={click}
              >
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
