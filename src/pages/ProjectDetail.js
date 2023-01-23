import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col, Form,
  Row,
  Spinner
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '..';

const ProjectDetail = () => {
  const { projectStore, telegramService } = useContext(Context);

  const params = useParams();

  const [project, setProject] = useState({
    title: '',
    bot: '',
    usersList: '',
    accounts: '',
  });
  const [loading, setLoading] = useState(false);
  const [accountsCount, setAccountsCount] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState([]);

  useEffect(() => {
    setLoading(true);
    projectStore.fetchOneProject(params.id).then((data) => {
      setProject(data);
    });
    setLoading(false);
  }, []);

  const setConsoleLog = (log) => {
    setConsoleOutput((prev) => [...prev, log + '\r\n']);
  };

  const readFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);

      setProject({
        ...project,
        usersList: text.split('\r\n'),
      });
      const body = {
        id: project.id,
        title: project.title,
        bot: project.bot,
        usersList: text.split('\r\n'),
      };
      await projectStore.updateProject(body);
      console.log(project);
    };
    reader.readAsText(e.target.files[0]);
  };

  const startSpam = async (project) => {
    if (!project.usersList || accountsCount <= 0) return;
    try {
      project.accounts = await projectStore.link(params.id, accountsCount);
      telegramService.setLog(setConsoleLog);
      await telegramService.createClients(project);
      await telegramService.joinBot(project.bot);
      await telegramService.sendMessages();
      const body = {
        id: project.id,
        title: project.title,
        bot: project.bot,
        usersList: telegramService.users || [],
      };
      await projectStore.updateProject(body);
    } catch (e) {
      console.log(e);
    } finally {
      await projectStore.unlink(params.id);
      project.accounts = [];
    }
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card>
          <Card.Header>{project.title}</Card.Header>
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Введите @username бота</Form.Label>
                    <Form.Control
                      disabled
                      placeholder="@username"
                      value={project.bot}
                      onChange={(e) => {
                        setProject((prev) => {
                          var temp = { ...prev };
                          temp.bot = e.target.value;
                          return temp;
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Введите количество аккаунтов</Form.Label>
                    <Form.Control
                      value={accountsCount}
                      onChange={(e) => setAccountsCount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>
                      {project.usersList
                        ? `Загружено: ${project.usersList.length} пользователей`
                        : 'Загружено: 0 пользователей'}
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
                      await telegramService.disconnect();
                      await startSpam(project);
                    }}
                  >
                    Старт
                  </Button>
                </Form>
              </Col>
              <Col sm={8}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Вывод консоли</Form.Label>
                  <Form.Control
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
      )}
    </>
  );
};

export default ProjectDetail;
