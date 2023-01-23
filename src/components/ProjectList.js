import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { PROJECTS_ROUTE } from '../utils/consts';
import ChangeProject from './modals/ChangeProject';
import DeleteProject from './modals/DeleteProject';

const ProjectList = observer(() => {
  const { projectStore } = useContext(Context);

  const [selectedProject, setSelectedProject] = useState({});

  const [showUpdate, setShowUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    projectStore.fetchProjects();
  }, []);

  return (
    <>
      {projectStore.projects.map((project) => (
        <ListGroup.Item key={project.id}>
          <Card>
            <Card.Body className="d-flex justify-content-between">
              <Card.Title>{project.title}</Card.Title>
              <div>
                <Card.Link
                  onClick={() => navigate(PROJECTS_ROUTE + '/' + project.id)}
                >
                  Открыть
                </Card.Link>
                <Card.Link
                  onClick={() => {
                    setSelectedProject(project);
                    handleShowUpdate();
                  }}
                >
                  Изменить
                </Card.Link>
                <ChangeProject
                  show={showUpdate}
                  handleClose={handleCloseUpdate}
                  project={selectedProject}
                />
                <Card.Link
                  style={{ color: 'red' }}
                  onClick={() => {
                    setSelectedProject(project);
                    handleShow();
                  }}
                >
                  Удалить
                </Card.Link>
                <DeleteProject
                  show={show}
                  handleClose={handleClose}
                  project={selectedProject}
                />
              </div>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </>
  );
});
export default ProjectList;
