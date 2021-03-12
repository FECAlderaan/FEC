import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import ReviewsList from './ReviewsList';
import RatingBreakdown from './RatingBreakdown';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.getFilters = this.getFilters.bind(this);
    this.getFilteredReviews = this.getFilteredReviews.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
    this.state = {
      productId: props.productId,
      ratingData: { ratings: [], recommended: {}, characteristics: {} },
      ratingFilters: [],
      productReviews: { results: [] },
      displayedReviews: [],
      displayedReviewsCount: 2,
      filterCheck: false,
    };
  }

  componentDidMount() {
    this.getMetaData();
    this.getRelevantReviews();
  }

  getMetaData() {
    const { productId } = this.state;
    // GET request for reviews for the specific product
    $.ajax({
      url: `/atelier/reviews/meta?product_id=${productId}`,
      type: 'GET',
      success: (data) => {
        this.setState({
          ratingData: data,
        });
      },
    });
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
      url: `/atelier/reviews?product_id=${productId}&count=30&sort=relevant`,
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
      url: `/atelier/reviews?product_id=${productId}&count=30&sort=newest`,
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
      url: `/atelier/reviews?product_id=${productId}&count=30&sort=helpful`,
      type: 'GET',
      success: (data) => {
        this.setState({
          productReviews: data,
        });
      },
    });
  }

  // Gets the filtering option from clicks on Rating Breakdown bars
  getFilters(e) {
    const { ratingFilters } = this.state;
    // if the clicked element doesn't have the 'index' attribute, get it from its parent
    if (e.target.getAttribute('index') === null) {
      const filter = Number(e.target.parentNode.getAttribute('index'));
      // check if ratingFilters array already has the star filter, return nothing if so
      if (ratingFilters.includes(filter)) {
        const newFilters = [];
        ratingFilters.forEach((value) => {
          if (value !== filter) {
            newFilters.push(value);
          }
        });
        this.setState({
          ratingFilters: newFilters,
          filterCheck: true,
        });
        return;
      }
      // if it doesn't, update state to have it
      const newFilters = ratingFilters.concat(filter);
      this.setState({
        ratingFilters: newFilters,
        filterCheck: true,
      });
    } else {
      const filter = Number(e.target.getAttribute('index'));
      if (ratingFilters.includes(filter)) {
        const newFilters = [];
        ratingFilters.forEach((value) => {
          if (value !== filter) {
            newFilters.push(value);
          }
        });
        this.setState({
          ratingFilters: newFilters,
          filterCheck: true,
        });
        return;
      }
      const newFilters = ratingFilters.concat(filter);
      this.setState({
        ratingFilters: newFilters,
        filterCheck: true,
      });
    }
    // this.filterReviewsList();
  }

  // Update state of displayed reviews to show only the specific
  // filtered reviews
  filterReviewsList() {
    const { ratingFilters, productReviews } = this.state;
    const reviews = [];
    productReviews.results.forEach((result) => {
      for (let i = 0; i < ratingFilters.length; i += 1) {
        if (ratingFilters.includes(result.rating)) {
          reviews.push(result);
          break;
        }
      }
    });

    this.setState({
      displayedReviews: reviews,
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
    const reviewsList = $('.reviews-list');
    reviewsList.css({ 'max-height': '800px', 'overflow-x': 'hidden', 'overflow-y': 'auto' });
  }

  render() {
    const {
      // eslint-disable-next-line max-len
      ratingData, ratingFilters, productReviews, displayedReviewsCount, displayedReviews, filterCheck,
    } = this.state;
    const { productId, onClick } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div role="button" onClick={onClick} onKeyDown={onClick} id="ratings-reviews-main-container">
        <div className="reviews-ratings-main" id="reviews-ratings-main">
          <RatingBreakdown
            ratingData={ratingData}
            getFilters={this.getFilters}
          />
          <ReviewsList
            ratingData={ratingData}
            ratingFilters={ratingFilters}
            productId={productId}
            productReviews={productReviews}
            filterCheck={filterCheck}
            getFilteredReviews={this.getFilteredReviews}
            displayedReviews={displayedReviews}
            displayedReviewsCount={displayedReviewsCount}
            moreReviews={this.moreReviews}
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  productId: PropTypes.number,
  onClick: PropTypes.func,
};

Main.defaultProps = {
  productId: 0,
  onClick: () => {},
};

export default Main;
