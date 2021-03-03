import React from 'react';
import PropTypes from 'prop-types';

import ProductBreakdown from './ProductBreakdown.jsx';

var getRatings = function (object) {
  var array = [];

  for (const [key, value] of Object.entries(object)) {
    array.push(`${key}: ${value}`);
  }

  return array;
}

// Get overall average of ratings
var ratingAverage = function (object) {
  var ratingsCount = Object.values(object);
  var average = 0;
  var count = 0;
  // add up ratings
  for (const [key, value] of Object.entries(object)) {
    var ratingCount = Number(value);
    while (ratingCount > 0) {
      average += Number(key);
      ratingCount--;
    }
  }
  // get total number of ratings
  ratingsCount.map((rating) => {
    count += Number(rating);
  })
  return (Math.round(average / count * 10) / 10).toString();
}


const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <h2>Rating Breakdown</h2>
      <div className="rating-average">
        <h1 id="average-number">{ratingAverage(props.ratingData.ratings)}</h1>
        ★★★★☆
      </div>

      <div className="rating-stars">

        <div className="rating-bar-section">
          <h4 className="star-header">5 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="five-star-bar"></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[5] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">4 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="four-star-bar"></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[4] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">3 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="three-star-bar"></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[3] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">2 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="two-star-bar"></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[2] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">1 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="one-star-bar"></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[1] | 0}</h4>
        </div>

      </div>

      <div className="rating-percent">
        100% of reviews recommend this product
      </div>

      <ProductBreakdown />
    </div>
  )
}

RatingBreakdown.propTypes = {
  ratingData: PropTypes.object,
}

export default RatingBreakdown;