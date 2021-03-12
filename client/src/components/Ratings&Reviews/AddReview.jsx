import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class AddReview extends React.Component {
  constructor(props) {
    super(props);

    this.chooseStarRating = this.chooseStarRating.bind(this);
    this.trackWordCount = this.trackWordCount.bind(this);
    this.showPhotos = this.showPhotos.bind(this);
    this.getProductName = this.getProductName.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.chooseCharacteristics = this.chooseCharacteristics.bind(this);
    this.modalSummary = this.modalSummary.bind(this);
    this.modalBody = this.modalBody.bind(this);
    this.modalNickname = this.modalNickname.bind(this);
    this.modalEmail = this.modalEmail.bind(this);
    const { productId } = this.props;
    this.state = {
      overallStarChosen: 0,
      newReview: {
        product_id: productId, rating: 0, summary: '', body: '', recommend: '', name: '', email: '', photos: [], characteristics: {},
      },
      bodyWordCount: 0,
      bodyWordCountCheck: false,
      photos: [],
      // urlPhotos: [],
      productName: '',
      // error checking
      ratingError: false,
      recommendError: false,
      characteristicsError: false,
      bodyError: false,
      nicknameError: false,
      emailError: false,
    };
  }

  componentDidMount() {
    this.getProductName();
  }

  // GET product name
  getProductName() {
    const { productId } = this.props;
    $.ajax({
      url: `/atelier/products/${productId}`,
      type: 'GET',
      success: (data) => {
        this.setState({
          productName: data.name,
        });
      },
    });
  }

  // Modal State Updates
  // Functionality of choosing overall star rating in modal
  chooseStarRating(e) {
    const { newReview } = this.state;
    const overallStar = e.target.id;
    let num = Number(overallStar[overallStar.length - 1]);
    let resetStars = 5;

    this.setState({
      overallStarChosen: Number(overallStar[overallStar.length - 1]),
    });
    this.setState({
      newReview: {
        ...newReview,
        rating: num,
      },
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

  recommendRadio(e) {
    const { newReview } = this.state;
    // if yes, true
    if (e.target.value === 'yes') {
      this.setState({
        newReview: {
          ...newReview,
          recommend: true,
        },
      });
    }
    // if no, false
    if (e.target.value === 'no') {
      this.setState({
        newReview: {
          ...newReview,
          recommend: false,
        },
      });
    }
  }

  chooseCharacteristics(e, id) {
    const { newReview } = this.state;
    const currentId = id.toString();
    this.setState({
      newReview: {
        ...newReview,
        characteristics: {
          ...newReview.characteristics,
          [currentId]: Number(e.target.value),
        },
      },
    });
  }

  modalSummary(e) {
    const { newReview } = this.state;
    this.setState({
      newReview: {
        ...newReview,
        summary: e.target.value,
      },
    });
  }

  modalBody(e) {
    const { newReview } = this.state;
    this.setState({
      newReview: {
        ...newReview,
        body: e.target.value,
      },
    });
  }

  trackWordCount(e) {
    const { bodyWordCount } = this.state;
    const newWordCount = e.target.value.length;
    this.setState({
      bodyWordCount: newWordCount,
    });
    if (bodyWordCount >= 50) {
      this.setState({
        bodyWordCountCheck: true,
      });
    }
    if (bodyWordCount < 50) {
      this.setState({
        bodyWordCountCheck: false,
      });
    }
  }

  // Adding photos in 'Add Review' modal
  showPhotos() {
    const { photos } = this.state;
    const userPhotos = $('#photos-modal')[0].files;
    const newPhotos = photos.concat(URL.createObjectURL(userPhotos[0]));
    this.setState({
      photos: newPhotos,
    });
  }

  // // Get real URL for photos
  // getPhotoURL() {
  // }

  modalNickname(e) {
    const { newReview } = this.state;
    this.setState({
      newReview: {
        ...newReview,
        name: e.target.value,
      },
    });
  }

  modalEmail(e) {
    const { newReview } = this.state;
    this.setState({
      newReview: {
        ...newReview,
        email: e.target.value,
      },
    });
  }

  submitReview(e) {
    const {
      newReview,
      ratingError,
      recommendError,
      characteristicsError,
      bodyError,
      nicknameError,
      emailError,
    } = this.state;
    const { ratingData, closeModal } = this.props;
    // check if all mandatory fields are filled in
    e.preventDefault();
    if (newReview.rating === 0) {
      this.setState({
        ratingError: true,
      });
      return;
    }
    if (newReview.rating > 0) {
      this.setState({
        ratingError: false,
      });
    }
    if (newReview.recommend === '') {
      this.setState({
        recommendError: true,
      });
      return;
    }
    if (newReview.recommend !== '') {
      this.setState({
        recommendError: false,
      });
    }
    if (Object.entries(newReview.characteristics).length
      // eslint-disable-next-line react/prop-types
      !== Object.entries(ratingData.characteristics).length) {
      this.setState({
        characteristicsError: true,
      });
      return;
    // eslint-disable-next-line no-else-return
    } else {
      this.setState({
        characteristicsError: false,
      });
    }
    if (newReview.body.length < 50) {
      this.setState({
        bodyError: true,
      });
      return;
    }
    if (newReview.body.length >= 50) {
      this.setState({
        bodyError: false,
      });
    }
    if (newReview.name === '') {
      this.setState({
        nicknameError: true,
      });
      return;
    }
    if (newReview.name !== '') {
      this.setState({
        nicknameError: false,
      });
    }
    // eslint-disable-next-line no-useless-escape
    const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailCheck.test(newReview.email)) {
      this.setState({
        emailError: !emailError,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }

    $.ajax({
      url: '/atelier/reviews',
      type: 'POST',
      data: JSON.stringify(newReview),
      contentType: 'application/json',
      success: () => { },
    });
    closeModal();
  }

  render() {
    const {
      overallStarChosen,
      chooseStarRating,
      bodyWordCount,
      bodyWordCountCheck,
      recommendRadio,
      trackWordCount,
      photos,
      productName,
      ratingError,
      recommendError,
      characteristicsError,
      bodyError,
      nicknameError,
      emailError,
    } = this.state;
    const { ratingData, closeModal, modalShowing } = this.props;
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
          <span className="close-modal" onClick={closeModal} onKeyDown={closeModal} role="button" tabIndex="-1">&times;</span>
          <h1>Write Your Review</h1>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <h2>About the {productName}</h2>
          <form>
            <div className="add-review-form-container">
              {/* Overall Rating */}
              <div className="overall-rating-modal">
                <h3>Overall Rating</h3>
                <p>Click your rating</p>
                {ratingError ? <p className="error-message-modal">*required field*</p> : ''}
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
                {recommendError ? <p className="error-message-modal">*required field*</p> : ''}
                <label>
                  <input type="radio" value="yes" name="recommend" onChange={(e) => { this.recommendRadio(e); }} />
                  Yes
                </label>
                <label>
                  <input type="radio" value="no" name="recommend" onChange={(e) => { this.recommendRadio(e); }} />
                  No
                </label>
              </div>
              {/* Characteristics */}
              <div className="characteristics-modal">
                <h3>Characteristics</h3>
                {characteristicsError ? <p className="error-message-modal">*required field*</p> : ''}
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
                  let counter = 0;
                  return (
                    <div key={value.id} className="characteristic-modal">
                      <h4 id="char-title">{key}</h4>
                      <div className="titles">
                        {productCharacteristics.map((description) => {
                          counter += 1;
                          return (
                            <label key={description} htmlFor={description} className="single-radio">
                              <input type="radio" value={counter} name={value.id} onChange={(e) => { this.chooseCharacteristics(e, value.id); }} />
                              {description}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Review Summary */}
              <div className="review-summary-modal">
                <label htmlFor="summary">
                  <h3>Review Summary</h3>
                  <input type="text" className="textbox summary-textbox" name="summary" maxLength="60" placeholder="Example: Best purchase ever!" onBlur={(e) => { this.modalSummary(e); }} />
                </label>
              </div>
              {/* Review Body */}
              <div className="review-body-modal">
                <label htmlFor="body">
                  <h3>Review Body</h3>
                  {bodyError ? <p className="error-message-modal">*required field*</p> : ''}
                  <textarea type="text" id="body-textbox" name="body" maxLength="1000" placeholder="Why did you like the product or not?" onChange={(e) => this.trackWordCount(e)} onBlur={(e) => { this.modalBody(e); }} />
                </label>
                <span>
                  {bodyWordCountCheck ? 'Minimum reached' : `Minimum required characters left: ${(50 - bodyWordCount)}`}
                </span>
              </div>
              {/* Upload Photos */}
              <div className="upload-photos-modal">
                <h3>Select photos to upload</h3>
                {photos.length >= 5 ? '' : <input type="file" id="photos-modal" onChange={this.showPhotos} multiple />}
                {photos.length > 0 ? (
                  <div className="photos-container-modal">
                    {photos.map((photo) => (
                      <img className="user-photo-modal" src={photo} alt="User Product" key={photo} />
                    ))}
                  </div>
                ) : ''}

              </div>
              {/* What's your nickname? */}
              <div className="nickname-modal">
                <label htmlFor="nickname">
                  <h3>Your nickname</h3>
                  {nicknameError ? <p className="error-message-modal">*required field*</p> : ''}
                  <input type="text" className="textbox nickname-textbox" name="nickname" maxLength="60" placeholder="Example: jackson11!" onBlur={(e) => { this.modalNickname(e); }} />
                </label>
                <p><i>For privacy reasons, do not use your full name or email address</i></p>
              </div>
              {/* Your email */}
              <div className="email-modal">
                <label htmlFor="email">
                  <h3>Your email</h3>
                  {emailError ? <p className="error-message-modal">*required field*</p> : ''}
                  <input type="text" className="textbox email-textbox" name="email" maxLength="60" placeholder="Example: jackson11@email.com" onBlur={(e) => { this.modalEmail(e); }} />
                </label>
                <p><i>For authentication reasons, you will not be emailed</i></p>
              </div>
            </div>
            <button onClick={(e) => { this.submitReview(e); }} type="submit" className="modal-submit-button">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

AddReview.propTypes = {
  ratingData: PropTypes.shape({}),
  closeModal: PropTypes.func,
  modalShowing: PropTypes.bool,
  productId: PropTypes.number,
};

AddReview.defaultProps = {
  ratingData: {},
  modalShowing: false,
  closeModal: (() => { }),
  productId: 0,
};

export default AddReview;
