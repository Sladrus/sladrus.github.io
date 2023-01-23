import BigInt from 'big-integer';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../..';
import { deleteOne } from '../../../http/accountApi';
import { addMessage } from '../../../http/chatApi';

const DialogModal = observer(({ show, onHide, senderData, chat }) => {
  const { telegramService } = useContext(Context);
  const [message, setMessage] = useState('');
  const messagesEndRef = createRef();

  const componentDidUpdate = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeypress = async (e) => {
    if (e.keyCode === 13) {
      await sendMessage();
      setMessage('');
    }
  };

  useEffect(() => {
    componentDidUpdate();
  }, [senderData?.messages?.length]);

  const sendMessage = async () => {
    if (!message) return;
    const tmpMessage = message;
    setMessage('');
    const { client } = chat;
    // chat.senders.map((o) => {
    //   if (o?.id?.value === senderData?.id?.value) {
    //     return o.messages.push({ message: tmpMessage, my: true });
    //   }
    // });
    // for (const req of chat?.requests) {
    //   if (req.sender.id.value === sender.id.value) {
    //     if (!req.sender?.messages) req.sender.messages = [];
    //     req.sender.messages.push({ message: tmpMessage, my: true });
    //   }
    // }
    const req = chat.requests.find((o) => o?.sender === senderData?.senderId);
    console.log(chat);
    for await (const mes of client.iterMessages(chat?.entity, {
      limit: 1,
      offsetDate: req.date,
      // maxId: req.message.id + 1,
      // minId: req.message.id - 1,
    })) {
      console.log(mes);
    }
    console.log(toJS(senderData));
    try {
      await client.sendMessage(
        senderData.username.includes('@')
          ? senderData.username
          : BigInt(senderData.senderId),
        {
          message: tmpMessage,
        }
      );
      const messages = await addMessage(senderData._id, { message: tmpMessage, my: true });
      senderData.messages = messages
    } catch (e) {
      console.log(e);
      if (e.errorMessage === 'PEER_FLOOD') {
        chat.active = false;
        await deleteOne(chat.account._id);
        chat.account = null;
        alert(`${e.errorMessage}: Много запросов/спамблок. Смена аккаунта`);
        await telegramService.startMonitor(chat);
      }
    }
  };
  return (
    <Modal size="xs" show={show} onHide={() => onHide()} className="rounded-0">
      <Modal.Header closeButton>
        <Modal.Title>Диалог c {senderData?.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 modal-content rounded-0 border-0">
        <div
          style={{
            height: '30rem',
            backgroundImage: `url("https://svgur.com/i/jyv.svg")`,
          }}
        >
          <div className="d-flex h-100 flex-column justify-content-between overflow-auto">
            <div сlassName="d-flex flex-column">
              {senderData?.messages &&
                senderData?.messages.map((o, index) => {
                  return o.my ? (
                    <div
                      ref={messagesEndRef}
                      key={index}
                      className="d-flex p-2 text-wrap  justify-content-end"
                    >
                      <div
                        style={{ maxWidth: '75%', borderRadius: 15 }}
                        className="d-flex square bg-dark  rounded-9 p-2 align-items-start"
                      >
                        <span className="text-white m-2">{o.message}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={messagesEndRef}
                      key={index}
                      className="d-flex p-2 text-wrap align-items-start justify-content-start"
                    >
                      <div
                        style={{ maxWidth: '75%', borderRadius: 15 }}
                        className="d-flex square bg-secondary rounded-9 p-1"
                      >
                        <span className="text-white m-2">{o.message}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <Form.Group className="d-flex">
            <Form.Control
              className="rounded-0"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Введите сообщение"
              onKeyDown={handleKeypress}
            />
            <Button
              className="rounded-0"
              variant="primary"
              type="submit"
              onClick={async () => {
                await sendMessage();
              }}
            >
              Отправить
            </Button>
          </Form.Group>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default DialogModal;
