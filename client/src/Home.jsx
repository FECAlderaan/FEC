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
      url: 'http://localhost:8080/atelier/products',
      success: (data) => {
        this.setState({ products: data });
      },
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>Home</h1>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
