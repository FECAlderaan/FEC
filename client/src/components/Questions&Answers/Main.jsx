import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList.jsx'

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Questions & Answers</h2>
        <form>
          <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." size="128" />
          <input type="submit" value="Submit" />
        </form>
        <QuestionList  />
        <button>More Answered Questions</button>
        <button>Ask A Question + </button>
      </div>
    )
  }
}

QuestionAnswer.propTypes = {
  productId : PropTypes.number
}

export default QuestionAnswer