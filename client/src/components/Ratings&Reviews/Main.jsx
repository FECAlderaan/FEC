import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.productId,
      productReviews: { results: [] },
    }
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    // GET request for reviews for the specific product
    $.ajax({
      url: `http://localhost:8080/atelier/reviews?product_id=${this.state.productId}`,
      type: 'GET',
      success: (data) => {
        console.log(data);
        this.setState({
          productReviews: data,
        })
      },
      error: function (error) {
        console.error('Failed to get product reviews:', error);
      },
    });
  }

  render() {
    return (
      <div>
        <h2>RATINGS AND REVIEWS</h2>
        <div className="reviews-ratings-main">
          <RatingBreakdown />
          <ReviewsList productReviews={this.state.productReviews} productId={this.state.productId} />
        </div>
      </div>
    )
  }

}

Main.propTypes = {
  productId: PropTypes.number
}

export default Main;