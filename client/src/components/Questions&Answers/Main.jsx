import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import QuestionList from './QuestionList.jsx'

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Call Atelier API (through proxy server) and get relevant info for for productId
    const route = 'http://localhost:8080/atelier/qa/questions';
    $.get(route, {product_id: this.props.productId})
      .done((result) => {
        this.setState({product: {productId: result.product_id, questions: result.results}});
      })
      .fail((error) => {
        console.log(error);
        alert(error);
      })
  }

  render() {
    return (
      <div>
        <h2>Questions & Answers</h2>
        <form>
          <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." size="128" />
        </form>
        <QuestionList product={this.state.product}/>
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