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
    const { productId } = this.props;
    this.state = {
      overallStarChosen: 0,
      newReview: {
        product_id: productId, rating: 0, summary: '', recommend: false, name: '', email: '', photos: [], characteristics: {},
      },
      bodyWordCount: 0,
      bodyWordCountCheck: false,
      photos: [],
      productName: '',
    };
  }

  componentDidMount() {
    this.getProductName();
  }

  // GET product name
  getProductName() {
    const { productId } = this.props;
    $.ajax({
      url: `http://localhost:8080/atelier/products/${productId}`,
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

  submitReview(e) {
    e.preventDefault();
    console.log('we\'ll submit the review now');
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
          <h2>Write Your Review</h2>
          <h3>
            About the
            {productName}
          </h3>
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
                  <input type="text" className="textbox summary-textbox" name="summary" maxLength="60" placeholder="Example: Best purchase ever!" />
                </label>
              </div>
              {/* Review Body */}
              <div className="review-body-modal">
                <label htmlFor="body">
                  <h3>Review Body</h3>
                  <textarea type="text" onChange={(e) => this.trackWordCount(e)} id="body-textbox" name="body" maxLength="1000" placeholder="Why did you like the product or not?" />
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
                  <input type="text" className="textbox nickname-textbox" name="nickname" maxLength="60" placeholder="Example: jackson11!" />
                </label>
                <p><i>For privacy reasons, do not use your full name or email address</i></p>
              </div>
              {/* Your email */}
              <div className="email-modal">
                <label htmlFor="email">
                  <h3>Your email</h3>
                  <input type="text" className="textbox email-textbox" name="email" maxLength="60" placeholder="Example: jackson11@email.com" />
                </label>
                <p><i>For authentication reasons, you will not be emailed</i></p>
              </div>
            </div>
            <button onClick={(e) => { this.submitReview(e); }} type="submit">Submit</button>
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
