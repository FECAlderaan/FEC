import React from 'react';
import PropTypes from 'prop-types';

const QuestionListEntry = ({ question }) => {
  // Destructure and rename question_helpfulness into camelCase
  const { question_helpfulness: questionHelpfulness } = question;

  return (
    <div className="question-list-entry">
      <div className="question">
        <h3>Q: </h3>
        <p>{question.question_body}</p>
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
      <div className="answer-list">
        <h3>A: </h3>
        <div className="answer-entry">
          <p>They are pretty good.</p>
          <div className="answer-entry-data">
            <p>by User1231, March 01 2021</p>
            <p>
              Helpful?
              <a href="/"> Yes </a>
              [2]
            </p>
            <a href="/">Report</a>
          </div>
        </div>
        <div className="answer-entry">
          <p>They are pretty cool too.</p>
          <div className="answer-entry-data">
            <p>by Qunitillius42565 Seller, March 01 2021</p>
            <p>
              Helpful?
              <a href="/"> Yes </a>
              [2]
            </p>
            <a href="/">Report</a>
          </div>
        </div>
      </div>
    </div>
  );
};

QuestionListEntry.propTypes = {
  question: PropTypes.object,
};

export default QuestionListEntry;
