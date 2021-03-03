import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';

const ProductDetails = ({ productId }) => (
  <div id="productOverview" className="grid">
    <div className="carousel">Images Here</div>
    <Rating productId={productId} />
    <ProductInfo productId={productId} />
    <StyleSelector productId={productId} />
  </div>
);

ProductDetails.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductDetails;
