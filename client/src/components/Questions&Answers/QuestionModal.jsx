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
      error: false,
    };
    this.changeQuestionInfo = this.changeQuestionInfo.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyQuestion = this.verifyQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  changeQuestionInfo(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // make sure email is in correct format
  verifyEmail() {
    const { questionEmail: email } = this.state;
    let formatted = false;
    const asterisk = email.indexOf('@');
    const period = email.lastIndexOf('.');
    if (email[asterisk - 1] && email[asterisk + 1] !== '.' && asterisk < period && email[period + 1]) {
      formatted = true;
    }
    return formatted;
  }

  // if any mandatory fields are incorect, mark flag for renderErrors to display necessary message
  verifyQuestion() {
    const { questionText, questionName } = this.state;
    if (!questionText || !questionName || !this.verifyEmail()) {
      this.setState({ error: true });
      return false;
    }
    this.setState({ error: false });
    return true;
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
    // check if there are any errors
    this.verifyQuestion();
    // only submit if there are no errors
    if (this.verifyQuestion()) {
      $.ajax({
        type: 'POST',
        url: route,
        data: JSON.stringify(questionInfo),
        contentType: 'application/json; charset=utf-8',
      })
        .then(() => console.log('success'))
        .then(toggleQuestionModal())
        .catch((error) => console.log(error));
    }
  }

  // Render a list of mandatory fields that are not filled out correctly
  renderErrors() {
    const { questionText, questionName, error } = this.state;
    const errors = [];
    let errorMessage;
    if (!questionText) {
      errors.push('Your Question');
    }
    if (!questionName) {
      errors.push('Your Nickname');
    }
    if (!this.verifyEmail()) {
      errors.push('Your Email');
    }
    if (error) {
      errorMessage = (
        <div className="error-message">
          <h5>
            You must enter:
            <ul>
              {errors.map((errorEntry) => <li className="mandatory-field">{errorEntry}</li>)}
            </ul>
          </h5>
        </div>
      );
    }
    return errorMessage;
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
              What is your nickname
              <span className="mandatory-field">*</span>
              :
              <input
                type="text"
                name="questionName"
                size="60"
                maxLength="60"
                value={questionName}
                onChange={this.changeQuestionInfo}
                placeholder="Example: jackson11!"
              />
              <p>For privacy reasons, do not use your full name or email address</p>
            </label>
          </div>
          <div>
            <label htmlFor="questionEmail">
              Your email
              <span className="mandatory-field">*</span>
              :
              <input
                type="text"
                name="questionEmail"
                size="60"
                maxLength="60"
                value={questionEmail}
                onChange={this.changeQuestionInfo}
              />
              <p>For authentication reasons you will be emailed</p>
            </label>
          </div>
          <div>
            <label htmlFor="questionText">
              Your Question
              <span className="mandatory-field">*</span>
              :
              <input
                type="text"
                name="questionText"
                value={questionText}
                onChange={this.changeQuestionInfo}
                placeholder="Why did you like the product or not?"
              />
            </label>
          </div>
          {this.renderErrors()}
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
