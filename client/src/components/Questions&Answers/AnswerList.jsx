import React from 'react';
import PropTypes from 'prop-types';
import AnswerListEntry from './AnswerListEntry';

const AnswerList = ({ answers }) => {
  const renderAnswers = () => {
    let entries = [];
    if (answers) {
      entries = answers.map(
        (answer) => <AnswerListEntry answer={answer} key={answer.id} />,
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
