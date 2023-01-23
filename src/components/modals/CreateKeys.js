import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';

const CreateKeys = observer(({ show, handleClose }) => {
  const { keysStore } = useContext(Context);

  const [title, setTitle] = useState('');
  const [keysList, setKeysList] = useState('');

  const newKeys = async () => {
    const body = { title: title, list: keysList };
    await keysStore.createKeys(body);
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
            <Form.Label>Название набора ключей</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ключи</Form.Label>
            <Form.Control
              as="textarea"
              value={keysList}
              onChange={(e) => setKeysList(e.target.value)}
              placeholder="ключ 1, ключ 2, ключ 3, ключ 4 ...через запятую"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={() => newKeys()}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateKeys;
