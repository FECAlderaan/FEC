/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import QuestionList from './QuestionList';
import QuestionModal from './QuestionModal';

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Call Atelier API (through proxy server) and get relevant info for for productId
    const { productId } = this.props;
    const route = 'http://localhost:8080/atelier/qa/questions';
    $.get(route, { product_id: productId })
      .done((result) => {
        this.setState({ product: { productId: result.product_id, questions: result.results } });
      })
      .fail((error) => {
        console.error(error);
        alert(error);
      });
  }

  render() {
    const { product } = this.state;
    return (
      <div className="questions-answers">
        <h2>Questions & Answers</h2>
        <QuestionList product={product} />
        <button type="button">Ask A Question + </button>
        <QuestionModal />
      </div>
    );
  }
}

QuestionAnswer.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default QuestionAnswer;
