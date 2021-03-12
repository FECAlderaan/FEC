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
    const { answer } = props;
    this.state = {
      markedHelpful: false,
      reported: false,
      helpfulness: answer.helpfulness,
    };
    this.markHelpful = this.markHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.renderHelpfulButton = this.renderHelpfulButton.bind(this);
    this.renderReportButton = this.renderReportButton.bind(this);
  }

  // Increase an answer's helpfulness property
  markHelpful() {
    const { answer: { id } } = this.props;
    const { markedHelpful, helpfulness } = this.state;
    const route = `/atelier/qa/answers/${id}/helpful`;
    if (!markedHelpful) {
      $.ajax({
        url: route,
        method: 'PUT',
      })
        // update state so render can reflect new value
        .done(this.setState({ markedHelpful: true, helpfulness: helpfulness + 1 }))
        .fail((error) => console.log(error));
    }
  }

  // Remove answer and send its id to Atelier API for review
  reportAnswer() {
    const { answer: { id } } = this.props;
    const { reported } = this.state;
    const route = `/atelier/qa/answers/${id}/report`;
    if (!reported) {
      $.ajax({
        url: route,
        method: 'PUT',
      })
        .done((this.setState({ reported: true })))
        .fail((error) => console.log(error));
    }
  }

  // Render a button that can only be clicked once for marking a helpful answer
  renderHelpfulButton() {
    const { markedHelpful } = this.state;
    let helpfulButton = <span class="link" role="button" onClick={this.markHelpful}>Yes</span>;
    if (markedHelpful) {
      helpfulButton = <span>Yes</span>;
    }
    return helpfulButton;
  }

  // Render a button that can only be clicked once for reporting answers
  renderReportButton() {
    const { reported } = this.state;
    let reportButton = <span className="link" role="button" onClick={this.reportAnswer}>Report</span>;
    if (reported) {
      reportButton = <span>Reported!</span>;
    }
    return reportButton;
  }

  render() {
    const { helpfulness } = this.state;
    const { answer: { body, date, answerer_name: answererName } } = this.props;
    return (
      <div className="answer-entry list-entry">
        <p>{body}</p>
        <div className="answer-entry-data">
          <span>
            {'by '}
            {checkIfSeller(answererName)}
            {', '}
            {formatDate(date)}
            <span className="seperator"> | </span>
          </span>
          <span>
            {'Helpful? '}
            {this.renderHelpfulButton()}
            {' ('}
            {helpfulness}
            )
            <span className="seperator"> | </span>
          </span>
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
export { formatDate, checkIfSeller };
