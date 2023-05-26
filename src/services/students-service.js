import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const getAll = () => {
  return fetch(`${API_URL}/students/`, {
    method: 'GET',
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

const create = (student) => {
  return fetch(`${API_URL}/students`, {
    method: 'POST',
    body: JSON.stringify(student) ,
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};


const getDetail = (id) => {
  return fetch(`${API_URL}/students/${id}`, {
    method: 'GET',
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

const deleteStudent = (id) => {
  return fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  }).then((response) => { return response.json() })
    .catch((error) => {
      throw error;
    });
};

export default {
  getAll,
  getDetail,
  deleteStudent,
  create
};