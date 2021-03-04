import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.moreReviews = this.moreReviews.bind(this);
    this.state = {
      displayedReviews: [],
      displayedReviewsCount: 2,
    };
  }

  componentDidMount() {
    const { productReviews } = this.props;
    this.setState({
      displayedReviews: productReviews,
    });
  }

  moreReviews() {
    const { displayedReviewsCount } = this.state;
    this.setState({
      displayedReviewsCount: displayedReviewsCount + 2,
    });
    console.log(displayedReviewsCount);
  }

  render() {
    const { productReviews } = this.props;
    const { displayedReviewsCount } = this.state;
    const array = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      array.push(productReviews.results[i]);
    }
    return (
      <div className="reviews-list">
        {console.log(array)}
        {array.map((review) => (
          <ReviewTile review={review} />
        ))}
        <button type="button" onClick={this.moreReviews}>MORE REVIEWS</button>
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
