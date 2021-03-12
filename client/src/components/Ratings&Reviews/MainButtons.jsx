import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import AddReview from './AddReview';

class MainButtons extends React.Component {
  constructor(props) {
    super(props);

    this.addReviewModal = this.addReviewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalShowing: false,
    };
  }

  // Modal popup to add a review
  addReviewModal() {
    const { modalShowing } = this.state;
    this.setState({
      modalShowing: !modalShowing,
    });
  }

  closeModal() {
    const { modalShowing } = this.state;
    const modalMain = $('.add-review-modal-main');
    modalMain.css('display', 'none');
    this.setState({
      modalShowing: !modalShowing,
    });
  }

  render() {
    const { modalShowing } = this.state;
    const {
      ratingData, productId, moreReviews, productReviews, displayedReviewsCount,
    } = this.props;
    // eslint-disable-next-line react/prop-types
    const reviewsCheck = (productReviews.results.length === displayedReviewsCount);
    return (
      <div className="reviews-buttons">
        {reviewsCheck ? '' : <button type="button" className="more-reviews" onClick={moreReviews}>More Reviews</button>}
        <button type="button" className="add-review" onClick={this.addReviewModal}>Add Review</button>
        <AddReview
          ratingData={ratingData}
          modalShowing={modalShowing}
          closeModal={this.closeModal}
          productId={productId}
        />
      </div>
    );
  }
}

MainButtons.propTypes = {
  ratingData: PropTypes.shape({}),
  productId: PropTypes.number,
  moreReviews: PropTypes.func,
  productReviews: PropTypes.shape({}),
  displayedReviewsCount: PropTypes.number,
};

MainButtons.defaultProps = {
  ratingData: {},
  productId: 0,
  moreReviews: () => {},
  productReviews: {},
  displayedReviewsCount: 0,
};

export default MainButtons;
