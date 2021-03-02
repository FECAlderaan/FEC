import React from 'react';
import PropTypes from 'prop-types';

const ReviewTile = (props) => {
  console.log('productReviews', props.productReviews.results)
  return (
    <div className="review-tile">

      {props.productReviews.results.map((review) => (
        <div key={review.review_id} className="rev-info review-rating-bar">
          <p id="review-stars">{review.rating} ★★★★☆</p>
          <p id="username">{review.reviewer_name} User1234, March 1, 2021</p>
        </div>
      ))}

      <div className="rev-info review-summary">this is the review-summary</div>
      <div className="rev-info review-body">this is a long review-body</div>
      <div className="rev-info review-recommend">I recommend this product</div>
      <div className="rev-info review-response">reponse to the review</div>
      <div className="rev-info review-helpfulness">helpful review?</div>
    </div>
  )
}

ReviewTile.propTypes = {
  productReviews: PropTypes.object,
}

export default ReviewTile;