import $api from '.';

export const getRandomAccount = async () => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/accounts/random`
  );
  return data;
};

export const linkAcc = async () => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/accounts/link`
  );
  return data;
};

export const unlinkAccs = async () => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/accounts/unlink`
  );
  return data;
};

export const deleteOne = async (id) => {
  const { data } = await $api.delete(
    `${process.env.REACT_APP_API_URl}api/accounts/${id}`
  );
  return data;
};
