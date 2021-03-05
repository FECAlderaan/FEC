import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const AnswerListEntry = ({ answer }) => {
  // Destructure and rename answerer_name into camelCase
  const { answerer_name: answererName } = answer;
  const { body, date, helpfulness, id } = answer;

  // Convert date string into Month DD, YYYY format
  const formatDate = (dateString) => {
    // parse date from string
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // If answer is from seller than render 'Seller' in bold
  const checkIfSeller = (answerer) => {
    if (answerer === 'Seller') {
      return <b>{answerer}</b>;
    }
    return answerer;
  };

  const markHelpful = () => {
    const route = `http://localhost:8080/atelier/qa/answers/${id}/helpful`;
    $.ajax({
      url: route,
      method: 'PUT',
    })
      .fail((error) => console.log(error));
  };

  return (
    <div className="answer-entry">
      <p>{body}</p>
      <div className="answer-entry-data">
        <p>
          {'by '}
          {checkIfSeller(answererName)}
          {', '}
          {formatDate(date)}
        </p>
        <p>
          Helpful?
          <button type="button" onClick={markHelpful}>Yes</button>
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
