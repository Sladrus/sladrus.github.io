import $api from '.';

export const createProject = async (body) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/projects/create`,
    body
  );
  return data;
};

export const updateProject = async (body) => {
  const { data } = await $api.put(
    `${process.env.REACT_APP_API_URl}api/projects/update`,
    body
  );
  return data;
};

export const fetchProjects = async () => {
  const { data } = await $api.get(
    `${process.env.REACT_APP_API_URl}api/projects`
  );
  return data;
};

export const fetchOneProject = async (id) => {
  const { data } = await $api.get(
    `${process.env.REACT_APP_API_URl}api/projects/${id}`
  );
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await $api.delete(
    `${process.env.REACT_APP_API_URl}api/projects/${id}`
  );
  return data;
};

export const link = async (id, count) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/projects/link`,
    { id: id, count: count }
  );
  return data;
};

export const unlink = async (id) => {
  const { data } = await $api.post(
    `${process.env.REACT_APP_API_URl}api/projects/unlink`,
    { id: id }
  );
  return data;
};
