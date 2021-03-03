import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';

const ReviewsList = ({ productReviews, productId }) => {
  const x = 0;
  return (
    <div className="reviews-list">
      <ReviewTile productReviews={productReviews} productId={productId} />
    </div>
  );
};

ReviewsList.propTypes = {
  productReviews: PropTypes.shape(),
  productId: PropTypes.number,
};

ReviewsList.defaultProps = {
  productReviews: {},
  productId: 0,
};

export default ReviewsList;
