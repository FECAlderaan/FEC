import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating.jsx';

const ProductDetails = ({productId}) => {
  return (
    <div id='productOverview'>
      <h1>Product Details!</h1>
      <Rating productId={productId}/>
    </div>
  )
};

ProductDetails.propTypes = {
  productId: PropTypes.number
}

export default ProductDetails;