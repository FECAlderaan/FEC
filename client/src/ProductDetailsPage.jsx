import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProductDetails from './components/ProductDetails/Main';
import QuestionAnswer from './components/Questions&Answers/Main';
import RatingsReviews from './components/Ratings&Reviews/Main';

const App = ({ match }) => {
  const productId = Number(match.params.id);
  return (
    <>
      <div id="header">
        <span>Catwalk</span>
        <button id="home" type="button">
          <Link to="/" style={{ color: '#fff' }}>
            <i className="fas fa-home" />
          </Link>
        </button>
      </div>
      <ProductDetails productId={productId} />
      <QuestionAnswer productId={productId} />
      <RatingsReviews productId={productId} />
    </>
  );
};

App.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default App;
