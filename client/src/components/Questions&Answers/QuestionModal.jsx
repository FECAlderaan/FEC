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
    this.changeQuestionInfo = this.changeQuestionInfo.bind(this);
    this.verifyQuestion = this.verifyQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  changeQuestionInfo(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  verifyQuestion() {
    const { questionText, questionName, questionEmail } = this.state;
    let verified = false;
    // verify mandatory fields aren't blank
    if (questionText || questionName || questionEmail) {
      // verify email is formatted
      if (questionEmail.includes('@')) {
        verified = true;
      } else {
        alert('The email address provided is not in correct email format');
      }
    } else {
      alert('You must enter the following:');
    }
    return verified;
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

  render() {
    const { questionText, questionName, questionEmail } = this.state;
    const { toggleQuestionModal } = this.props;
    return (
      <div>
        <h3>Ask a Question</h3>
        <form>
          <div>
            <label htmlFor="questionName">
              Nickname
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
              Email
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
              Question
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
