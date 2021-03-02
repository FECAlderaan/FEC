import React from 'react';
import PropTypes from 'prop-types';
import QuestionListEntry from './QuestionListEntry.jsx'

const QuestionList = ({product}) => {
  const renderQuestions = () => {
    if (product) {
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
  product: PropTypes.array
}

export default QuestionList;