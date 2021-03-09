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
      <div>
        <h3>Add an Answer</h3>
        <form>
          <div>
            <label htmlFor="answerName">
              Name:
              <input type="text" name="answerName" value={answerName} onChange={this.changeAnswerInfo} />
            </label>
          </div>
          <div>
            <label htmlFor="answerEmail">
              Email:
              <input type="text" name="answerEmail" value={answerEmail} onChange={this.changeAnswerInfo} />
            </label>
          </div>
          <div>
            <label htmlFor="answerText">
              Answer:
              {/* <textarea value={answerText} onChange={this.changeAnswerInfo} /> */}
              <input type="text" name="answerText" value={answerText} onChange={this.changeAnswerInfo} />
            </label>
          </div>
          <button type="button" onClick={toggleAnswerModal}>Cancel</button>
          <button type="button" onClick={this.submitAnswer}>Submit</button>
        </form>
      </div>
    );
  }
}

AnswerModal.propTypes = {
  questionId: PropTypes.number.isRequired,
  toggleAnswerModal: PropTypes.func.isRequired,
};

export default AnswerModal;
