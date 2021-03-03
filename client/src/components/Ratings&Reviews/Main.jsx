import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import ReviewsList from './ReviewsList';
import RatingBreakdown from './RatingBreakdown';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.productId,
      productReviews: { results: [] },
      ratingData: { ratings: [], recommended: {} },
    };
  }

  componentDidMount() {
    this.getReviews();
    this.getMetaData();
  }

  getReviews() {
    const { productId } = this.state;
    // GET request for reviews for the specific product
    $.ajax({
      url: `http://localhost:8080/atelier/reviews?product_id=${productId}`,
      type: 'GET',
      success: (data) => {
        this.setState({
          productReviews: data,
        });
      },
    });
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

  render() {
    const { productId, productReviews, ratingData } = this.state;
    return (
      <div>
        <h2>RATINGS AND REVIEWS</h2>
        <div className="reviews-ratings-main">
          <RatingBreakdown ratingData={ratingData} />
          <ReviewsList productReviews={productReviews} productId={productId} />
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
