import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';
import MainButtons from './MainButtons';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.moreReviews = this.moreReviews.bind(this);
    this.getFilteredReviews = this.getFilteredReviews.bind(this);

    const { ratingFilters } = this.props;
    this.state = {
      productReviews: {},
      displayedReviewsCount: 2,
      starFilters: ratingFilters,
    };
  }

  componentDidMount() {
    this.getRelevantReviews();
  }

  // GET filtered reviews based on dropdown menu
  getFilteredReviews(e) {
    const { selectedIndex } = e.target.options;
    const selectedOption = e.target.options[selectedIndex].innerHTML;
    if (selectedOption === 'Relevant') {
      this.getRelevantReviews();
    }
    if (selectedOption === 'Newest') {
      this.getNewestReviews();
    }
    if (selectedOption === 'Helpful') {
      this.getHelpfulReviews();
    }
  }

  getRelevantReviews() {
    const { productId } = this.props;
    $.ajax({
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}&count=100&sort=relevant`,
      type: 'GET',
      success: (data) => {
        this.setState({
          productReviews: data,
        });
      },
    });
  }

  getNewestReviews() {
    const { productId } = this.props;
    $.ajax({
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}&count=100&sort=newest`,
      type: 'GET',
      success: (data) => {
        this.setState({
          productReviews: data,
        });
      },
    });
  }

  getHelpfulReviews() {
    const { productId } = this.props;
    $.ajax({
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}&count=100&sort=helpful`,
      type: 'GET',
      success: (data) => {
        this.setState({
          productReviews: data,
        });
      },
    });
  }

  moreReviews() {
    const { productReviews, displayedReviewsCount } = this.state;
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
    console.log('lkajdsfl');
    const { ratingFilters } = this.props;
    const { productReviews, displayedReviewsCount } = this.state;
    const reviews = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      if (ratingFilters.includes(productReviews.results[i].rating)) {
        reviews.push(productReviews.results[i]);
      }
    }
    this.setState({
      productReviews: reviews,
    });
  }

  showTwoReviews() {
    const { productReviews, displayedReviewsCount } = this.state;
    const reviews = [];
    for (let i = 0; i < displayedReviewsCount; i += 1) {
      reviews.push(productReviews.results[i]);
    }
    return reviews;
  }

  render() {
    const { productReviews } = this.state;
    const { ratingData, productId } = this.props;
    return (
      <div className="reviews-container">
        {/* sorting */}
        <div className="sorting-bar">
          <h4>
            {productReviews.results ? `${productReviews.results.length}
            reviews, sorted by` : ''}
          </h4>
          <select id="sorting-dropdown" onChange={this.getFilteredReviews}>
            <option>Relevant</option>
            <option>Newest</option>
            <option>Helpful</option>
          </select>
        </div>
        {/* reviews list */}
        <div className="reviews-list">
          {productReviews.results
            ? productReviews.results.map((review) => (
              <ReviewTile key={review.review_id} review={review} />
            )) : ''}
        </div>
        {/* buttons */}
        <MainButtons ratingData={ratingData} productId={productId} />
      </div>
    );
  }
}

ReviewsList.propTypes = {
  ratingFilters: PropTypes.instanceOf(Array).isRequired,
  ratingData: PropTypes.shape({}),
  productReviews: PropTypes.shape({}),
  productId: PropTypes.number.isRequired,
};

ReviewsList.defaultProps = {
  productReviews: {},
  ratingData: {},
};

export default ReviewsList;
