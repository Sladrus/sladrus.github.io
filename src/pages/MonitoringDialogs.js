import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '..';
import DialogModal from '../components/modals/monitoring/DialogModal';

const MonitoringDialogs = observer(() => {
  const { telegramService } = useContext(Context);

  const [openShow, setOpenShow] = useState(false);
  const [sender, setSender] = useState({});
  const [selectedChat, setSelectedChat] = useState({});

  useEffect(() => {
    console.log(toJS(telegramService.senders));
  }, [telegramService.update.length]);

  return (
    <Container className="p-4 px-4 d-grid">
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center text-center">
          <div className="m-1 " style={{ width: '10rem' }}>
              Аккаунт
            </div>
            <div className="m-1 " style={{ width: '10rem' }}>
              Юзер
            </div>
            <div className="m-1 flex-fill">Последнее сообщение</div>
            <div className="m-1" style={{ width: '5rem' }}></div>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          {telegramService.chats.map((chat) => {
            return chat.senders.map((sender, index) => {
              if (sender.messages.length) {
                return (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center text-center"
                  >
                    <div className="m-1 " style={{ width: '10rem' }}>
                      {chat.me.username || chat.me.firstName}
                    </div>
                    <div className="m-1 " style={{ width: '10rem' }}>
                      {sender.username}
                    </div>
                    <div className="m-1" style={{ width: '35rem' }}>
                      {sender.messages[sender?.messages.length - 1].my ? (
                        `Me: ${
                          sender.messages[sender.messages.length - 1].message
                        }`
                      ) : (
                        <b>
                          {`${sender.username || sender.firstName}: ${
                            sender.messages[sender.messages.length - 1].message
                          }`}
                        </b>
                      )}
                    </div>
                    <div className="m-1" style={{ width: '5rem' }}>
                      <Link
                        onClick={() => {
                          setSender(sender);
                          setSelectedChat(chat);
                          setOpenShow(true);
                        }}
                      >
                        Написать
                      </Link>
                    </div>
                  </ListGroup.Item>
                );
              }
            });
          })}
        </ListGroup>
        <DialogModal
          show={openShow}
          onHide={setOpenShow}
          senderData={sender}
          chat={selectedChat}
        />
      </Card>
    </Container>
  );
});

export default MonitoringDialogs;
