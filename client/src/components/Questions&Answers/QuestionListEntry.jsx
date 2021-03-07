import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';
import AnswerModal from './AnswerModal';

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswerModal: false,
    };

    this.parseAnswers = this.parseAnswers.bind(this);
    this.toggleAnswerModal = this.toggleAnswerModal.bind(this);
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

  renderAnswerModal() {
    const { showAnswerModal } = this.state;
    if (showAnswerModal) {
      return <AnswerModal />;
    }
  }

  render() {
    const question = this.props;
    // Destructure and rename question_helpfulness into camelCase
    const { question_helpfulness: questionHelpfulness, question_body: questionBody } = question;
    return (
      <div className="question-list-entry">
        <div className="question">
          <h3>Q: </h3>
          <p>{questionBody}</p>
          <div className="question-data">
            <p>
              Helpful?
              <a href="/"> Yes </a>
              (
              {questionHelpfulness}
              )
            </p>
            <button type="button" onClick={this.toggleAnswerModal}>Add Answer</button>
          </div>
          {this.renderAnswerModal()}
        </div>
        <AnswerList answers={this.parseAnswers()} />
      </div>
    );
  }
}

QuestionListEntry.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
};

export default QuestionListEntry;
