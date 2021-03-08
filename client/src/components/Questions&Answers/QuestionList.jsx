import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import QuestionListEntry from './QuestionListEntry';
import QASearch from './QASearch';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  renderQuestions() {
    const { product } = this.props;
    let entries = [];
    if (product) {
      // Sort array of question objects by their value for question_helpfulness property
      const sortedQuestions = _.sortBy(product.questions, 'question_helpfulness');
      // Reverse the order of the questions so the most helpful is first
      sortedQuestions.reverse();
      entries = sortedQuestions.map(
        (question) => <QuestionListEntry question={question} key={question.question_id} />,
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <QASearch />
        <ul className="question-list">
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

QuestionList.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.string,
    questions: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default QuestionList;
