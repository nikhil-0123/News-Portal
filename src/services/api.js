import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async ({ category = '', page = 1, query = '' } = {}) => {
  if (!API_KEY) {
    throw new Error('API key is missing. Please set REACT_APP_NEWS_API_KEY in your environment variables.');
  }

  try {
    const url = query
      ? `${BASE_URL}/everything?q=${query}&page=${page}&apiKey=${API_KEY}`
      : `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&apiKey=${API_KEY}`;

    const response = await axios.get(url, {
      headers: {
        'Upgrade-Insecure-Requests': 1
      }
    });

    if (response.data.status !== 'ok') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    throw error;
  }
};
