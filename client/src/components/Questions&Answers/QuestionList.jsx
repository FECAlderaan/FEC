import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import QuestionListEntry from './QuestionListEntry.jsx'

const QuestionList = ({product}) => {
  const renderQuestions = () => {
    if (product) {
      // Sort array of question objects by their value for question_helpfulness property
      product.questions = _.sortBy(product.questions, 'question_helpfulness')
      // Reverse the order of the questions so the most helpful is first
      product.questions.reverse();
      return product.questions.map((question) => <QuestionListEntry question={question} key={question.question_id}/> )
    }
  }
  return (
    <ul className="question-list">
      {renderQuestions()}
    </ul>
  )
}

QuestionList.propTypes = {
  product: PropTypes.object
}

export default QuestionList;