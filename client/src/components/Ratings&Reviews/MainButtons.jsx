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
    const { ratingData, productId, moreReviews, productReviews, displayedReviewsCount } = this.props;
    const reviewsCheck = (productReviews.results.length === displayedReviewsCount);
    return (
      <div className="reviews-buttons">
        {reviewsCheck ? '' : <button type="button" onClick={moreReviews}>MORE REVIEWS</button>}
        <button type="button" onClick={this.addReviewModal}>ADD A REVIEW +</button>
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
};

MainButtons.defaultProps = {
  ratingData: {},
  productId: 0,
  moreReviews: () => {},
};

export default MainButtons;
