import React from 'react';
import PropTypes from 'prop-types';
import AnswerListEntry from './AnswerListEntry';

const AnswerList = ({ answers }) => {
  const renderAnswers = () => {
    let entries = [];
    if (answers) {
      entries = Object.entries(answers).map(
        (answer) => <AnswerListEntry answer={answer[1]} key={answer[0]}/>,
      );
    }
    return entries;
  };
  return (
    <div className="answer-list">
      <h3>A: </h3>
      {renderAnswers()}
    </div>
  );
};

AnswerList.propTypes = {
  answers: PropTypes.instanceOf(Object).isRequired,
};

export default AnswerList;
