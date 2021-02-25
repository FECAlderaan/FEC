import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const App = () => {
  return (
    <h1>APP</h1>
    // Product Detail
    // Writings and Reviews
    // Questions and Answers
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

document.getElementById('test').addEventListener('click', () => {
  console.log('clicked');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/atelier/products',
    success: (data) => {
      console.log('success!', data);
    },
    error: (err) => {
      console.log('error!', err);
    }
  })
})