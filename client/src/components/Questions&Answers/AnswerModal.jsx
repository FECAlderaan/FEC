import React from 'react';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        answerText: '',
      }
    this.changeAnswerText = this.changeAnswerText.bind(this);
  }

  changeAnswerText(e) {
    this.setState({ answerText: e.target.value });
  }

  render() {
    const { answerText } = this.state;
    return (
      <div>
        <h3>Add an Answer</h3>
        <form>
          <input type="text" value={answerText} onChange={this.changeAnswerText} />
          <button type="button">Submit</button>
        </form>
      </div>
    );
  }
};

export default AnswerModal;
