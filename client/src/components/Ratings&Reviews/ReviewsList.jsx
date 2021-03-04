import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.moreReviews = this.moreReviews.bind(this);
    this.state = {
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

  render() {
    const { productReviews } = this.props;
    const { displayedReviewsCount } = this.state;
    const reviews = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      reviews.push(productReviews.results[i]);
    }
    const reviewsCheck = productReviews.results.length === displayedReviewsCount;
    return (
      <div className="reviews-list">
        {reviews.map((review) => (
          <ReviewTile review={review} />
        ))}
        { reviewsCheck ? '' : <button type="button" onClick={this.moreReviews}>MORE REVIEWS</button> }
        <button type="button">ADD A REVIEW +</button>
      </div>
    );
  }
}

ReviewsList.propTypes = {
  productReviews: PropTypes.shape(),
};

ReviewsList.defaultProps = {
  productReviews: {},
};

export default ReviewsList;
