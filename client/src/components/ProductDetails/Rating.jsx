import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: []
    }
  }

  componentDidMount() {
    this.getRating();
  }

  getRating(pageNum = 1) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/atelier/reviews/?product_id=${this.props.productId}&count=1000&page=${pageNum}`,
      success: (data) => {
        this.setState({ratings: this.state.ratings.concat(data.results.map(review => review.rating))});
        if (data.results.length === 1000) {
          pageNum++;
          this.getRating(pageNum);
        }
      },
      error: (err) => {
        console.log('error!', err);
      }
    });
  }

  render() {
    if (this.state.ratings.length === 0) {
      return null;
    }
    var rating = this.state.ratings.reduce((aggRating, rating) => (aggRating + rating), 0) / (this.state.ratings.length);
    var roundedRatingOutOf75 = (Math.round(rating * 4) / 4) * 15;
    return (
    <div className='rating'>
      <span className='rating-empty'>
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
      </span>
      <span className='rating-filled' style={{'width': roundedRatingOutOf75}}>
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </span>
      {/* might have to change this link depending on the id given to the ratings & reviews section */}
      <a href='#reviews'>Read {this.state.ratings.length === 1 ? '1 review' : `all ${this.state.ratings.length} reviews`}</a>
    </div>
    )
  }
}

Rating.propTypes = {
  productId: PropTypes.number
}

export default Rating;