import React from 'react';
import PropTypes from 'prop-types';

const formatDate = function (date) {
  const splitIndex = date.indexOf('T');
  const dateArray = date.split('').splice(0, splitIndex);
  const newDate = dateArray.join('');
  const newSplitDate = newDate.split('-');
  let formattedDate = '';
  const months = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'June ', 'July ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec '];
  switch (newSplitDate[1]) {
    case '01':
      formattedDate += months[0];
      break;
    case '02':
      formattedDate += months[1];
      break;
    case '03':
      formattedDate += months[2];
      break;
    case '04':
      formattedDate += months[3];
      break;
    case '05':
      formattedDate += months[4];
      break;
    case '06':
      formattedDate += months[5];
      break;
    case '07':
      formattedDate += months[6];
      break;
    case '08':
      formattedDate += months[7];
      break;
    case '09':
      formattedDate += months[8];
      break;
    case '10':
      formattedDate += months[9];
      break;
    case '11':
      formattedDate += months[10];
      break;
    case '12':
      formattedDate += months[11];
      break;
    default:
      break;
  }
  formattedDate += `${newSplitDate[2]}, ${newSplitDate[0]}`;
  return formattedDate;
};

const ratingStarWidth= function(rating) {
  return rating * 20;
};

const ReviewTile = ({ review }) => {
  const newDate = formatDate(review.date);
  return (
    <div key={review.review_id}>
      <div className="review-tile">
        <div className="rev-info review-rating-bar">
          <div id="review-stars">
            <div className="tile-stars-outer">
              <i className="far fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
              <div className="tile-stars-inner" style={{ width: `${ratingStarWidth(review.rating)}%` }}>
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
            </div>
          </div>
          <div className="review-name-date">
            <p id="review-username">{review.reviewer_name}</p>
            <p id="review-date">{newDate}</p>
          </div>
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
