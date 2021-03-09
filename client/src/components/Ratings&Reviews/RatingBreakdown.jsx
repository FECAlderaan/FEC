import React from 'react';
import PropTypes from 'prop-types';

import ProductBreakdown from './ProductBreakdown';

// Get overall average of ratings
const ratingAverage = function (object) {
  const ratingsCount = Object.values(object);
  let average = 0;
  let count = 0;
  // add up ratings
  for (const [key, value] of Object.entries(object)) {
    let ratingCount = Number(value);
    while (ratingCount > 0) {
      average += Number(key);
      ratingCount -= 1;
    }
  }
  // get total number of ratings
  ratingsCount.forEach((rating) => {
    count += Number(rating);
  });
  return (Math.round((average / count) * 10) / 10).toString();
};

// Get percentage of reviews that recommend the product
const getRecommended = function (recommended) {
  if (!recommended.false && recommended.true) {
    return 100;
  }
  if (!recommended.true && recommended.false) {
    return 0;
  }
  const totalRecommendations = Number(recommended.false) + Number(recommended.true);
  return Math.floor((recommended.true / totalRecommendations) * 100);
};

// Finding width for how many stars need to be filled in
// 1 star = 20%
const averagePercent = function averagePercent(object) {
  return Number((Math.round(ratingAverage(object) * 4) / 4).toFixed(2)) * 20;
};

// Find percent to be filled in for star bars
const starBars = function starBars(stars, object) {
  // get total number of reviews
  const reviewsCount = Object.values(object);
  let count = 0;
  reviewsCount.forEach((rating) => {
    count += Number(rating);
  });
  return Math.round(((stars / count) * 100) * 100) / 100;
};

const RatingBreakdown = ({ ratingData, filterReviews }) => {
  const x = 0;
  return (
    <div className="rating-breakdown">
      <h2>Rating Breakdown</h2>
      <div className="rating-average">
        <h1 id="average-number">{ratingAverage(ratingData.ratings)}</h1>
        <div className="stars-outer">
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <div className="stars-inner" style={{ width: `${averagePercent(ratingData.ratings)}%` }}>
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
      </div>

      <div className="rating-stars">

        <div
          className="rating-bar-section"
          onClick={(e) => { filterReviews(e); }}
          onKeyDown={filterReviews}
          role="option"
          tabIndex="-1"
          aria-selected="false"
          index="5"
        >
          <h4 className="star-header">5 stars</h4>
          <div className="rating-bar-outer" index="5">
            <div
              className="rating-bar-inner"
              id="five-star-bar"
              style={{ width: `${starBars(ratingData.ratings[5], ratingData.ratings)}%` }}
            />
          </div>
          <h4 className="individual-total-ratings">{ratingData.ratings[5] ? ratingData.ratings[5] : 0}</h4>
        </div>
        <div className="rating-bar-section" onClick={(e) => { filterReviews(e); }} onKeyDown={filterReviews} role="option" tabIndex="-1" aria-selected="false" index="4">
          <h4 className="star-header">4 stars</h4>
          <div className="rating-bar-outer" index="4">
            <div className="rating-bar-inner" id="four-star-bar" style={{ width: `${starBars(ratingData.ratings[4], ratingData.ratings)}%` }} />
          </div>
          <h4 className="individual-total-ratings">{ratingData.ratings[4] ? ratingData.ratings[4] : 0}</h4>
        </div>
        <div className="rating-bar-section" onClick={(e) => { filterReviews(e); }} onKeyDown={filterReviews} role="option" tabIndex="-1" aria-selected="false" index="3">
          <h4 className="star-header">3 stars</h4>
          <div className="rating-bar-outer" index="3">
            <div className="rating-bar-inner" id="three-star-bar" style={{ width: `${starBars(ratingData.ratings[3], ratingData.ratings)}%` }} />
          </div>
          <h4 className="individual-total-ratings">{ratingData.ratings[3] ? ratingData.ratings[3] : 0}</h4>
        </div>
        <div className="rating-bar-section" onClick={(e) => { filterReviews(e); }} onKeyDown={filterReviews} role="option" tabIndex="-1" aria-selected="false" index="2">
          <h4 className="star-header">2 stars</h4>
          <div className="rating-bar-outer" index="2">
            <div className="rating-bar-inner" id="two-star-bar" style={{ width: `${starBars(ratingData.ratings[2], ratingData.ratings)}%` }} />
          </div>
          <h4 className="individual-total-ratings">{ratingData.ratings[2] ? ratingData.ratings[2] : 0}</h4>
        </div>
        <div className="rating-bar-section" onClick={(e) => { filterReviews(e); }} onKeyDown={filterReviews} role="option" tabIndex="-1" aria-selected="false" index="1">
          <h4 className="star-header">1 stars</h4>
          <div className="rating-bar-outer" index="1">
            <div className="rating-bar-inner" id="one-star-bar" style={{ width: `${starBars(ratingData.ratings[1], ratingData.ratings)}%` }} />
          </div>
          <h4 className="individual-total-ratings">{ratingData.ratings[1] ? ratingData.ratings[1] : 0}</h4>
        </div>

      </div>

      <div className="rating-percent">
        {`${getRecommended(ratingData.recommended)}% of reviews recommend this product`}

      </div>

      <ProductBreakdown ratingData={ratingData} />
    </div>
  );
};

RatingBreakdown.propTypes = {
  ratingData: PropTypes.shape(),
  filterReviews: PropTypes.func,
};

RatingBreakdown.defaultProps = {
  ratingData: {},
  filterReviews: [],
};

export default RatingBreakdown;
