import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import CreateProject from '../components/modals/CreateProject';
import ProjectList from '../components/ProjectList';

const Projects = observer(() => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Ваши проекты</Card.Title>
          <Button variant="primary" onClick={() => handleShow()}>
            Создать проект
          </Button>
          <CreateProject show={show} handleClose={handleClose} />
        </Card.Body>
        <ListGroup>
          <ProjectList />
        </ListGroup>
      </Card>
    </>
  );
});

export default Projects;
