import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../../..';
import { deleteChat, unlinkFromAccount } from '../../../http/chatApi';

const DeleteChat = ({ show, onHide, chat }) => {
  const { telegramService } = useContext(Context);

  const removeChat = async () => {
    await chat.client?.disconnect();
    const res = telegramService.chats.filter((o) => o.link !== chat.link);
    telegramService.chats = res;
    try {
      await unlinkFromAccount(chat._id);
    } catch (error) {}
    const resp = await deleteChat(chat._id);
    console.log(resp);

    onHide();
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => onHide()}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {`Вы уверены, что хотите удалить "${chat.link}"`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-grid pb-3">
          <Button
            variant="danger"
            size="lg"
            onClick={async () => await removeChat()}
          >
            Удалить
          </Button>
        </div>
        <div className="d-grid">
          <Button variant="secondary" size="lg" onClick={() => onHide()}>
            Закрыть
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChat;
