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
    this.state = {
      showQuestionModal: false,
    };
    this.toggleQuestionModal = this.toggleQuestionModal.bind(this);
    this.renderQuestionModal = this.renderQuestionModal.bind(this);
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

  toggleQuestionModal() {
    const { showQuestionModal } = this.state;
    this.setState({ showQuestionModal: !showQuestionModal });
  }

  // Render a modal for submitting a question
  renderQuestionModal() {
    const { showQuestionModal } = this.state;
    let modal;
    if (showQuestionModal) {
      modal = <QuestionModal toggleQuestionModal={this.toggleQuestionModal} />;
    }
    return modal;
  }

  render() {
    const { product } = this.state;
    return (
      <div className="questions-answers">
        <h2>Questions & Answers</h2>
        <QuestionList product={product} />
        <button type="button" onClick={this.toggleQuestionModal}>Ask A Question + </button>
        {this.renderQuestionModal()}
      </div>
    );
  }
}

QuestionAnswer.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default QuestionAnswer;
