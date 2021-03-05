import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import AnswerListEntry from './AnswerListEntry';

const AnswerList = ({ answers }) => {
  const renderAnswers = () => {
    let entries = [];
    if (answers) {
      // Sort array of answer objects by their value for helpfulness property
      const sortedAnswers = _.sortBy(answers, 'helpfulness');
      // Reverse the order of the answers so the most helpful is first
      sortedAnswers.reverse();
      entries = sortedAnswers.map(
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
  answers: PropTypes.instanceOf(Array).isRequired,
};

export default AnswerList;
