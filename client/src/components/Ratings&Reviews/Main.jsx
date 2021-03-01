import React from 'react';

import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

const Main = () => {
  return (
    <div>
      <h2>RATINGS AND REVIEWS</h2>
      <div className="reviews-ratings-section">
        <RatingBreakdown />
        <ReviewsList />
      </div>
    </div>
  )
}

export default Main;