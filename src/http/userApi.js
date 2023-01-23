import jwt_decode from 'jwt-decode';
import $api from '.';

export const registration = async (email, password) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/user/registration`,
    {
      email,
      password,
    }
  );
  localStorage.setItem('token', data.accessToken);
  return jwt_decode(data.accessToken);
};

export const login = async (email, password) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/user/login`,
    { email, password }
  );
  localStorage.setItem('token', data.accessToken);
  return jwt_decode(data.accessToken);
};

export const logout = async () => {
  const resp = await $api.post(
    `${process.env.REACT_APP_API_URl}api/user/logout`
  );

  return resp;
};

export const refresh = async () => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/user/refresh`,
    {
      withCredentials: true,
    }
  );
  localStorage.setItem('token', data.accessToken);
  return jwt_decode(data.accessToken);
};
