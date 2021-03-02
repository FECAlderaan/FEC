import React from 'react';
import PropTypes from 'prop-types';

import ProductBreakdown from './ProductBreakdown.jsx';

var getRatings = function(object) {
  var array = [];

  for (const [key, value] of Object.entries(object)) {
    array.push(`${key}: ${value}`);
  }

  return array;
}

// Get overall average of ratings
var ratingAverage = function(object) {
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
  return (Math.round(average/count * 10) / 10).toString();
}

const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <p>Rating Breakdown</p>

      <div className="rating-average">
        <h1 id="average-number">{ratingAverage(props.ratingData.ratings)}</h1>
        ★★★★☆
      </div>

      <div className="rating-percent">2</div>

      <div className="rating-stars">3</div>
      <ProductBreakdown />
    </div>
  )
}

RatingBreakdown.propTypes = {
  ratingData: PropTypes.object,
}

export default RatingBreakdown;