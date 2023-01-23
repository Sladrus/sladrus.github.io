import $api from '.';

export const createChats = async (body) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/chats/create`,
    body
  );
  return data;
};

export const getChats = async () => {
  const { data } = await $api.get(`${process.env.REACT_APP_API_URl}api/chats`);
  return data;
};

export const deleteChat = async (id) => {
  const { data } = await $api.delete(
    `${process.env.REACT_APP_API_URl}api/chats/${id}`
  );
  return data;
};

export const linkToAccount = async (id) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/chats/link/${id}`
  );
  return data;
};

export const unlinkFromAccount = async (id) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/chats/unlink/${id}`
  );
  return data;
};

export const addRequest = async (body) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/chats/request`,
    body
  );
  return data;
};

export const addSender = async (body) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/chats/sender`,
    body
  );
  return data;
};

export const addMessage = async (id, body) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/chats/message/${id}`,
    body
  );
  return data;
};

export const getRequests = async () => {
  const { data } = await $api.get(
    `${process.env.REACT_APP_API_URl}api/chats/request`
  );
  return data;
};
