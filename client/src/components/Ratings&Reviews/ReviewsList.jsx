/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';
import MainButtons from './MainButtons';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      ratingData, productId, getFilteredReviews, productReviews, displayedReviewsCount, moreReviews,
    } = this.props;
    const reviews = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      reviews.push(productReviews.results[i]);
    }
    return (
      <div className="reviews-container">
        {/* sorting */}
        <div className="sorting-bar">
          <h4 className="sorted-header">
            {productReviews.results ? `${productReviews.results.length}
            reviews, sorted by` : ''}
          </h4>
          <select id="sorting-dropdown" onChange={getFilteredReviews}>
            <option>Relevant</option>
            <option>Newest</option>
            <option>Helpful</option>
          </select>
        </div>
        {/* reviews list */}
        <div className="reviews-list">
          {reviews[0] !== undefined
            ? reviews.map((review) => (
              <ReviewTile key={review.review_id} review={review} />
            )) : ''}
        </div>
        {/* buttons */}
        {/* eslint-disable-next-line max-len */}
        <MainButtons ratingData={ratingData} productId={productId} moreReviews={moreReviews} displayedReviewsCount={displayedReviewsCount} productReviews={productReviews} />
      </div>
    );
  }
}

ReviewsList.propTypes = {
  ratingData: PropTypes.shape({}),
  productReviews: PropTypes.shape({}),
  productId: PropTypes.number.isRequired,
  getFilteredReviews: PropTypes.func,
  displayedReviewsCount: PropTypes.number.isRequired,
  moreReviews: PropTypes.func,
};

ReviewsList.defaultProps = {
  productReviews: {},
  ratingData: {},
  getFilteredReviews: () => { },
  moreReviews: () => { },
};

export default ReviewsList;
