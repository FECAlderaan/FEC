import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import Header from './Header';
import ProductDetails from './components/ProductDetails/Main';
import QuestionAnswer from './components/Questions&Answers/Main';
import RatingsReviews from './components/Ratings&Reviews/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.getCart = this.getCart.bind(this);
  }

  componentDidMount() {
    this.getCart();
  }

  getCart() {
    $.ajax({
      type: 'GET',
      url: '/atelier/cart',
      success: (data) => {
        this.setState({ cart: data });
      },
    });
  }

  render() {
    const { match } = this.props;
    const productId = Number(match.params.id);
    const { cart } = this.state;
    return (
      <>
        <Header cart={cart} />
        <ProductDetails productId={productId} getCart={this.getCart} />
        <QuestionAnswer productId={productId} />
        <RatingsReviews productId={productId} />
      </>
    );
  }
}

App.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default App;
