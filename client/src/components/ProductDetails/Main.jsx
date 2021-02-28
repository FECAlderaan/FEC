import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';

const ProductDetails = ({productId}) => {
  return (
    <div id='productOverview'>
      <div className='grid'>
        <div className='carousel'>Images Here</div>
        <Rating productId={productId}/>
        <ProductInfo productId={productId}/>
        <StyleSelector productId={productId}/>
      </div>
    </div>
  )
};

ProductDetails.propTypes = {
  productId: PropTypes.number
}

export default ProductDetails;