import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
console.log('helloworld')
ReactDOM.render(
  <h1>Hello, world!</h1>,
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