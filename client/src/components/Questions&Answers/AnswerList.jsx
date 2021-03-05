import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import AnswerListEntry from './AnswerListEntry';

const AnswerList = ({ answers }) => {
  const renderAnswers = () => {
    let entries = [];
    // Sort array of answer objects by their value for helpfulness property
    const sortAnswers = (answerList) => {
      const sortedAnswerList = _.sortBy(answerList, 'helpfulness');
      // Reverse the order of the answers so the most helpful is first
      entries.push(...sortedAnswerList.reverse());
    };

    if (answers) {
      // filter all answers authored by 'Seller' to seperate arrays
      const sellerAnswers = answers.filter((answer) => answer.answerer_name === 'Seller');
      const buyerAnswers = answers.filter((answer) => answer.answerer_name !== 'Seller');

      // sort both arrays
      // push Seller's answers first so they are at the front of the array
      sortAnswers(sellerAnswers);
      sortAnswers(buyerAnswers);

      entries = entries.map(
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
