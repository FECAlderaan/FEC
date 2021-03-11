/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import $ from 'jquery';

import Home from './Home';
import App from './App';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      darkMode: false,
    };
    this.getCart = this.getCart.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
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

  changeTheme() {
    const { darkMode } = this.state;
    this.setState({ darkMode: !darkMode });
    if (!darkMode) {
      document.body.style.backgroundColor = '#021936';
    } else {
      document.body.style.backgroundColor = '#d1d2cd';
    }
  }

  render() {
    const { cart, darkMode } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Home {...props} cart={cart} darkMode={darkMode} changeTheme={this.changeTheme} />
            )}
          />
          <Route
            path="/products/:id"
            render={(props) => (
              <App {...props} cart={cart} darkMode={darkMode} changeTheme={this.changeTheme} getCart={this.getCart} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

// const Routes = () => (
//   <Router>
//     <Switch>
//       <Route path="/" exact component={Home} />
//       <Route path="/products/:id" component={ProductDetails} />
//     </Switch>
//   </Router>
// );

ReactDOM.render(
  <Routes />,
  document.getElementById('root'),
);
