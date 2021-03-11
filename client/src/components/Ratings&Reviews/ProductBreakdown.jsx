import React from 'react';
import PropTypes from 'prop-types';

const ProductBreakdown = ({ ratingData }) => {
  const oneRatings = ['A size too small', 'Too narrow', 'Uncomforatble', 'Poor', 'Runs Short', 'Runs tight'];
  const fiveRatings = ['A size too wide', 'Too wide', 'Perfect', 'Perfect', 'Runs long', 'Runs long'];
  return (
    <div className="product-breakdown-main">
      {Object.entries(ratingData.characteristics).map(([key, value]) => {
        let oneRatingLabel;
        let fiveRatingLabel;
        const [lowZero, lowFirst, lowSecond, lowThird, lowFourth, lowFifth] = oneRatings;
        const [highZero, highFirst, highSecond, highThird, highFourth, highFifth] = fiveRatings;
        if (key === 'Fit') {
          oneRatingLabel = lowFifth;
          fiveRatingLabel = highFifth;
        } else if (key === 'Length') {
          oneRatingLabel = lowFourth;
          fiveRatingLabel = highFourth;
        } else if (key === 'Quality') {
          oneRatingLabel = lowThird;
          fiveRatingLabel = highThird;
        } else if (key === 'Comfort') {
          oneRatingLabel = lowSecond;
          fiveRatingLabel = highSecond;
        } else if (key === 'Width') {
          oneRatingLabel = lowFirst;
          fiveRatingLabel = highFirst;
        } else if (key === 'Size') {
          oneRatingLabel = lowZero;
          fiveRatingLabel = highZero;
        }
        return (
          <div key={value.id} className="characteristic-bar">
            <div className="characteristic-title">{key}</div>
            <div className="product-breakdown-bar">
              <div className="icon-container">
                <i className="fas fa-sort-down" id="marker-icon" style={{ left: `${(Number(value.value) * 17.6)}%` }} />
              </div>
            </div>
            <div className="labels">
              <p id="one-label">{oneRatingLabel}</p>
              <p id="five-label">{fiveRatingLabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProductBreakdown.propTypes = {
  ratingData: PropTypes.shape(),
};

ProductBreakdown.defaultProps = {
  ratingData: {},
};

export default ProductBreakdown;
