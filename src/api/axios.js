import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://eccd6277-afea-426b-aba1-422b4813e01d-00-2epbxcrcodpzx.sisko.replit.dev/', // ganti sesuai backend
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
