import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import ChatCard from './ChatCard';

const ChatList = ({ chats }) => {

  const { keysStore } = useContext(Context);

  useEffect(() => {
    keysStore.fetchKeys()
  }, []);

  return (
    <>
      {chats.map((chat, index) => {
        return (
            <ChatCard key={index} chat={chat}/>
        );
      })}
    </>
  );
};

export default ChatList;
