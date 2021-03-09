import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import ReviewsList from './ReviewsList';
import RatingBreakdown from './RatingBreakdown';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.filterReviews = this.filterReviews.bind(this);
    this.state = {
      productId: props.productId,
      ratingData: { ratings: [], recommended: {}, characteristics: {} },
      ratingFilters: [],
    };
  }

  componentDidMount() {
    this.getMetaData();
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

  // Gets the filtering option from clicks on Rating Breakdown bars
  filterReviews(e) {
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
  }

  render() {
    const { ratingData, ratingFilters } = this.state;
    const { productId } = this.props;
    return (
      <div>
        <h2>RATINGS AND REVIEWS</h2>
        <div className="reviews-ratings-main" id="reviews-ratings-main">
          <RatingBreakdown
            ratingData={ratingData}
            filterReviews={this.filterReviews}
          />
          <ReviewsList
            ratingFilters={ratingFilters}
            productId={productId}
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
