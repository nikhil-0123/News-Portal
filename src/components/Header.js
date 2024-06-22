import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ onToggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      setIsDarkMode(true);
      onToggleTheme(true);
    }
  }, [onToggleTheme]);

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    onToggleTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">News Portal</h1>
        <button className="menu-toggle" onClick={handleMenuToggle}>
          {isMenuOpen ? '×' : '☰'}
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/favorites" className="nav-link" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
          <button onClick={handleThemeToggle} className="theme-toggle">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;