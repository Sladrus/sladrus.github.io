import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  MONITORING_DIALOGS,
  MONITORING_REQUESTS,
  MONITORING_ROUTE,
} from '../utils/consts';

const MonitorNav = () => {
  const navigate = useNavigate();

  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={() => navigate(MONITORING_ROUTE)}>
          Chats
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="link-2"
          onClick={() => navigate(MONITORING_REQUESTS)}
        >
          Requests
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="link-3"
          onClick={() => navigate(MONITORING_DIALOGS)}
        >
          Dialogs
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MonitorNav;
