import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import Share from './Share';

const ProductDetails = ({ productId, getCart }) => (
  <div id="productOverview" className="grid">
    <Rating productId={productId} />
    <ProductInfo productId={productId} />
    <StyleSelector productId={productId} getCart={getCart} />
    <Share productId={productId} />
  </div>
);

ProductDetails.propTypes = {
  productId: PropTypes.number.isRequired,
  getCart: PropTypes.func.isRequired,
};

export default ProductDetails;
