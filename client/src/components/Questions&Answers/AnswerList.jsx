import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import AnswerListEntry from './AnswerListEntry';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      showAll: false,
    };
    this.sortAnswers = this.sortAnswers.bind(this);
    this.arrangeAnswers = this.arrangeAnswers.bind(this);
    this.toggleShowAll = this.toggleShowAll.bind(this);
    this.renderDisplayButton = this.renderDisplayButton.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    // update state with properly arranged answers
    this.arrangeAnswers();
  }

  // Sort answers by most helpful and add them to state
  sortAnswers(answerList) {
    const sortedAnswerList = _.sortBy(answerList, 'helpfulness');
    // Reverse the order of the answers so the most helpful is first
    this.setState({ entries: [...sortedAnswerList.reverse()] });
  }

  // Take answers from props, arrange them so Seller's answers appear first then sort answers
  arrangeAnswers() {
    const { answers } = this.props;
    // Sort array of answer objects by their value for helpfulness property
    if (answers) {
      // filter all answers authored by 'Seller' to seperate arrays
      const sellerAnswers = answers.filter((answer) => answer.answerer_name === 'Seller');
      const buyerAnswers = answers.filter((answer) => answer.answerer_name !== 'Seller');

      // sort both arrays
      // push Seller's answers first so they are at the front of the array
      this.sortAnswers(sellerAnswers);
      this.sortAnswers(buyerAnswers);
    }
  }

  toggleShowAll() {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  }

  // Render a button to toggle to load or collapse answers depending what is already rendered
  renderDisplayButton(displayed) {
    const { entries } = this.state;
    const total = entries.length;
    let displayButton;
    // compare length of visible answers to length of total answers to determine button to render
    if (displayed === total && total > 2) {
      // only allow users to collapse answers if total length is greater than 2
      displayButton = <b className="link" role="button" onClick={this.toggleShowAll}>COLLAPSE</b>;
    } else if (displayed < total) {
      // only allow users to load answers if there are unloaded answers
      displayButton = <b className="link" role="button" onClick={this.toggleShowAll}>SEE MORE ANSWERS</b>;
    }
    return displayButton;
  }

  // Convert entries in state into <AnswerListEntry />s to be rendered
  renderAnswers() {
    const { entries, showAll } = this.state;
    // subset of entries to be displayed
    let display = [];
    // Handle if there are only 2 answers
    if (entries.length < 3) {
      display = [...entries];
    } else if (!showAll) {
      display = [entries[0], entries[1]];
    } else {
      display = [...entries];
    }
    // Only show 2 answers and a load more button
    return [
      display.map((answer) => <AnswerListEntry answer={answer} key={answer.id} />),
      this.renderDisplayButton(display.length),
    ];
    // renders objects that aresupplied to it
  }

  render() {
    return (
      <div className="answer-list">
        <span>
          <h3 className="answer-head">A: </h3>
          <div>
            {this.renderAnswers()}
          </div>
        </span>
      </div>
    );
  }
}

AnswerList.propTypes = {
  answers: PropTypes.instanceOf(Array).isRequired,
};

export default AnswerList;
