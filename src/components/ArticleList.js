import React from 'react';
import ArticleCard from './ArticleCard';
import '../styles/ArticleList.css';


const ArticleList = ({ articles, onToggleFavorite, favorites }) => {
  return (
    <div className="article-list">
      {articles.map(article => (
        <ArticleCard
          key={article.title}
          article={article}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.some(fav => fav.title === article.title)}
        />
      ))}
    </div>
  );
};

export default ArticleList;

