/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerText: '',
      answerName: '',
      answerEmail: '',
      error: false,
    };
    this.changeAnswerInfo = this.changeAnswerInfo.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  changeAnswerInfo(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // make sure email is in correct format
  verifyEmail() {
    const { answerEmail: email } = this.state;
    let formatted = false;
    const asterisk = email.indexOf('@');
    const period = email.lastIndexOf('.');
    if (email[asterisk - 1] && email[asterisk + 1] !== '.' && asterisk < period && email[period + 1]) {
      formatted = true;
    }
    return formatted;
  }

  // if any mandatory fields are incorect, mark flag for renderErrors to display necessary message
  verifyAnswer() {
    const { answerText, answerName } = this.state;
    if (!answerText || !answerName || !this.verifyEmail()) {
      this.setState({ error: true });
      return false;
    }
    this.setState({ error: false });
    return true;
  }

  submitAnswer() {
    const { answerText, answerName, answerEmail } = this.state;
    const { toggleAnswerModal, questionId } = this.props;

    const route = `http://localhost:8080/atelier/qa/questions/${questionId}/answers`;
    const answerInfo = {
      body: answerText,
      name: answerName,
      email: answerEmail,
    };

    // check if there are any errors
    this.verifyAnswer();
    // only submit if there are no errors
    if (this.verifyAnswer()) {
      $.ajax({
        type: 'POST',
        url: route,
        data: JSON.stringify(answerInfo),
        contentType: 'application/json; charset=utf-8',
      })
        .then(() => console.log('success'))
        .then(toggleAnswerModal())
        .catch((error) => console.log(error));
    }
  }

  // Render a list of mandatory fields that are not filled out correctly
  renderErrors() {
    const { answerText, answerName, error } = this.state;
    const errors = [];
    let errorMessage;
    if (!answerText) {
      errors.push('Your Answer');
    }
    if (!answerName) {
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
    const { answerText, answerName, answerEmail } = this.state;
    const { toggleAnswerModal } = this.props;
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Submit your Answer</h3>
          <p>Product: Question</p>
          <form>
            <div className="submission-field">
              <h4>
                Your Name
                <span className="mandatory-field">*</span>
              </h4>
              <input
                type="text"
                name="answerName"
                size="60"
                maxLength="60"
                value={answerName}
                onChange={this.changeAnswerInfo}
                placeholder="Example: jack543!"
              />
              <p>For privacy reasons, do not use your full name or email address</p>
            </div>
            <div className="submission-field">
              <h4>
                Your Email
                <span className="mandatory-field">*</span>
              </h4>
              <input
                type="text"
                name="answerEmail"
                size="60"
                maxLength="60"
                value={answerEmail}
                onChange={this.changeAnswerInfo}
                placeholder="Example: jack@email.com"
              />
              <p>For authentication reasons. You will be emailed</p>
            </div>
            <div className="submission-field">
              <h4>
                Your Answer
                <span className="mandatory-field">*</span>
              </h4>
              <textarea
                type="text"
                name="answerText"
                cols="60"
                rows="5"
                required
                maxLength="1000"
                value={answerText}
                onChange={this.changeAnswerInfo}
              />
            </div>
            {this.renderErrors()}
            <button type="button" onClick={toggleAnswerModal}>Cancel</button>
            <button type="button" onClick={this.submitAnswer}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

AnswerModal.propTypes = {
  questionId: PropTypes.number.isRequired,
  toggleAnswerModal: PropTypes.func.isRequired,
};

export default AnswerModal;
