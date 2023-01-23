import React, { createRef, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Context } from '..';
import CreateKeys from '../components/modals/CreateKeys';

const Parser = () => {
  const { keysStore, telegramService } = useContext(Context);

  const [selectedKey, setSelectedKey] = useState('');
  const [show, setShow] = useState(false);
  const [chats, setChats] = useState([]);
  const [parsedUsers, setParsedUsers] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [keys, setKeys] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const textLog = createRef();

  const componentDidUpdate = () => {
    textLog.current.scrollTop = textLog.current.scrollHeight;
  };

  useEffect(() => {
    keysStore.fetchKeys().then((data) => setKeys(data));
  }, []);

  useEffect(() => {
    componentDidUpdate();
  }, [consoleOutput]);

  const setConsoleLog = (log) => {
    setConsoleOutput((prev) => [...prev, log + '\r\n']);
  };

  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setChats(text.split('\r\n'));
    };
    reader.readAsText(e.target.files[0]);
  };

  const downloadTxtFile = (data) => {
    const element = document.createElement('a');
    const file = new Blob(data, {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = `users-${data.length}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const parseChats = async () => {
    telegramService.setLog(setConsoleLog);
    const result = await telegramService.parseChats(selectedKey, chats);
    setParsedUsers(result);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={4}>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Выберите набор ключей</Form.Label>
                <div className="d-flex justyfy-content-between">
                  <Form.Select onChange={(e) => setSelectedKey(e.target.value)}>
                    <option value="">Все сообщения</option>
                    {keys.map((key) => (
                      <option key={key.id} value={key.list}>
                        {key.title}
                      </option>
                    ))}
                    {/* <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                  </Form.Select>
                  <CreateKeys show={show} handleClose={handleClose} />
                  <Button
                    variant="outline-success"
                    onClick={async () => {
                      handleShow();
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  {chats.length
                    ? `Загружено ${chats.length} чатов`
                    : 'Загрузите список чатов'}
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    readFile(e);
                  }}
                />
              </Form.Group>

              <Button
                className="w-100"
                variant="outline-success"
                onClick={async () => {
                  setConsoleOutput([]);
                  await parseChats();
                }}
              >
                Старт
              </Button>
              {parsedUsers.length ? (
                <Button
                  className="w-100"
                  variant="outline-success"
                  onClick={() => {
                    downloadTxtFile(parsedUsers);
                  }}
                >
                  Скачать файл
                </Button>
              ) : (
                <></>
              )}
            </Form>
          </Col>
          <Col sm={8}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Вывод консоли</Form.Label>
              <Form.Control
                ref={textLog}
                style={{ color: 'green' }}
                size="sm"
                disabled
                as="textarea"
                value={consoleOutput.join('')}
                rows={9}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Parser;
