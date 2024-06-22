import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ArticleDetail.css';


const ArticleDetail = ({ articles }) => {
  const { title } = useParams();
  const article = articles.find(a => a.title === title);

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="article-detail">
      <img src={article.urlToImage} alt={article.title} />
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;

