import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../..';

const DeleteProject = observer(({ show, handleClose, project }) => {
  const { projectStore } = useContext(Context);

  const removeProject = async () => {
    await projectStore.deleteProject(project.id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>{`Вы уверенны, что хотите удалить проект ${project.title}?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Закрыть
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            removeProject();
          }}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteProject;
