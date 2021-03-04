import React from 'react';
import PropTypes from 'prop-types';

const AnswerListEntry = ({ answer }) => {
  // Destructure and rename answerer_name into camelCase
  const { answerer_name: answererName } = answer;
  const { body, date, helpfulness } = answer;
  return (
    <div className="answer-entry">
      <p>{body}</p>
      <div className="answer-entry-data">
        <p>
          {`by ${answererName}, ${date}`}
        </p>
        <p>
          Helpful?
          <a href="/"> Yes </a>
          (
          {helpfulness}
          )
        </p>
        <a href="/">Report</a>
      </div>
    </div>
  );
};

AnswerListEntry.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
};

export default AnswerListEntry;
