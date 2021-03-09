/* eslint-disable no-console */
import React from 'react';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      questionName: '',
      questionEmail: '',
    };
  }

  render() {
    const { questionText, questionName, questionEmail } = this.state;
    // const { toggleAnswerModal } = this.props;
    return (
      <div>
        <h3>Ask a Question</h3>
        <form>
          <div>
            <label htmlFor="questionName">
              Nickname:
              <input type="text" name="answerName" value={questionName} onChange={this.changeAnswerInfo} placeholder="Example: jackson11!" />
              <p>For privacy reasons, do not use your full name or email address</p>
            </label>
          </div>
          <div>
            <label htmlFor="questionEmail">
              Email:
              <input type="text" name="questionEmail" value={questionEmail} onChange={this.changeAnswerInfo} />
            </label>
          </div>
          <div>
            <label htmlFor="questionText">
              Question:
              <input type="text" name="questionText" value={questionText} onChange={this.changeAnswerInfo} />
            </label>
          </div>
          <button type="button">Cancel</button>
          <button type="button" onClick={this.submitAnswer}>Submit</button>
        </form>
      </div>
    );
  }
}

export default AnswerModal;
