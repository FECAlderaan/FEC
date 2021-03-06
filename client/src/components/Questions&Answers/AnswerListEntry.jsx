import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

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

class AnswerListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markedHelpful: false,
      reported: false,
    };
    this.markHelpful = this.markHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.renderReportButton = this.renderReportButton.bind(this);
  }

  // Increase an answer's helpfulness property
  markHelpful() {
    const { answer: { id } } = this.props;
    const { markedHelpful } = this.state;
    const route = `http://localhost:8080/atelier/qa/answers/${id}/helpful`;
    if (!markedHelpful) {
      $.ajax({
        url: route,
        method: 'PUT',
      })
        .success((this.setState({ markedHelpful: true })))
        .fail((error) => console.log(error));
    }
  }

  // Remove answer and send its id to Atelier API for review
  reportAnswer() {
    const { answer: { id } } = this.props;
    const { reported } = this.state;
    const route = `http://localhost:8080/atelier/qa/answers/${id}/report`;
    if (!reported) {
      $.ajax({
        url: route,
        method: 'PUT',
      })
        .then((this.setState({ reported: true })))
        .fail((error) => console.log(error));
    }
  }

  // Render a button that can only be clicked once for reporting answers
  renderReportButton() {
    const { reported } = this.state;
    let reportButton = <button type="button" onClick={this.reportAnswer}>Report</button>;
    if (reported) {
      reportButton = <span>Reported!</span>;
    }
    return reportButton;
  }

  render() {
    const { answer } = this.props;
    // Destructure and rename answerer_name into camelCase
    const { answerer_name: answererName } = answer;
    const { body, date, helpfulness } = answer;
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
            <button type="button" onClick={this.markHelpful}>Yes</button>
            (
            {helpfulness}
            )
          </p>
          {this.renderReportButton()}
        </div>
      </div>
    );
  }
}

AnswerListEntry.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
};

export default AnswerListEntry;
