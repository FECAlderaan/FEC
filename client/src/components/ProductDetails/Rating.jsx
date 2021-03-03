import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
    };
  }

  componentDidMount() {
    this.getRating();
  }

  getRating(pageNum = 1) {
    const { productId } = this.props;
    const { ratings } = this.state;
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/atelier/reviews/?product_id=${productId}&count=1000&page=${pageNum}`,
      success: (data) => {
        this.setState({ ratings: ratings.concat(data.results.map((review) => review.rating)) });
        if (data.results.length === 1000) {
          // eslint-disable-next-line no-param-reassign
          pageNum += 1;
          this.getRating(pageNum);
        }
      },
    });
  }

  render() {
    const { ratings } = this.state;
    if (ratings.length === 0) {
      return null;
    }
    const rating = ratings.reduce((agg, review) => (agg + review), 0) / (ratings.length);
    const roundedRatingOutOf75 = (Math.round(rating * 4) / 4) * 15;
    return (
      <div className="rating">
        <span className="rating-empty">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </span>
        <span className="rating-filled" style={{ width: roundedRatingOutOf75 }}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </span>
        <a href="#reviews-ratings-main">
          Read
          {ratings.length === 1 ? ' 1 review' : ` all ${ratings.length} reviews`}
        </a>
      </div>
    );
  }
}

Rating.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Rating;
