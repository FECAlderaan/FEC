import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ cart, changeTheme, darkMode }) => (
  <div id="header" className={darkMode ? 'dark-mode' : ''}>
    <span>Catwalk</span>
    <button id="dark-mode-button" type="button" onClick={changeTheme}>
      <i className="fas fa-moon" style={{ display: darkMode ? 'none' : 'block' }} />
      <i className="fas fa-sun" style={{ display: darkMode ? 'block' : 'none' }} />
    </button>
    <button id="cart" type="button">
      <i className="fas fa-shopping-cart">
        <span className="count">
          {cart.reduce((count, item) => (count + Number(item.count)), 0)}
        </span>
      </i>
    </button>
    <button id="home" type="button">
      <Link to="/" style={{ color: '#d1d2cd' }}>
        <i className="fas fa-home" />
      </Link>
    </button>
  </div>
);

Header.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
  changeTheme: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Header;
