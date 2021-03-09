import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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
    const { products } = this.state;
    return (
      <div>
        <div id="header">
          <span>Catwalk</span>
        </div>
        <div className="products">
          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
