import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const getAll = () => {
  return fetch(`${API_URL}/subjects/`, {
    method: 'GET',
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};


const create = (data) => {
  return fetch(`${API_URL}/subjects/`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data) 

  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

const update = (id, data) => {
  return fetch(`${API_URL}/subjects/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data) 

  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

const deleteSubject = (id) => {
  return fetch(`${API_URL}/subjects/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

export default {
  getAll,
  create,
  update,
  deleteSubject
};