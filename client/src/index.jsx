import React from 'react';
import ReactDOM from 'react-dom';

import ProductDetails from './components/ProductDetails/Main.jsx'
import QuestionAnswer from './components/Questions&Answers/QuestionAnswer'
import RatingsReviews from './components/Ratings&Reviews/Main.jsx'

const App = () => {
  const productId = 19378;
  return (
    <>
    <h1>APP</h1>
    <ProductDetails productId={productId}/>
    <QuestionAnswer productId={productId}/>
    <RatingsReviews productId={productId}/>
    </>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);