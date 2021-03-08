import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import QuestionListEntry from './QuestionListEntry';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      showAll: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Filter questions to only match what the user has typed in the searchbar
  filterQuestions() {
    const { product: { questions } } = this.props;
    const { searchTerm } = this.state;
    let filteredQuestions = questions;
    // Only filter results if user has typed over 3 letters in searchbar
    if (searchTerm.length >= 3) {
      filteredQuestions = questions.filter((question) => {
        let match = false;
        // Check if the question body contains the search terrm at all
        if (question.question_body.includes(searchTerm)) {
          match = true;
        }
        return match;
      });
    }
    return filteredQuestions;
  }

  // Filter, Sort, and render question objects
  renderQuestions() {
    const { product } = this.props;
    const { showAll } = this.state;
    let entries = [];
    // subset of entries to be displayed
    let display = [];

    if (product) {
      // Only render questions that pass the filter
      const filteredQuestions = this.filterQuestions();
      // Sort array of question objects by their value for question_helpfulness property
      const sortedQuestions = _.sortBy(filteredQuestions, 'question_helpfulness');
      // Reverse the order of the questions so the most helpful is first
      sortedQuestions.reverse();
      entries = sortedQuestions.map(
        (question) => <QuestionListEntry question={question} key={question.question_id} />,
      );

      // Handle if there are only 2 answers
      if (entries.length < 3) {
        display = [...entries];
      // Only show the first two answers unless the specificies to shows the rest
      } else if (!showAll) {
        display = [entries[0], entries[1]];
      // Show all questions
      } else {
        display = [...entries];
      }
    }
    // Only show 2 answers and a load more button
    return display;
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
            type="search"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            size="128"
          />
        </form>
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
