import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '..';

const NavBar = observer(() => {
  const { userStore } = useContext(Context);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>👺👺👺👺👺👺</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <NavLink onClick={() => navigate(MONITORING_ROUTE)}>
                Мониторинг чатов
              </NavLink> */}
              {/* <NavLink onClick={() => navigate(PROJECTS_ROUTE)}>
                Рассылка сообщений
              </NavLink>
              <NavLink onClick={() => navigate(PROJECTS_ROUTE)}>
                Спам чатов
              </NavLink>
              <NavLink onClick={() => navigate(PARSER_ROUTE)}>
                Парсер пользователей
              </NavLink> */}
            </Nav>
            <Button
              variant={'outline-light'}
              onClick={() => userStore.logout()}
            >
              {userStore.isAuth ? 'Выйти' : 'Авторизоваться'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
});

export default NavBar;
