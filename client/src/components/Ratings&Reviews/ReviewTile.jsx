import React from 'react';
import PropTypes from 'prop-types';

const ReviewTile = (props) => {
  console.log('productReviews', props.productReviews.results)
  return (
    <div >
      {props.productReviews.results.map((review) => (
        <div key={review.review_id} className="review-tile">
          <div className="rev-info review-rating-bar">
            <p id="review-stars">{review.rating} ★★★★☆</p>
            <p id="username">{review.reviewer_name} {review.date}</p>
          </div>

          <div className="rev-info review-summary">Review summary: {review.summary}</div>
          <div className="rev-info review-body">Review body: {review.body}</div>
          <div className="rev-info review-recommend">Recommend? {review.recommend}</div>
          <div className="rev-info review-response">Review response: {review.response}</div>
          <div className="rev-info review-helpfulness">Helpfulness: {review.helpfulness}</div>
        </div>
      ))}
    </div>
  )
}

ReviewTile.propTypes = {
  productReviews: PropTypes.object,
}

export default ReviewTile;