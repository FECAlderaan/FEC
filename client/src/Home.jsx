import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    $.ajax({
      type: 'GET',
      url: '/atelier/products?count=1000',
      success: (data) => {
        this.setState({ products: data });
      },
    });
  }

  render() {
    const { cart, darkMode, changeTheme } = this.props;
    const { products } = this.state;
    return (
      <div>
        <Header cart={cart} changeTheme={changeTheme} darkMode={darkMode} />
        <div className="products">
          {products.map((product) => (
            <div key={product.id}>
              <Link
                to={`/products/${product.id}`}
                style={darkMode ? { color: '#d1d2cd' } : {}}
              >
                {product.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
  darkMode: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Home;
