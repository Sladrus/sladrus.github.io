import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';

const CreateProject = observer(({ show, handleClose }) => {
  const { projectStore } = useContext(Context);

  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [botUsername, setBotUsername] = useState('');

  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setUsers(text.split('\r\n'));
    };
    reader.readAsText(e.target.files[0]);
  };

  const newProject = async () => {
    const body = { title: title, bot: botUsername, usersList: users };
    await projectStore.createProject(body);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Название проекта</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Проект"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Юзернейм бота</Form.Label>
            <Form.Control
              value={botUsername}
              onChange={(e) => setBotUsername(e.target.value)}
              placeholder="@username"
              autoFocus
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              {!users.length
                ? 'Загрузите список пользователей для спама'
                : `Загружено: ${users.length} пользователей`}
            </Form.Label>
            <Form.Control type="file" onChange={(e) => readFile(e)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={() => newProject()}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProject;
