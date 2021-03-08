import React from 'react';
import PropTypes from 'prop-types';

const ReviewTile = ({ review }) => {
  const x = 0;
  return (
    <div key={review.review_id}>
      <div className="review-tile">
        <div className="rev-info review-rating-bar">
          <p id="review-stars">
            {review.rating}
            ★★★★☆
          </p>
          <p id="username">
            {review.reviewer_name}

            {review.date}
          </p>
        </div>

        {review.response ? (
          <div className="rev-info review-response">
            {review.response ? `Response from seller: ${review.response}` : ''}
          </div>
        ) : ''}
        <div className="rev-info review-summary">
          {review.summary}
        </div>
        <div className="rev-info review-body">
          {review.body}
        </div>
        {review.recommend ? (
          <div className="rev-info review-recommend">
            {review.recommend ? '✓ I recommend this product' : ''}
          </div>
        ) : ''}

        <div className="rev-info review-helpfulness">
          Helpfulness:
          {review.helpfulness}
        </div>
      </div>
    </div>
  );
};

ReviewTile.propTypes = {
  review: PropTypes.shape(),
};

ReviewTile.defaultProps = {
  review: {},
};

export default ReviewTile;
