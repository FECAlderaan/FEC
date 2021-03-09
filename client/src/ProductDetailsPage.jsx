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
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getCart();
  }

  // eslint-disable-next-line class-methods-use-this
  onClick(e) {
    const time = String(new Date());
    const element = `#${e.currentTarget.id} ${String(e.target.tagName).toLowerCase()}${Array.from(e.target.classList).reduce((classList, className) => `${classList}.${className}`, '')}`;
    const widget = String(e.currentTarget.id);
    $.ajax({
      type: 'POST',
      url: '/atelier/interactions',
      data: JSON.stringify({ time, element, widget }),
      contentType: 'application/json',
      success: () => {
        console.log('success!');
      },
      error: (err) => {
        console.log('error:', err);
      },
    });
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
        <ProductDetails productId={productId} getCart={this.getCart} onClick={this.onClick} />
        <QuestionAnswer productId={productId} onClick={this.onClick} />
        <RatingsReviews productId={productId} onClick={this.onClick} />
      </>
    );
  }
}

App.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default App;
