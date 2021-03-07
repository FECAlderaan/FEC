import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartDisplay: 'none',
    };
  }

  cartOnClick() {
    const { cartDisplay } = this.state;
    if (cartDisplay === 'none') {
      this.setState({ cartDisplay: 'flex' });
    } else {
      this.setState({ cartDisplay: 'none' });
    }
  }

  render() {
    // const { cartDisplay } = this.state;
    const { cart } = this.props;
    return (
      <div id="header">
        <span>Catwalk</span>
        <button id="home" type="button">
          <Link to="/" style={{ color: '#fff' }}>
            <i className="fas fa-home" />
          </Link>
        </button>
        <button id="cart" type="button">
          <i className="fas fa-shopping-cart">
            <span className="count">
              {cart.reduce((count, item) => (count + Number(item.count)), 0)}
            </span>
          </i>
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
};

export default Header;
