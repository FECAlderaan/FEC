/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      questionName: '',
      questionEmail: '',
    };
    this.changeAnswerInfo = this.changeAnswerInfo.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  changeAnswerInfo(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitQuestion() {
    const { questionText, questionName, questionEmail } = this.state;
    const { toggleQuestionModal, productId } = this.props;

    const route = 'http://localhost:8080/atelier/qa/questions';
    const questionInfo = {
      body: questionText,
      name: questionName,
      email: questionEmail,
      product_id: productId,
    };

    $.ajax({
      type: 'POST',
      url: route,
      data: JSON.stringify(questionInfo),
      // dataType: dataType
      contentType: 'application/json; charset=utf-8',
    })
      .then(() => console.log('success'))
      .then(toggleQuestionModal())
      .catch((error) => console.log(error));
  }

  render() {
    const { questionText, questionName, questionEmail } = this.state;
    const { toggleQuestionModal } = this.props;
    return (
      <div>
        <h3>Ask a Question</h3>
        <form>
          <div>
            <label htmlFor="questionName">
              Nickname:
              <input
                type="text"
                name="questionName"
                value={questionName}
                onChange={this.changeAnswerInfo}
                placeholder="Example: jackson11!"
              />
              <p>For privacy reasons, do not use your full name or email address</p>
            </label>
          </div>
          <div>
            <label htmlFor="questionEmail">
              Email:
              <input
                type="text"
                name="questionEmail"
                value={questionEmail}
                onChange={this.changeAnswerInfo}
              />
              <p>For authentication reasons you will be emailed</p>
            </label>
          </div>
          <div>
            <label htmlFor="questionText">
              Question:
              <input
                type="text"
                name="questionText"
                value={questionText}
                onChange={this.changeAnswerInfo}
                placeholder="Why did you like the product or not?"
              />
            </label>
          </div>
          <button type="button" onClick={toggleQuestionModal}>Cancel</button>
          <button type="button" onClick={this.submitQuestion}>Submit</button>
        </form>
      </div>
    );
  }
}

QuestionModal.propTypes = {
  productId: PropTypes.number.isRequired,
  toggleQuestionModal: PropTypes.func.isRequired,
};

export default QuestionModal;
