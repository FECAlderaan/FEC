import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import QuestionListEntry from './QuestionListEntry';

const QuestionList = ({ product }) => {
  const renderQuestions = () => {
    let entries = [];
    if (product) {
      // Sort array of question objects by their value for question_helpfulness property
      const sortedQuestions = _.sortBy(product.questions, 'question_helpfulness');
      // Reverse the order of the questions so the most helpful is first
      sortedQuestions.reverse();
      entries = product.questions.map(
        (question) => <QuestionListEntry question={question} key={question.question_id} />,
      );
    }
    return entries;
  };
  return (
    <ul className="question-list">
      {renderQuestions()}
    </ul>
  );
};

QuestionList.propTypes = {
  product: PropTypes.object,
};

export default QuestionList;
