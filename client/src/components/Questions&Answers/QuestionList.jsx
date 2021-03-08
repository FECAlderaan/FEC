import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import QuestionListEntry from './QuestionListEntry';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    const { searchTerm } = this.state;
    return (
      <div>
        <form>
          <input
            value={searchTerm}
            onChange={this.changeState}
            name="searchTerm"
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            size="128"
          />
        </form>
        {/* <QASearch searchTerm={searchTerm} changeState={this.changeState} /> */}
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
