import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../../services/api';

const initialState = {
  articles: [],
  category: '',
  currentPage: 1,
  totalPages: 1,
  query: '',
  status: 'idle',
  error: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

export const fetchArticles = createAsyncThunk(
  'news/fetchArticles',
  async ({ category, page, query }) => {
    const response = await fetchNews({ category, page, query });
    console.log(response); 
    return response;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    toggleFavorite(state, action) {
      const article = action.payload;
      const exists = state.favorites.find(fav => fav.title === article.title);
      if (exists) {
        state.favorites = state.favorites.filter(fav => fav.title !== article.title);
      } else {
        state.favorites.push(article);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.totalResults / action.payload.articlesPerPage);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setCurrentPage, setQuery, toggleFavorite } = newsSlice.actions;

export default newsSlice.reducer;

