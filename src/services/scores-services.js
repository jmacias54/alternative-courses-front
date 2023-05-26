import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const create = (data) => {
  return fetch(`${API_URL}/scores/`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data) 

  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

const update = (id, data) => {
  return fetch(`${API_URL}/scores/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data) 

  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

const deleteScore = (id) => {
  return fetch(`${API_URL}/scores/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

export default {
  create,
  update,
  deleteScore
};