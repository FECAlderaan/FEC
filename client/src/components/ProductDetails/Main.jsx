import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating.jsx';
import ProductInfo from './ProductInfo.jsx';

const ProductDetails = ({productId}) => {
  return (
    <div id='productOverview'>
      <h1>Product Details!</h1>
      <div className='grid'>
        <div className='carousel'>Images Here</div>
        <Rating productId={productId}/>
        <ProductInfo productId={productId}/>
        <div className='style-selector'>Style Selector</div>
        {/* <div className='description'>Description</div> */}
      </div>
    </div>
  )
};

ProductDetails.propTypes = {
  productId: PropTypes.number
}

export default ProductDetails;