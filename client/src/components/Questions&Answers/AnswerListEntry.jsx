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
    };
    this.markHelpful = this.markHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

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

  reportAnswer() {
    const { answer: { id } } = this.props;
    const route = `http://localhost:8080/atelier/qa/answers/${id}/report`;
    $.ajax({
      url: route,
      method: 'PUT',
    })
      .then(console.log('Answer Reported!'))
      .fail((error) => console.log(error));
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
          <button type="button" onClick={this.reportAnswer}>Report</button>
        </div>
      </div>
    );
  }
}

AnswerListEntry.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
};

export default AnswerListEntry;
