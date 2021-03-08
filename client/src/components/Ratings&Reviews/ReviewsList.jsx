import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.moreReviews = this.moreReviews.bind(this);
    const { productReviews } = this.props;
    this.state = {
      displayedReviews: productReviews,
      displayedReviewsCount: 2,
    };
  }

  componentDidMount() {

  }

  moreReviews() {
    const { productReviews } = this.props;
    const { displayedReviewsCount } = this.state;
    // if there are more reviews that can be shown, show them up until
    // all are shown
    if (displayedReviewsCount + 2 > productReviews.results.length) {
      this.setState({
        displayedReviewsCount: productReviews.results.length,
      });
    } else {
      this.setState({
        displayedReviewsCount: displayedReviewsCount + 2,
      });
    }
  }

  // Update state of displayedReviews to show only the specific
  // filtered reviews
  filterReviews() {
    const { productReviews, ratingFilters } = this.props;
    const { displayedReviewsCount } = this.state;
    const reviews = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      if (ratingFilters.includes(productReviews.results[i].rating)) {
        reviews.push(productReviews.results[i]);
      }
    }
    return reviews;
  }

  render() {
    const { productReviews } = this.props;
    const { displayedReviews, displayedReviewsCount } = this.state;
    const reviewsCheck = productReviews.results.length === displayedReviewsCount;
    const reviews = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      reviews.push(productReviews.results[i]);
    }
    return (
      <div className="reviews-container">
        {/* sorting */}
        <div className="sorting-bar">
          <h4>248 reviews, sorted by relevance</h4>
        </div>
        {/* reviews list */}
        <div className="reviews-list">
          {reviews.map((review) => (
            <ReviewTile review={review} />
          ))}
        </div>
        {/* buttons */}
        <div className="reviews-buttons">
          {reviewsCheck ? '' : <button type="button" onClick={this.moreReviews}>MORE REVIEWS</button>}
          <button type="button">ADD A REVIEW +</button>
        </div>
      </div>

    );
  }
}

ReviewsList.propTypes = {
  productReviews: PropTypes.shape(),
  ratingFilters: PropTypes.array,
  displayedReviews: PropTypes.shape(),
};

ReviewsList.defaultProps = {
  productReviews: {},
  ratingFilters: [],
  displayedReviews: {},
};

export default ReviewsList;
