import React from 'react';
import '../styles/Filter.css';

const Filter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="filter">
      <select value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

