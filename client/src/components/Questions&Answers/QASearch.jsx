import React from 'react';

class QASearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." size="128" />
      </form>
    );
  }
}

export default QASearch;
