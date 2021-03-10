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
    };
    this.changeAnswerInfo = this.changeAnswerInfo.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  changeAnswerInfo(e) {
    this.setState({ [e.target.name]: e.target.value });
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
