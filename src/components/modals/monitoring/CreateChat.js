import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../..';
import { createChats } from '../../../http/chatApi';
import CreateKeys from '../CreateKeys';

const CreateChat = observer(({ show, onHide }) => {
  const { telegramService, keysStore } = useContext(Context);

  const [uploadedChats, setUploadedChats] = useState([]);
  const [showKeys, setShowKeys] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});
  const { userStore } = useContext(Context);

  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setUploadedChats(text.split('\r\n'));
    };
    reader.readAsText(e.target.files[0]);
  };

  const createChat = async () => {
    const body = uploadedChats.map((chat) => ({
      link: chat,
      user: userStore.user.id,
      keys: selectedKey,
    }));
    const resp = await createChats(body);
    telegramService.chats = [...telegramService.chats, ...resp];
    onHide();
  };

  useEffect(() => {
    keysStore.fetchKeys();
  }, [show]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => onHide()}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Добавить чаты
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Выберите набор ключей:</Form.Label>
          <div className="d-flex mb-2">
            <Form.Select onChange={(e) => setSelectedKey(e.target.value)}>
              <option>Выберите ключ</option>
              {keysStore.keys.map((key, index) => (
                <option
                  key={index}
                  value={key.id}
                >{`${key.title} - ${key.list}`}</option>
              ))}
            </Form.Select>
            <Button
              className="ms-3"
              variant="primary"
              onClick={() => setShowKeys(true)}
            >
              Добавить
            </Button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Загрузите список чатов:</Form.Label>
          <Form.Control type="file" onChange={(e) => readFile(e)} />
        </Form.Group>

        <Form.Group className="d-grid pt-4 pb-3">
          <Button
            variant="primary"
            size="lg"
            onClick={async () => createChat()}
          >
            Добавить
          </Button>
        </Form.Group>
        <div className="d-grid">
          <Button variant="secondary" size="lg" onClick={() => onHide()}>
            Закрыть
          </Button>
        </div>
      </Modal.Body>
      <CreateKeys show={showKeys} handleClose={() => setShowKeys(false)} />
    </Modal>
  );
});

export default CreateChat;
