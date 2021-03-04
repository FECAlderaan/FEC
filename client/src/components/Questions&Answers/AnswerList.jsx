import React from 'react';
// import PropTypes from 'prop-types';

const AnswerList = () => (
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
);

// AnswerList.propTypes = {
//   product: PropTypes.shape({
//     product_id: PropTypes.string,
//     questions: PropTypes.instanceOf(Array),
//   }).isRequired,
// };

export default AnswerList;
