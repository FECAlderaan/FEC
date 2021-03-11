/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import AnswerList from './AnswerList';
import AnswerModal from './AnswerModal';

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    this.state = {
      showAnswerModal: false,
      markedHelpful: false,
      helpfulness: question.question_helpfulness,
    };
    this.parseAnswers = this.parseAnswers.bind(this);
    this.toggleAnswerModal = this.toggleAnswerModal.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.renderHelpfulButton = this.renderHelpfulButton.bind(this);
    this.renderAnswerModal = this.renderAnswerModal.bind(this);
  }

  // Convert answers from an object to an array;
  parseAnswers() {
    const { question: { answers } } = this.props;
    let answerList;
    if (answers) {
      answerList = Object.entries(answers).map((answer) => answer[[1]]);
    }
    return answerList;
  }

  toggleAnswerModal() {
    const { showAnswerModal } = this.state;
    this.setState({ showAnswerModal: !showAnswerModal });
  }

  // Increase a question's helpfulness property
  markHelpful() {
    const { question: { question_id: id } } = this.props;
    const { markedHelpful, helpfulness } = this.state;
    const route = `/atelier/qa/questions/${id}/helpful`;
    if (!markedHelpful) {
      $.ajax({
        url: route,
        method: 'PUT',
      })
        // update state so render can reflect new value
        .done(this.setState({ markedHelpful: true, helpfulness: helpfulness + 1 }))
        .fail((error) => console.log(error));
    }
  }

  // Render a button that can only be clicked once for marking a helpful answer
  renderHelpfulButton() {
    const { markedHelpful } = this.state;
    let helpfulButton = <span className="link" role="button" onClick={this.markHelpful}>Yes</span>;
    if (markedHelpful) {
      helpfulButton = <span>Yes</span>;
    }
    return helpfulButton;
  }

  // Render a modal for submitting an answer
  renderAnswerModal() {
    const { showAnswerModal } = this.state;
    const { question: { question_id: questionId, question_body: questionBody } } = this.props;
    const { productName } = this.props;
    let modal;
    if (showAnswerModal) {
      modal = (
        <AnswerModal
          toggleAnswerModal={this.toggleAnswerModal}
          questionId={questionId}
          questionBody={questionBody}
          productName={productName}
        />
      );
    }
    return modal;
  }

  render() {
    const { helpfulness } = this.state;
    const { question: { question_body: questionBody } } = this.props;
    return (
      <div className="list-entry">
        <span className="question">
          <h3 className="question-head">Q: </h3>
          <h4 className="question-head">{questionBody}</h4>
          <span className="question-data">
            {'Helpful? '}
            {this.renderHelpfulButton()}
            {' ('}
            {helpfulness}
            )
            <span className="seperator"> | </span>
            <span className="link" role="button" onClick={this.toggleAnswerModal}>Add Answer</span>
          </span>
          {this.renderAnswerModal()}
        </span>
        <AnswerList answers={this.parseAnswers()} />
      </div>
    );
  }
}

QuestionListEntry.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
  productName: PropTypes.string.isRequired,
};

export default QuestionListEntry;
