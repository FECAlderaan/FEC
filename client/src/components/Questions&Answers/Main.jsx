import React from 'react';
import QuestionList from './QuestionList.jsx'

const QuestionAnswer = () => {
  return (
    <div>
      <h2>Questions & Answers</h2>
      <form>
        <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." size="128" />
        <input type="submit" value="Submit" />
      </form>
      <QuestionList />
      <button>More Answered Questions</button>
      <button>Ask A Question + </button>
    </div>
  )
}

export default QuestionAnswer