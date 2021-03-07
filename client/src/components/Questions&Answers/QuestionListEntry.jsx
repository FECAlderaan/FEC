import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';
import AnswerModal from './AnswerModal';

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  // Convert answers from an object to an array;
  parseAnswers() {
    const { question: {answers} } = this.props;
    let answerList;
    if (answers) {
      answerList = Object.entries(answers).map((answer) => answer[[1]]);
    }
    return answerList;
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
            <button type="button">Add Answer</button>
          </div>
          <AnswerModal />
        </div>
        <AnswerList answers={this.parseAnswers()} />
      </div>
    )
  }
}

QuestionListEntry.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
};

export default QuestionListEntry;
