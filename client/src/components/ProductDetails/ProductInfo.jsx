/* eslint-disable react/no-array-index-key */
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
      url: `/atelier/products/${productId}`,
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
        <div className="description">
          <div className="slogan">{productInfo.slogan}</div>
          <div className="more-info">{productInfo.description}</div>
        </div>
        <div className="features">
          {productInfo.features ? productInfo.features.map((feature, index) => (
            <div key={index}>
              {`✔️ ${feature.feature}: ${feature.value}`}
            </div>
          )) : null}
        </div>
      </>
    );
  }
}

ProductInfo.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductInfo;
