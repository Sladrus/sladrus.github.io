import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Container,
  Dropdown,
  DropdownButton,
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '..';
import DialogModal from '../components/modals/monitoring/DialogModal';
import { getRequests } from '../http/chatApi';

const MonitoringRequests = observer(() => {
  const { telegramService } = useContext(Context);

  const [openShow, setOpenShow] = useState(false);
  const [selectedChat, setSelectedChat] = useState({});
  const [sender, setSender] = useState({});

  const getTime = (unix_timestamp) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var a = new Date(unix_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();
    // Hours part from the timestamp
    var hours = a.getHours();
    // Minutes part from the timestamp
    var minutes = '0' + a.getMinutes();
    // Seconds part from the timestamp

    var formattedTime =
      date + ' ' + month + ' ' + hours + ':' + minutes.substr(-2);
    return formattedTime;
  };

  useEffect(() => {
    getRequests().then((data) => {
      telegramService.requests = data;
    });
  }, [telegramService.requests.length]);

  return (
    <Container className="p-4 px-4 d-grid">
      <DropdownButton className="pb-4" id="dropdown-item-button" title="Фильтр">
        <Dropdown.Item as="button">По времени</Dropdown.Item>F
        <Dropdown.Item as="button">По чатам</Dropdown.Item>
        <Dropdown.Item as="button">Something else</Dropdown.Item>
      </DropdownButton>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center text-center">
            <div className="m-1 " style={{ width: '13rem' }}>
              Время/Чат
            </div>
            <div className="m-1 " style={{ width: '25rem' }}>
              Сообщение
            </div>
            <div className="m-1" style={{ width: '10rem' }}>
              Юзернейм/Имя
            </div>
            <div className="m-1" style={{ width: '5rem' }}></div>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          {telegramService.requests
            .slice()
            .reverse()
            .map((request, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center text-center"
                >
                  <div className="text-start">
                    <div className="text-nowrap m-1">
                      {getTime(request.date)}
                    </div>
                    <div
                      className="m-1 text-start"
                      style={{ minWidth: '13rem' }}
                    >
                      {request.chat?.link}
                    </div>
                  </div>
                  <div>
                    <div className="m-1" style={{ width: '25rem' }}>
                      {request.text}
                    </div>
                  </div>
                  <div className="m-1" style={{ width: '10rem' }}>
                    {request.username}
                  </div>
                  <div className="m-1" style={{ width: '5rem' }}>
                    <Link
                      onClick={() => {
                        const res = telegramService.chats.find(
                          (chat) => chat._id === request.chat._id
                        );
                        console.log(res);

                        setSender(
                          res.senders.find(
                            (obj) => obj?.senderId === request.sender
                          )
                        );

                        setSelectedChat(res);
                        setOpenShow(true);
                      }}
                    >
                      Написать
                    </Link>
                  </div>
                </ListGroup.Item>
              );
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

export default MonitoringRequests;
