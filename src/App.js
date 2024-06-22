import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, setCategory, setCurrentPage, setQuery, toggleFavorite } from './features/news/newsSlice';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import './styles/App.css';

const App = () => {
  const dispatch = useDispatch();
  const { articles, category, currentPage, totalPages, query, status, error, favorites } = useSelector((state) => state.news);

// eslint-disable-next-line
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = (isDark) => {
    setIsDarkMode(isDark);
    document.body.className = isDark ? 'dark-mode' : 'light-mode';
  };

  React.useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      handleToggleTheme(true);
    }
  }, []);

  React.useEffect(() => {
    dispatch(fetchArticles({ category, page: currentPage, query }));
  }, [category, currentPage, query, dispatch]);

  const handleSearch = (query) => {
    dispatch(setQuery(query));
    dispatch(setCurrentPage(1));
  };

  const handleToggleFavorite = (article) => {
    dispatch(toggleFavorite(article));
  };

  return (
    <Router>
      <div className="app">
        <Header onToggleTheme={handleToggleTheme} />
        <SearchBar onSearch={handleSearch} />
        <Filter
          categories={['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']}
          selectedCategory={category}
          onSelectCategory={(category) => dispatch(setCategory(category))}
        />
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && (
          <>
            <Routes>
              <Route path="/" element={<ArticleList articles={articles} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
              <Route path="/article/:title" element={<ArticleDetail articles={articles} />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
          </>
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
