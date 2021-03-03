import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo() {
    const { productId } = this.props;
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/atelier/products/${productId}`,
      success: (data) => {
        this.setState({ productInfo: data });
      },
    });
  }

  render() {
    const { productInfo } = this.state;
    return (
      <>
        <div className="info">
          <div className="category">{productInfo.category ? productInfo.category.toUpperCase() : ''}</div>
          <div className="name">{productInfo.name}</div>
        </div>
        <div className="description">{productInfo.description}</div>
      </>
    );
  }
}

ProductInfo.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductInfo;
