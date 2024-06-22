import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './features/news/newsSlice';
import App from './App';
import './styles/index.css';

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

