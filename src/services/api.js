import axios from 'axios';

const API_KEY = 'c4dcdf93fe3f4bbebe79426b00e9f1e9';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async ({ category = '', page = 1, query = '' }) => {
  const url = query
    ? `${BASE_URL}/everything?q=${query}&page=${page}&apiKey=${API_KEY}`
    : `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&apiKey=${API_KEY}`;

  const response = await axios.get(url);
  if (response.data.status !== 'ok') {
    throw new Error(response.data.message);
  }
  return response.data;
};

