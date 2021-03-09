import React from 'react';
import $ from 'jquery';

class AddReview extends React.Component {
  constructor(props) {
    super(props);

    this.addReviewModal = this.addReviewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
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

  // Functionality of choosing overall star rating in modal
  chooseStarRating(e) {
    const x = this;
    const overallStar = e.target.id;
    let num = Number(overallStar[overallStar.length - 1]);
    let resetStars = 5;
    const starString = overallStar[overallStar.length - 1];
    console.log(num);
    // reset star colors
    while (resetStars > 0) {
      const star = $(`#star-${resetStars}`);
      star.css('color', 'black');
      resetStars -= 1;
    }

    // fill in star colors
    while (num > 0) {
      const star = $(`#star-${num}`);
      star.css('color', 'yellow');
      num -= 1;
    }
  }

  render() {
    const { modalShowing, closeModal } = this.state;
    const modalToggle = modalShowing ? 'block' : 'none';
    return (
      <div className="add-review-modal-main" style={{ display: modalToggle }}>
        <div className="add-review-modal-content">
          <span className="close-modal" onClick={() => { this.closeModal(); }} onKeyDown={closeModal} role="button" tabIndex="-1">&times;</span>
          <form>
            <div className="add-review-form-container">
              <div className="overall-rating">
                <h3>Overall Rating</h3>
                <i className="fas fa-star modal-star" id="star-1" onClick={this.chooseStarRating} />
                <i className="fas fa-star modal-star" id="star-2" onClick={this.chooseStarRating} />
                <i className="fas fa-star modal-star" id="star-3" onClick={this.chooseStarRating} />
                <i className="fas fa-star modal-star" id="star-4" onClick={this.chooseStarRating} />
                <i className="fas fa-star modal-star" id="star-5" onClick={this.chooseStarRating} />
                <span> 4 star = Good</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddReview;
