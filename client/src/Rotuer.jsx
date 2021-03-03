import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home.jsx';
import ProductDetails from './components/ProductDetails/Main';

const Routes = () =>
(
  <Router>
    <Switch>
      <Route path='/' exact component={Home}></Route>
      <Route path='/products/:id' component={ProductDetails}></Route>
    </Switch>
  </Router>
);

ReactDOM.render(
  <Routes />,
  document.getElementById('root'),
);