import React from 'react';
import PropTypes from 'prop-types';

import ProductDetails from './components/ProductDetails/Main.jsx'
import QuestionAnswer from './components/Questions&Answers/Main.jsx'
import RatingsReviews from './components/Ratings&Reviews/Main.jsx'

const App = ({ match }) => {
  var productId = Number(match.params.id);
  return (
    <>
      <ProductDetails productId={productId}/>
      <QuestionAnswer productId={productId}/>
      <RatingsReviews productId={productId}/>
    </>
  );
}

App.propTypes = {
  match: PropTypes.object
}

export default App;
