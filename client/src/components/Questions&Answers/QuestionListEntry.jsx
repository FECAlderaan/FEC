import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';

const QuestionListEntry = ({ question }) => {
  // Destructure and rename question_helpfulness into camelCase
  const { question_helpfulness: questionHelpfulness, question_body: questionBody } = question;
  const { answers } = question;

  // Convert answers from an object to an array;
  const parseAnswers = () => {
    let answerList;
    if (answers) {
      answerList = Object.entries(answers).map((answer) => answer[[1]]);
    }
    return answerList;
  };

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
          <a href="/">Add Answer</a>
        </div>
      </div>
      <AnswerList answers={parseAnswers()} />
    </div>
  );
};

QuestionListEntry.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
};

export default QuestionListEntry;
