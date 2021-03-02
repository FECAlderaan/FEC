import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import PropTypes from 'prop-types';

const ReviewsList = (props) => {
  return (
    <>
      <div className="reviews-list">
       <ReviewTile productReviews={props.productReviews} productId={props.productId}/>
      </div>
    </>
  )
}

ReviewsList.propTypes = {
  productReviews: PropTypes.object,
  productId: PropTypes.number
}

export default ReviewsList;