import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import ProductDetails from './ProductDetailsPage';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products/:id" component={ProductDetails} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Routes />,
  document.getElementById('root'),
);
