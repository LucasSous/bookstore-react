import axios from 'axios';

const api = axios.create({
  baseURL: 'https://livraria--back.herokuapp.com/api/'
});

export default api;
