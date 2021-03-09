import React from 'react';
import AddReview from './AddReview';

class MainButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { ratingData } = this.props;
    return (
      <div className="reviews-buttons">
        {false ? '' : <button type="button" onClick={this.moreReviews}>MORE REVIEWS</button>}
        <button type="button" onClick={this.addReviewModal}>ADD A REVIEW +</button>

        <AddReview ratingData={ratingData} />
      </div>
    );
  }
}

export default MainButtons;
