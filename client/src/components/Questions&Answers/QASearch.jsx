import React from 'react';

class QASearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { searchTerm } = this.state;
    return (
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
    );
  }
}

export default QASearch;
