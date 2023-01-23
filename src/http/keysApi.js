import $api from '.';

export const createKeys = async (body) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/keys/create`,
    body
  );
  return data;
};

export const updateKeys = async (body) => {
  const { data } = await $api.put(
    `${process.env.REACT_APP_API_URl}api/keys/update`,
    body
  );
  return data;
};

export const fetchKeys = async () => {
  const { data } = await $api.get(
    `${process.env.REACT_APP_API_URl}api/keys`
  );
  return data;
};
