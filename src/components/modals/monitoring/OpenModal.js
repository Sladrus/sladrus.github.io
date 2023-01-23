import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DialogModal from './DialogModal';

const OpenModal = observer(({ show, onHide, chat, senders }) => {
  const [sender, setSender] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {}, [senders]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => onHide()}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{chat.link}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {chat.requests &&
            chat?.requests?.slice().reverse().map((o, index) => {
              return (
                <ListGroup.Item key={index}>
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col md="auto">
                      {o.username}
                    </Col>
                    <Col>{o.text}</Col>
                    <Col md="auto">
                      <Link
                        onClick={async () => {
                          setSender(
                            chat.senders.find(
                              (obj) => obj?.senderId === o.sender
                            )
                          );
                          setShowDialog(true);
                        }}
                      >
                        Написать
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          <DialogModal
            show={showDialog}
            onHide={setShowDialog}
            senderData={sender}
            chat={chat}
          />
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
});

export default OpenModal;
