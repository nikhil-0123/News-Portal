import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';
import '../styles/Favorites.css';

const Favorites = () => {
  const favorites = useSelector((state) => state.news.favorites);

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <div className="article-list">
        {favorites.length > 0 ? (
          favorites.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))
        ) : (
          <p>No favorite articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
