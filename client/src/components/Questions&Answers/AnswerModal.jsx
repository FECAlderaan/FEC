import React from 'react';
import $ from 'jquery';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        answerText: '',
        answerName: '',
        answerEmail: '',
      }
    this.changeAnswerInfo = this.changeAnswerInfo.bind(this);
  }

  changeAnswerInfo(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitAnswer() {
    const { answerText, answerName, answerEmail } = this.state;
    const { toggleAnswerModal } = this.props;
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
          <button type="button" onClick={toggleAnswerModal}>Submit</button>
        </form>
      </div>
    );
  }
}

export default AnswerModal;
