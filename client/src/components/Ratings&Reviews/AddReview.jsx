import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class AddReview extends React.Component {
  constructor(props) {
    super(props);

    this.addReviewModal = this.addReviewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseStarRating = this.chooseStarRating.bind(this);
    this.state = {
      modalShowing: true,
      overallStarChosen: 0,
      newReview: {},
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
    const overallStar = e.target.id;
    let num = Number(overallStar[overallStar.length - 1]);
    let resetStars = 5;

    this.setState({
      overallStarChosen: Number(overallStar[overallStar.length - 1]),
    });
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

  recommendRadio() {
    console.log('radio button was pressed');
  }

  render() {
    const {
      modalShowing, closeModal, overallStarChosen, chooseStarRating, recommendRadio,
    } = this.state;
    const { ratingData } = this.props;
    const modalToggle = modalShowing ? 'block' : 'none';
    const scores = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    // [index, characteristic]
    // [0, Size], [1, Width], [2, Comfort], [3, Quality], [4, Length], [5, Fit]
    const characteristicsArray = [
      ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'],
      ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    ];
    return (
      <div className="add-review-modal-main" style={{ display: modalToggle }}>
        <div className="add-review-modal-content">
          <span className="close-modal" onClick={() => { this.closeModal(); }} onKeyDown={closeModal} role="button" tabIndex="-1">&times;</span>
          <form>
            <div className="add-review-form-container">
              {/* Overall Rating */}
              <div className="overall-rating-modal">
                <h3>Overall Rating</h3>
                <i className="fas fa-star modal-star" id="star-1" onClick={(e) => { this.chooseStarRating(e); }} onKeyDown={chooseStarRating} role="button" tabIndex="-1" aria-label="1 Star Rating" />
                <i className="fas fa-star modal-star" id="star-2" onClick={(e) => { this.chooseStarRating(e); }} onKeyDown={chooseStarRating} role="button" tabIndex="-1" aria-label="2 Star Rating" />
                <i className="fas fa-star modal-star" id="star-3" onClick={(e) => { this.chooseStarRating(e); }} onKeyDown={chooseStarRating} role="button" tabIndex="-1" aria-label="3 Star Rating" />
                <i className="fas fa-star modal-star" id="star-4" onClick={(e) => { this.chooseStarRating(e); }} onKeyDown={chooseStarRating} role="button" tabIndex="-1" aria-label="4 Star Rating" />
                <i className="fas fa-star modal-star" id="star-5" onClick={(e) => { this.chooseStarRating(e); }} onKeyDown={chooseStarRating} role="button" tabIndex="-1" aria-label="5 Star Rating" />
                <span>
                  {overallStarChosen === 0 ? '' : ` ${overallStarChosen} star = ${scores[overallStarChosen - 1]}`}
                </span>
              </div>
              {/* Recommend? */}
              <div className="recommend-radio-modal">
                <h3>Do you recommend this product?</h3>
                <label>
                  <input type="radio" value="yes" name="recommend" onChange={this.recommendRadio} />
                  Yes
                </label>
                <label>
                  <input type="radio" value="yes" name="recommend" onChange={this.recommendRadio} />
                  No
                </label>
              </div>
              {/* Characteristics */}
              <div className="characteristics-modal">
                {Object.entries(ratingData.characteristics).map(([key, value]) => {
                  let charIndex = key;
                  switch (charIndex) {
                    case 'Size':
                      charIndex = 0;
                      break;
                    case 'Width':
                      charIndex = 1;
                      break;
                    case 'Comfort':
                      charIndex = 2;
                      break;
                    case 'Quality':
                      charIndex = 3;
                      break;
                    case 'Length':
                      charIndex = 4;
                      break;
                    case 'Fit':
                      charIndex = 5;
                      break;
                    default:
                      charIndex = '';
                  }
                  const productCharacteristics = characteristicsArray[charIndex];
                  return (
                    <div key={value.id} className="characteristic-modal">
                      <div>{key}</div>
                      <div className="titles">
                        {productCharacteristics.map((description) => {
                          const x = 0;
                          return (
                            <label key={description} htmlFor={description}>
                              <input type="radio" value={description} name={value.id} />
                              {description}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddReview.propTypes = {
  ratingData: PropTypes.shape({}),
};

AddReview.defaultProps = {
  ratingData: {},
};

export default AddReview;
