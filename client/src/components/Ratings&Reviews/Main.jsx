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
      displayedReviewsCount: 2,
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
      url: `http://localhost:8080/atelier/reviews/meta?product_id=${productId}`,
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
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}&count=30&sort=relevant`,
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
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}&count=30&sort=newest`,
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
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}&count=30&sort=helpful`,
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
      const filter = e.target.parentNode.getAttribute('index');
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
        });
        return;
      }
      // if it doesn't, update state to have it
      const newFilters = ratingFilters.concat(filter);
      this.setState({
        ratingFilters: newFilters,
      });
    } else {
      const filter = e.target.getAttribute('index');
      if (ratingFilters.includes(filter)) {
        const newFilters = [];
        ratingFilters.forEach((value) => {
          if (value !== filter) {
            newFilters.push(value);
          }
        });
        this.setState({
          ratingFilters: newFilters,
        });
        return;
      }
      const newFilters = ratingFilters.concat(filter);
      this.setState({
        ratingFilters: newFilters,
      });
    }
    this.filterReviewsList();
  }

  // Update state of displayed reviews to show only the specific
  // filtered reviews
  filterReviewsList() {
    const { displayedReviewsCount, ratingFilters, productReviews } = this.state;
    console.log('ratingFilters', ratingFilters);
    const reviews = [];
    for (let i = 0; i < productReviews.results.length; i += 1) {
      if (ratingFilters.includes(productReviews.results[i].rating)) {
        reviews.push(productReviews.results[i]);
      }
    }
    console.log('reviews', reviews);
    this.setState({
      productReviews: {
        ...productReviews,
        results: reviews,
      },
    });
  }

  moreReviews() {
    console.log('it hit');
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

  render() {
    const { ratingData, ratingFilters, productReviews, displayedReviewsCount } = this.state;
    const { productId } = this.props;
    return (
      <div>
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
            getFilteredReviews={this.getFilteredReviews}
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
};

Main.defaultProps = {
  productId: 0,
};

export default Main;
