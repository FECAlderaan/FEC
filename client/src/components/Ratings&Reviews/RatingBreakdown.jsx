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

// Get percentage of reviews that recommend the product
var getRecommended = function (recommended) {
  if (!recommended.false) {
    return 100;
  } else if (!recommended.true) {
    return 0;
  } else {
    return Math.round((recommended.false / recommended.true) * 100);
  }
}

// Finding width for how many stars need to be filled in
// 1 star = 20%
var averagePercent = function (object) {
  return Number((Math.round(ratingAverage(object) * 4) / 4).toFixed(2)) * 20;
}

// Find percent to be filled in for star bars
var starBars = function (stars, object) {
  // get total number of reviews
  var reviewsCount = Object.values(object);
  var count = 0;
  reviewsCount.map((rating) => {
    count += Number(rating);
  })
  return Math.round(((stars/count) * 100) * 100) / 100;
}

const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <h2>Rating Breakdown</h2>
      <div className="rating-average">
        <h1 id="average-number">{ratingAverage(props.ratingData.ratings)}</h1>
        <div className="stars-outer">
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <div className="stars-inner" style={{ width: `${averagePercent(props.ratingData.ratings)}%` }}>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div >

      <div className="rating-stars">

        <div className="rating-bar-section">
          <h4 className="star-header">5 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="five-star-bar" style={{ width: `${starBars(props.ratingData.ratings[5] , props.ratingData.ratings)}%` }}></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[5] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">4 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="four-star-bar" style={{ width: `${starBars(props.ratingData.ratings[4] , props.ratingData.ratings)}%` }}></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[4] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">3 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="three-star-bar" style={{ width: `${starBars(props.ratingData.ratings[3] , props.ratingData.ratings)}%` }}></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[3] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">2 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="two-star-bar" style={{ width: `${starBars(props.ratingData.ratings[2] , props.ratingData.ratings)}%` }}></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[2] | 0}</h4>
        </div>
        <div className="rating-bar-section">
          <h4 className="star-header">1 stars</h4>
          <div className="rating-bar-outer">
            <div className="rating-bar-inner" id="one-star-bar" style={{ width: `${starBars(props.ratingData.ratings[1] , props.ratingData.ratings)}%` }}></div>
          </div>
          <h4 className="individual-total-ratings">{props.ratingData.ratings[1] | 0}</h4>
        </div>

      </div>

      <div className="rating-percent">
        {getRecommended(props.ratingData.recommended)}% of reviews recommend this product

      </div>

      <ProductBreakdown />
    </div >
  )
}

RatingBreakdown.propTypes = {
  ratingData: PropTypes.object,
}

export default RatingBreakdown;