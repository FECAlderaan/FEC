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
      // modalShowing: false,
      modalShowing: true,
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
    const { ratingData } = this.props;
    return (
      <div className="reviews-buttons">
        {false ? '' : <button type="button" onClick={this.moreReviews}>MORE REVIEWS</button>}
        <button type="button" onClick={this.addReviewModal}>ADD A REVIEW +</button>
        <AddReview
          ratingData={ratingData}
          modalShowing={modalShowing}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

MainButtons.propTypes = {
  ratingData: PropTypes.shape({}),
};

MainButtons.defaultProps = {
  ratingData: {},
};

export default MainButtons;
