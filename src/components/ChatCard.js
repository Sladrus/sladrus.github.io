import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Dropdown, NavDropdown } from 'react-bootstrap';
import { Context } from '..';
import DeleteChat from './modals/monitoring/DeleteChat';
import OpenModal from './modals/monitoring/OpenModal';

const ChatCard = observer(({ chat }) => {
  const { telegramService, keysStore } = useContext(Context);
  const [selectedChat, setSelectedChat] = useState(false);

  const [deleteShow, setDeleteShow] = useState(false);
  const [openShow, setOpenShow] = useState(false);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (chat.active) {
      setActive(true);
    } else {
      telegramService.startMonitor(chat);
    }
  }, [chat.active]);

  const changeKeys = (o) => {
    chat.keys = o;
  };
  return (
    <div className="p-2 flex-fill">
      <Card
        className="d-flex"
        style={
          active
            ? { minHeight: '8rem', backgroundColor: '#abf7b1' }
            : { minHeight: '8rem', backgroundColor: '#ffcccb' }
        }
      >
        <Card.Body className="d-flex flex-row justify-content-start align-content-start">
          <div>
            <Card.Title className="text-nowrap fs-6 text mb-1">
              {chat.entity && `${chat.entity?.title}`}
            </Card.Title>
            <Card.Subtitle className="text-nowrap fs-6 text mb-2">{`${chat.link}`}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <NavDropdown
                id="dropdown-item-button"
                title={`Ключ "${chat.keys.title}"`}
              >
                {keysStore.keys.map((o, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      as="button"
                      onClick={() => changeKeys(o)}
                    >
                      {`${o.title} - ${o.list}`}
                    </Dropdown.Item>
                  );
                })}
              </NavDropdown>
            </Card.Subtitle>
            <div>
              <Card.Link
                style={{ color: 'red' }}
                onClick={() => {
                  setSelectedChat(chat);
                  setDeleteShow(true);
                }}
              >
                Удалить
              </Card.Link>
              <DeleteChat
                show={deleteShow}
                onHide={setDeleteShow}
                chat={selectedChat}
              />
              <Card.Link
                onClick={() => {
                  setSelectedChat(chat);
                  setOpenShow(true);
                }}
              >
                Открыть
              </Card.Link>
              <OpenModal
                show={openShow}
                onHide={setOpenShow}
                chat={selectedChat}
                senders={telegramService.senders}
              />
            </div>
          </div>
          <Card.Text className="ps-3">
            {chat?.requests?.length
              ? `${chat.requests[chat.requests.length - 1]?.username}: ${
                  chat.requests[chat.requests.length - 1]?.text
                }`
              : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
});

export default ChatCard;
