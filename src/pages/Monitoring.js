import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Context } from '..';
import ChatList from '../components/ChatList';
import CreateChat from '../components/modals/monitoring/CreateChat';
import { getChats } from '../http/chatApi';

const Monitoring = observer(() => {
  const { telegramService } = useContext(Context);

  const [createShow, setCreateShow] = useState(false);

  useEffect(() => {
    getChats().then((data) => {
      if (!telegramService.chats.length) {
        telegramService.chats = data;
      }
      telegramService.chats.map((chat) => {
        if (!chat.active) {
          return { ...chat, active: false };
        }
        return chat;
      });
    });
  }, []);
  return (
    <>
      <Container className="p-4 px-4 d-grid">
        <Button variant="primary" size="lg" onClick={() => setCreateShow(true)}>
          Добавить чаты
        </Button>
        <CreateChat show={createShow} onHide={setCreateShow} />
      </Container>
      {telegramService.chats.length ? (
        <Container className="d-flex flex-row flex-wrap align-content-center justify-content-start">
          <ChatList chats={telegramService.chats} />
        </Container>
      ) : (
        <center>Добавьте чаты, чтобы начать</center>
      )}
    </>
  );
});

export default Monitoring;
