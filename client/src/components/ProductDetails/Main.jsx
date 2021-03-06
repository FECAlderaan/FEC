import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import Share from './Share';

const ProductDetails = ({ productId }) => (
  <div id="productOverview" className="grid">
    <Rating productId={productId} />
    <ProductInfo productId={productId} />
    <StyleSelector productId={productId} />
    <Share productId={productId} />
  </div>
);

ProductDetails.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductDetails;
