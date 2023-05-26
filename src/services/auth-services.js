import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const register = (username, password) => {
  return axios.post(API_URL + "/signup", {
    username,
    password,
  }, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};


const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    }, { headers })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};