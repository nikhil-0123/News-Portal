import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article, onToggleFavorite, isFavorite }) => {
  return (
    <div className="article-card">
      <img src={article.urlToImage} alt={article.title} />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <button onClick={() => onToggleFavorite(article)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/article/${article.title}`}>
        Read more
      </Link>
    </div>
  );
};

export default ArticleCard;

